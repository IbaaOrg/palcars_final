import React, { useEffect, useState } from "react";
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
function Cars() {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [car_id, setCar_id] = useState(null);

    const getCars = async () => {
        if (category) {
            await get_all_cars(
                (data) => {
                    setData(data.data); //rerender
                    console.log(data);

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
                    setData(data.data); //rerender
                    console.log(data);
                    setLoading(false);
                },
                (error) => {
                    console.log(error.message);
                },
                ""
            );
        }
    };
    {
        /*                     <img key={imgs.id} src={data.sub_images[0].photo_car_url} width={200} height={100} alt='car image' />*/
    }
    //code run after component render[ready]
    useEffect(() => {
        getCars();
    }, []);
    const [favorites, setFavorites] = useState(
        // Initialize favorites array with false for each car (not favorited)
        data.map(() => false)
    );

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
    const types= ['SUV', 'Hatchback','Sedan','Convertible','Cressover','Minivan','Station Wagon','Pickup Trucks'];
    const seats=[2,4,5,7,8,'more than 8']
    return (
        <div className="d-flex bg-slate-200 w-100">
            <div className="col-2 bg-white d-flex flex-column p-3">
                <div>
                    <h3 className="text-muted">Type</h3>
                    <div>
                        <div className="py-3 gap-3">
                           { types.map((item)=>(<div className=" form-check">
                                <input
                                    type="radio"
                                    id={item}
                                    value={item}
                                    name="type"
                                    class="form-check-input"
                                />
                                <label htmlFor={item} class="form-check-label">
                                    {item}
                                </label>
                            </div>))}

                           
                        </div>
                    </div>
                </div>
                <hr />
                <div className="py-3">
                    <h3 className="text-muted py-3">Capacity</h3>
                    <div>
                    { seats.map((item)=>(<div className=" form-check">
                                <input
                                    type="radio"
                                    id={`seat${item}`}
                                    value={item}
                                    name="type"
                                    class="form-check-input"
                                />
                                <label htmlFor={item} class="form-check-label">
                                    {item}
                                </label>
                            </div>))}
                       
                    </div>
                </div>
                <hr />
                <div>
                    <h3 className="text-muted">Price</h3>
                    <div className="price-input">
                        <div className="field">
                            <span>Min</span>
                            <input type="number" className="input-min" value={50} />
                        </div>
                        <div className="separator">-</div>
                        <div className="field">
                            <span>Max</span>
                            <input type="number" className="input-max" value={5000} />
                        </div>
                    </div>
                    <div>
                    <input type="range"  min={50} />
                    <input type="range" max={2000}/>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap justify-evenly bg-slate-200 col-10  ">
                {loading ? (
                    <Loading />
                ) : (
                    data.map((item, index) => (
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
    );
}

export default Cars;
