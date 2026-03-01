import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Code2, BrainCircuit, Target } from 'lucide-react';

export default function Landing() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            navigate(`/dashboard?username=${encodeURIComponent(username.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Immersive Background Glows */}
            <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/10 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Nav */}
            <nav className="absolute top-0 w-full py-6 px-8 flex justify-between items-center z-10">
                <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                    <Code2 className="w-6 h-6 text-brand-500" />
                    LeetAI
                </div>
            </nav>

            <main className="z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center mt-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(255,161,22,0.1)]">
                    <Sparkles className="w-4 h-4" />
                    <span>Llama 3.1 Intelligence</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                    <span className="text-white">Decode Your</span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-yellow-500 drop-shadow-[0_0_25px_rgba(255,161,22,0.5)]">
                        Interview Readiness
                    </span>
                </h1>

                <p className="text-gray-400 text-lg max-w-xl mb-12">
                    Instantly analyze your LeetCode profile. Uncover weaknesses and get a customized DSA roadmap in seconds.
                </p>

                <form onSubmit={handleSearch} className="w-full max-w-xl relative flex items-center group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-yellow-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <Search className="absolute left-5 w-6 h-6 text-gray-500 group-focus-within:text-brand-500 transition-colors z-10" />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="LeetCode Username..."
                        className="w-full bg-[#111] border border-white/5 rounded-2xl py-5 pl-14 pr-36 text-white text-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all shadow-2xl z-10 relative"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-3 bottom-3 bg-brand-500 hover:bg-brand-400 text-[#0A0A0A] font-bold rounded-xl px-8 transition-all hover:scale-105 z-20 hover:shadow-[0_0_20px_rgba(255,161,22,0.6)]"
                    >
                        Analyze
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28 text-left w-full relative">
                    {[
                        { icon: BrainCircuit, title: 'Deep Analysis', desc: 'Identify patterns in your problem solving.' },
                        { icon: Target, title: 'Adaptive Roadmap', desc: 'Weekly plans targeting your weakest links.' },
                        { icon: Code2, title: 'Smart Next 5', desc: 'The exact questions to maximize your ROI.' }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/[0.05] hover:border-brand-500/30 group">
                            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors group-hover:scale-110 duration-300">
                                <feature.icon className="w-8 h-8 text-brand-500 drop-shadow-[0_0_10px_rgba(255,161,22,0.4)]" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                                <p className="text-sm text-gray-400 mt-2">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
