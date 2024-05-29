import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const EditLocation = () => {
    const { id } = useParams();
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showLocationName, setShowLocationName] = useState(false);
    const [showLocationType, setShowLocationType] = useState(false);
    const [showLocationCity, setShowLocationCity] = useState(false);
    const [location, setLocation] = useState({});
    const [locationName,setLocationName]=useState('');
    const [locationType,setLocationType]=useState('');
    const [locationCity,setLocationCity]=useState('');
    const  form=useRef({
        location: '',
        type:'',
        city_id:''
    })
    const set = (e) => {
        const value = e.target.name === 'city_id' ? parseInt(e.target.value) : e.target.value;
        form.current = { ...form.current, [e.target.name]: value}
    }
    const updateLocation=async (e)=>{
        e.preventDefault();
        const token =localStorage.getItem('token')
        const formData=new FormData();      
          if(form.current.location)
        formData.append('location',form.current.location)
          if(form.current.type)
            formData.append('type',form.current.type)
          if(form.current.city_id)
            formData.append('city_id',form.current.city_id)
          console.log("Submitting data:", form.current);  // Log the form data

        try{
            const response=await axios.post(`location/${id}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setDone(true)
        setError("")
        setShowLocationName(false);
        setShowLocationType(false);
        setShowLocationCity(false);
    }catch(error){
        setError(error.response.data.msg)
        setDone(false)
        }

    }
    const [cities,setCities]=useState([]);
    const getLocation = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`showLocation/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setLocation(response.data.data);
        console.log(response.data.data);
    };
    const getCities = async ()=>{
        const token =localStorage.getItem('token');
        const response=await axios.get(`showallcities`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setCities(response.data.data)
    }
    const showEditLocationName = () => {
        setShowLocationName(true);
    };
    const showEditLocationType = () => {
        setShowLocationType(true);
    };
    const showEditLocationCity = () => {
        setShowLocationCity(true);
    };
    useEffect(() => {
        getLocation();
        getCities();
    }, [done]);
    return (
        <div className="w-75 d-flex justify-content-center align-items-center m-auto mt-5">
            <div className="bg-white w-100  border rounded px-3 py-2">
                <form
                    className="w-75 m-auto d-flex flex-column justify-content-center align-items-center"
                    onSubmit={updateLocation}
                >
                    <h2 className="text-center fs-4 p-3">
                        Update Location Information 
                    </h2>
                    {error && (
                        <div className="alert alert-danger w-100" role="alert">
                            {error}
                        </div>
                    )}
                    {done && (
                        <div className="alert alert-success w-100" role="100">
                            Location Updated Successfully
                        </div>
                    )}
                    <div className="employeeItem d-flex flex-column justify-content-center ">
                        <label htmlFor="exampleInputEmail1" className="py-2">
                            Location Name
                        </label>
                        {!showLocationName ? (
                            <p
                                className="d-flex justify-content-start gap-2 border w-100 ms-0 p-1"
                                id="locationName"
                            >
                                {location.location}
                                <CiEdit
                                    size={18}
                                    className="text-primary"
                                    onClick={showEditLocationName}
                                />
                            </p>
                        ) : (
                            <input
                                type="text"
                                className="form-control w-60 ms-0"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="location"
                                placeholder="Enter Location"
                                onChange={set}
                            />
                        )}
                    </div>
                    <div className="employeeItem">
                        <label htmlFor="exampleInputEmail2" className="py-2">
                            Location Type
                        </label>
                        {!showLocationType ? (
                            <p
                                className="d-flex justify-content-start gap-2 border  w-100 ms-0 p-1"
                                id="email"
                            >
                                {location.type}
                                <CiEdit
                                    size={18}
                                    className="text-primary"
                                    onClick={showEditLocationType}
                                />
                            </p>
                        ) : (
                            <select
                            class="form-select  w-60"
                            aria-label="Default select example"
                            name="type"
                            onChange={set}
                     >
                            <option selected className="text-muted">
                                Choose Type ...
                            </option>
                            <option value={"pickup"}>Pickup</option>
                            <option value={"dropoff"}>Drop off</option>
                            <option value={"pickup_dropoff"}>Pickup - Dropoff</option>
                            
                        </select>
                        )}
                    </div>
                    <div className="employeeItem">
                        <label htmlFor="exampleInputEmail3" className="py-2">
                            City Of Location
                        </label>
                        {!showLocationCity ? (
                            <p
                                className="d-flex justify-content-start gap-2 border  w-100 ms-0 p-1"
                                id="phone"
                            >
                                {location.city && location.city.city}
                                <CiEdit
                                    size={18}
                                    className="text-primary"
                                    onClick={showEditLocationCity}
                                />
                            </p>
                        ) : (
                            <select
                                class="form-select  w-60"
                                aria-label="Default select example"
                                name="city_id"
                                onChange={set}
                         >
                                <option selected className="text-muted">
                                    Choose City ...
                                </option>
                                {cities.map((item)=>(
                                <option value={item.id}>{item.city}</option>))}
                                
                            </select>
                          
                        )}
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

export default EditLocation;
