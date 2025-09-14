import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Bug = {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Critical';
  expected_outcome: string | null;
  actual_outcome: string | null;
  problem_identified: string | null;
  status: 'Open' | 'In Progress' | 'Testing' | 'Resolved' | 'Closed';
  resolution: string | null;
  tags: string[];
  images: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
};