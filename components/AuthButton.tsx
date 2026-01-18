"use client";

import { useState, useEffect, useRef } from 'react';
import { User, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserCircle2, LogOut, LogIn } from 'lucide-react';

export default function AuthButton({ onUserChange }: { onUserChange: (user: User | null) => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      onUserChange(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [onUserChange]);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center">
        <div className="w-5 h-5 bg-slate-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative z-50" ref={dropdownRef}>
      
      {/* --- SIGNED OUT STATE --- */}
      {!user && (
        <button 
          onClick={handleSignIn}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          aria-label="Sign In"
        >
          <LogIn className="w-5 h-5" />
        </button>
      )}

      {/* --- SIGNED IN STATE --- */}
      {user && (
        <>
          {/* Trigger Button (Avatar Only) */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              relative w-10 h-10 rounded-full overflow-hidden transition-all
              border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
              ${isDropdownOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'}
            `}
            aria-label="User Menu"
          >
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <UserCircle2 className="w-6 h-6" />
              </div>
            )}
            {/* Online Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full z-10"></span>
          </button>

          {/* DROPDOWN MENU (Single Row Layout) */}
          {isDropdownOpen && (
            <div className="
                absolute top-full mt-2
                w-[95vw] max-w-xs 
                bg-white dark:bg-slate-800 
                rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 
                animate-in fade-in zoom-in-95 duration-150 origin-top-right overflow-hidden
              ">
              
              {/* Single Row Container */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50">
                
                {/* Avatar + Name + Email (Left Side) */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 className="w-full h-full text-slate-400 p-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate" title={user.email}>
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Sign Out Button (Right Side) */}
                <button
                  onClick={handleSignOut}
                  className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}