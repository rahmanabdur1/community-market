export type TopNewsKind =
  | "Fantasy"
  | "Trade"
  | "Rumors"
  | "Draft"
  | "Stats"
  | "Predictions"
  | "Buzz";

export interface TopNewsItemData {
  id: string;
  title: string; // main head (bold)
  trailing?: string; // grey trailing copy e.g., "Released by ..."
  league: string; // e.g., "NFL"
  location: string; // e.g., "New York, Giants"
  teamLogo: string; // /public or remote
  href: string; // link to full story
  kind: TopNewsKind; // filter bucket
  timeAgo?: string; // optional relative time to show after location
}
