import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, ChevronRight, Tag } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../constants/blogData';

interface BlogProps {
  onBack: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="post"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-3xl mx-auto"
        >
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-txt-secondary hover:text-ink transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Articles
          </button>

          <div className="h-72 rounded-3xl overflow-hidden mb-10">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-ink text-paper text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              {selectedPost.category}
            </span>
            <span className="text-txt-muted text-sm flex items-center gap-1.5 font-medium">
              <Clock size={14} /> {selectedPost.readTime}
            </span>
            <span className="text-txt-muted text-sm font-medium">{selectedPost.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-black text-ink mb-8 leading-tight tracking-tight">
            {selectedPost.title}
          </h1>

          <div className="prose max-w-none">
            {selectedPost.content.trim().split('\n').map((para, idx) =>
              para.trim() ? (
                <p key={idx} className="text-txt-secondary font-body leading-relaxed mb-4 text-lg">
                  {para.trim()}
                </p>
              ) : null
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-ink tracking-tight mb-3">
            Local Insights
          </h2>
          <p className="text-txt-secondary font-body text-lg">
            Deep dives into the Montgomery economy and emerging business trends.
          </p>
        </div>
        <button
          onClick={onBack}
          className="hidden md:flex items-center gap-2 text-sm font-bold text-txt-secondary hover:text-ink transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Advisor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer bg-white rounded-[32px] border border-border-mgm overflow-hidden flex flex-col hover:shadow-xl hover:shadow-ember/5 transition-all duration-500"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-ink text-paper text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                  <Tag size={10} /> {post.category}
                </span>
                <span className="text-txt-muted text-[10px] font-medium flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-ink mb-3 group-hover:text-ember transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-sm text-txt-secondary mb-6 font-body leading-relaxed flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-txt-muted text-xs font-medium">{post.date}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-ink uppercase tracking-widest group-hover:text-ember transition-colors">
                  Read More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-4 md:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-txt-secondary hover:text-ink transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Advisor
        </button>
      </div>
    </motion.div>
  );
};
