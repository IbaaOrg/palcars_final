import React, { useContext, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { UserContext } from "../../Context/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../css/PasswordStyle/forget.css";
import { BiShowAlt } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";
import { ToastContainer, Bounce, Zoom, toast } from 'react-toastify';
import '../../../css/PasswordStyle/forget.css';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const[visibale,setVisible]=useState(false);
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    const decodedToken = searchParams.get("token");
    const token = decodeURIComponent(decodedToken);

    const [newPassword, setNewPassword] = useState({
        email: email,
        token: token,
        password: "",
    });
    // localStorage.setItem('token',token);

    const set = (e) => {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value,
        });
    };

    const reset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/password_reset", newPassword);
            if(response){
                toast.success(response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                });
            }
            navigate("/login");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });    
         }
    };
    return (
        <div className="bodyforget d-flex flex-column justify-content-center align-items-center">
            <img
                src="../image/logo1.png"
                alt=""
                className="m-5"
                height={"300px"}
                width={"300px"}
            />
            <div className="formFroget">
                <form className="form " onSubmit={reset}>
                    <div className="form-group">
                        <div className="mb-3">
                            <label
                                htmlFor="newPassword"
                                className="form-label py-3"
                            >
                                New Password
                            </label>
                            <div className="password-input-container">
                            <input
                                type={visibale?'text':'password'}
                                id={"newPassword"}
                                name="password"
                                className="form-control"
                                onChange={set}
                            />
                            <div className="p-2 icon-container">
                            {visibale?<BiShowAlt onClick={()=>setVisible(false)} />:<IoEyeOffOutline onClick={()=>setVisible(true)}/>}
                            </div>
                           

                            </div>
                           
                            <input
                                type="text"
                                id={"Email"}
                                className="form-control d-none"
                                name="email"
                                onChange={set}
                            />
                            <input
                                type="text"
                                id={"Token"}
                                className="form-control d-none"
                                name="token"
                                onChange={set}
                            />
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center">
                        <input
                            type="submit"
                            value={"reset password"}
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
