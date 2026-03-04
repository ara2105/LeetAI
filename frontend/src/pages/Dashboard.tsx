import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { LeetAiService } from '../services/api';
import type { AnalysisResponse } from '../types';
import { AlertTriangle, Loader2, Check, ExternalLink } from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, Tooltip, Cell
} from 'recharts';
import { cn } from '../lib/utils';

export default function Dashboard() {
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username') || '';

    const [data, setData] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) {
            setError("No username provided");
            setLoading(false);
            return;
        }

        LeetAiService.analyzeUser(username)
            .then(res => setData(res))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
                <p className="text-[#888888] font-medium text-sm">Analyzing {username}'s profile...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
                <h1 className="text-2xl font-bold text-white mb-2">Analysis Failed</h1>
                <p className="text-[#888888] max-w-md">{error || "User not found or API error occurred."}</p>
                <button onClick={() => window.history.back()} className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all text-sm font-medium">
                    Go Back
                </button>
            </div>
        );
    }

    // Prepare data for Radar Chart
    const radarData = data.topicSkills || [];

    // Prepare data for Bar Chart
    const barData = [
        { name: 'Easy', count: data.userStats?.easySolved || 0, color: '#22c55e' },
        { name: 'Medium', count: data.userStats?.mediumSolved || 0, color: '#ffa116' },
        { name: 'Hard', count: data.userStats?.hardSolved || 0, color: '#ef4444' }
    ];

    const totalSolved = data.userStats?.totalSolved || 0;

    return (
        <div className="min-h-screen bg-[#111111] pb-24 font-sans text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-8 pt-12">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight mb-1">
                        Dashboard
                    </h1>
                    <p className="text-[#888888] text-sm">
                        Your interview readiness at a glance.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* INTERVIEW READINESS (col-8) */}
                    <div className="lg:col-span-7 xl:col-span-8 bg-[#181818] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest mb-6">Interview Readiness</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                    <circle
                                        cx="64" cy="64" r="56"
                                        stroke="currentColor" strokeWidth="8" fill="transparent"
                                        strokeDasharray={2 * Math.PI * 56}
                                        strokeDashoffset={2 * Math.PI * 56 * (1 - (data.readinessScore / 100))}
                                        className="text-[#ffa116]"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="text-4xl font-bold">{data.readinessScore}</span>
                            </div>
                            <div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                                    <span className="text-white font-semibold">You're above average</span> but have key gaps in Dynamic Programming and Graphs.
                                </p>
                                <p className="text-[#888888] text-xs">
                                    Target: <span className="text-[#ffa116] font-medium">85+</span> for top-tier readiness.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PROBLEMS SOLVED (col-4) */}
                    <div className="lg:col-span-5 xl:col-span-4 bg-[#181818] border border-white/5 rounded-2xl p-6 flex flex-col">
                        <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest mb-2">Problems Solved</h3>
                        <div className="text-4xl font-bold mb-6">{totalSolved}</div>

                        <div className="flex-1 flex flex-col justify-end gap-3 text-xs font-medium">
                            {/* Easy */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between text-[#888888]">
                                    <span>Easy</span>
                                    <span>{data.userStats?.easySolved || 0}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#22c55e] rounded-full" style={{ width: `${Math.min(100, ((data.userStats?.easySolved || 0) / 300) * 100)}%` }} />
                                </div>
                            </div>
                            {/* Medium */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between text-[#888888]">
                                    <span>Medium</span>
                                    <span>{data.userStats?.mediumSolved || 0}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#ffa116] rounded-full" style={{ width: `${Math.min(100, ((data.userStats?.mediumSolved || 1) / 500) * 100)}%` }} />
                                </div>
                            </div>
                            {/* Hard */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between text-[#888888]">
                                    <span>Hard</span>
                                    <span>{data.userStats?.hardSolved || 0}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#ef4444] rounded-full" style={{ width: `${Math.min(100, ((data.userStats?.hardSolved || 0) / 100) * 100)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SKILL COVERAGE (col-8) */}
                    <div className="lg:col-span-7 xl:col-span-8 bg-[#181818] border border-white/5 rounded-2xl p-6 min-h-[350px] flex flex-col">
                        <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest mb-4">Skill Coverage</h3>
                        <div className="flex-1 w-full h-[250px]">
                            {radarData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                        <PolarGrid stroke="#333" />
                                        <PolarAngleAxis dataKey="topic" tick={{ fill: '#888', fontSize: 10 }} />
                                        <Radar name="Skills" dataKey="proficiencyLevel" stroke="#ffa116" fill="#ffa116" fillOpacity={0.1} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#666666] text-sm">Not enough data to map skills.</div>
                            )}
                        </div>
                    </div>

                    {/* DIFFICULTY SPLIT (col-4) */}
                    <div className="lg:col-span-5 xl:col-span-4 bg-[#181818] border border-white/5 rounded-2xl p-6 min-h-[350px] flex flex-col">
                        <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest mb-4">Difficulty Split</h3>
                        <div className="flex-1 w-full h-[250px] pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} dy={10} />
                                    <Tooltip cursor={{ fill: '#222' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', fontSize: '12px' }} />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                                        {barData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* WEAK AREAS (col-4) */}
                    <div className="lg:col-span-4 bg-[#181818] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest mb-6">Weak Areas</h3>
                        <div className="flex flex-col gap-5">
                            {data.weakAreas.map((area, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <AlertTriangle className="w-4 h-4 text-[#ffa116] shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-white text-sm font-medium">{area}</h4>
                                        <p className="text-[#888888] text-xs mt-1">Review basic patterns and perform targeted practice.</p>
                                    </div>
                                </div>
                            ))}
                            {data.weakAreas.length === 0 && <p className="text-gray-500 text-xs">No major weaknesses detected.</p>}
                        </div>
                    </div>

                    {/* NEXT 5 PROBLEMS (col-4) */}
                    <div className="lg:col-span-4 bg-[#181818] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest mb-6">Next 5 Problems</h3>
                        <div className="flex flex-col gap-4">
                            {data.recommendations.map((rec, idx) => (
                                <a key={idx} href={rec.leetcodeUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#666666] text-xs font-mono w-6">#{idx + 1 * 100}</span>
                                        <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{rec.title}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className={cn(
                                            "text-xs font-medium",
                                            rec.difficulty.toLowerCase() === 'easy' ? "text-[#22c55e]" :
                                                rec.difficulty.toLowerCase() === 'medium' ? "text-[#ffa116]" :
                                                    "text-[#ef4444]"
                                        )}>{rec.difficulty}</span>
                                        <ExternalLink className="w-3 h-3 text-[#666666] group-hover:text-white transition-colors" />
                                    </div>
                                </a>
                            ))}
                            {data.recommendations.length === 0 && <p className="text-gray-500 text-xs">No recommendations available.</p>}
                        </div>
                    </div>

                    {/* WEEKLY PLAN (col-4) */}
                    <div className="lg:col-span-4 bg-[#181818] border border-white/5 rounded-2xl p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[#666666] text-[10px] uppercase font-bold tracking-widest">Weekly Plan</h3>
                            <span className="text-[#888888] text-xs font-medium">2/5</span>
                        </div>
                        <div className="flex flex-col gap-3.5">
                            {/* Dummy plan list based on screenshot */}
                            {[
                                { task: 'Solve 2 DP problems (1D)', done: true },
                                { task: 'Review BFS/DFS patterns', done: true },
                                { task: 'Attempt 1 hard Graph problem', done: false },
                                { task: 'Practice 2 Greedy mediums', done: false },
                                { task: 'Mock interview simulation', done: false }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-4 h-4 rounded-sm border flex items-center justify-center shrink-0",
                                        item.done ? "bg-[#cf8011] border-[#cf8011]" : "border-white/10"
                                    )}>
                                        {item.done && <Check className="w-3 h-3 text-[#111]" strokeWidth={3} />}
                                    </div>
                                    <span className={cn("text-sm", item.done ? "text-[#888888] line-through" : "text-gray-300")}>{item.task}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
