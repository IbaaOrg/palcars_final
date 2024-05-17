import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CiEdit } from "react-icons/ci";

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState("");
    const [error, setError] = useState(false);
    const [showName, setShowName] = useState(false);
    const[showEmail,setShowEmail]=useState(false)
    const[showPhone,setShowPhone]=useState(false)
    const[showLocation,setShowLocation]=useState(false)
    const[showJobTitle,setShowJobTitle]=useState(false)
    const[showStartDate,setShowStartDate]=useState(false)
    const getEmployee = async () => {
        const response = await axios.get(`showEmployee/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setEmployee(response.data.data);
        console.log(employee)
    };

    useEffect(() => {
        getEmployee();
    }, [done]);

    const updateEmployee = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(fullName){
          formData.append("full_name", fullName);
        }
        if(email){
          formData.append("email", email);
        }
        if(phone){
          formData.append("phone", phone);
        }
        if(location){
          formData.append("location", location);
        }
        if(jobTitle){
        formData.append("job_title", jobTitle);
        }
        if(startDate){
        formData.append("start_date", startDate);
        }
        try {
            setLoading(true);
            const newEmployee = await axios.post(
                `updateEmployee/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (newEmployee.data.status === true) {
                setDone(true);
                setError("");
                setShowEmail(false);
                setShowName(false);
                setShowPhone(false);
                setShowLocation(false);
                setShowJobTitle(false);
                setShowStartDate(false)
            }
        } catch (error) {
            setDone(false);
            setError(error.response.data.msg);
        } finally {
            setLoading(false);
        }
    };

    const handelEdit = (e, item) => {
        setEditForm(item);
        console.log(e.target.id);
    };
    const showEditFullName=()=>{
      setShowName(true);
    }
    const showEditEmail=()=>{
      setShowEmail(true)
    }
    const showEditPhone=()=>{
      setShowPhone(true);
    }
    const showEditLocation=()=>{
      setShowLocation(true);
    }
    const showEditJobTitle=()=>{
    setShowJobTitle(true);
    }
    const showEditStartDate=()=>{
      setShowStartDate(true);
    }
    return (
        <div className="w-75 d-flex justify-content-center align-items-center m-auto mt-5">
            <div className="bg-white w-100  border rounded px-3 py-2">
                <form className="w-75 m-auto" onSubmit={updateEmployee}>
                    <h2 className="text-center fs-4 p-3">
                        Update Information Employee
                    </h2>
                    {error && (
                        <div className="alert alert-danger w-100" role="alert">
                            {error}
                        </div>
                    )}
                    {done && (
                        <div className="alert alert-success w-100" role="100">
                            Employee Updated Successfully
                        </div>
                    )}
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="employeeItem d-flex flex-column justify-content-start">
                            <label htmlFor="exampleInputEmail1" className="py-2">
                                Full Name
                            </label>
                           {!showName?<p className="d-flex justify-content-start gap-2 border w-50 ms-0 p-1" id="fullName">
                                    {employee.full_name}
                                    <CiEdit size={18} className="text-primary" onClick={showEditFullName} />
                                </p>
                               : <input
                                    type="text"
                                    className="form-control w-50 ms-0"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter full name"
                                    name="full_name"
                                    onChange={(e) => setFullName(e.target.value)}
                                />}
                             
                        </div>
                        <div className="employeeItem">
                            <label htmlFor="exampleInputEmail2" className="py-2">
                                Email address
                            </label>
                            {!showEmail?<p className="d-flex justify-content-start gap-2 border  w-60 ms-0 p-1" id="email">
                                {employee.email}
                                <CiEdit size={18} className="text-primary" onClick={showEditEmail} />
                            </p>
                            :<input
                                type="email"
                                class="form-control w-60 ms-0"
                                id="exampleInputEmail2"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />}
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="employeeItem">
                            <label htmlFor="exampleInputEmail3" className="py-2">
                                Phone Number
                            </label>
                            {!showPhone?<p className="d-flex justify-content-start gap-2 border  w-50 ms-0 p-1" id="phone">
                                {employee.phone}
                                <CiEdit size={18} className="text-primary" onClick={showEditPhone} />
                            </p>
                            :<input
                            type="text"
                            class="form-control w-50 ms-0"
                            id="exampleInputEmail3"
                            aria-describedby="emailHelp"
                            placeholder="(059)x-xxx-xxx"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />}
                        </div>
                        <div className="employeeItem">
                            <label htmlFor="exampleInputEmail4" className="py-2">
                                Address
                            </label>
                            {!showLocation?<p className="d-flex justify-content-start gap-2 border w-50 ms-0 p-1" id="location">
                                {employee.location}
                                <CiEdit size={18} className="text-primary" onClick={showEditLocation} />
                            </p>:<input
                            type="text"
                            class="form-control w-50 ms-0"
                            id="exampleInputEmail4"
                            aria-describedby="emailHelp"
                            placeholder="Enter address "
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                        />}
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="employeeItem">
                            <label htmlFor="exampleInputEmail5" className="py-2">
                                Job Title
                            </label>
                            {!showJobTitle?<p className="d-flex justify-content-start gap-2 border w-50 ms-0 p-1" id="jobTitle">
                                {employee.job_title}
                                <CiEdit size={18} className="text-primary" onClick={showEditJobTitle} />
                            </p>:<input
                            type="text"
                            class="form-control w-50 ms-0 "
                            id="exampleInputEmail5"
                            aria-describedby="emailHelp"
                            placeholder="Enter job title "
                            name="job_title"
                            onChange={(e) => setJobTitle(e.target.value)}
                        />}
                        </div>
                        <div className="employeeItem">
                            <label htmlFor="exampleInputEmail1" className="py-2">
                                Start date in company
                            </label>
                           {!showStartDate? <p className="d-flex justify-content-start gap-2   border w-50 ms-0 p-1" id="startDate">
                                {employee.start_date}
                                <CiEdit size={18} className="text-primary" onClick={showEditStartDate} />
                            </p>: <input
                            type="date"
                            class="form-control w-50 ms-0"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter start date"
                            name="start_date"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end py-3">
                        <button type="submit" className="btn btn-primary">
                            {loading ? "loading..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;