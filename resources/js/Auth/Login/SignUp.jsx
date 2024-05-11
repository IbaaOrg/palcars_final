import React, { useState, useRef, useContext } from "react";
import { FaStarOfLife } from "react-icons/fa";
import "../../../css/LoginStyle/Login.css";
import Logo from "../../../../public/logo1.png";
// Example: Firestore
import { auth, google } from "../../firebase";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Signup from "../../NetWorking/Signup";
import { object, string } from "yup";
import { TranslateContext } from "../../Context/Translate";
import { IoCamera } from "react-icons/io5";
import { doc } from "firebase/firestore";
import { BiShowAlt } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";
import loginimage from '../../../../public/image/undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41__1__3xti-removebg-preview.png'
import { UserContext } from "../../Context/User";

function SignUp() {
    const { translates } = useContext(TranslateContext);
    const {userToken,setUserToken}= useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [role, setRole] = useState("Company");
    const [error, setError] = useState(null);
    const [seccsses, setSeccsses] = useState(null);
    const [preview, setPreview] = useState(null);
    const [previewd, setPreviewd] = useState(null);
    const [visibale, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const file = useRef(null);
    const filed = useRef(null);

    const form = useRef({
        email: null,
        name: null,
        phone: null,
        password: null,
    });

    const validate = async () => {
        let userSchema = object({
            email: string().required().email(),
            name: string().required().min(3).max(20),
            password: string().required().min(8),
            phone: string().min(10).max(10).required(),
            description: string(),
        });
        try {
            await userSchema.validate(form.current);
            setSeccsses("User is valid!");
            setErrors(null);
            return true;
        } catch (e) {
            setErrors(e.errors);
            setSeccsses(null);
            return false;
        }
    };

    const show = (e) => {
        file.current = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            document.getElementById("user-img").src = reader.result;
        };
        reader.readAsDataURL(file.current);
    };

    const set = (e) => {
        form.current = { ...form.current, [e.target.name]: e.target.value };
    };

    const handleChange = (e) => {
        setRole(e.target.value);
    };

    const byGoogle = async () => {
        var res = await signInWithPopup(auth, google);
    };

    const reg = async (e) => {
        e.preventDefault();
        const validatedata = await validate();
        setError(null);

        const formData = new FormData();
        formData.append("name", form.current.name);
        formData.append("role", role);
        formData.append("email", form.current.email);
        formData.append("password", form.current.password);
        formData.append("phone", form.current.phone);
        formData.append("description", form.current.description);
        if (file.current) {
            formData.append("photo_user", file.current);
        }
        setLoading(true);

        await Signup(
            formData,
            (user) => {
                if (user.role === "Company") {
                    setUserToken(user.token)
                    navigate("/dashbord");
                } else {
                    setUserToken(user.token)
                    navigate("/profile");
                }
            },
            (msg) => {
                setError(msg);
            },
        );

        setLoading(false);
    };

    // const handleDirectionChange=()=>{
    //     const cardImgLabel = document.querySelector('.cardImg label');
    //     if(dir==="rtl"){

    //     }
    // }
    // Function to detect direction change
    function handleDirectionChange(event) {
        const direction = event.target.dir;
        const cardImgLabel = document.querySelector(".cardImg label");

        // Check if direction changed to RTL
        if (direction === "rtl") {
            // Apply adjusted styles for RTL
            cardImgLabel.style.right = "70px";
            cardImgLabel.style.left = "auto";
        } else {
            // Apply default styles for LTR
            cardImgLabel.style.left = "70px";
            cardImgLabel.style.right = "auto";
        }
    }

    // Listen for direction change event
    document.addEventListener("DOMContentLoaded", () => {
        // Initial setup based on default direction
        handleDirectionChange({ target: document.documentElement });

        // Listen for direction change
        document.addEventListener("dirchange", handleDirectionChange);
    });
    return (
        <div class="d-flex justify-content-around cont">
            <div>
                <img src={loginimage} className="w-100" />
            </div>
            <div class="form-container  m-2">
                <div class="social-buttons">
                    <button class="social-button apple" onClick={byGoogle}>
                        <svg class="icon" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            ></path>
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            ></path>
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            ></path>
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            ></path>
                            <path d="M1 1h22v22H1z" fill="none"></path>
                        </svg>
                        <span>{translates.SignUpWithGoogle}</span>
                    </button>
                </div>
                <div class="line"></div>
                {seccsses && (
                    <div class="alert alert-success" role="alert">
                        {seccsses}
                    </div>
                )}

                {error && !errors && (
                    <div class="alert alert-danger" role="alert">
                        {errors}
                    </div>
                )}
                {!error && errors && (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {error && errors && (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form class="form" onSubmit={reg}>
                    <div className="row">
                        <div class="form-group col">
                            <div className="d-flex">
                                <label for="email">{translates.Email}</label>
                                <FaStarOfLife
                                    size={5}
                                    className="text-danger"
                                />
                            </div>
                            <input
                                required
                                onChange={set}
                                placeholder={translates.Enteryouremail}
                                name="email"
                                id="email"
                                type="email"
                            />
                        </div>
                        <div class="form-group col">
                            <label for="name">
                                {translates.FullName}
                                <span className=" text-red-600"> *</span>
                            </label>
                            <input
                                required=""
                                onChange={set}
                                placeholder={translates.Enteryourname}
                                name="name"
                                id="name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group col">
                            <div className="d-flex">
                                <label for="phone">{translates.Phone}</label>

                                <FaStarOfLife
                                    size={5}
                                    className="text-danger"
                                />
                            </div>
                            <input
                                required=""
                                onChange={set}
                                placeholder={translates.Enteryourphone}
                                name="phone"
                                id="phone"
                                type="text"
                            />
                        </div>
                        <div class="form-group col">
                            <div className="d-flex">
                                <label for="password">
                                    {translates.Password}
                                </label>
                                <FaStarOfLife
                                    size={5}
                                    className="text-danger"
                                />
                            </div>
                            <div className="password-input-container">
                                <input
                                    type={visibale ? "text" : "password"}
                                    required=""
                                    id={"password"}
                                    name="password"
                                    placeholder={translates.Enteryourpassword}
                                    className="form-control"
                                    onChange={set}
                                />
                                <div className="p-2 icon-container">
                                    {visibale ? (
                                        <BiShowAlt
                                            onClick={() => setVisible(false)}
                                        />
                                    ) : (
                                        <IoEyeOffOutline
                                            onClick={() => setVisible(true)}
                                        />
                                    )}
                                </div>
                            </div>
                            {/*  {errors.password &&
                                <div class=" text-red-600 mt-1">
                                    {errors.password}
                                </div>
                            }   */}
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group col ">
                            <label for="photo">
                                {translates.PhotoUser}
                                <span className=" text-red-600"> *</span>
                            </label>
                            <div className="cardImg" id={"photo"}>
                                <img
                                    id="user-img"
                                    src="../image/user.png"
                                    alt=""
                                />
                                <label htmlFor="file-path">
                                    <IoCamera size={20} />
                                </label>
                                <input
                                    name={"photo"}
                                    type={"file"}
                                    onChange={show}
                                    id="file-path"
                                    className="user_file"
                                />
                            </div>
                        </div>
                        <div class="form-group col ">
                            <label for="text">{translates.description}</label>
                            <textarea
                                name="description"
                                id="text"
                                rows="4"
                                className="border border-black rounded p-2 desc"
                                placeholder={translates.enter}
                                onChange={set}
                            ></textarea>
                        </div>
                    </div>

                    <hr />
                    <input
                        type="submit"
                        class="form-submit-btn"
                        value={loading ? "Loading..." : "Sign Up"}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
}

export default SignUp;
