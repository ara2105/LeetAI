import { NextResponse } from 'next/server';
import type { LeetCodeData, ProfileAnalysis } from '@/types';

// The exact GraphQL query to get difficulty counts and topic tags
const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum { difficulty count }
      }
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
      }
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // 1. Fetch data from LeetCode GraphQL API
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: LEETCODE_GRAPHQL_QUERY,
        variables: { username }
      })
    });

    const leetcodeJson = await response.json();

    if (!leetcodeJson.data || !leetcodeJson.data.matchedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Parse and map to our Data Model
    const userData = parseLeetCodeResponse(username, leetcodeJson.data.matchedUser);

    // 3. Generate Pros, Cons, and Roadmap
    const analysis = generateAnalysis(userData);

    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Failed to fetch LeetCode data:", error);
    return NextResponse.json({ error: 'Failed to analyze profile' }, { status: 500 });
  }
}

// --- Core Helper Functions ---

function parseLeetCodeResponse(username: string, matchedUser: any): LeetCodeData {
  const difficultyMap: Record<string, number> = { easy: 0, medium: 0, hard: 0, all: 0 };
  const topicTags: Record<string, number> = {};

  // Extract difficulty counts
  if (matchedUser.submitStats && matchedUser.submitStats.acSubmissionNum) {
    matchedUser.submitStats.acSubmissionNum.forEach((stat: any) => {
      difficultyMap[stat.difficulty.toLowerCase()] = stat.count;
    });
  }

  // Extract topic tag counts
  const tags = matchedUser.tagProblemCounts || {};
  ['fundamental', 'intermediate', 'advanced'].forEach(level => {
    if (tags[level]) {
      tags[level].forEach((tag: any) => {
        topicTags[tag.tagName] = tag.problemsSolved;
      });
    }
  });

  return {
    username,
    totalSolved: difficultyMap['all'],
    difficulty: {
      easy: difficultyMap['easy'],
      medium: difficultyMap['medium'],
      hard: difficultyMap['hard']
    },
    topicTags
  };
}

function generateAnalysis(data: LeetCodeData): ProfileAnalysis {
  const pros: string[] = [];
  const cons: string[] = [];
  const roadmap: ProfileAnalysis['roadmap'] = [];

  // --- Analytical Logic ---

  // Analyze Difficulty
  if (data.difficulty.hard > 50) {
    pros.push("Demonstrates strong proficiency in Hard level algorithmic patterns.");
  } else if (data.difficulty.medium > 100 && data.difficulty.hard < 10) {
    cons.push("High completion of Medium problems, but lacks exposure to Hard difficulty patterns.");
    roadmap.push({
      focusTopic: "Hard Level Mixed",
      targetQuestions: 15,
      reasoning: "Transition from Medium to Hard to crack top-tier interviews."
    });
  }

  // Analyze Topics
  const dpCount = data.topicTags["Dynamic Programming"] || 0;
  const graphCount = (data.topicTags["Graph"] || 0) + (data.topicTags["Depth-First Search"] || 0);
  const arrayCount = (data.topicTags["Array"] || 0) + (data.topicTags["Hash Table"] || 0);

  if (arrayCount > 50) {
    pros.push(`Solid mastery of fundamental data structures (Arrays & Hashing) (${arrayCount} solved).`);
  }

  if (dpCount > 40) {
    pros.push(`Strong foundation in Dynamic Programming (${dpCount} solved).`);
  } else if (dpCount < 10) {
    cons.push("Limited experience with Dynamic Programming patterns.");
    roadmap.push({
      focusTopic: "Dynamic Programming (1D & 2D)",
      targetQuestions: 20,
      reasoning: "DP is a highly common pattern in high-paying tech interviews."
    });
  }

  if (graphCount < 10) {
    cons.push("Requires further practice in Graph traversal algorithms (DFS/BFS).");
    roadmap.push({
      focusTopic: "Graph Traversals",
      targetQuestions: 15,
      reasoning: "Essential for solving complex matrix and relationship problems."
    });
  }

  // Edge Case Handling for complete beginners
  if (data.totalSolved < 20) {
    cons.push("Sample size too small for comprehensive profile assessment.");
    roadmap.push({
      focusTopic: "Arrays & Strings (The Basics)",
      targetQuestions: 30,
      reasoning: "Build the foundational habits required to tackle medium/hard patterns."
    });
  }

  // Ensure arrays aren't empty for UI defaults if nothing matches
  if (pros.length === 0) pros.push("Continue practicing across diverse topics to establish core strengths.");
  if (cons.length === 0 && data.totalSolved >= 20) cons.push("Well-balanced skill distribution with no significant algorithmic gaps.");

  return {
    stats: data,
    performance: { pros, cons },
    roadmap
  };
}
