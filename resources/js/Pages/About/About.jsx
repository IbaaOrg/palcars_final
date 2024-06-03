import React, { useContext, useState } from "react";
import "../../../css/AboutStyle/About.css";
import videoSource from "../../../../public/image/bgabout1.mp4"; // Local video (replace with your video filename)
import man from "../../../../public/image/man.jpg";
import woman from "../../../../public/image/woman.jpg";
import about from "../../../../public/image/undraw_navigator_a479 (1).png";
import valus from "../../../../public/image/undraw_Stock_prices_re_js33 (1).png";
import { Nav } from "react-bootstrap";
import { TranslateContext } from './../../Context/Translate';

function About() {
    const {translates}=useContext(TranslateContext)
    return (
        <>
            <div className="video-background">
                <video autoPlay loop muted playsInline className="video">
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="  ">
                <div className="d-flex  p-2 container aboutmain">
                    <div className="col">
                        <h3 className=" fs-1 d-flex align-top justify-center">
                            {translates.About}
                        </h3>
                        <p className=" fs-5 text-start">
                            {translates.WelcomeAbout}
                            <br />
                            {translates.WelcomeEnd}
                        </p>
                    </div>
                    <div className="col">
                        <img src={about} />
                    </div>
                </div>
                <div className="d-flex missing">
                    <div className="col">
                        <img src={valus} />
                    </div>
                    <div className="col">
                        <h3 className=" fs-1 d-flex align-center justify-center">
                            {translates.mission}
                        </h3>
                        <p className=" fs-5 text-start">
                           {translates.chooseAbout}
                        </p>
                        <h3 className=" fs-1 d-flex align-center justify-center">
                            {translates.chooseus}
                        </h3>
                        <p className=" fs-5 text-start">
                           {translates.chooseitemone}
                            <br />
                            {translates.chooseitemtwo}
                            <br />
                           {translates.chooseitemthree}
                            <br />
                            {translates.chooseitemfour}
                            <br />
                           {translates.chooseitemfive}
                            <br />
                        </p>
                    </div>
                </div>

                <h2 className="d-flex justify-center text-black bg-body-tertiary  fs-4 p-4 w-100 ">
                    {translates.ourteam}
                </h2>

                <div className=" p-3  d-flex justify-center gap-5">
                    <div className="col-3">
                        <div className="card">
                            <img src={man} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Zaid Ameen Turman
                                </h5>
                                <p className="card-text">
                                    zaidturman17@gmail.com
                                </p>
                                <a
                                    href="#"
                                    className="py-2 text-black bg-body-tertiary d-flex justify-center"
                                >
                                    {translates.sendemail}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <img
                                src={woman}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Ibaa Alsayed Ahmad
                                </h5>
                                <p className="card-text">
                                    ebaahmad12@gmail.com
                                </p>
                                <a
                                    href="#"
                                    className="py-2 text-black  bg-body-tertiary  d-flex justify-center"
                                >
                                    {translates.sendemail}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <img
                                src={woman}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Maryam Al-hashlamon
                                </h5>
                                <p className="card-text">Maryam@gmail.com</p>
                                <a
                                    href="#"
                                    className="py-2 text-black bg-body-tertiary  d-flex justify-center"
                                >
                                    {translates.sendemail}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default About;
