import React, { useContext, createContext } from "react";

let value: string = "This is Rijan Shrestha";
export const context = createContext(value);

interface ChildrenProps {
  children: React.ReactNode;
}

export const ValueProvider = ({ children }: ChildrenProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};
