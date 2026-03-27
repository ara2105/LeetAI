"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Lock, Square } from "lucide-react";

export default function Roadmap() {
  const [expanded, setExpanded] = useState<string>("foundations");

  const toggleSection = (id: string) => {
    setExpanded(expanded === id ? "" : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10 font-sans text-zinc-300">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Roadmap</h1>
        <p className="text-zinc-400 text-sm">Your personalized progression plan.</p>
      </div>

      {/* Timeline Container */}
      <div className="relative ml-4 md:ml-8 pl-8 md:pl-10 space-y-6 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-zinc-800">
        
        {/* Foundations Section */}
        <div className="relative">
          {/* Timeline Node */}
          <div className="absolute -left-[35px] md:-left-[43px] w-4 h-4 rounded-full border-[3px] border-[#FFA116] bg-black z-10 top-6" />
          
          {/* Content Card */}
          <div 
            className="bg-[#121212] border border-zinc-800 hover:border-zinc-700 transition-colors rounded-xl overflow-hidden cursor-pointer"
            onClick={() => toggleSection("foundations")}
          >
            {/* Card Header */}
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Foundations</h2>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 font-medium">85%</span>
                  <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="bg-[#FFA116] h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                {expanded === "foundations" ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </div>
            </div>

            {/* Card Body (Expanded) */}
            {expanded === "foundations" && (
              <div className="px-6 pb-6 pt-2 border-t border-zinc-900/50">
                <div className="space-y-4 mt-2">
                  <div className="flex items-center gap-3 opacity-90">
                    <Check className="w-4 h-4 text-[#FFA116]" />
                    <span className="text-sm font-medium text-white">Arrays & Strings</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-90">
                    <Check className="w-4 h-4 text-[#FFA116]" />
                    <span className="text-sm font-medium text-white">Hash Maps</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-90">
                    <Check className="w-4 h-4 text-[#FFA116]" />
                    <span className="text-sm font-medium text-white">Two Pointers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="w-4 h-4 text-zinc-600" />
                    <span className="text-sm text-zinc-400">Sliding Window</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Strengthening Section */}
        <div className="relative">
          {/* Timeline Node */}
          <div className="absolute -left-[35px] md:-left-[43px] w-4 h-4 rounded-full border-[3px] border-[#FFA116] bg-black z-10 top-6" />
          
          <div 
            className="bg-[#121212] border border-zinc-800 hover:border-zinc-700 transition-colors rounded-xl overflow-hidden cursor-pointer"
            onClick={() => toggleSection("strengthening")}
          >
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Strengthening</h2>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 font-medium">40%</span>
                  <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="bg-[#FFA116] h-full rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>
                {expanded === "strengthening" ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </div>
            </div>

            {expanded === "strengthening" && (
              <div className="px-6 pb-6 pt-2 border-t border-zinc-900/50">
                <div className="space-y-4 mt-2">
                  <div className="flex items-center gap-3 opacity-90">
                    <Check className="w-4 h-4 text-[#FFA116]" />
                    <span className="text-sm font-medium text-white">Stacks & Queues</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="w-4 h-4 text-zinc-600" />
                    <span className="text-sm text-zinc-400">Trees & Binary Search</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="w-4 h-4 text-zinc-600" />
                    <span className="text-sm text-zinc-400">Linked Lists</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Section */}
        <div className="relative">
          {/* Timeline Node - locked */}
          <div className="absolute -left-[35px] md:-left-[43px] w-4 h-4 rounded-full border-[3px] border-zinc-700 bg-black z-10 top-6" />
          
          <div className="bg-[#121212]/50 border border-zinc-800/50 rounded-xl overflow-hidden cursor-not-allowed">
            <div className="p-6 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Advanced</h2>
                <Lock className="w-4 h-4 text-zinc-500" />
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 font-medium">0%</span>
                  <div className="w-16 h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                    <div className="bg-zinc-700 h-full rounded-full" style={{ width: "0%" }} />
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-zinc-600" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
