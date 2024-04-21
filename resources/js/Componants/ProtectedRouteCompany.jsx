import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ProtectedRouteCompany({children}) {
    const [role, setRole] = useState("");
    const getuser = async () => {
        const token = localStorage.getItem('token');

        if (token) {

            try {
                const response = await axios.get("/user", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                const res = response.data
                if (res) {
                    setRole(res.data.role)
                 

                }

            } catch (e) {
                console.log(e)

            }

        } else {
            console.log('Token not found in local storage');
        }
    }


    useEffect( () => {
       getuser()
    }, []);


    if (role === "Company"){
        return <Navigate to='/dashbord'/>
    }
   
    return children;
 
}

export default ProtectedRouteCompany