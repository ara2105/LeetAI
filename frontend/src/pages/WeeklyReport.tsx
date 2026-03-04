import Header from '../components/Header';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function WeeklyReport() {
    return (
        <div className="min-h-screen bg-[#111111] font-sans text-white pb-24">
            <Header />

            <main className="max-w-4xl mx-auto px-8 pt-12">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold tracking-tight mb-1">
                        Weekly Report
                    </h1>
                    <p className="text-[#888888] text-sm">
                        Feb 17 – Feb 23, 2026
                    </p>
                </div>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {/* Readiness Score */}
                    <div className="bg-[#181818] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[100px]">
                        <span className="text-[#666666] text-xs font-medium">Readiness Score</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">72</span>
                            <span className="text-[#22c55e] text-xs font-semibold flex items-center">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> +5
                            </span>
                        </div>
                    </div>

                    {/* Problems Solved */}
                    <div className="bg-[#181818] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[100px]">
                        <span className="text-[#666666] text-xs font-medium">Problems Solved</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">187</span>
                            <span className="text-[#22c55e] text-xs font-semibold flex items-center">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> +12
                            </span>
                        </div>
                    </div>

                    {/* Weak Topics Covered */}
                    <div className="bg-[#181818] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[100px]">
                        <span className="text-[#666666] text-xs font-medium">Weak Topics Covered</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">3/5</span>
                            <span className="text-[#666666] text-xs font-semibold flex items-center">
                                – 0
                            </span>
                        </div>
                    </div>

                    {/* Consistency Streak */}
                    <div className="bg-[#181818] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[100px]">
                        <span className="text-[#666666] text-xs font-medium">Consistency Streak</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">6 <span className="text-lg font-medium text-gray-400">days</span></span>
                            <span className="text-[#ef4444] text-xs font-semibold flex items-center">
                                <TrendingDown className="w-3 h-3 mr-0.5" /> -1
                            </span>
                        </div>
                    </div>
                </div>

                {/* AI Assessment */}
                <div className="bg-[#181818] border border-white/5 rounded-2xl p-6 mb-6">
                    <h3 className="text-white text-sm font-bold mb-4">AI Assessment</h3>
                    <p className="text-[#888888] text-sm leading-relaxed">
                        You had a solid week with consistent daily practice. Your Arrays and Two Pointers skills are now strong, but Dynamic Programming remains your biggest gap. You tend to avoid hard problems — pushing through 1-2 hards per week will significantly boost your readiness score. Your consistency is good but dropped slightly. Try to maintain at least 5 days per week to keep momentum.
                    </p>
                </div>

                {/* Focus Next Week */}
                <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-white text-sm font-bold mb-5">Focus Next Week</h3>
                    <div className="flex flex-col gap-4">
                        {[
                            'Solve 3 medium-level Dynamic Programming problems',
                            'Review graph traversal patterns (BFS/DFS)',
                            'Complete 1 hard problem from Trees category',
                            'Revisit Sliding Window technique'
                        ].map((task, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded border border-white/10 flex items-center justify-center shrink-0" />
                                <span className="text-[#888888] text-sm">{task}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
