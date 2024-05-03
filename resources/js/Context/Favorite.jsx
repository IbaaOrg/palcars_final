// FavoriteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
export const FavoriteContext = createContext();

 const FavoriteContextProvider = ({ children }) => {
    const [favoriteList,setFavoriteList]=useState([]);
    const getFavoriteList=async ()=>{
        const token= localStorage.getItem('token');
      if(token){  const response=await axios.get(`/favorites`,{
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        console.log(response.data.data)
        setFavoriteList(response.data.data)
    }
    }
    useEffect(()=>{
        getFavoriteList();
    },[favoriteList.length])
  return (
    <FavoriteContext.Provider value={{ favoriteList,setFavoriteList }}>
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteContextProvider;

export const useFavoriteContext = () => {
    return useContext(FavoriteContext);
};
