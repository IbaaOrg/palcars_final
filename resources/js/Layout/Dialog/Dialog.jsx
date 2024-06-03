import React, { useState } from "react";
import "../../../css/DialogStyle/dialog.css"; // Import your CSS file
import Login from "../../Auth/Login/Login";
import SignUp from "../../Auth/Login/SignUp";
import ViewProfile from "../../Pages/Profile/ViewProfile";

const Dialog = ({ onClose, id }) => {
    const handleOverlayClick = (e) => {
        // Close the dialog only if the click is on the overlay
        if (e.target.classList.contains("dialog-container")) {
            onClose();
        }

        console.log(id);
    };
    return (
        <div className="dialog-container" onClick={handleOverlayClick}>
            <ViewProfile id={id} />
        </div>
    );
};

export default Dialog;
