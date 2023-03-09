import { createContext } from "react";

export const globalContext = createContext({});

const value = {};

export function ContextWrapper({ children }) {
  return (
    <globalContext.Provider value={value}>
        {children}
        </globalContext.Provider>
  );
}
