export interface SeoOptions {
  title: string;
  description?: string | null; // null = remove tag
  keywords?: string | null;
  ogTitle?: string | null;
  // you can extend with og:description, twitter:card, etc.
}