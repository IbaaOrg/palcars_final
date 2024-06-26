import React, { useState, useRef, useContext } from "react";
import "../../../css/LoginStyle/Login.css";
import Logo from "../../../../public/logo1.png";
import { auth, google } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Signup from "../../NetWorking/Signup";
import { TranslateContext } from "../../Context/Translate";
import { IoCamera } from "react-icons/io5";
import { FaStarOfLife } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";
import loginimage from "../../../../public/image/undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41__1__3xti-removebg-preview.png";
import { UserContext } from "../../Context/User";

function SignUpRenter() {
    const { translates } = useContext(TranslateContext);
    const { setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [role, setRole] = useState("Renter");
    const [valid, setValid] = useState(false);
    const [visibale, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seccsses, setSeccsses] = useState(null);
    const [preview, setPreview] = useState(null);
    const [previewd, setPreviewd] = useState(null);
    const [showDetials, setShowDetials] = useState(false);
    const file = useRef(null);
    const filed = useRef(null);

    const form = useRef({
        email: null,
        name: '',
        phone: null,
        password: null,
        valid: null,
        expireddate: null,
        PhotoDrivinglicense: null,
        birthdate: null,
    });
    const userImgRef = useRef(null);
    const drivingImgRef = useRef(null);
    const show = (e) => {
        file.current = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            if (userImgRef.current) {
                userImgRef.current.src = reader.result;
            }
        };
        reader.readAsDataURL(file.current);
    };
    
    const showD = (e) => {
        filed.current = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewd(reader.result);
            if (drivingImgRef.current) {
                drivingImgRef.current.src = reader.result;
            }
        };
        reader.readAsDataURL(filed.current);
    };
    

    const set = (e) => {
        form.current = { ...form.current, [e.target.name]: e.target.value };
    };

    const handleChange = (e) => {
        setRole(e.target.value);
    };

    const byGoogle = async () => {
        const res = await signInWithPopup(auth, google);
        if (res) {
            console.log(res);
            localStorage.setItem("token", res.user.accessToken);
        }
        if (localStorage.getItem("token")) navigate("/profile");
    };
    const toggleDetials = () => {
        setShowDetials(!showDetials);
        setValid(!valid);
    };
    function todayDate() {
        const today = new Date();
        today.setDate(today.getDate() + 7); // Add 7 days to current date
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return `${year}-${month}-${day}`;
    }
    const reg = async (e) => {
        e.preventDefault();
        // const validatedata = await validate();
        setError(null);

        const formData = new FormData();
        formData.append("name", form.current.name);
        formData.append("role", role);
        formData.append("email", form.current.email);
        formData.append("password", form.current.password);
        formData.append("phone", form.current.phone);
        formData.append("valid", valid ? 1 : 0);
        formData.append("expireddate", form.current.expireddate);
        formData.append("photo_drivinglicense", filed.current);
        formData.append("birthdate", form.current.birthdate);
            if (file.current) {
            formData.append("photo_user", file.current);
        }
        formData.append("active_points", form.current.active_points);

        setLoading(true);

        await Signup(
            formData,
            (user) => {
                if (user.role === "Company") {
                    setUserToken(user.token);
                    navigate("/dashbord");
                } else {
                    setUserToken(user.token);
                    navigate("/profile");
                }
                setSeccsses('User is Valid');
                setError(null);
            },
            (msg) => {
                setError(msg);
                setSeccsses(null);
            }
        );

        setLoading(false);
    };

    
    return (
        <div className="d-flex justify-content-around cont">
            <div>
                <img src={loginimage} className="w-100" />
            </div>
            <div className="form-container  m-2">
                <div className="social-buttons">
                    <button className="social-button apple" onClick={byGoogle}>
                        <svg className="icon" viewBox="0 0 24 24">
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
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.85 2.22c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            ></path>
                        </svg>
                        <span className="buttonText">With Google</span>
                    </button>
                </div>
                <div className="line"></div>
                {seccsses && (
                    <div className="alert alert-success" role="alert">
                        {seccsses}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form
                    action="submit"
                    onSubmit={reg}
                    className="signupForm"
                    encType="multipart/form-data"
                >
                    <div className="row">
                        <div className="form-group col">
                            <div className="d-flex">
                                <label htmlFor="email">
                                    {translates.Email}
                                </label>
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
                        <div className="form-group col">
                            <label htmlFor="name">
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
                        <div className="form-group col">
                            <div className="d-flex">
                                <label htmlFor="phone">
                                    {translates.Phone}
                                </label>
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
                        <div className="form-group col">
                            <div className="d-flex">
                                <label htmlFor="password">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col ">
                            <label htmlFor="password">
                                {translates.PhotoUser}
                                <span className=" text-red-600"> *</span>
                            </label>
                            <div className="cardImg">
                                <img
                                    id="user-img"
                                    ref={userImgRef}
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
                        <div className="form-group select-container col">
                            <div className="form-group col">
                                <div className="d-flex">
                                    <label htmlFor="password">
                                        {translates.PhotoDrivinglicense}
                                    </label>
                                    <FaStarOfLife
                                        size={5}
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-check" id={"checkInput"}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckChecked"
                                        onChange={toggleDetials}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexCheckChecked"
                                    >
                                        {translates.valid}
                                    </label>
                                </div>
                                {showDetials && (
                                    <div
                                        className="d-flex flex-column gap-2"
                                        id={"textInput"}
                                    >
                                        <div className="d-flex">
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexText"
                                            >
                                                {translates.exdate}
                                            </label>
                                            <FaStarOfLife
                                                size={5}
                                                className="text-danger"
                                            />
                                        </div>
                                        <input
                                            className="form-control"
                                            type="date"
                                            min={todayDate()}
                                            name="expireddate"
                                            onChange={set}
                                            id="flexText"
                                        />
                                        <div className="d-flex">
                                            <label
                                                htmlFor="imgDriving"
                                                className="form-check-label"
                                            >
                                                {translates.photolicense}
                                            </label>
                                            <FaStarOfLife
                                                size={5}
                                                className="text-danger"
                                            />
                                        </div>
                                        <img
                                            id="driving-img"
                                            ref={drivingImgRef}
                                            src=""
                                            alt="Driving License Preview"
                                        />
                                        <input
                                            type="file"
                                            id={"imgDriving"}
                                            name={"photo_drivinglicense"}
                                            onChange={showD}
                                            className="form-control-file form-control "
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex">
                            <label htmlFor="birthdate">
                                {translates.Birthdate}
                            </label>
                            <FaStarOfLife size={5} className="text-danger" />
                        </div>
                        <input
                            type="date"
                            name="birthdate"
                            onChange={set}
                            className="form-control"
                        />
                    </div>
                    <hr />
                    <input
                        type="submit"
                        className="form-submit-btn"
                        value={
                            loading ? "loading..." : `${translates.Register}`
                        }
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
}

export default SignUpRenter;
