// FavoriteContext.js
import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {


  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteContextProvider;

export const useFavoriteContext = () => {
    return useContext(FavoriteContext);
};
