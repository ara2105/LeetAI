import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { LeetAiService } from '../services/api';
import type { AnalysisResponse } from '../types';
import {
    Activity,
    Target,
    BarChart3,
    AlertTriangle,
    Map,
    ExternalLink,
    BrainCircuit,
    Loader2,
    Sparkles
} from 'lucide-react';
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
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Llama 3.1 is analyzing your LeetCode profile...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
                <h1 className="text-2xl font-bold text-white mb-2">Analysis Failed</h1>
                <p className="text-gray-400 max-w-md">{error || "User not found or API error occurred."}</p>
                <button onClick={() => window.history.back()} className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] pb-24 relative overflow-hidden">
            {/* Background ambient light */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-24 pt-32">
                <div className="flex items-end justify-between mb-8 pb-8 border-b border-white/10">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                            Welcome back, <span className="text-brand-500">{username}</span>
                        </h1>
                        <p className="text-gray-400 flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4 text-brand-500" />
                            Here is your AI Interview Readiness Report.
                        </p>
                    </div>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Readiness Score (Takes up 2x2 or 1x2) */}
                    <div className="md:col-span-1 md:row-span-2 col-span-1 rounded-3xl bg-white/[0.02] border border-white/5 p-6 flex flex-col items-center text-center justify-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-gray-400 font-medium mb-6 w-full text-left uppercase tracking-wider text-xs flex items-center gap-2">
                            <Activity className="w-4 h-4 text-brand-500" /> Readiness Score
                        </h3>
                        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                            <div className="absolute inset-0 rounded-full border-8 border-white/5" />
                            <div
                                className="absolute inset-0 rounded-full border-8 border-brand-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                style={{ clipPath: `polygon(0 0, 100% 0, 100% ${100 - data.readinessScore}%, 0 ${100 - data.readinessScore}%)` }}
                            />
                            <span className="text-6xl font-black text-white">{data.readinessScore}</span>
                        </div>
                        <p className="text-sm text-gray-400 px-4">
                            Your overall probability of clearing a FAANG technical screen.
                        </p>
                    </div>

                    {/* AI Summary */}
                    <div className="md:col-span-3 col-span-1 rounded-3xl bg-white/[0.04] border border-brand-500/20 p-8 shadow-2xl flex flex-col justify-center">
                        <h3 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-500" /> AI Executive Summary
                        </h3>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-serif italic">
                            "{data.summary}"
                        </p>
                    </div>

                    {/* Weak Areas */}
                    <div className="md:col-span-1 col-span-1 rounded-3xl bg-red-950/20 border border-red-900/30 p-6 shadow-2xl">
                        <h3 className="text-red-400 font-medium mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Critical Weaknesses
                        </h3>
                        <div className="flex flex-col gap-3">
                            {data.weakAreas.map((area, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-red-900/30 last:border-0 text-white/90">
                                    <span className="font-medium">{area}</span>
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                </div>
                            ))}
                            {data.weakAreas.length === 0 && <p className="text-gray-500 text-sm">No major weaknesses detected.</p>}
                        </div>
                    </div>

                    {/* Strong Topics */}
                    <div className="md:col-span-2 col-span-1 rounded-3xl bg-brand-950/10 border border-brand-900/20 p-6 shadow-2xl">
                        <h3 className="text-brand-500 font-medium mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> Top Skills
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {data.topicSkills.map((skill, idx) => (
                                <div key={idx} className="bg-white/5 rounded-xl p-4 flex flex-col justify-between">
                                    <span className="text-sm font-semibold text-gray-200 mb-4">{skill.topic}</span>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand-500 rounded-full"
                                            style={{ width: `${skill.proficiencyLevel}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {data.topicSkills.length === 0 && <p className="text-gray-500 text-sm">No skills detected.</p>}
                        </div>
                    </div>

                </div>

                {/* Roadmap and Recommendations Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    {/* Roadmap */}
                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 shadow-2xl">
                        <h3 className="text-gray-400 font-medium mb-8 w-full text-left uppercase tracking-wider text-xs flex items-center gap-2">
                            <Map className="w-4 h-4 text-brand-500" /> Adaptive Weekly Roadmap
                        </h3>

                        <div className="relative pl-6 border-l border-white/10 flex flex-col gap-8">
                            {data.roadmap.map((week, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[33px] bg-[#0A0A0A] p-1">
                                        <div className="w-3 h-3 rounded-full bg-brand-500 ring-4 ring-brand-500/20" />
                                    </div>
                                    <h4 className="text-white font-bold mb-1">Week {week.weekNumber}: {week.focusArea}</h4>
                                    <p className="text-sm text-gray-400">{week.description || "Concentrate on practicing standard medium-level questions here."}</p>
                                </div>
                            ))}
                            {data.roadmap.length === 0 && <p className="text-gray-500 text-sm">Roadmap not available.</p>}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 shadow-2xl">
                        <h3 className="text-gray-400 font-medium mb-8 w-full text-left uppercase tracking-wider text-xs flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-500" /> Next 5 Recommended Problems
                        </h3>
                        <div className="flex flex-col gap-4">
                            {data.recommendations.map((rec, idx) => (
                                <a
                                    key={idx}
                                    href={rec.leetcodeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-500/30"
                                >
                                    <div className="mb-2 md:mb-0">
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            {rec.title}
                                            <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-brand-500" />
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1">{rec.reason}</p>
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold px-3 py-1 rounded-full w-fit",
                                        rec.difficulty.toLowerCase() === 'easy' ? "bg-emerald-500/10 text-emerald-400" :
                                            rec.difficulty.toLowerCase() === 'medium' ? "bg-yellow-500/10 text-brand-400" :
                                                "bg-red-500/10 text-red-500"
                                    )}>
                                        {rec.difficulty}
                                    </span>
                                </a>
                            ))}
                            {data.recommendations.length === 0 && <p className="text-gray-500 text-sm">No recommendations available.</p>}
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
