import React, { useContext } from "react";
import "../../../css/ContactStyle/Contact.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { FaSquareFacebook } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { TranslateContext } from './../../Context/Translate';
function Contact() {
    const {translates}=useContext(TranslateContext)
    return (
        <div className=" d-flex flex-column justify-centent-center align-items-center">
            <div className="bg-white ">
                <h2 className="Mainheaading text-primary text-center">
                    {translates.ContactUs}
                </h2>
                <div className="d-flex flex-column  justify-content-center  gap-5 maincontct mt-1  mb-5">
                    <h2 className="fs-4 fw-bold text-center">{translates.socialmedia}</h2>
                    <div className="d-flex gap-5">
                        <div className="d-flex flex-column align-items-center ">
                            <GrInstagram size={45} />
                            <Link
                                className="fw-bold mt-4 fs-5 "
                                to={
                                    "https://www.instagram.com/palcars.ps?igsh=MTFnODQ3b2tnb2xwcA=="
                                }
                                target="_blank"
                            >
                                Palcars.ps
                            </Link>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <FaSquareFacebook size={45} />
                            <Link className="fw-bold mt-4  fs-5">Palcars</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background-minor mt-5 ">
                <div className="minor d-flex flex-column justify-centent-center align-items-center">
                    <div className="mainContact">
                        <div className="d-flex flex-column cardcontact">
                            <div className="h-50">
                                <FaLocationDot
                                    size={100}
                                    className="text-white rounded-circle bg-primary p-2 iconhover"
                                />
                            </div>
                            <div className="h-50">
                                <h3 className="fs-4">{translates.officelocation}</h3>
                                <p className="d-flex flex-column align-items-center text-slate pt-2">
                                    Ein Sara, <span>Hebron</span>{" "}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex flex-column cardcontact">
                            <div className="h-50">
                                <FaPhone
                                    size={100}
                                    className="text-white rounded-circle bg-primary p-2 iconhover"
                                />
                            </div>
                            <div className="h-50">
                                <h3 className="text-center fs-4">
                                    {translates.PhoneNumber}
                                </h3>
                                <p className="d-flex flex-column align-items-center pt-2">
                                    <span>+972592817970</span>
                                    <span>+972595817880</span>
                                    <span>+972595752340</span>
                                </p>
                            </div>
                        </div>{" "}
                        <div className="d-flex flex-column cardcontact">
                            <div className="h-50">
                                <MdAttachEmail
                                    size={100}
                                    className="text-white rounded-circle bg-primary p-2 iconhover"
                                />
                            </div>
                            <div className="h-50 d-flex flex-column ">
                                <h3 className="fs-4 text_center align-self-center">
                                    {translates.Email}
                                </h3>
                                <p className="d-flex flex-column align-items-start text-slate">
                                    <span>ebaahmad12@gmail.com</span>
                                    <span>zaidturman@gmail.com</span>
                                    <span>marayahaslamoun@gmail.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
