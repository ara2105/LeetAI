"use client";

import { useState } from "react";
import { ArrowDown, X, ExternalLink } from "lucide-react";
import Link from "next/link";

type Difficulty = "Easy" | "Medium" | "Hard";
type Problem = { id: number; title: string; difficulty: Difficulty; slug: string };

const roadmapData: Record<string, Problem[]> = {
  "Arrays & Hashing": [
    { id: 217, title: "Contains Duplicate", difficulty: "Easy", slug: "contains-duplicate" },
    { id: 242, title: "Valid Anagram", difficulty: "Easy", slug: "valid-anagram" },
    { id: 1, title: "Two Sum", difficulty: "Easy", slug: "two-sum" },
    { id: 49, title: "Group Anagrams", difficulty: "Medium", slug: "group-anagrams" },
    { id: 347, title: "Top K Frequent Elements", difficulty: "Medium", slug: "top-k-frequent-elements" },
    { id: 238, title: "Product of Array Except Self", difficulty: "Medium", slug: "product-of-array-except-self" },
    { id: 36, title: "Valid Sudoku", difficulty: "Medium", slug: "valid-sudoku" },
    { id: 128, title: "Longest Consecutive Sequence", difficulty: "Medium", slug: "longest-consecutive-sequence" },
  ],
  "Two Pointers": [
    { id: 125, title: "Valid Palindrome", difficulty: "Easy", slug: "valid-palindrome" },
    { id: 167, title: "Two Sum II", difficulty: "Medium", slug: "two-sum-ii-input-array-is-sorted" },
    { id: 15, title: "3Sum", difficulty: "Medium", slug: "3sum" },
    { id: 11, title: "Container With Most Water", difficulty: "Medium", slug: "container-with-most-water" },
    { id: 42, title: "Trapping Rain Water", difficulty: "Hard", slug: "trapping-rain-water" },
  ],
  "Stack": [
    { id: 20, title: "Valid Parentheses", difficulty: "Easy", slug: "valid-parentheses" },
    { id: 155, title: "Min Stack", difficulty: "Medium", slug: "min-stack" },
    { id: 150, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", slug: "evaluate-reverse-polish-notation" },
    { id: 22, title: "Generate Parentheses", difficulty: "Medium", slug: "generate-parentheses" },
    { id: 739, title: "Daily Temperatures", difficulty: "Medium", slug: "daily-temperatures" },
    { id: 853, title: "Car Fleet", difficulty: "Medium", slug: "car-fleet" },
  ],
  "Binary Search": [
    { id: 704, title: "Binary Search", difficulty: "Easy", slug: "binary-search" },
    { id: 74, title: "Search a 2D Matrix", difficulty: "Medium", slug: "search-a-2d-matrix" },
    { id: 875, title: "Koko Eating Bananas", difficulty: "Medium", slug: "koko-eating-bananas" },
    { id: 153, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", slug: "find-minimum-in-rotated-sorted-array" },
    { id: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", slug: "search-in-rotated-sorted-array" },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", slug: "median-of-two-sorted-arrays" },
  ],
  "Sliding Window": [
    { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", slug: "best-time-to-buy-and-sell-stock" },
    { id: 3, title: "Longest Substring Without Repeating", difficulty: "Medium", slug: "longest-substring-without-repeating-characters" },
    { id: 424, title: "Longest Repeating Character Replacement", difficulty: "Medium", slug: "longest-repeating-character-replacement" },
    { id: 76, title: "Minimum Window Substring", difficulty: "Hard", slug: "minimum-window-substring" },
    { id: 239, title: "Sliding Window Maximum", difficulty: "Hard", slug: "sliding-window-maximum" },
  ],
  "Linked List": [
    { id: 206, title: "Reverse Linked List", difficulty: "Easy", slug: "reverse-linked-list" },
    { id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", slug: "merge-two-sorted-lists" },
    { id: 143, title: "Reorder List", difficulty: "Medium", slug: "reorder-list" },
    { id: 19, title: "Remove Nth Node From End", difficulty: "Medium", slug: "remove-nth-node-from-end-of-list" },
    { id: 138, title: "Copy List with Random Pointer", difficulty: "Medium", slug: "copy-list-with-random-pointer" },
    { id: 25, title: "Reverse Nodes in k-Group", difficulty: "Hard", slug: "reverse-nodes-in-k-group" },
  ],
  "Trees": [
    { id: 226, title: "Invert Binary Tree", difficulty: "Easy", slug: "invert-binary-tree" },
    { id: 104, title: "Maximum Depth of Binary Tree", difficulty: "Easy", slug: "maximum-depth-of-binary-tree" },
    { id: 226, title: "Subtree of Another Tree", difficulty: "Easy", slug: "subtree-of-another-tree" },
    { id: 235, title: "LCA of a Binary Search Tree", difficulty: "Medium", slug: "lowest-common-ancestor-of-a-binary-search-tree" },
    { id: 102, title: "Binary Tree Level Order Traversal", difficulty: "Medium", slug: "binary-tree-level-order-traversal" },
    { id: 297, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", slug: "serialize-and-deserialize-binary-tree" },
  ],
  "Tries": [
    { id: 208, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", slug: "implement-trie-prefix-tree" },
    { id: 211, title: "Design Add and Search Words", difficulty: "Medium", slug: "design-add-and-search-words-data-structure" },
    { id: 212, title: "Word Search II", difficulty: "Hard", slug: "word-search-ii" },
  ],
  "Heap / Priority Queue": [
    { id: 703, title: "Kth Largest Element in a Stream", difficulty: "Easy", slug: "kth-largest-element-in-a-stream" },
    { id: 1046, title: "Last Stone Weight", difficulty: "Easy", slug: "last-stone-weight" },
    { id: 973, title: "K Closest Points to Origin", difficulty: "Medium", slug: "k-closest-points-to-origin" },
    { id: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", slug: "kth-largest-element-in-an-array" },
    { id: 295, title: "Find Median from Data Stream", difficulty: "Hard", slug: "find-median-from-data-stream" },
  ],
  "Backtracking": [
    { id: 78, title: "Subsets", difficulty: "Medium", slug: "subsets" },
    { id: 39, title: "Combination Sum", difficulty: "Medium", slug: "combination-sum" },
    { id: 46, title: "Permutations", difficulty: "Medium", slug: "permutations" },
    { id: 79, title: "Word Search", difficulty: "Medium", slug: "word-search" },
    { id: 51, title: "N-Queens", difficulty: "Hard", slug: "n-queens" },
  ],
  "Graphs": [
    { id: 200, title: "Number of Islands", difficulty: "Medium", slug: "number-of-islands" },
    { id: 133, title: "Clone Graph", difficulty: "Medium", slug: "clone-graph" },
    { id: 695, title: "Max Area of Island", difficulty: "Medium", slug: "max-area-of-island" },
    { id: 207, title: "Course Schedule", difficulty: "Medium", slug: "course-schedule" },
    { id: 127, title: "Word Ladder", difficulty: "Hard", slug: "word-ladder" },
  ],
  "Advanced Graphs": [
    { id: 332, title: "Reconstruct Itinerary", difficulty: "Hard", slug: "reconstruct-itinerary" },
    { id: 1584, title: "Min Cost to Connect All Points", difficulty: "Medium", slug: "min-cost-to-connect-all-points" },
    { id: 743, title: "Network Delay Time", difficulty: "Medium", slug: "network-delay-time" },
    { id: 778, title: "Swim in Rising Water", difficulty: "Hard", slug: "swim-in-rising-water" },
  ],
  "1D DP": [
    { id: 70, title: "Climbing Stairs", difficulty: "Easy", slug: "climbing-stairs" },
    { id: 198, title: "House Robber", difficulty: "Medium", slug: "house-robber" },
    { id: 322, title: "Coin Change", difficulty: "Medium", slug: "coin-change" },
    { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", slug: "longest-palindromic-substring" },
    { id: 91, title: "Decode Ways", difficulty: "Medium", slug: "decode-ways" },
  ],
  "2D DP": [
    { id: 62, title: "Unique Paths", difficulty: "Medium", slug: "unique-paths" },
    { id: 1143, title: "Longest Common Subsequence", difficulty: "Medium", slug: "longest-common-subsequence" },
    { id: 309, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", slug: "best-time-to-buy-and-sell-stock-with-cooldown" },
    { id: 72, title: "Edit Distance", difficulty: "Hard", slug: "edit-distance" },
    { id: 312, title: "Burst Balloons", difficulty: "Hard", slug: "burst-balloons" },
  ],
  "Math & Geometry": [
    { id: 48, title: "Rotate Image", difficulty: "Medium", slug: "rotate-image" },
    { id: 54, title: "Spiral Matrix", difficulty: "Medium", slug: "spiral-matrix" },
    { id: 73, title: "Set Matrix Zeroes", difficulty: "Medium", slug: "set-matrix-zeroes" },
    { id: 202, title: "Happy Number", difficulty: "Easy", slug: "happy-number" },
  ],
  "Bit Manipulation": [
    { id: 136, title: "Single Number", difficulty: "Easy", slug: "single-number" },
    { id: 191, title: "Number of 1 Bits", difficulty: "Easy", slug: "number-of-1-bits" },
    { id: 338, title: "Counting Bits", difficulty: "Easy", slug: "counting-bits" },
    { id: 268, title: "Missing Number", difficulty: "Easy", slug: "missing-number" },
  ]
};

const LinkConnector = ({ horizontal = false }: { horizontal?: boolean }) => (
  <div className={`flex items-center justify-center ${horizontal ? "w-8 h-0 opacity-50" : "h-10 w-full"}`}>
    {horizontal ? (
      <div className="w-full h-0.5 bg-zinc-700/50" />
    ) : (
      <ArrowDown className="text-zinc-700/50 w-6 h-6 animate-pulse" />
    )}
  </div>
);

export default function NeetCodeRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const Node = ({ title, status }: { title: string, status?: "done" | "current" | "locked" }) => {
    const borderColor = status === "done" ? "border-[#00b8a3]" : status === "current" ? "border-[#FFA116]" : "border-zinc-800";
    const bgHover = "hover:border-[#FFA116] hover:bg-zinc-800/80 cursor-pointer shadow-xl hover:shadow-[#FFA116]/20";
    
    return (
      <div 
        onClick={() => setSelectedTopic(title)}
        className={`w-36 sm:w-44 bg-[#1e1e1e] border-2 ${borderColor} ${bgHover} transition-all rounded-xl p-4 text-center relative flex flex-col items-center justify-center min-h-[64px] z-10 group`}
      >
        <span className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-[#FFA116] transition-colors">{title}</span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-black px-4 py-16 font-sans flex flex-col items-center relative overflow-hidden">
      
      {/* Background radial gradient to make it pop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FFA116]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Algorithmic Roadmap</h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
          A directed graph of the top algorithms and data structures. Click any node to instantly view the curated problem list for that topic.
        </p>
      </div>

      {/* Main Tree Container */}
      <div className="relative flex flex-col items-center w-full max-w-5xl mx-auto overflow-x-auto pb-24 z-10">
        
        {/* Layer 1 */}
        <div className="flex flex-col items-center">
          <Node title="Arrays & Hashing" status="done" />
          <LinkConnector />
        </div>

        {/* Layer 2 */}
        <div className="flex items-center gap-4 sm:gap-12 relative w-full justify-center">
          <div className="flex flex-col items-center">
            <Node title="Two Pointers" status="done" />
            <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
             <Node title="Stack" status="current" />
             <LinkConnector />
          </div>
        </div>

        {/* Layer 3 */}
        <div className="flex items-center gap-4 sm:gap-8 relative w-full justify-center px-4 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col items-center">
            <Node title="Binary Search" status="current" />
            <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
            <Node title="Sliding Window" status="current" />
            <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
            <Node title="Linked List" status="locked" />
            <LinkConnector />
          </div>
        </div>

        {/* Layer 4 */}
        <div className="flex items-center gap-12 relative w-full justify-center">
          <div className="flex flex-col items-center">
            <Node title="Trees" status="locked" />
            <LinkConnector />
          </div>
        </div>

        {/* Layer 5 */}
        <div className="flex items-center gap-4 sm:gap-16 relative w-full justify-center">
          <div className="flex flex-col items-center">
             <Node title="Tries" status="locked" />
             <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
             <Node title="Backtracking" status="locked" />
             <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
             <Node title="Heap / Priority Queue" status="locked" />
             <LinkConnector />
          </div>
        </div>

        {/* Layer 6 */}
        <div className="flex items-center gap-4 sm:gap-12 relative w-full justify-center">
          <div className="flex flex-col items-center">
             <Node title="Graphs" status="locked" />
             <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
             <Node title="1D DP" status="locked" />
             <LinkConnector />
          </div>
        </div>

        {/* Layer 7 */}
        <div className="flex items-center gap-4 sm:gap-24 relative w-full justify-center">
          <div className="flex flex-col items-center">
             <Node title="Advanced Graphs" status="locked" />
             <LinkConnector />
          </div>
          <div className="flex flex-col items-center">
             <Node title="2D DP" status="locked" />
             <LinkConnector />
          </div>
        </div>

        {/* Layer 8 */}
        <div className="flex items-center gap-8 relative w-full justify-center pb-12">
          <div className="flex flex-col items-center">
             <Node title="Math & Geometry" status="locked" />
          </div>
          <div className="flex flex-col items-center">
             <Node title="Bit Manipulation" status="locked" />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-zinc-900/40">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFA116]" />
                {selectedTopic}
              </h2>
              <button 
                onClick={() => setSelectedTopic(null)} 
                className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body: Problems List */}
            <div className="px-3 py-3 max-h-[60vh] overflow-y-auto space-y-1.5 custom-scrollbar">
              {roadmapData[selectedTopic] ? (
                roadmapData[selectedTopic].map((prob) => {
                  const diffColor = prob.difficulty === 'Easy' ? 'text-[#00b8a3]' : prob.difficulty === 'Medium' ? 'text-[#ffc01e]' : 'text-[#ff375f]';
                  return (
                    <Link 
                      key={prob.id} 
                      href={`https://leetcode.com/problems/${prob.slug}/`} 
                      target="_blank" 
                      onClick={() => setSelectedTopic(null)} // Optionally close modal on click
                      className="flex items-center justify-between p-4 hover:bg-zinc-800/50 rounded-xl transition-all group border border-transparent hover:border-zinc-700/50"
                    >
                      <div className="flex flex-col pr-4">
                        <span className="text-zinc-200 font-medium group-hover:text-white transition-colors">{prob.id}. {prob.title}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-xs font-medium tracking-wide ${diffColor}`}>{prob.difficulty}</span>
                        <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-[#FFA116]/10 transition-colors">
                          <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[#FFA116]" />
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-zinc-500 text-center py-10 flex flex-col items-center">
                  <span className="text-3xl mb-3">🧩</span>
                  <p className="text-sm">Problem list for this category is being curated.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Click outside to close (handled by wrapping div if we add an onClick, but currently using X button to be safe) */}
        </div>
      )}

      {/* Global styles for custom scrollbar in modal */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
      `}} />

    </div>
  );
}
