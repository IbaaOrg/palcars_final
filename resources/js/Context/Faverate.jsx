import { createContext, useState } from "react";

const faverateContext=createContext();

const faverateContextProvider=({children})=>{
    const [favorites, setFavorites] = useState(
        // Initialize favorites array with false for each car (not favorited)
        data.map(() => false)
    );
    return <faverateContext.Provider value={{favorites,setFavorites}}>
        {children}
    </faverateContext.Provider>;
}

export default faverateContextProvider;