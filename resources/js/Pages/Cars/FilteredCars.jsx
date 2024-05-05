import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../../Componants/UI/Loading';
import Dialog from "../../Layout/Dialog/Dialog";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import CarCard from './CarCard';
import { useContext } from 'react';
import { FavoriteContext } from './../../Context/Favorite';
const FilteredCars = () => {
    const {favoriteList,setFavoriteList}=useContext(FavoriteContext);
    const[loading,setLoading]=useState(true);
    const [car_id, setCar_id] = useState(null);
    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const [favorites, setFavorites] = useState(
        []
    );
    const location=useLocation();
    const {carsData}=location.state;
    useEffect(() => {
        if (carsData) {
            setLoading(false);
        }
    }, [carsData]);

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
        }catch(e){
            console.error("Error toggling favorite:", e);

        }
        
    }
  return (
    <div className="d-flex flex-wrap bg-slate-100 py-2 flex-column  px-5">
                    <h2 className='text-center fw-bold mainheading text-primary '>Avialable Cars</h2>

        {carsData.length>0?<div>
            <div className="d-flex flex-wrap justify-around bg-slate-100  w-100  px-5" >
{loading ? (
                            <div className=" d-flex justify-center align-middle">

                <Loading />
                </div>
               ) : (
            
                carsData.map((item, index) => (
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
        </div>:<div  className="d-flex flex-wrap  bg-slate-100  w-100  px-5 nocar" >
            <div className="bg-white w-70 mainnocar">
                This location doesn't contain any car
            </div>
            </div>}
    </div>
  )
}

export default FilteredCars