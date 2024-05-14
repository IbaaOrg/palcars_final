import React, { useEffect, useState } from "react";

import Loading from "../../Componants/UI/Loading";
import Discounts from "./../Discounts/Discounts";
import { NavLink, Outlet } from "react-router-dom";

function AllLocations() {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [deleted,setDeleted]=useState(null);
    const [data, setData] = useState([]);
    const deleteLocation = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        setDeleted('Deleted Location ...');
        alert(`delete Location No ${id}`)

        const token=localStorage.getItem('token');
        try {
            const response = await axios.delete(`location/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status === true) {
                setDeleted('Done');
            }
        } catch (error) {
            console.error("Error deleting location:", error);
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("/showLocationsOfMyCompany", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const res = response.data;
                setLocations(res.data.locations);
                setData(res.data.locations);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [deleted]);

    const [searchTerm, setSearchTerm] = useState(""); // الحالة المحلية لتخزين قيمة حقل البحث

    const handleChange = (e) => {
        setSearchTerm(e.target.value); // تحديث القيمة عند تغييرها في حقل البحث
    };
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(locations);
        console.log(data);
        setLocations(data.filter(item => {
            return (
                item.location !== null && (searchTerm ? item.location?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.city.city !== null && (searchTerm ? item.city.city?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.type !== null && (searchTerm ? item.type?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false)             ); 
        }));
      
    };
    
    return (
        <div>
            {loading ? (
                                        <div className=" d-flex justify-center align-middle">

                <Loading />
                </div>
            ) : (
                <div className="container text-center  p-10">
                    <div className="row">
                        <div className="col">
                            <h1 className="fs-1">Locations List</h1>
                            <p className="">
                                Your all Locations are listed bellow
                            </p>
                        </div>
                        <div className="col ">
                        <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleChange} />
                                <button className="btn btn-outline-success" type="submit" onClick={handleSearch} > Search </button>
                            </form>
                        </div>
                        <div className="col">
                            <button type="button" class="btn btn-light">
                                Filter
                            </button>

                            <button
                                type="button"
                                class="btn btn-primary Addvehicle"
                            >
                                <NavLink to="/dashbord/addLocation">
                                    Add Location
                                </NavLink>
                            </button>
                        </div>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Location</th>

                                    <th scope="col">City</th>

                                    <th scope="col">Type</th>
                                    <th scope="col">Oprations</th>

                                </tr>
                            </thead>
                            {locations && (
                                <tbody>
                                    {locations.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.location}</td>

                                            <td>{data.city.city}</td>

                                            <td>{data.type}</td>
                                            
                                      <td className=' p-1 d-flex justify-content-center gap-3'>
                                          <button  className='btn btn-success'>View</button>
                                          <button  className='btn btn-primary'>Update</button>
                                          <button type="button" id={data.id} className='btn btn-danger' onClick={deleteLocation}>Delete</button>
                                      </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                    {deleted==='Deleted Car ...' && (
                                <div class="alert alert-danger" role="alert">
                                    {deleted}
                                </div>
                            )}
                                {deleted ==='Done' && (
                                <div class="alert alert-success" role="alert">
                                    {deleted}
                                </div>
                            )}
                </div>
            )}
        </div>
    );
}

export default AllLocations;
