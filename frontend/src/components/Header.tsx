import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Header() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username') || '';

    const path = location.pathname;

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Analyze', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Roadmap', path: '/roadmap' },
        { label: 'Weekly Report', path: '/weekly-report' },
    ];

    const getLink = (basePath: string) => {
        if (basePath === '/') return '/';
        return username ? `${basePath}?username=${username}` : basePath;
    };

    return (
        <header className="w-full h-16 bg-[#111111] border-b border-white/[0.05] flex items-center justify-between px-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                Leet<span className="text-brand-500">Ai</span>
            </Link>

            <nav className="flex items-center gap-6">
                {navItems.map((item) => {
                    const isActive = path === item.path && (item.path !== '/' || (item.label === 'Home' && path === '/'));
                    // Note: 'Analyze' also links to '/' but we handle active logic loosely for the landing page.
                    // If we are on landing page, 'Home' is active unless explicitly handling Analyze.
                    return (
                        <Link
                            key={item.label}
                            to={getLink(item.path)}
                            className={cn(
                                "text-sm font-medium transition-colors px-3 py-1.5 rounded-md",
                                isActive
                                    ? "bg-white/[0.08] text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
