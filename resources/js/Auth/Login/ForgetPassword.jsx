import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file
import "../../../css/PasswordStyle/forget.css";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post("/password_forget", { email });
            console.log(response);
            if (response.statusText === "OK") {
                toast.success(response.data.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            setLoading(false);
        } catch (error) {
            toast.error("email doesn't have account", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <>
            <ToastContainer /> {/* Place the ToastContainer component */}
            <div className="bodyforget d-flex flex-column justify-content-center align-items-center">
                <img
                    src="../image/logo1.png"
                    alt=""
                    className="m-5"
                    height={"300px"}
                    width={"300px"}
                />
                <div className="formFroget">
                    <form className="form " onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label py-3"
                                >
                                    Email address of your account :
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={email}
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className=" d-flex justify-content-end">
                            <input
                                type={"submit"}
                                value={loading ? "Loading..." : "Send"}
                                className="btn btn-primary "
                                disabled={loading}
                            />
                        </div>
                    </form>
                    <div className=" text-lime-800">{message}</div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;
