import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';

export function useDataStore<T>(
  collectionName: string, 
  docId: string,         
  user: User | null,
  localKey: string,       
  defaultValue: T
) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // CASE 1: USER IS LOGGED IN -> USE FIRESTORE
    if (user) {
      const docRef = doc(db, "users", user.uid, collectionName, docId);
      
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data().value as T);
        } else {
          setDoc(docRef, { value: defaultValue }, { merge: true });
          setData(defaultValue);
        }
        setLoading(false);
      }, (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } 
    // CASE 2: NO USER -> USE LOCAL STORAGE
    else {
      try {
        const localData = localStorage.getItem(localKey);
        setData(localData ? JSON.parse(localData) : defaultValue);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setData(defaultValue);
        setLoading(false);
      }
    }
    // FIX REMOVED: defaultValue from the dependency array below
  }, [user, collectionName, docId, localKey]); 

  const updateData = (newValue: T) => {
    setData(newValue);

    if (user) {
      const docRef = doc(db, "users", user.uid, collectionName, docId);
      setDoc(docRef, { value: newValue }, { merge: true });
    } else {
      localStorage.setItem(localKey, JSON.stringify(newValue));
    }
  };

  return [data, updateData, loading] as const;
}