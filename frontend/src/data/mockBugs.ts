export interface Bug {
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
}

export const mockBugs: Bug[] = [
  {
    id: '1',
    title: 'Login button not responding on mobile devices',
    description: 'Users are unable to click the login button on mobile devices. The button appears to be unresponsive to touch events.',
    difficulty: 'Critical',
    expected_outcome: 'Login button should respond to touch events and allow users to authenticate',
    actual_outcome: 'Button does not respond to touch, preventing user authentication',
    problem_identified: 'CSS touch-action property is set to none, blocking touch events',
    status: 'In Progress',
    resolution: null,
    tags: ['mobile', 'authentication', 'ui'],
    images: ['https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg'],
    is_favorite: true,
    created_at: '2025-01-13T10:30:00Z',
    updated_at: '2025-01-13T14:20:00Z',
    created_by: 'user1'
  },
  {
    id: '2',
    title: 'Dashboard loading performance issue',
    description: 'The main dashboard takes over 10 seconds to load, causing poor user experience.',
    difficulty: 'Hard',
    expected_outcome: 'Dashboard should load within 2-3 seconds',
    actual_outcome: 'Dashboard takes 10+ seconds to load completely',
    problem_identified: 'Multiple unnecessary API calls and large unoptimized images',
    status: 'Open',
    resolution: null,
    tags: ['performance', 'dashboard', 'api'],
    images: ['https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'],
    is_favorite: false,
    created_at: '2025-01-12T09:15:00Z',
    updated_at: '2025-01-12T09:15:00Z',
    created_by: 'user2'
  },
  {
    id: '3',
    title: 'Email notifications not being sent',
    description: 'Users are not receiving email notifications for important updates and alerts.',
    difficulty: 'Medium',
    expected_outcome: 'Email notifications should be sent within 5 minutes of trigger events',
    actual_outcome: 'No email notifications are being sent to users',
    problem_identified: 'SMTP configuration error in production environment',
    status: 'Resolved',
    resolution: 'Updated SMTP settings and verified email service configuration. All notifications are now working correctly.',
    tags: ['email', 'notifications', 'smtp'],
    images: [],
    is_favorite: true,
    created_at: '2025-01-11T16:45:00Z',
    updated_at: '2025-01-13T11:30:00Z',
    created_by: 'user1'
  },
  {
    id: '4',
    title: 'Search functionality returns incorrect results',
    description: 'The search feature is returning irrelevant results and missing exact matches.',
    difficulty: 'Medium',
    expected_outcome: 'Search should return relevant results with exact matches prioritized',
    actual_outcome: 'Search returns irrelevant results and misses exact matches',
    problem_identified: 'Search algorithm needs improvement and indexing issues',
    status: 'Testing',
    resolution: 'Implemented new search algorithm with better indexing and relevance scoring',
    tags: ['search', 'algorithm', 'indexing'],
    images: ['https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg'],
    is_favorite: false,
    created_at: '2025-01-10T14:20:00Z',
    updated_at: '2025-01-13T09:45:00Z',
    created_by: 'user3'
  },
  {
    id: '5',
    title: 'File upload fails for large files',
    description: 'Users cannot upload files larger than 5MB, receiving timeout errors.',
    difficulty: 'Easy',
    expected_outcome: 'Files up to 50MB should upload successfully',
    actual_outcome: 'Files over 5MB fail with timeout errors',
    problem_identified: 'Server timeout configuration too low for large file uploads',
    status: 'Closed',
    resolution: 'Increased server timeout limits and implemented chunked upload for large files',
    tags: ['upload', 'files', 'timeout'],
    images: [],
    is_favorite: false,
    created_at: '2025-01-09T11:10:00Z',
    updated_at: '2025-01-11T15:20:00Z',
    created_by: 'user2'
  },
  {
    id: '6',
    title: 'Dark mode toggle not persisting',
    description: 'When users toggle dark mode, the preference is not saved and resets on page refresh.',
    difficulty: 'Easy',
    expected_outcome: 'Dark mode preference should persist across sessions',
    actual_outcome: 'Dark mode resets to light mode on page refresh',
    problem_identified: 'Theme preference not being saved to localStorage',
    status: 'Open',
    resolution: null,
    tags: ['ui', 'theme', 'localStorage'],
    images: ['https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg'],
    is_favorite: true,
    created_at: '2025-01-13T08:30:00Z',
    updated_at: '2025-01-13T08:30:00Z',
    created_by: 'user1'
  },
  {
    id: '7',
    title: 'API rate limiting causing 429 errors',
    description: 'Multiple users are experiencing 429 Too Many Requests errors during peak hours.',
    difficulty: 'Critical',
    expected_outcome: 'API should handle expected load without rate limiting legitimate users',
    actual_outcome: 'Users getting blocked with 429 errors during normal usage',
    problem_identified: 'Rate limiting thresholds set too low for current user base',
    status: 'In Progress',
    resolution: null,
    tags: ['api', 'rate-limiting', 'performance'],
    images: ['https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'],
    is_favorite: false,
    created_at: '2025-01-12T13:45:00Z',
    updated_at: '2025-01-13T10:15:00Z',
    created_by: 'user3'
  },
  {
    id: '8',
    title: 'Chart data not updating in real-time',
    description: 'Analytics charts are showing stale data and not updating automatically.',
    difficulty: 'Medium',
    expected_outcome: 'Charts should update every 30 seconds with fresh data',
    actual_outcome: 'Charts show outdated data and require manual refresh',
    problem_identified: 'WebSocket connection for real-time updates is not properly established',
    status: 'Open',
    resolution: null,
    tags: ['charts', 'real-time', 'websocket'],
    images: [],
    is_favorite: false,
    created_at: '2025-01-11T12:20:00Z',
    updated_at: '2025-01-11T12:20:00Z',
    created_by: 'user2'
  }
];