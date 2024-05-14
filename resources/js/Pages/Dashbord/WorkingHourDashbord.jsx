import React, { useEffect, useState } from "react";
import "../../../css/app.css";
import { ToastContainer, toast } from "react-toastify";
import { Bounce, Zoom } from "react-toastify";
import axios from "axios"; // Import axios if not already imported
import { useNavigate } from "react-router-dom";

const WorkingHourDashbord = () => {
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

    useEffect(() => {
        getWorkingHour();
    }, [save]);

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
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
                setShowForms({ ...showForms, [day]: false }); // Show the form again after submission
                setSave(!save);
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
            toast.error("you must check this day", {
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
        const hours = parseInt(time.split(":")[0]);
        const minutes = parseInt(time.split(":")[1]);
        const suffix = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${
            minutes < 10 ? "0" : ""
        }${minutes} ${suffix}`;
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <ToastContainer />
            <div className="d-flex flex-column">
                <p className="fs-5 p-3">Choose the days that you work :</p>
                <div className="d-flex flex-wrap workingHours">
                    {Object.keys(showForms).map((day, index) => (
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
                                                checked={
                                                    workingHour.day === day
                                                }
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
                                                Start Hour
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id={`startHour${day}`}
                                                name="start_hour"
                                                onChange={(e) =>
                                                    setWorkingHour({
                                                        ...workingHour,
                                                        start_hour:
                                                            e.target.value,
                                                    })
                                                }
                                                disabled={!showForms[day]}
                                            />
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column">
                                            <label>Start Hour</label>
                                            <label>
                                                {workingHours.length > index &&
                                                    formatTime(
                                                        workingHours[index]
                                                            .start_hour
                                                    )}
                                            </label>
                                        </div>
                                    )}
                                    {showForms[day] ? (
                                        <div>
                                            <label htmlFor={`endHour${day}`}>
                                                End Hour
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id={`endHour${day}`}
                                                name="end_hour"
                                                onChange={(e) =>
                                                    setWorkingHour({
                                                        ...workingHour,
                                                        end_hour:
                                                            e.target.value,
                                                    })
                                                }
                                                disabled={!showForms[day]}
                                            />
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column">
                                            <label htmlFor={`endHour${day}`}>
                                                End Hour
                                            </label>
                                            <label>
                                                {workingHours.length > index &&
                                                    formatTime(
                                                        workingHours[index]
                                                            .end_hour
                                                    )}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2 w-25 m-auto"
                                >
                                    {showForms[day] ? "Save" : "Edit"}
                                </button>
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkingHourDashbord;
