import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  axios  from 'axios';
import {Zoom, toast, ToastContainer } from 'react-toastify';
import Loading from '../../Componants/UI/Loading';
import CarCard from './CarCard';
import { MdHomeWork } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { FavoriteContext } from '../../Context/Favorite';

const CarsCompany = () => {
    const {id}=useParams();
    const {favoriteList,setFavoriteList}=useContext(FavoriteContext);
    const[company,setCompany]=useState({});
    const[cars,setCars]=useState([]);
    const [car_id, setCar_id] = useState(null);
    const[loading,setLoading]=useState(false);
    const [locations,setLocations]=useState([]);
    
    const [data, setData] = useState([]);

    const getCarsOfCompany=async()=>{
        try{
            setLoading(true);
        const response=await axios.get(`/carsofcompany/${id}`);
        setCompany(response.data.data);
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
    const getLocations=async()=>{
        const response =await axios.get(`showLocationsOfCompany/${id}`)
        setLocations(await response.data.data.locations)
    }
    const toggleFavorite = async (car_id) => {
        try {
            const isFavorite=favoriteList.some((favorite)=>favorite.car.id===car_id);
            const token=localStorage.getItem('token');
            if(isFavorite){
               await axois.delete(`/favorites/${car_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
               }})
               setFavoriteList(favoriteList.filter((favorite)=>favorite.car.id !== car_id))
               toast.success("Removed from favorites", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            }else {
                const response =await axoit.post(`/favorites`,{
                    car_id : car_id
                },{
                    headers:{
                        Autorization : `Bearer ${token}`
                    }
                })
                setFavoriteList([...favoriteList,await response.data.data])
                toast.success("Added to Favorites", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (e) {
            console.error("Error toggling favorite:", e);
        }
    };
    useEffect(()=>{
        getCarsOfCompany();
        getLocations();
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
<div className="d-flex flex-column justify-content-center align-items-center w-100  bg-slate-100">
        <h2 className='mainheadingCompany'>All Locations Of this company</h2>
  <div className=" d-flex flex-wrap justify-content-center align-items-center gap-3  w-100 p-5">
    {locations&&locations.map((item)=>(
        <div key={item.id} className='bg-white p-2 rounded w-25'>
            <p>{item.location}</p>
            <p className='text-primary fw-bold'>{item.type}</p>
            <p>in {item.city.city} city</p>
        </div>
    ))}
  </div>
  </div>
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <h2 className='mainheadingCompany'>All Cars Of this company</h2>
        <div className="d-flex flex-wrap justify-evenly w-100  " >
            {loading?<Loading/>:(
                cars.map((item,index)=>(
                    <CarCard
                    key={item.id}
                 item={item}
                    index={index}
                    toggleFavorite={() => toggleFavorite(item.id)}
                    favoriteList={favoriteList}
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