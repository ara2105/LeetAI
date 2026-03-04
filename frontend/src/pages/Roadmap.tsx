import Header from '../components/Header';
import { Check, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Roadmap() {
    const [openSection, setOpenSection] = useState<number | null>(0);

    const sections = [
        {
            title: 'Foundations',
            progress: 85,
            locked: false,
            items: [
                { name: 'Arrays & Strings', done: true },
                { name: 'Hash Maps', done: true },
                { name: 'Two Pointers', done: true },
                { name: 'Sliding Window', done: false },
            ]
        },
        {
            title: 'Strengthening',
            progress: 40,
            locked: false,
            items: [
                { name: 'Stacks & Queues', done: true },
                { name: 'Binary Search', done: false },
                { name: 'Linked Lists', done: false },
            ]
        },
        {
            title: 'Advanced',
            progress: 0,
            locked: true,
            items: []
        }
    ];

    return (
        <div className="min-h-screen bg-[#111111] font-sans text-white pb-24">
            <Header />

            <main className="max-w-3xl mx-auto px-8 pt-12">
                <div className="mb-12">
                    <h1 className="text-2xl font-bold tracking-tight mb-1">
                        Roadmap
                    </h1>
                    <p className="text-[#888888] text-sm">
                        Your personalized progression plan.
                    </p>
                </div>

                <div className="relative pl-8">
                    {/* Vertical Timeline Line */}
                    <div className="absolute top-6 bottom-6 left-[11px] w-px bg-white/10" />

                    <div className="flex flex-col gap-6">
                        {sections.map((section, idx) => {
                            const isOpen = openSection === idx;
                            return (
                                <div key={idx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-[#111] border-2 z-10"
                                        style={{ borderColor: section.locked ? '#333' : '#ffa116' }}
                                    />

                                    {/* Accordion Card */}
                                    <div className={cn(
                                        "bg-[#181818] border rounded-2xl overflow-hidden transition-colors",
                                        isOpen ? "border-white/10" : "border-white/5 hover:border-white/10",
                                        section.locked && "opacity-60"
                                    )}>
                                        <button
                                            onClick={() => !section.locked && setOpenSection(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-6 cursor-pointer outline-none"
                                            disabled={section.locked}
                                        >
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-base font-semibold">{section.title}</h3>
                                                {section.locked && <Lock className="w-4 h-4 text-[#666666]" />}
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3 w-28 text-right justify-end">
                                                    <span className="text-xs text-[#888888]">{section.progress}%</span>
                                                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#ffa116] rounded-full" style={{ width: `${section.progress}%` }} />
                                                    </div>
                                                </div>

                                                <div className="text-[#666666]">
                                                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                </div>
                                            </div>
                                        </button>

                                        {/* Expanded Content */}
                                        {isOpen && section.items.length > 0 && (
                                            <div className="px-6 pb-6 pt-2 border-t border-white/5">
                                                <div className="flex flex-col gap-4">
                                                    {section.items.map((item, itemIdx) => (
                                                        <div key={itemIdx} className="flex items-center gap-4">
                                                            <div className={cn(
                                                                "w-4 h-4 rounded shadow-sm flex items-center justify-center shrink-0 transition-colors",
                                                                item.done ? "bg-[#1A1A1A] border-none text-[#ffa116]" : "border border-white/10"
                                                            )}>
                                                                {item.done && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                                            </div>
                                                            <span className={cn(
                                                                "text-sm",
                                                                item.done ? "text-gray-300" : "text-[#666666]"
                                                            )}>
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
