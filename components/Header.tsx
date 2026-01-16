// // components/Header.tsx - Updated Common Header
// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Moon, Sun, Menu, X, Code, BookOpen, MessageSquare, Bot, Play, FileText } from 'lucide-react';
// import { useTheme } from '@/components/ThemeProvider';

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   const navigation = [
//     { name: 'Home', href: '/', icon: Code },
//     { name: 'Tutorials', href: '/tutorials', icon: BookOpen },
//     { name: 'Courses', href: '/courses', icon: Play },
//     { name: 'Articles', href: '/articles', icon: FileText },
//     { name: 'AI Lab', href: '/ai-assistant', icon: Bot },
//     { name: 'Forum', href: '/forum', icon: MessageSquare },
//   ];

//   const isActive = (href: string) => {
//     if (href === '/') return pathname === '/';
//     return pathname.startsWith(href);
//   };

//   // Don't show header on auth pages
//   if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
//     return null;
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95">
//       <nav className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
//               <Code className="w-6 h-6 text-white" />
//             </div>
//             <span className="font-bold text-xl hidden sm:inline-block">KoderSolution</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                     isActive(item.href)
//                       ? 'bg-accent text-accent-foreground'
//                       : 'hover:bg-accent/50 hover:text-accent-foreground'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-2">
//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleTheme}
//               className="rounded-full"
//             >
//               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>

//             {/* Auth Buttons - Desktop */}
//             <div className="hidden sm:flex items-center gap-2">
//               <Link href="/login">
//                 <Button variant="ghost" size="sm">
//                   Log In
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button size="sm">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-1">
//               {navigation.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md transition-colors ${
//                       isActive(item.href)
//                         ? 'bg-accent text-accent-foreground'
//                         : 'hover:bg-accent/50 hover:text-accent-foreground'
//                     }`}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Icon className="w-5 h-5" />
//                     {item.name}
//                   </Link>
//                 );
//               })}
//               <div className="pt-4 flex flex-col gap-2 border-t mt-2">
//                 <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
//                   <Button variant="outline" className="w-full">
//                     Log In
//                   </Button>
//                 </Link>
//                 <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
//                   <Button className="w-full">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }