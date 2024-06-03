import React, { useContext, useState } from "react";
import logo from "../../../../public/logo1.png";
import "../../../css/FooterStyle/Footer.css";
import { TranslateContext } from "../../Context/Translate";
import { ImLinkedin } from "react-icons/im";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import x from "../../../../public/image/x.png";

function Footer() {
    const { translates } = useContext(TranslateContext);
    return (
        <div>
            <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className=" d-flex flex-column justify-content-center align-items-center ">
                                <img
                                    src={logo}
                                    className="navbar-brand my-3"
                                    width="200px"
                                />
                                <p className="w-50">{translates.vision}</p>
                            </div>
                        </div>

                        <div className="col">
                            <div className="d-flex justify-content-around subdiv2">
                                <div>
                                    <h4>{translates.AboutPalCars}</h4>
                                    <h6>{translates.Howitworks}</h6>
                                    <h6>{translates.Features}</h6>
                                    <h6>{translates.Partenership}</h6>
                                    <h6>{translates.BussinessRelation}</h6>
                                </div>
                                <div>
                                    <h4>{translates.Community}</h4>
                                    <h6>{translates.Blog}</h6>
                                    <h6>{translates.OurTeams}</h6>
                                    <h6>{translates.join}</h6>
                                    <h6>{translates.Inviteafrind}</h6>
                                </div>
                                <div>
                                    <h4>{translates.Socials}</h4>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h6 className="my-1">
                                            <ImLinkedin
                                                size={25}
                                                className="text-black"
                                            />
                                        </h6>
                                        <h6 className="my-1">
                                            <FaFacebookSquare
                                                size={25}
                                                className="text-black"
                                            />
                                        </h6>
                                        <h6 className="my-1">
                                            <GrInstagram
                                                size={25}
                                                className="text-black"
                                            />
                                        </h6>

                                        <h6 className=" text-white w-50 px-2 py-1 my-2 d-flex justify-content-center rounded bg-black">
                                            X
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="custom-line"></hr>
                <div className="d-flex justify-content-around subdiv2">
                    <p>&copy; 2024 PALCARS. جميع الحقوق محفوظة.</p>
                    <div className="d-flex justify-content-around">
                        <p>Privacy & Policy </p>
                        <p>Terms & Condition</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;
