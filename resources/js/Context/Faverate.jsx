import { createContext, useContext, useState } from "react";

const faverateContext=createContext();

const faverateContextProvider=({children})=>{
  
    return <faverateContext.Provider value={{favorites,setFavorites}}>
        {children}
    </faverateContext.Provider>;
}
export default faverateContextProvider;
export const useFaverateContext=()=>{
    return useContext(faverateContext);
};
