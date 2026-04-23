// Local types (no longer using Supabase)

export type LocalUser = {
  id?: string;
  name: string;
  email: string;
  team: string;
  isVerified?: boolean;
};

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
  team: string;
};

export type TeamUser = {
  id: string;
  name: string;
  email: string;
  team: string;
};
