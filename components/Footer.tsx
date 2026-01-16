"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/valiantboymaksud" },
  { name: "LinkedIn", icon: Linkedin, href: "http://linkedin.com/in/maddevs" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Email", icon: Mail, href: "mailto:valiantmaksud@gmail.com" },
];

export default function Footer() {
  return (
    // Removed absolute. Added w-full. 
    <footer className="w-full border-t border-white/10 bg-[#0B1120] py-12 text-slate-400 relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-3 gap-12 items-center">
          
          {/* Branding & Socials */}
          <div className="md:col-span-1 text-center md:text-left pl-0 md:pl-12">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight mb-4 block">
              Maksudur<span className="text-blue-500">.</span>Dev
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6 mx-auto md:mx-0">
              Software Engineer specializing in scalable enterprise solutions.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: "#fff" }}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-blue-500/50 transition-all"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Middle: Availability & CTA */}
          <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
             <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 font-medium text-sm">Open for new opportunities</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Remote | Freelance | Contract
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
            >
              Let's Talk
            </Link>
          </div>

          {/* Right: Back to Top */}
          <div className="md:col-span-1 flex flex-col items-center justify-center pr-0 md:pr-12">
             <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-blue-500/50 transition-all group"
              >
                <ArrowUp size={20} className="text-slate-400 group-hover:text-white" />
              </motion.button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 pl-0 md:pl-12 pr-0 md:pr-12">
          <p>
            &copy; Copyright {new Date().getFullYear()}. All Right reserved.
          </p>
          <p>
            Founder / Lead Engineer at <a className="text-danger" href="https://kodersolution.com" target="_blank">Kodersolution</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
}