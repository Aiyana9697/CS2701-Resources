/*
UI component for rendering a tabbed interface which allows switching between different views or content sections
each tab has:
- a trigger (tab button) that can be clicked to switch to that tab
- content that is displayed when the tab is active
*/
import React, { useState, createContext, useContext } from "react";

/*
defines the context type used to manage currently selected tab and a function that updates the selected tab
*/
type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};

/* 
creates a React context to hold the current tab value and function to update it
*/
const TabsContext = createContext<TabsContextType | null>(null);

/*
defines the main Tabs component that wraps the entire tab interface
accepts:
- defaultValue prop to set the initially selected tab (default is empty string)
- children elements representing the tab triggers and content
- className for custom styling
- other props to be passed down to the main div element

a state variable 'value' is created to track the currently selected tab
the TabsContext.Provider is used to provide the current tab value and function to update it to all child components
the main div container wraps the children elements and applies any custom class names and props
*/
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

/*
defines a container that holds all tab triggers (buttons)
accepts:
- children elements representing individual tab triggers
- className for custom styling
- other props to be passed down to the div element

the div element applies flex layout to arrange the tab triggers horizontally with gaps between them
accepts className prop for additional custom styling and other props to be passed down to the tab list element
children elements (tab triggers) are rendered inside the div
*/
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

/*
defines the individual tab trigger component (button) that users click to switch between tabs
accepts:
- value prop to identify which tab this trigger belongs to
- children elements to be displayed inside the button
- className for custom styling
- other props to be passed down to the button element

typescript type information describes the type of props accepted by the component
the TabsContext function is called uponto access the current selected tab value and function to update it
an error is thrown if the TabsTrigger is used outside of a Tabs component

the 2 variables 'value' and 'setValue' are extracted from the context (value renamed to 'current' to avoid naming conflict)
the current tab is compared to the trigger's value to determine if it is active, active is set to true if they match else false 

when the button is clicked, setValue is called to update the currently selected tab which allows tabs to be switched 
                        
for the active tab, the button has a cyan background, border and text
for inactive tabs, the button has a ligher background, border and hover effect 
this visually shows which tab is selected
*/
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

/*
defines the content displayed for a specific tab 
accepts:
- value prop to identify which tab this content belongs to
- children elements representing the actual content being shown
- className for custom styling
- other props to be passed down to the button element

typescript type information describes the type of props accepted by the component
the TabsContext function is called up onto access current tab value from the context
an error is thrown if the TabsContent is used outside of a Tabs component

the current active tab 'current' is compared to this panels 'value'
if they dont match, the component returns null and nothing is rendered 
if they match, a div element with the content is rendered
*/
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
