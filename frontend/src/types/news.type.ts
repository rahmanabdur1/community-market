export type NewsCategory =
  | "Breaking"
  | "Trending"
  | "Injury"
  | "Analysis"
  | "Rumor";

export interface NewsAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  category?: NewsCategory;
  image: string; // /public or remote (configure next.config if remote)
  publishedAt: string; // ISO timestamp
  author: NewsAuthor;
  href: string;
  mediaType?: "article" | "video"; // for future use
  isTrending?: boolean; // for future use
}

export interface NewsPayload {
  hero: NewsItem; // big story
  rail: NewsItem[]; // right column list
}
