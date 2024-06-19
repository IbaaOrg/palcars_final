import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Loading from "../../Componants/UI/Loading";
import { TranslateContext } from "../../Context/Translate";
import '../../../css/Dashboard/employee.css'
function EmployeeDashbord() {
    const {translates}=useContext(TranslateContext)
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const getEmployees = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("allMyEmployees", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEmployees(response.data.data.employees);
        } catch (error) {
        } finally {
            setLoading(true);
        }
    };
    const deleteEmployee = (e) => {
        const token =localStorage.getItem('token');
        try {
            const response=axios.delete(`deleteEmployee/${e.target.id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setDeleted(!deleted)
    
    }catch(e){

        }
    };
    const updateEmployee=(e)=>{
       navigate(`/dashbord/EditEmployee/${e.target.id}`);
    }
    useEffect(() => {
        getEmployees();
    }, [deleted]);
    return (
        <div>
            <div id="myDiv4" className="container text-center p-10">
                <div className="row">
                    <div className="col">
                        <h1 className="fs-4">{translates.employeelist}</h1>
                        <p className="">{translates.belowlist}</p>
                    </div>
                    <div className="col ">
                        <form class="d-flex" role="search">
                            <input
                                class="form-control "
                                type="search"
                                placeholder={translates.Search} 
                                aria-label="Search"
                            />
                            <button
                                class="btn btn-outline-success"
                                type="submit"
                            >
                                {translates.Search}
                            </button>
                        </form>
                    </div>
                    <div className="col">
                        
                        <button
                            type="button"
                            class="btn btn-primary fs-6 Addvehicle"
                        >
                            {" "}
                            <NavLink to="/dashbord/addEmployee">
                                {translates.AddEmployee}
                            </NavLink>
                        </button>
                    </div>
                </div>
                {loading?(<div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">{translates.FullName}</th>
                                <th scope="col">{translates.Email} </th>
                                <th scope="col">{translates.Phone}</th>

                                <th scope="col">{translates.Address}</th>
                                <th scope="col">{translates.JobTitle}</th>
                                <th scope="col">{translates.StartDate}</th>
                                <th scope="col">{translates.Code}</th>
                                <th scope="col">{translates.Operation}</th>
                            </tr>
                        </thead>
                        {employees && (
                            <tbody>
                                {employees.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.full_name}</td>

                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.location}</td>
                                        <td>{data.job_title}</td>
                                        <td>{data.start_date}</td>
                                        <td>{data.password}</td>

                                        <td className=" ">
                                            
                                            <button className="btn btn-primary mx-1"                                                 id={data.id}
 onClick={updateEmployee}>
                                                {translates.Update}
                                            </button>
                                            <button
                                                id={data.id}
                                                className="btn btn-danger mx-1"
                                                onClick={deleteEmployee}
                                            >
                                                {translates.Delete}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>):(<div className="d-flex justify-content-center align-items-center">
                  <Loading/>
                </div>)}
            </div>
        </div>
    );
}

export default EmployeeDashbord;
