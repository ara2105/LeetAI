"use client";

import { useEffect, useState, Suspense } from "react";
import { AlertTriangle, ExternalLink, Loader2, Info, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer
} from "recharts";
import type { ProfileAnalysis } from "@/types";

function DashboardContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("user");
  const [data, setData] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solvedSlugs, setSolvedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load manually solved slugs from LocalStorage to hide them from recommendations
    // as LeetCode's public API only returns aggregate totals, not specific problem histories.
    const saved = localStorage.getItem("leetai_solved_slugs");
    if (saved) {
      try {
        setSolvedSlugs(new Set(JSON.parse(saved)));
      } catch (e) {}
    }

    if (!username) {
      setError("No username provided. Please go back and enter a username.");
      setLoading(false);
      return;
    }

    fetch(`/api/analyze?username=${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch LeetCode data or user not found.");
        return res.json();
      })
      .then((resData: ProfileAnalysis) => setData(resData))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  const markProblemAsSolved = (slug: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to LeetCode
    const newResolved = new Set(solvedSlugs);
    newResolved.add(slug);
    setSolvedSlugs(newResolved);
    localStorage.setItem("leetai_solved_slugs", JSON.stringify(Array.from(newResolved)));
  };

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center font-sans text-zinc-300">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFA116] mb-4" />
        <p className="text-sm">Analyzing LeetCode profile...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center font-sans text-zinc-300">
        <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
        <p className="text-sm">{error || "Something went wrong."}</p>
        <Link href="/" className="mt-6 text-[#FFA116] hover:underline text-sm">
          &larr; Return to Homepage
        </Link>
      </div>
    );
  }

  // Calculate dynamic readiness score using an asymptotic curve
  const { easy, medium, hard } = data.stats.difficulty;
  
  const TOTAL_EASY = 835;
  const TOTAL_MEDIUM = 1750;
  const TOTAL_HARD = 750;
  const TOTAL_PROBLEMS = TOTAL_EASY + TOTAL_MEDIUM + TOTAL_HARD;
  const totalSolved = easy + medium + hard;

  const weightedPoints = (easy * 1) + (medium * 3) + (hard * 5);
  // Curve reaches ~70 at 1000 points, ~90 at 1800 points, ~98 at 3000 points
  let score = Math.floor(100 * (1 - Math.exp(-weightedPoints / 800)));
  
  // Cap score at 99 unless absolutely every LeetCode question is solved
  if (totalSolved >= TOTAL_PROBLEMS) {
    score = 100;
  } else if (score >= 100) {
    score = 99;
  }
  
  const scoreText = score >= 85 ? "top tier" : score >= 50 ? "above average" : "building fundamentals";

  // SVG calculations for the circular progress
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Radar chart dynamic data
  const radarTopics = ["Array", "Tree", "Graph", "Dynamic Programming", "Greedy", "Backtracking", "Binary Search", "String"];
  const skillData = radarTopics.map(topic => {
    const solved = data.stats.topicTags[topic] || 0;
    // Cap radar at 100 (assuming ~20 problems is maxed out "100" coverage for visual)
    return {
      subject: topic.replace("Dynamic Programming", "DP").replace("Backtracking", "Backtrack").replace("String", "Strings").replace("Array", "Arrays").replace("Tree", "Trees").replace("Graph", "Graphs"),
      A: Math.min(100, Math.max(10, solved * 5)), // Base line of 10 so it's visible even if 0
      fullMark: 100
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 font-sans text-zinc-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard ({data.stats.username})</h1>
        <p className="text-zinc-400 text-sm">Your interview readiness based on real-time LeetCode data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Row */}
        <div className="lg:col-span-2 bg-[#121212] border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase">INTERVIEW READINESS</h2>
            <div className="group relative cursor-help flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors">
              <Info className="w-4 h-4" />
              <span className="text-xs">How is this calculated?</span>
              <div className="absolute top-full right-0 mt-2 w-72 p-3 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl text-xs text-zinc-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                Score is mapped logarithmically from your weighted points (Easy=1, Medium=3, Hard=5) up to 99%. <strong>You currently have {weightedPoints} strictly weighted points.</strong> Getting 100 requires 100% platform completion.
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#222" strokeWidth="8" />
                <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#FFA116" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center" title="Score math: 100 * (1 - e ^ (-points / 800))">
                <span className="text-3xl font-bold text-white">{score}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-zinc-300 text-sm leading-relaxed mb-1">
                You're <span className="font-semibold text-white">{scoreText}</span>.
              </p>
              <p className="text-zinc-500 text-sm mt-3">
                Target: <span className="text-[#FFA116] font-medium">85+</span> for top-tier readiness.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] border border-zinc-800 rounded-xl p-6">
          <h2 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase mb-3">PROBLEMS SOLVED</h2>
          <div className="text-4xl font-bold text-white mb-6">{data.stats.totalSolved}</div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[#00b8a3]">Easy</span><span className="text-white">{easy} / 835</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00b8a3] h-full rounded-full" style={{ width: `${Math.min(100, (easy/835)*100)}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[#ffc01e]">Medium</span><span className="text-white">{medium} / 1750</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ffc01e] h-full rounded-full" style={{ width: `${Math.min(100, (medium/1750)*100)}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[#ff375f]">Hard</span><span className="text-white">{hard} / 750</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ff375f] h-full rounded-full" style={{ width: `${Math.min(100, (hard/750)*100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="lg:col-span-3 bg-[#121212] border border-zinc-800 rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase mb-2 w-full text-left">SKILL COVERAGE</h2>
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 11 }} />
                <Radar name="Skills" dataKey="A" stroke="#FFA116" fill="#FFA116" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="lg:col-span-1 bg-[#121212] border border-zinc-800 rounded-xl p-6 flex flex-col">
          <h2 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase mb-4">WEAK AREAS</h2>
          
          {data.performance.cons.length > 0 ? (
            <div className="space-y-4 flex-1">
              {data.performance.cons.map((con, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FFA116] mt-0.5 flex-shrink-0" />
                  <p className="font-medium text-white text-sm leading-relaxed">{con}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
              No glaring weaknesses detected!
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-[#121212] border border-zinc-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase">RECOMMENDED PROBLEMS</h2>
            <span className="text-[10px] text-zinc-600">Click ✕ if already solved.</span>
          </div>
          <div className="space-y-2 flex-1 relative">
            
            {(() => {
              // Curated mapping of API focusTopics to LeetCode problems
              const problemMap: Record<string, { id: number, title: string, difficulty: 'Easy'|'Medium'|'Hard', slug: string, color: string }[]> = {
                "Dynamic Programming (1D & 2D)": [
                  { id: 70, title: "Climbing Stairs", difficulty: "Easy", slug: "climbing-stairs", color: "text-[#00b8a3]" },
                  { id: 322, title: "Coin Change", difficulty: "Medium", slug: "coin-change", color: "text-[#ffc01e]" },
                  { id: 1143, title: "Longest Common Sub", difficulty: "Medium", slug: "longest-common-subsequence", color: "text-[#ffc01e]" },
                  { id: 198, title: "House Robber", difficulty: "Medium", slug: "house-robber", color: "text-[#ffc01e]" },
                  { id: 300, title: "Longest Increasing Subsequence", difficulty: "Medium", slug: "longest-increasing-subsequence", color: "text-[#ffc01e]" },
                ],
                "Graph Traversals": [
                  { id: 200, title: "Number of Islands", difficulty: "Medium", slug: "number-of-islands", color: "text-[#ffc01e]" },
                  { id: 133, title: "Clone Graph", difficulty: "Medium", slug: "clone-graph", color: "text-[#ffc01e]" },
                  { id: 207, title: "Course Schedule", difficulty: "Medium", slug: "course-schedule", color: "text-[#ffc01e]" },
                  { id: 695, title: "Max Area of Island", difficulty: "Medium", slug: "max-area-of-island", color: "text-[#ffc01e]" },
                ],
                "Arrays & Strings (The Basics)": [
                  { id: 1, title: "Two Sum", difficulty: "Easy", slug: "two-sum", color: "text-[#00b8a3]" },
                  { id: 242, title: "Valid Anagram", difficulty: "Easy", slug: "valid-anagram", color: "text-[#00b8a3]" },
                  { id: 49, title: "Group Anagrams", difficulty: "Medium", slug: "group-anagrams", color: "text-[#ffc01e]" },
                  { id: 347, title: "Top K Frequent Elements", difficulty: "Medium", slug: "top-k-frequent-elements", color: "text-[#ffc01e]" },
                ],
                "Hard Level Mixed": [
                  { id: 42, title: "Trapping Rain Water", difficulty: "Hard", slug: "trapping-rain-water", color: "text-[#ff375f]" },
                  { id: 23, title: "Merge k Sorted Lists", difficulty: "Hard", slug: "merge-k-sorted-lists", color: "text-[#ff375f]" },
                  { id: 76, title: "Min Window Substring", difficulty: "Hard", slug: "minimum-window-substring", color: "text-[#ff375f]" },
                  { id: 297, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", slug: "serialize-and-deserialize-binary-tree", color: "text-[#ff375f]" },
                ]
              };

              // Skill-based fallback selections
              const beginnerDefaults = [
                { id: 1, title: "Two Sum", difficulty: "Easy" as const, slug: "two-sum", color: "text-[#00b8a3]" },
                { id: 20, title: "Valid Parentheses", difficulty: "Easy" as const, slug: "valid-parentheses", color: "text-[#00b8a3]" },
                { id: 121, title: "Best Time to Buy & Sell", difficulty: "Easy" as const, slug: "best-time-to-buy-and-sell-stock", color: "text-[#00b8a3]" },
                { id: 53, title: "Maximum Subarray", difficulty: "Medium" as const, slug: "maximum-subarray", color: "text-[#ffc01e]" },
                { id: 206, title: "Reverse Linked List", difficulty: "Easy" as const, slug: "reverse-linked-list", color: "text-[#00b8a3]" },
              ];

              const intermediateDefaults = [
                { id: 153, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium" as const, slug: "find-minimum-in-rotated-sorted-array", color: "text-[#ffc01e]" },
                { id: 55, title: "Jump Game", difficulty: "Medium" as const, slug: "jump-game", color: "text-[#ffc01e]" },
                { id: 139, title: "Word Break", difficulty: "Medium" as const, slug: "word-break", color: "text-[#ffc01e]" },
                { id: 300, title: "Longest Increasing Subsequence", difficulty: "Medium" as const, slug: "longest-increasing-subsequence", color: "text-[#ffc01e]" },
                { id: 1143, title: "Longest Common Subsequence", difficulty: "Medium" as const, slug: "longest-common-subsequence", color: "text-[#ffc01e]" },
                { id: 322, title: "Coin Change", difficulty: "Medium" as const, slug: "coin-change", color: "text-[#ffc01e]" },
                { id: 207, title: "Course Schedule", difficulty: "Medium" as const, slug: "course-schedule", color: "text-[#ffc01e]" }
              ];

              const advancedDefaults = [
                { id: 72, title: "Edit Distance", difficulty: "Hard" as const, slug: "edit-distance", color: "text-[#ff375f]" },
                { id: 42, title: "Trapping Rain Water", difficulty: "Hard" as const, slug: "trapping-rain-water", color: "text-[#ff375f]" },
                { id: 297, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard" as const, slug: "serialize-and-deserialize-binary-tree", color: "text-[#ff375f]" },
                { id: 23, title: "Merge k Sorted Lists", difficulty: "Hard" as const, slug: "merge-k-sorted-lists", color: "text-[#ff375f]" },
                { id: 76, title: "Minimum Window Substring", difficulty: "Hard" as const, slug: "minimum-window-substring", color: "text-[#ff375f]" },
                { id: 124, title: "Binary Tree Maximum Path Sum", difficulty: "Hard" as const, slug: "binary-tree-maximum-path-sum", color: "text-[#ff375f]" },
                { id: 212, title: "Word Search II", difficulty: "Hard" as const, slug: "word-search-ii", color: "text-[#ff375f]" },
                { id: 329, title: "Longest Increasing Path in a Matrix", difficulty: "Hard" as const, slug: "longest-increasing-path-in-a-matrix", color: "text-[#ff375f]" }
              ];

              const totalSolved = data.stats.totalSolved || 0;
              let defaultProblems: { id: number; title: string; difficulty: "Easy"|"Medium"|"Hard"; slug: string; color: string }[] = beginnerDefaults;
              if (totalSolved > 250) {
                defaultProblems = advancedDefaults;
              } else if (totalSolved > 50) {
                defaultProblems = intermediateDefaults;
              }

              let recommendedPool: any[] = [];
              
              if (data.roadmap && data.roadmap.length > 0) {
                // Collect problems based on identified weaknesses
                data.roadmap.forEach(item => {
                  if (problemMap[item.focusTopic]) {
                    recommendedPool.push(...problemMap[item.focusTopic]);
                  }
                });
              }

              // Filter out local solved slugs
              let filteredPool = recommendedPool.filter(p => !solvedSlugs.has(p.slug));

              // Fallback to defaults or fill up to 5 if needed
              if (filteredPool.length === 0) {
                filteredPool = defaultProblems.filter(p => !solvedSlugs.has(p.slug));
              } else if (filteredPool.length < 5) {
                const existingSlugs = new Set(filteredPool.map(p => p.slug));
                for (const dp of defaultProblems) {
                  if (!existingSlugs.has(dp.slug) && !solvedSlugs.has(dp.slug)) {
                    filteredPool.push(dp);
                    existingSlugs.add(dp.slug);
                  }
                  if (filteredPool.length >= 5) break;
                }
              }

              const finalDisplay = filteredPool.slice(0, 5);

              if (finalDisplay.length === 0) {
                 return (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 text-sm">
                     <p>You've crushed all our recommended problems!</p>
                     <p className="text-xs text-zinc-600 mt-1">We can't uniquely identify more without API auth.</p>
                   </div>
                 );
              }

              return finalDisplay.map((prob, idx) => (
                <Link 
                  key={idx}
                  href={`https://leetcode.com/problems/${prob.slug}/`} 
                  target="_blank" 
                  className="flex justify-between items-center group cursor-pointer hover:bg-zinc-900/50 px-4 py-3 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
                >
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">#{prob.id} {prob.title}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${prob.color}`}>{prob.difficulty}</span>
                    <button 
                      onClick={(e) => markProblemAsSolved(prob.slug, e)}
                      title="Mark as already solved"
                      className="p-1 rounded-md text-zinc-600 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 ml-1" />
                  </div>
                </Link>
              ));
            })()}

          </div>
        </div>

      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center font-sans text-zinc-300">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFA116] mb-4" />
        <p className="text-sm">Loading...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
