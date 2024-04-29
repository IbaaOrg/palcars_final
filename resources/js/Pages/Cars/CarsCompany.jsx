import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  axios  from 'axios';
import {Zoom, toast, ToastContainer } from 'react-toastify';
import Loading from '../../Componants/UI/Loading';
import CarCard from './CarCard';
import { MdHomeWork } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";

const CarsCompany = () => {
    const {id}=useParams();
    const[company,setCompany]=useState({});
    const[cars,setCars]=useState([]);
    const [car_id, setCar_id] = useState(null);
    const[loading,setLoading]=useState(false);
    const [favorites, setFavorites] = useState(
        // Initialize favorites array with false for each car (not favorited)
       ''
    );
    const [data, setData] = useState([]);

    const getCarsOfCompany=async()=>{
        try{
            setLoading(true);
        const response=await axios.get(`/carsofcompany/${id}`);
        setCompany(response.data.data);
        console.log(response.data.data)
        setCars(response.data.data.cars)
        setLoading(false);
        }catch(error){
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
            setLoading(false);
  
        }
    }
    const addFaverate = async () => {
        console.log("car_id");
        console.log(car_id);

        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("/favorites", car_id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data);
            console.log(data.data);

            console.log(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleFavorite = async (index, car_id) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = [...prevFavorites];
            updatedFavorites[index] = !prevFavorites[index];
            /*   console.log("car_id")
      console.log(car_id) */
            toast.success("adding to Fevarte", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setCar_id(car_id);
            addFaverate(car_id);
            return updatedFavorites;
        });
    };
    useEffect(()=>{
        getCarsOfCompany();
    },[id])
  return (
    <>
    <ToastContainer/>
    <div className="d-flex flex-column justify-content-center align-items-center pt-5">
    <img src={company.photo_user} alt="" className='imgUser '/>
    <p className='d-flex gap-3 justify-content-start align-items-start fw-bold pt-2 w-15'> <MdHomeWork size={25} />{company.name} Company  
</p>
<p className='d-flex gap-3 justify-content-start align-items-start fw-bold w-15 pl-3'><MdAttachEmail size={25} />{company.email} 
 </p>
    <p className='d-flex gap-3 justify-content-start align-items-start fw-bold  pb-3 phone pl-5'><BsFillTelephoneFill size={25} />{company.phone} 
</p>
  
    <div className="d-flex flex-column justify-content-center align-items-center  bg-slate-100 w-100">
        <h2 className='mainheadingCompany'>All Cars Of this company</h2>
        <div className="d-flex flex-wrap justify-evenly w-100  " >
            {loading?<Loading/>:(
                cars.map((item,index)=>(
                    <CarCard
                    key={item.id}
                    item={item}
                    index={index}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                    />
                ))
            )}
        </div>
    </div>
    </div>
  
    </>
  )
}

export default CarsCompany