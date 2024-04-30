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

    return (
        <div className="d-flex bg-slate-200 w-100">
            <div className="col-2 bg-white d-flex flex-column p-3">
                <div>
                    <h3 className="text-muted">Type</h3>
                    <div 
            > 
                <div 
                
                > 
                    <div 
                      
                    > 
                        <input 
                            type="radio"
                            id="SUV"
                            value="SUV"
                         name="type"
                            
                        /> 
                        <label 
                            htmlFor="SUV"
                           
                        > 
                            SUV 
                        </label> 
                    </div> 
  
                    <div 
                       
                    > 
                        <input 
                            type="radio"
                            id="Hatchback"
                            value="Hatchback"
                            name="type"

                         
                        /> 
                        <label 
                            htmlFor="Hatchback"
                           
                        > 
                            Hatchback 
                        </label> 
                        </div>
                        <div 
                       
                       > 
                           <input 
                               type="radio"
                               id="Sedan"
                               value="Sedan"
                               name="type"

                            
                           /> 
                           <label 
                               htmlFor="Sedan"
                              
                           > 
                               Sedan 
                           </label> 
                           </div>
                           <div 
                       
                       > 
                           <input 
                               type="radio"
                               id="Convertible"
                               value="Convertible"
                               name="type"

                            
                           /> 
                           <label 
                               htmlFor="Convertible"
                              
                           > 
                               Convertible 
                           </label> 
                           </div>
                           <div 
                       
                       > 
                           <input 
                               type="radio"
                               id="Cressover"
                               value="Cressover"
                               name="type"

                            
                           /> 
                           <label 
                               htmlFor="Cressover"
                              
                           > 
                               Cressover 
                           </label> 
                           </div>
                           <div 
                       
                       > 
                           <input 
                               type="radio"
                               id="Minivan"
                               value="Minivan"
                               name="type"
   
                            
                           /> 
                           <label 
                               htmlFor="Minivan"
                              
                           > 
                               Minivan 
                           </label> 
                           </div>
                           <div 
                       
                       > 
                           <input 
                               type="radio"
                               id="StationWagon"
                               value="StationWagon"
                               name="type"

                            
                           /> 
                           <label 
                               htmlFor="StationWagon"
                              
                           > 
                               Station Wagon 
                           </label> 
                           </div>
                           <div 
                       
                       > 
                           <input 
                               type="radio"
                               id="                               Pickup Trucks 
                               "
                               value="                               Pickup Trucks 
                               "
                               name="type"

                            
                           /> 
                           <label 
                               htmlFor="                               Pickup Trucks 
                               "
                              
                           > 
                               Pickup Trucks 
                           </label> 
                           </div>
                        </div>
                        </div>
                </div>
                <hr />
                <div>
                <h3 className="text-muted">Capacity</h3>
                <div 
                
                > 
                    <div 
                    for="capacity"
                    > 
                        <input 
                            type="radio"
                            id="seate2"
                            value="2"
                            name="capacity"
                        /> 
                        <label 
                            htmlFor="seate2"
                           
                        > 
                            2 Person 
                        </label> 
                        </div> 
                        <div 
                      
                    > 
                        <input 
                            type="radio"
                            id="seate4"
                            value="4"
                            name="capacity"
 
                        /> 
                        <label 
                            htmlFor="seate4"

                        > 
                            4 Person 
                        </label> 
                        </div> 
                        <div 
                      
                    > 
                        <input 
                            type="radio"
                            id="seate5"
                            value="5"
                            name="capacity"
 
                        /> 
                        <label 
                            htmlFor="seate5"
                           
                        > 
                            5 Person 
                        </label> 
                        </div> 
                        <div 
                      
                    > 
                        <input 
                            type="radio"
                            id="seate7"
                            value="7"
                            name="capacity"

                        /> 
                        <label 
                            htmlFor="seate7"
                           
                        > 
                            7 Person 
                        </label> 
                        </div> 
                        <div 
                      
                      > 
                          <input 
                              type="radio"
                              id="seate8"
                              value="8"
                              name="capacity"
 
                          /> 
                          <label 
                              htmlFor="seate8"
                             
                          > 
                              8 Person 
                          </label> 
                          </div> 
                          <div 
                      
                      > 
                          <input 
                              type="radio"
                              id="seate9"
                              name="capacity"
                              value="9"
                              
                          /> 
                          <label 
                              htmlFor="seate9"
                             
                          > 
                              More than 8 Person 
                          </label> 
                          </div>  
                        </div> 
                </div>
                <hr />
                <div>
                    <h3 className="text-muted">Price</h3>
                </div>
            </div>
        <div className="d-flex flex-wrap justify-evenly bg-slate-200 col-10  " >
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
