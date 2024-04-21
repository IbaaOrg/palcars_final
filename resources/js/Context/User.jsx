import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import get_user from './../NetWorking/get_user';
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function getuser() {
        const token = localStorage.getItem('token');

        if (token) {

            try {
                const response = await axios.get("/user", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                console.log(res)
                if (res.status === true) {
                    setUser(res.data)
                    

                }

            } catch (e) {
                console.log(e)

            }

        } else {
            console.log('Token not found in local storage');
        }
      }
      return (
        <UserContext.Provider
          value={{getuser,user}}
        >
          {children}
        </UserContext.Provider>
      );
    };
    export default UserContextProvider;
    export const useUserContext = () => {
      return useContext(UserContext);
    };
    
    
