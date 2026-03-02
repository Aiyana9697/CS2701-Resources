import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-4 border border-cyan-500/30">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 bg-slate-950/50 border-cyan-400/30 text-white placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
