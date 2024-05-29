// UserContext.js
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userToken,setUserToken]=useState(localStorage.getItem('token'));

    const getUser = async () => {
        const token=localStorage.getItem('token')
        if (token) {
            try {
                const response = await axios.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === true) 
                setUser(await response.data.data);

         
            } catch (e) {}
        } else {
            console.log("Token not found in local storage");
        }
    };

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };
  
    useEffect(() => {
        getUser();
    }, [userToken]);

    return (
        <UserContext.Provider value={{ user, updateUser ,userToken,setUserToken}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => {
    return useContext(UserContext);
};
