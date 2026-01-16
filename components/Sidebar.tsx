"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Github, Linkedin, Mail, Briefcase, User, FolderOpen, 
  Sun, Moon 
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { name: "Home", href: "/", icon: User },
  { name: "Profile", href: "#intro", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Handle Theme Toggle
  useEffect(() => {
    // Check local storage or system preference on initial load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.querySelector(item.href));
      let current = "";
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id") || "";
          }
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SidebarContent = () => (
    <nav className="flex flex-col h-full justify-between py-8">
      <div className="px-6">
        {/* Profile Section with Image */}
        <Link href="/" className="flex items-center gap-3 mb-10 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/50 group-hover:ring-blue-500 transition-all shadow-lg">
            {/* REPLACE SRC WITH YOUR OWN IMAGE URL */}
            <img 
              src="https://kodersolution.com/assets/frontend/img/author/img.webp?format=webp" 
              alt="Maksudur Rahman" 
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold dark:text-white text-slate-900 tracking-tight">Maksudur Rahman</h1>
            <p className="text-xs text-blue-500 dark:text-blue-400 font-medium uppercase tracking-wider">Software Engineer</p>
          </div>
        </Link>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href.startsWith("#") && activeSection === item.href.substring(1);
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium gap-3",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  )}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6">
        <div className="flex gap-3 mb-4 items-center justify-between">
          <div className="flex gap-3">
            <a href="https://github.com/valiantboymaksud" className="p-2 rounded-lg dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <Github size={18} />
            </a>
            <a href="http://linkedin.com/in/maddevs" className="p-2 rounded-lg dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <Linkedin size={18} />
            </a>
            <a href="mailto:valiantmaksud@gmail.com" className="p-2 rounded-lg dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <Mail size={18} />
            </a>
          </div>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-lg dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-yellow-400 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-600">© {new Date().getFullYear()}</p>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] dark:bg-[#0B1120]/95 bg-white/95 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 flex-col z-40"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Header (Top Bar) */}
      <header className="md:hidden fixed top-0 w-full h-16 dark:bg-[#0B1120]/95 bg-white/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-blue-500/30">
               {/* REPLACE SRC WITH YOUR OWN IMAGE URL */}
               <img 
                src="https://kodersolution.com/assets/frontend/img/author/img.webp?format=webp" 
                alt="MR" 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Maksudur Rahman</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white p-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
          {isOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed top-0 left-0 h-screen w-[280px] dark:bg-[#0B1120] bg-white z-50 border-r border-slate-200 dark:border-white/10"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-900 dark:text-white p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
              <X />
            </button>
            <div className="pt-16 h-full">
              <SidebarContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}