export interface Assignment {
  id: number;
  title: string;
  description: string;
  section: string;
  content?: string; // Rich content for the detail page
  youtubeUrl?: string; // YouTube video URL for embedding
}
