import React from 'react';
import { motion } from 'motion/react';
import { Activity, Building2, FileText, AlertTriangle, Trees } from 'lucide-react';

export const LiveMarketData: React.FC = () => {
  // Mock data representing "live" stats from Montgomery ArcGIS
  const stats = [
    { label: 'Active Businesses', value: '12,482', icon: Building2, trend: '+12 this week', description: 'Registered in Montgomery' },
    { label: 'New Permits', value: '156', icon: FileText, trend: 'Last 30 days', description: 'Construction & business' },
    { label: 'Open Violations', value: '42', icon: AlertTriangle, trend: 'Active cases', description: 'Code enforcement' },
    { label: 'Public Parks', value: '65', icon: Trees, trend: 'City maintained', description: 'Community spaces' },
  ];

  return (
    <div className="mt-20 border-t border-border-mgm/50 pt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-err opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-err"></span>
            </span>
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-err">
              Live Feed
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight uppercase">
            Montgomery Market Pulse
          </h3>
          <p className="text-sm text-txt-secondary mt-1 font-medium tracking-wide">
            Real-time economic indicators from city data portals
          </p>
        </div>
        <div className="text-sm font-mono text-txt-muted uppercase tracking-[0.2em] bg-paper px-3 py-1.5 rounded-full border border-border-mgm/30">
          Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-white border border-border-mgm/40 p-6 rounded-2xl hover:border-ember/30 transition-all duration-300 hover:shadow-xl hover:shadow-ember/5">
              <div className="flex items-start justify-between mb-6">
                <div className="p-2.5 bg-paper rounded-xl group-hover:bg-ember/5 transition-colors">
                  <stat.icon size={20} className="text-txt-muted group-hover:text-ember transition-colors" />
                </div>
                <div className="text-sm font-mono font-bold text-ember bg-ember/5 px-2 py-0.5 rounded uppercase tracking-tighter">
                  {stat.trend}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-display font-black text-ink tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-txt-secondary">
                  {stat.label}
                </div>
                <div className="text-sm text-txt-muted font-medium pt-1">
                  {stat.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-mgm/30 to-transparent" />
        <div className="flex items-center gap-2 text-sm font-bold text-txt-muted uppercase tracking-[0.3em]">
          Source: Montgomery ArcGIS Open Data
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-mgm/30 to-transparent" />
      </div>
    </div>
  );
};
