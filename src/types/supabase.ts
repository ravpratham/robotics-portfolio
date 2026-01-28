export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      assignments: {
        Row: {
          id: number;
          created_at: string;
          title: string;
          description: string | null;
          section: string;
          content: string | null;
          youtube_url: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title: string;
          description?: string | null;
          section: string;
          content?: string | null;
          youtube_url?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string;
          description?: string | null;
          section?: string;
          content?: string | null;
          youtube_url?: string | null;
        };
      };
    };
  };
}

export type Assignment = Database['public']['Tables']['assignments']['Row'];

