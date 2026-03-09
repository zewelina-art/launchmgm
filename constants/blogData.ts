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
    excerpt: 'A deep dive into the latest economic trends, consumer behavior, and emerging business opportunities in the River Region.',
    content: `
      Welcome to the first edition of the Montgomery Market Pulse. As we enter Spring 2026, the local economy is showing remarkable resilience and evolution.
      
      Key Trends:
      1. Tech Integration: Small businesses in downtown Montgomery are increasingly adopting AI-driven customer service tools to compete with national chains.
      2. Sustainable Services: There's a 15% increase in 311 requests related to green space maintenance and eco-friendly waste solutions, signaling a gap for new sustainable service providers.
      3. Tourism Surge: With new investments in the Civil Rights trail, hospitality-adjacent micro-businesses (like boutique tour guides and local craft vendors) are seeing record interest.
      
      Opportunity Spotlight:
      The Maxwell AFB area continues to be a hub for logistics and specialized technical support. If you have skills in equipment repair or specialized cleaning, this is your time.
    `,
    category: 'Market Pulse',
    readTime: '6 min read',
    date: 'March 8, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '1',
    title: 'Scaling Your Micro-Business in Montgomery',
    excerpt: 'Learn how to take your small operation to the next level using local resources and community support.',
    content: `
      Growing a business in Montgomery requires a unique blend of digital strategy and local community engagement. 
      First, leverage the Montgomery Chamber of Commerce resources. They offer networking events that are crucial for B2B growth.
      Second, consider the "Shop Local" movement which is very strong in neighborhoods like Cloverdale and Cottage Hill.
      Third, optimize your digital presence. Even a micro-business needs a Google Business Profile to show up in local searches.
    `,
    category: 'Growth',
    readTime: '5 min read',
    date: 'March 5, 2026',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Navigating Local Grants and Micro-loans',
    excerpt: 'A comprehensive guide to finding and applying for small business funding specifically available for Alabama residents.',
    content: `
      Funding is often the biggest hurdle for new entrepreneurs. In Montgomery, several micro-loan programs target specific neighborhoods.
      The Alabama Small Business Development Center (SBDC) provides free counseling to help you prepare your financial statements.
      Don't overlook community-based grants which often have less competition than federal programs.
    `,
    category: 'Finance',
    readTime: '8 min read',
    date: 'March 1, 2026',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Marketing on a Shoestring Budget',
    excerpt: 'How to get the word out about your new venture without breaking the bank.',
    content: `
      You don't need a massive ad budget to find customers in Montgomery. 
      Start with community boards in local coffee shops and libraries. 
      Use Facebook Groups dedicated to Montgomery residents to share your story—not just your products.
      Partnerships with other local businesses can double your reach for zero cost.
    `,
    category: 'Marketing',
    readTime: '4 min read',
    date: 'Feb 25, 2026',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
  }
];
