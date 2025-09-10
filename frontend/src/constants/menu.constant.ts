import { NavItem } from "@/types/menu.type";

export const NAV: NavItem[] = [
  {
    label: "Leagues",
    children: [
      { label: "My Leagues", href: "/leagues" },
      { label: "Create League", href: "/leagues/create", badge: "New" },
      { label: "Public Lobbies", href: "/leagues/lobbies" },
    ],
  },
  {
    label: "Draft",
    mega: [
      {
        title: "Simulators",
        items: [
          { label: "Mock Draft (Snake)", href: "/draft/mock/snake" },
          { label: "Mock Draft (Auction)", href: "/draft/mock/auction" },
          { label: "Best Ball", href: "/draft/best-ball" },
        ],
      },
      {
        title: "Tools",
        items: [
          { label: "Rankings", href: "/tools/rankings" },
          { label: "ADP Trends", href: "/tools/adp" },
          { label: "Trade Analyzer", href: "/tools/trades" },
          { label: "Stack Finder", href: "/tools/stack" },
        ],
      },
      {
        title: "Knowledge",
        items: [
          { label: "Draft Strategy", href: "/learn/strategy" },
          { label: "Glossary", href: "/learn/glossary" },
          { label: "Beginner Guide", href: "/learn/beginner" },
        ],
      },
    ],
  },
  {
    label: "News",
    children: [
      { label: "Player News", href: "/news/players" },
      { label: "Injuries", href: "/news/injuries" },
      { label: "Waiver Wire", href: "/news/waivers" },
    ],
  },
  {
    label: "Stats",
    mega: [
      {
        title: "NFL",
        items: [
          { label: "Live Scores", href: "/nfl/live" },
          { label: "Teams & Depth Charts", href: "/nfl/teams" },
          { label: "Schedules", href: "/nfl/schedules" },
        ],
      },
      {
        title: "Research",
        items: [
          { label: "Projections", href: "/stats/projections" },
          { label: "Advanced Splits", href: "/stats/splits" },
          { label: "Red Zone", href: "/stats/redzone" },
        ],
      },
    ],
  },
  {
    label: "Articles",
    children: [
      { label: "Analysis", href: "/articles/analysis" },
      { label: "DFS", href: "/articles/dfs" },
      { label: "Betting", href: "/articles/betting" },
    ],
  },
];
