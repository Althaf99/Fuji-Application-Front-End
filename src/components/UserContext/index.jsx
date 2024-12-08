import React, { createContext } from "react";
import useItemNames from "../../hooks/services/useItemNames";
import useItemColors from "../../hooks/services/useItemColors";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: itemNames } = useItemNames();
  const { data: itemColors } = useItemColors();

  return (
    <UserContext.Provider value={{ itemNames, itemColors }}>
      {children}
    </UserContext.Provider>
  );
};
