import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/app.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce, Zoom } from "react-toastify";
import axios from "axios";
import { TranslateContext } from "../../Context/Translate";

const EditWorkingHour = () => {
    const {translates}=useContext(TranslateContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const [workingHour, setWorkingHour] = useState({
        start_hour: "",
        end_hour: "",
    });

    const handelSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `/updateWorkingHours/${id}`,
                {
                    start_hour: workingHour.start_hour,
                    end_hour: workingHour.end_hour,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            if (response.statusText === "OK") {
                toast.success("Save Edits of this day", {
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
            navigate(`/dashbord/AllWorkingHours`);
        } catch (error) {
            toast.error(error.response.data.msg, {
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
        <div className="mainEdit ">
            <ToastContainer />
            <div className="bg-white  w-100 rounded">
                <h2 className="text-center p-4">{translates.EditWorkingHours}</h2>
                <form action="" className="p-4 " onSubmit={handelSubmit}>
                    <div className="d-flex flex-column jusitfy-content-center align-items-center w-100 gap-3">
                        <div className="d-flex  justify-content-between  align-items-center w-50">
                            <label htmlFor={`startHour`} className="w-25">
                                {translates.starthour}
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id={`startHour`}
                                name="start_hour"
                                onChange={(e) => {
                                    setWorkingHour({
                                        ...workingHour,
                                        start_hour: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="d-flex  justify-content-between  align-items-center w-50">
                            <label htmlFor={`endHour`} className="w-25">
                                {translates.endhour}
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id={`endHour`}
                                name="end_hour"
                                onChange={(e) => {
                                    setWorkingHour({
                                        ...workingHour,
                                        end_hour: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {translates.save}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWorkingHour;
