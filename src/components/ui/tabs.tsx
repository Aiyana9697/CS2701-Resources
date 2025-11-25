import React, { useState, createContext, useContext } from "react";

type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export function Tabs({
  defaultValue = "",
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={`flex flex-wrap gap-2 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className = "",
  ...props
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("TabsTrigger must be used inside <Tabs>");
  }
  const { value: current, setValue } = ctx;
  const active = current === value;

  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => setValue(value)}
      className={`px-3 py-2 rounded-md border transition-colors text-sm font-medium
        ${
          active
            ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200"
            : "bg-white/5 border-white/10 text-blue-100 hover:bg-white/10"
        }
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className = "",
  ...props
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("TabsContent must be used inside <Tabs>");
  }
  const { value: current } = ctx;
  if (current !== value) return null;

  return (
    <div role="tabpanel" className={`py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
