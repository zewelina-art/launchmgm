import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../constants/blogData';

interface BlogProps {
  onBack: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onBack }) => {
  return (
    <div className="space-y-10">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-ember transition-colors">
        <ArrowLeft size={16} />
        Back to Advisor
      </button>

      <header className="space-y-3">
        <h2 className="text-4xl md:text-5xl font-display font-black text-ink tracking-tight">LaunchMGM Blog</h2>
        <p className="text-lg text-txt-secondary max-w-2xl">Insights on local trends, practical startup guidance, and funding options in Montgomery.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="bg-white rounded-3xl border border-border-mgm overflow-hidden hover:shadow-xl transition-all">
            <img src={post.image} alt={post.title} className="w-full h-52 object-cover" referrerPolicy="no-referrer" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-ink text-paper text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{post.category}</span>
                <span className="text-txt-muted text-xs font-medium flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-ink mb-2">{post.title}</h3>
              <p className="text-sm text-txt-muted mb-3">{post.date}</p>
              <p className="text-txt-secondary leading-relaxed">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
