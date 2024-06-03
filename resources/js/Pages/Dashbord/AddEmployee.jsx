import React, { useContext, useState } from "react";
import "../../../css/app.css";
import { useRef } from "react";
import Loading from "./../../Componants/UI/Loading";
import { TranslateContext } from "../../Context/Translate";
const AddEmployee = () => {
    const {translates}=useContext(TranslateContext)
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [startDate, setStartDate] = useState("");

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setJobTitle("");
        setStartDate("");
    };
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    const addEmployee = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("location", location);
        formData.append("job_title",jobTitle);
        formData.append("start_date", startDate);
        try {
            setLoading(true);
            const response = await axios.post(`addEmployees`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data.status === true) {
                setError("");
                setDone(true);
                resetForm();
            }
        } catch (error) {
            setError(error.response.data.msg);
            setDone(false);
        } finally {
            setLoading(false);
        }
    };
    function maxToday() {
        const today = new Date();
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
    return (
        <div className="w-75 d-flex justify-content-center align-items-center m-auto mt-5">
            <div className="bg-white w-100  border rounded px-3 py-2">
                <form className=" w-75 m-auto" onSubmit={addEmployee}>
                    <h2 className="text-center fs-4  p-3">{translates.AddNewEmployee}</h2>
                    {error && (
                            <div
                                className="alert alert-danger w-100"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}
                        {done && (
                            <div
                                className="alert alert-success w-100"
                                role="100"
                            >
                                Employee Added Successfully
                            </div>
                        )}
                    <div className="d-flex flex-wrap justify-content-between gap-2 ">
                       
                        <div class="employeeItem">
                            <label for="exampleInputEmail1" className="py-2">
                                {translates.FullName}
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter full name"
                                name="full_name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div class=" employeeItem">
                            <label for="exampleInputEmail2" className="py-2">
                                {translates.Emailaddress}
                            </label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail2"
                                aria-describedby="emailHelp"
                                placeholder="email@employee.ps"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail3 " className="py-2">
                            {translates.PhoneNumber}
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail3"
                            aria-describedby="emailHelp"
                            placeholder="(059)x-xxx-xxx"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail4 " className="py-2">
                            {translates.Address}
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail4"
                            aria-describedby="emailHelp"
                            placeholder="Enter address "
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail5 " className="py-2">
                           {translates.JobTitle}
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail5"
                            aria-describedby="emailHelp"
                            placeholder={translates.enterjobtitle}
                            name="job_title"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1 " className="py-2">
                           {translates.StartDate}
                        </label>
                        <input
                            type="date"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder={translates.enterstartdate}
                            name="start_date"
                            value={startDate}
                            max={maxToday()}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end py-3">
                        <button type="submit" className="btn btn-primary">
                            {loading ? "loading..." : `${translates.save}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
