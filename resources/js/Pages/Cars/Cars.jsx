import React, { useContext, useEffect, useState } from "react";
import image from "../../../../public/image/usericon.png";
import axios from "axios";
import get_all_cars from "../../NetWorking/get_all_cars";
import "../../../css/LoadingStyle/Loading.css";
import Loading from "../../Componants/UI/Loading";
import Dialog from "../../Layout/Dialog/Dialog";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarCard from "./CarCard";
import { FavoriteContext } from "../../Context/Favorite";
function Cars() {
    const {favoriteList,setFavoriteList}=useContext(FavoriteContext);
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        if (category) {
            await get_all_cars(
                (data) => {
                    setData(data.data);
                    setLoading(false);
                },
                (error) => {
                    console.log(error.message);
                },
                category
            );
        } else {
            await get_all_cars(
                (data) => {
                    setData(data.data);
                    setLoading(false);
                },
                (error) => {
                    console.log(error.message);
                },
                ""
            );
        }
    };
    const toggleFavorite = async (car_id) => {
        console.log(car_id)
        const token = localStorage.getItem("token");
        try {
            const isFavorite=favoriteList.some((favorite)=>favorite.car.id === car_id)
            if (isFavorite) {
                await axios.delete(`/favorites/${car_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFavoriteList(favoriteList.filter((favorite) => favorite.car.id !== car_id));
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
            } else {
                const response = await axios.post(
                    `/favorites`,
                    { car_id: car_id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setFavoriteList([...favoriteList,await response.data.data]);
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
    
    
    return (
        <div className="d-flex flex-wrap justify-evenly bg-slate-200 w-100  ">
            {loading ? (
                <Loading />
            ) : (
                data.map((item, index) => (
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
    );
}

export default Cars;
