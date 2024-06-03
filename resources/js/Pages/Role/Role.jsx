import React, { useContext } from "react";
import { TranslateContext } from "./../../Context/Translate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/RoleStyle/role.css";
const Role = () => {
    const { translates } = useContext(TranslateContext);
    const [role, setRole] = useState("");
    const navigator = useNavigate();
    const gotToRegister = (e) => {
        if (e.target.value === "Renter") {
            navigator("/registerRenter");
        }
        if (e.target.value === "Company") {
            navigator("/register");
        }
    };
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center m-5">
                <img src="../image/logo1.png" alt="" className="m-2" />
                <div className="container shadow  bg-body-white rounded w-50  d-flex flex-column justify-content-center align-items-center mainRole">
                    <div>
                        <img
                            src="../image/main.png"
                            alt=""
                            width={"600px"}
                            height={"600px"}
                        />
                    </div>
                    <h2 className="fw-bold p-2 fs-5 pb-4">
                        {translates.choose}
                    </h2>
                    <div className="pb-4">
                        <button
                            className="btn btn-primary mx-5"
                            onClick={(e) => gotToRegister(e)}
                            value={"Renter"}
                        >
                            {translates.Renter}
                        </button>
                        <button
                            className="btn btn-primary mx-5"
                            onClick={(e) => gotToRegister(e)}
                            value={"Company"}
                        >
                            {translates.Company}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Role;
