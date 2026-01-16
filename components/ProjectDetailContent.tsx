"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetailContent({ project }: { project: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0B1120] text-slate-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>

        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>{project.role}</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>{project.duration}</span>
          </div>
        </header>

        <section className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
            <p className="text-lg text-slate-300 leading-relaxed">{project.overview}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Impact</h3>
              <p className="text-slate-300">{project.impact}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Challenges & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-red-400 font-medium mb-2">Challenges</h4>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  {project.challenges.map((c: string, i: number) => <li key={i}>{c}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-green-400 font-medium mb-2">Solutions</h4>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  {project.solutions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}