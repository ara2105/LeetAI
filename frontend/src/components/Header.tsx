import { TerminalSquare, Settings, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="fixed top-0 w-full h-16 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md z-50 flex items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80">
                <TerminalSquare className="w-5 h-5 text-brand-500" />
                LeetAI
            </Link>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-white/10 shadow-sm rounded-md flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Overview
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-md flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </div>

                <div className="w-px h-6 bg-white/10 mx-2 hidden md:block" />

                <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-white/10">
                    User
                </button>
            </div>
        </header>
    );
}
