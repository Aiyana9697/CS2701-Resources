import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle: string;
  userName: string;
  userEmail: string;
  icon: LucideIcon;
}

export function TopBar({ title, subtitle, userName, userEmail, icon: Icon }: TopBarProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-[#071821]/95 backdrop-blur-xl border-b border-cyan-500/20 px-8 py-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white">{title}</h1>
          <p className="text-slate-400 text-sm">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-white">{userName}</p>
            <p className="text-xs text-slate-400">{userEmail}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
