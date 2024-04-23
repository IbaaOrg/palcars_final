import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const getuser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === true) setUser(response.data.data);
            } catch (e) {}
        } else {
            console.log("Token not found in local storage");
        }
    };
    useEffect(() => {
        getuser();
    }, []);
    return (
        <UserContext.Provider value={{ getuser, user }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
export const useUserContext = () => {
    return useContext(UserContext);
};
