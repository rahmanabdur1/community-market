export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DST";

export type ScoringFormat = "standard" | "ppr" | "half-ppr";

export interface Player {
  id: string;
  rank: number;
  name: string;
  position: Position;
  team: string; 
  bye: number;
  projPts?: number; 
  isLocked?: boolean; 
  headshot?: string; 
}

export interface TrendItem {
  id: string;
  name: string;
  team: string; 
  position: Position;
  deltaPct: number; 
  headshot?: string;
}

export interface PlayersPayload {
  players: Player[];
  trendingUp: TrendItem[];
  trendingDown: TrendItem[];
}
