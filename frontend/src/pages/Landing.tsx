import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { cn } from '../lib/utils';

export default function Landing() {
    const [username, setUsername] = useState('');
    const [goal, setGoal] = useState<'dsa' | 'interview' | 'company'>('interview');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            navigate(`/dashboard?username=${encodeURIComponent(username.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col items-center relative overflow-hidden font-sans">
            <Header />

            <main className="flex-1 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center -mt-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
                    Analyze Your Profile
                </h1>

                <p className="text-[#888888] text-sm mb-12">
                    Enter your LeetCode username and select your goal.
                </p>

                <form onSubmit={handleSearch} className="w-full max-w-lg flex flex-col items-center gap-8">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="LeetCode  username"
                        className="w-full bg-[#1E1E1E] border border-transparent rounded-lg py-4 px-6 text-center text-gray-300 text-sm font-mono placeholder-[#666666] focus:outline-none focus:border-white/10 transition-colors"
                        required
                    />

                    <div className="w-full">
                        <p className="text-[#666666] text-[10px] font-bold uppercase tracking-widest mb-4">
                            Select Your Goal
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'dsa', label: 'DSA Learning' },
                                { id: 'interview', label: 'Interview Prep' },
                                { id: 'company', label: 'Company Tier' }
                            ].map((g) => (
                                <button
                                    key={g.id}
                                    type="button"
                                    onClick={() => setGoal(g.id as any)}
                                    className={cn(
                                        "py-3 px-2 rounded-lg text-sm font-medium transition-colors border",
                                        goal === g.id
                                            ? "bg-[#1E1E1E] text-gray-300 border-white/10"
                                            : "bg-[#161616] text-[#888888] border-white/5 hover:bg-[#1A1A1A] hover:text-gray-400"
                                    )}
                                >
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 mt-2 bg-[#9E6E2D] hover:bg-[#B37E36] text-[#111111] font-bold rounded-lg transition-colors"
                    >
                        Start Analysis
                    </button>
                </form>
            </main>
        </div>
    );
}
