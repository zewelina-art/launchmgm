export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '0',
    title: 'Montgomery Market Pulse: Spring 2026',
    excerpt:
      'A deep dive into the latest economic trends, consumer behavior, and emerging business opportunities in the River Region.',
    content:
      'As we enter Spring 2026, the local economy is showing resilience. Demand is increasing for practical services, neighborhood-focused offerings, and fast-turnaround support businesses.',
    category: 'Market Pulse',
    readTime: '6 min read',
    date: 'March 8, 2026',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '1',
    title: 'Scaling Your Micro-Business in Montgomery',
    excerpt:
      'Learn how to take your small operation to the next level using local resources and community support.',
    content:
      'Growth in Montgomery requires combining local partnerships, neighborhood trust, and a simple digital presence. Focus on consistency and repeatable service quality.',
    category: 'Growth',
    readTime: '5 min read',
    date: 'March 5, 2026',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Navigating Local Grants and Micro-loans',
    excerpt:
      'A guide to finding and applying for small business funding available for Alabama residents.',
    content:
      'Funding programs in Montgomery often prioritize practical ventures with local impact. Start with clear cost estimates, simple milestones, and realistic revenue assumptions.',
    category: 'Finance',
    readTime: '8 min read',
    date: 'March 1, 2026',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Marketing on a Shoestring Budget',
    excerpt:
      'How to get the word out about your venture without breaking the bank.',
    content:
      'Use local groups, partner cross-promotion, before-and-after examples, and referrals. Simple content and clear offers often outperform expensive ads at early stage.',
    category: 'Marketing',
    readTime: '4 min read',
    date: 'Feb 25, 2026',
    image:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
  },
];
