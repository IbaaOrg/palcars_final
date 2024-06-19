import React, { useContext, useEffect, useState } from "react";
import "../../../css/app.css";
import { ToastContainer, toast } from "react-toastify";
import { Bounce, Zoom } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TranslateContext } from "../../Context/Translate";
import '../../../css/Dashboard/workingHour.css'
const WorkingHourDashbord = () => {
    const {translates}=useContext(TranslateContext)
    const [workingHour, setWorkingHour] = useState({
        day: "",
        start_hour: "",
        end_hour: "",
    });
    const [workingHours, setWorkingHours] = useState([]);
    // State for controlling the visibility of each form
    const [save, setSave] = useState(false);
    const navigate = useNavigate();
    const [showForms, setShowForms] = useState({
        Saturday: true,
        Sunday: true,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
    });

    const getWorkingHour = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/getWorkingHours`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setWorkingHours(response.data.working_hours);
        const updatedShowForms = { ...showForms };
        response.data.working_hours.forEach((workingDay) => {
            updatedShowForms[workingDay.day] = false;
        });
        setShowForms(updatedShowForms);
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setWorkingHour({
            ...workingHour,
            day: value,
        });
    };

    const handleSubmit = async (e, day) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (workingHour.day) {
            try {
                const response = await axios.post(
                    `/storeWorkingHour`,
                    {
                        day: workingHour.day,
                        start_hour: workingHour.start_hour,
                        end_hour: workingHour.end_hour,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Update local state
                const updatedWorkingHours = [...workingHours, {
                    day: workingHour.day,
                    start_hour: workingHour.start_hour,
                    end_hour: workingHour.end_hour
                }];
                setWorkingHours(updatedWorkingHours);
                setShowForms({ ...showForms, [day]: false });
                setSave(!save);
                
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
                    transition: Zoom,
                });
            }
        } else {
            toast.error("You must check this day", {
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
        setWorkingHour({
            day: "",
            start_hour: "",
            end_hour: "",
        });
    };

    const handleEdit = (e, day) => {
        e.preventDefault();
        const selectedDay = workingHours.find((item) => item.day === day);
        if (selectedDay) {
            const Id = selectedDay.id;
            navigate(`/dashbord/EditWorkingHour/${Id}`);
        }
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const suffix = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${suffix}`;
    };

    useEffect(() => {
        getWorkingHour();
    }, [save]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <ToastContainer />
            <div className="d-flex flex-column">
                <p className="fs-5 p-3">{translates.chooseday}</p>
                <div className="d-flex flex-wrap workingHours">
                    {Object.keys(showForms).map((day, index) => {
                        const workingDay = workingHours.find((wh) => wh.day === day);
                        return (
                            <form
                                key={day}
                                onSubmit={(e) =>
                                    showForms[day]
                                        ? handleSubmit(e, day)
                                        : handleEdit(e, day)
                                }
                            >
                                <div className="d-flex flex-column gap-4">
                                    <div className="form-check">
                                        {showForms[day] ? (
                                            <>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={day}
                                                    name="day"
                                                    onChange={handleCheckboxChange}
                                                    checked={workingHour.day === day}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`flexCheckDefault${day}`}
                                                >
                                                    {day}
                                                </label>
                                            </>
                                        ) : (
                                            <label
                                                className="form-check-label"
                                                htmlFor={`flexCheckDefault${day}`}
                                            >
                                                {day}
                                            </label>
                                        )}
                                    </div>
                                    <div className="d-flex flex-wrap gap-5 align-items-center justify-content-center w-100">
                                        {showForms[day] ? (
                                            <div>
                                                <label htmlFor={`startHour${day}`}>
                                                    {translates.starthour}
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id={`startHour${day}`}
                                                    name="start_hour"
                                                    onChange={(e) =>
                                                        setWorkingHour({
                                                            ...workingHour,
                                                            start_hour: e.target.value,
                                                        })
                                                    }
                                                    disabled={!showForms[day]}
                                                />
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-column">
                                                <label>{translates.endhour}</label>
                                                <label>
                                                    {workingDay && formatTime(workingDay.start_hour)}
                                                </label>
                                            </div>
                                        )}
                                        {showForms[day] ? (
                                            <div>
                                                <label htmlFor={`endHour${day}`}>
                                                    {translates.endhour}
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id={`endHour${day}`}
                                                    name="end_hour"
                                                    onChange={(e) =>
                                                        setWorkingHour({
                                                            ...workingHour,
                                                            end_hour: e.target.value,
                                                        })
                                                    }
                                                    disabled={!showForms[day]}
                                                />
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-column">
                                                <label>{translates.endhour}</label>
                                                <label>
                                                    {workingDay && formatTime(workingDay.end_hour)}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2 w-25 m-auto"
                                    >
                                        {showForms[day] ? `${translates.save}` : `${translates.Update}`}
                                    </button>
                                </div>
                            </form>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkingHourDashbord;
