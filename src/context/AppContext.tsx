"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
interface RecentUrl {
  id: string;
  url: string;
  ttlInSeconds: number;
  shortUrl: string;
  isEdited: boolean;
}
interface AppContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  recentlyEditedUrls: RecentUrl[];
  addRecentUrl: (url: RecentUrl) => void;
  setRecentlyEditedUrls: (urls: RecentUrl[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const cookies = new Cookies();
  const storedValue = cookies.get("sidebarState");
  const [isOpen, setIsOpen] = useState(false);
  const [recentlyEditedUrls, setRecentlyEditedUrls] = useState<RecentUrl[]>([]);

  useEffect(() => {
    if (storedValue) {
      setIsOpen(true);
    }
  }, [storedValue]);

  const toggleSidebar = () => {
    setIsOpen((prevState) => {
      const newValue = !prevState;
      cookies.set("sidebarState", newValue.toString());
      return newValue;
    });
  };

  const addRecentUrl = (newUrl: RecentUrl) => {
    setRecentlyEditedUrls(prev => {
      const index = prev.findIndex(url => url.id === newUrl.id);
      if (index !== -1) {
        prev[index] = newUrl;
      } else {
        prev = [...prev, { ...newUrl, isEdited: false }];
      }
      return prev.slice(-5);
    });
  };

  return (
    <AppContext.Provider value={{ 
      isOpen, 
      toggleSidebar, 
      recentlyEditedUrls, 
      addRecentUrl,
      setRecentlyEditedUrls
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}
