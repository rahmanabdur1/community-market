export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DST";

export type ScoringFormat = "standard" | "ppr" | "half-ppr";

export interface Player {
  id: string;
  rank: number;
  name: string;
  position: Position;
  team: string; // e.g. "KC"
  bye: number;
  projPts?: number; // absent when locked
  isLocked?: boolean; // if projections are paywalled/locked
  headshot?: string; // optional image path
}

export interface TrendItem {
  id: string;
  name: string;
  team: string; // e.g. "GB"
  position: Position;
  deltaPct: number; // positive for up, negative for down
  headshot?: string;
}

export interface PlayersPayload {
  players: Player[];
  trendingUp: TrendItem[];
  trendingDown: TrendItem[];
}
