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
const FilteredCars = () => {
    const[loading,setLoading]=useState(true);
    const [car_id, setCar_id] = useState(null);
    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const [favorites, setFavorites] = useState(
        // Initialize favorites array with false for each car (not favorited)
        data.map(() => false)
    );
    const location=useLocation();
    const {carsData}=location.state;
    useEffect(() => {
        if (carsData) {
            setLoading(false);
        }
    }, [carsData]);
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
            const data = response.data;
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
  
  return (
    <div className="d-flex flex-wrap bg-slate-100 py-2 flex-column  px-5">
                    <h2 className='text-center fw-bold mainheading text-primary '>Avialable Cars</h2>

        {carsData.length>0?<div>
            <div className="d-flex flex-wrap justify-around bg-slate-100  w-100  px-5" >
{loading ? (
                <Loading />
               ) : (
            
                carsData.map((item, index) => (
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
        </div>:<div  className="d-flex flex-wrap  bg-slate-100  w-100  px-5 nocar" >
            <div className="bg-white w-70 mainnocar">
                This location doesn't contain any car
            </div>
            </div>}
    </div>
  )
}

export default FilteredCars