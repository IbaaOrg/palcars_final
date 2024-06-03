import React, { useContext, useEffect, useState } from "react";
import { Ri24HoursFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Bounce, Zoom } from "react-toastify";
import { TranslateContext } from "../../Context/Translate";
const AllWorkingHours = () => {
    const {translates}=useContext(TranslateContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletedItem, setDeletedItem] = useState(false);
    const navigate = useNavigate();
    const getData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(`/getWorkingHours`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data.working_hours);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    const gotToEdit = (id) => {
        navigate(`/dashbord/EditWorkingHour/${id}`);
    };
    const deleteItem = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`/userWorkingHour/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            setDeletedItem(!deletedItem);
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
    };
    useEffect(() => {
        getData();
    }, [deletedItem]);
    const gotToWorkingHour = () => {
        navigate("/dashbord/WorkingHourDashbord");
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
        <>
            <div className="w-100 d-flex justify-content-center align-items-center pt-5">
                <ToastContainer />
                <div
                    className="btn btn-primary m-auto"
                    onClick={gotToWorkingHour}
                >
                    {translates.AddWorkingHours}
                </div>
            </div>
            {data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item.id}
                        className="d-flex justify-content-between align-items-center bg-white border rounded p-3 m-3"
                    >
                        <h2 className="fw-bold text-primary">{item.day}</h2>
                        <p>{translates.StartTime} : {formatTime(item.start_hour)} </p>
                        <p>{translates.EndTime} : {formatTime(item.end_hour)} </p>
                        <div className="d-flex gap-1">
                            <p
                                className="btn btn-primary w-100"
                                onClick={() => gotToEdit(item.id)}
                            >
                                {translates.Update}
                            </p>
                            <p
                                className="btn btn-danger w-100 "
                                onClick={() => deleteItem(item.id)}
                            >
                                {translates.Delete}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="d-flex flex-column justidy-content-center align-items-center mt-5 ">
                    <p className="fs-2 p-5">
                        {translates.notworkinghours}
                    </p>
                    <Ri24HoursFill size={190} className="text-black" />
                </div>
            )}
        </>
    );
};

export default AllWorkingHours;
