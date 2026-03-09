import React from 'react';
import { motion } from 'motion/react';
import { Building2, FileText, AlertTriangle, Trees } from 'lucide-react';

export const LiveMarketData: React.FC = () => {
  const stats = [
    { label: 'Active Businesses', value: '12,482', icon: Building2, trend: '+12 this week', description: 'Registered in Montgomery' },
    { label: 'New Permits', value: '156', icon: FileText, trend: 'Last 30 days', description: 'Construction and business' },
    { label: 'Open Violations', value: '42', icon: AlertTriangle, trend: 'Active cases', description: 'Code enforcement' },
    { label: 'Public Parks', value: '65', icon: Trees, trend: 'City maintained', description: 'Community spaces' },
  ];

  return (
    <div className="mt-20 border-t border-border-mgm/60 pt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 bg-gradient-to-r from-[#118AB2]/10 via-[#06D6A0]/10 to-[#FFD60A]/10 border border-border-mgm/70 rounded-3xl px-6 py-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ember" />
            </span>
            <span className="text-sm font-medium tracking-[0.28em] uppercase text-ember">Live Feed</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-display text-ink mb-3 tracking-tight uppercase">Montgomery Market Pulse</h3>
          <p className="text-base text-txt-secondary mt-1 font-medium tracking-wide">Real-time economic indicators from city data portals</p>
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
            <div className="bg-white border-2 border-border-mgm/80 p-6 rounded-3xl transition-all duration-300 group-hover:border-ember/60 group-hover:shadow-xl group-hover:shadow-ember/10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-[#118AB2]/10 rounded-2xl transition-colors group-hover:bg-[#118AB2]/20">
                  <stat.icon size={22} className="text-[#118AB2] transition-colors" />
                </div>
                <div className="text-xs font-medium text-ink bg-[#FFD60A]/35 px-2.5 py-1 rounded-full uppercase tracking-wide">{stat.trend}</div>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-display text-ink tracking-tight">{stat.value}</div>
                <div className="text-sm font-medium uppercase tracking-[0.14em] text-ink">{stat.label}</div>
                <div className="text-sm text-txt-secondary font-medium pt-1">{stat.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
