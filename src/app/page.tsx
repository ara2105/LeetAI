"use client";

import { useState } from "react";
import { Search, BarChart2, TrendingUp, Target, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Simulate navigate or analyzing
      router.push(`/dashboard?user=${username}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-6 font-sans">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-24 pb-32 w-full max-w-3xl">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8 tracking-wide">
          <Target className="w-3.5 h-3.5 text-[#FFA116]" />
          <span>Interview Readiness Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-[64px] leading-[1.1] font-bold tracking-tight mb-8 text-white">
          Know Exactly How Ready <br className="hidden md:block" />
          You Are for <span className="text-[#FFA116]">Coding<br/>Interviews.</span>
        </h1>
        
        <p className="text-zinc-400 text-lg mb-10 max-w-2xl text-center leading-relaxed">
          Enter your LeetCode username, get a readiness score, and follow an <br className="hidden md:block"/>
          adaptive roadmap built around your weaknesses.
        </p>

        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mb-12">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="LeetCode username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#151515] border border-zinc-800 focus:border-zinc-700 rounded-lg py-3.5 px-4 outline-none transition-colors text-white placeholder:text-zinc-500 text-sm font-medium"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#FFA116] hover:bg-[#e89110] text-black font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm"
          >
            Analyze <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* How It Works Section */}
      <section className="w-full flex flex-col items-center pb-24 border-t border-zinc-900 pt-16">
        <h2 className="text-2xl font-bold text-white mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          
          {/* Card 1 */}
          <div className="bg-[#121212] border border-zinc-900 hover:border-zinc-800 transition-colors p-8 rounded-2xl flex flex-col items-start text-left">
            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-zinc-800 flex items-center justify-center mb-10">
              <Search className="w-4 h-4 text-[#FFA116]" />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2">
              STEP 1
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Analyze</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Enter your LeetCode username and we pull your complete solving history.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#121212] border border-zinc-900 hover:border-zinc-800 transition-colors p-8 rounded-2xl flex flex-col items-start text-left">
            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-zinc-800 flex items-center justify-center mb-10">
              <BarChart2 className="w-4 h-4 text-[#FFA116]" />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2">
              STEP 2
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Score</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Get a readiness score from 0–100 based on coverage, consistency, and difficulty.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#121212] border border-zinc-900 hover:border-zinc-800 transition-colors p-8 rounded-2xl flex flex-col items-start text-left">
            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-zinc-800 flex items-center justify-center mb-10">
              <TrendingUp className="w-4 h-4 text-[#FFA116]" />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2">
              STEP 3
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Improve</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Follow a personalized roadmap to close your gaps and level up fast.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
