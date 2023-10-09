import { ReactNode, createContext, useContext, useState } from "react";

// Define the props
type SidebarState = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
};

type SidebarContextProviderProps = {
  children: ReactNode;
};

// 1. Create a context with SidebarState and initialize it with default values
const SidebarContext = createContext<SidebarState | undefined>(undefined);

export const SidebarContextProvider = ({
  children,
}: SidebarContextProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const contextValue: SidebarState = {
    isSidebarOpen,
    setIsSidebarOpen: toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarState => {
  // 2. Use the useContext hook
  const context = useContext(SidebarContext);

  // 3. Make sure it's not null!
  if (!context) {
    throw new Error("Please use SidebarContextProvider in parent component");
  }

  return context;
};
