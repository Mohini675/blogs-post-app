import { createContext, useContext } from "react";
import React from "react";
import { useState } from "react";

//context
export const VisibilityContext = createContext();

//Provider
export const VisibilityProvider = (props) => {
  const [address, setAddress] = useState({ navbar: true, footer: true });

  return (
    <VisibilityContext.Provider value={{ address, setAddress }}>
      {props.children}
    </VisibilityContext.Provider>
  );
};

export function useVisibilityContext() {
  return useContext(VisibilityContext);
}
