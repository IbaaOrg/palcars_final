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
import { GiSteeringWheel } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import CarCard from "./CarCard";
import { TbFilterSearch } from "react-icons/tb";
import { FavoriteContext } from "../../Context/Favorite";
import '../../../css/FilterStyle/Filter.css';
import { FaGasPump } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

function Cars() {
    const {favoriteList,setFavoriteList}=useContext(FavoriteContext);
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const [categoryValue,setCategoryValue]=useState(category);
    const [loading, setLoading] = useState(true);
    const [show,setShow]=useState(false);
    const [data, setData] = useState([]);
    const [minPrice,setMinPrice]=useState('0');
    const [maxPrice,setMaxPrice]=useState('2000');
    const [rangeFillWidth,setRangeFillWidth]=useState('100%')
    const [rangeFillLeft,setRangeFillLeft]=useState('100%');
    const [fuelType,setFuelType]=useState('');
    const [steeringValue,setSteeringValue]=useState('');
    const [personsValue,setPersonsValue]=useState('');
    const [makeValue,setMakeValue]=useState('');
    const [modelValue,setModelValue]=useState('');
    useEffect(() => {
        validateRange();
    }, [minPrice, maxPrice]);
    
    useEffect(() => {
        getCars(categoryValue,minPrice,maxPrice,fuelType,steeringValue,personsValue,makeValue,modelValue);
        
    }, []);
  
    function validateRange(){
        let minValue =minPrice;
        let maxValue = maxPrice;
        if(minValue > maxValue){
            [minValue,maxValue]= [maxPrice, minPrice]
        }

        const minPercentage=((minValue - 50) / 2000 ) * 100;
        const maxPercentage=((maxValue - 50) / 2000 ) * 100;
        setRangeFillWidth(`${maxPercentage - minPercentage}%`);
        if(minValue===0){
            setRangeFillLeft('0%');
 
        }
        setRangeFillLeft(`${ minPercentage}%`);
    }
    const handleMinPriceChange=(event)=>{
        const newMinPrice=parseInt(event.target.value);
        setMinPrice(newMinPrice)
        getCars(categoryValue,newMinPrice,maxPrice,fuelType,steeringValue,personsValue,makeValue,modelValue)

    }
    const handleMaxPriceChange=(event)=>{
        const newMaxPrice=parseInt(event.target.value);
        setMaxPrice(newMaxPrice)
        getCars(categoryValue,minPrice,newMaxPrice,fuelType,steeringValue,personsValue,makeValue,modelValue)

    }   
    const getCars = async (categoryValue,minPrice,maxPrice,fuelType,steeringValue,personsValue,makeValue,modelValue) => {
      
            await get_all_cars(
                (data) => {
                    setData(data.data);
                    setLoading(false);
                },
                (error) => {
                    console.log(error.message);
                },
                categoryValue,
                minPrice,
                maxPrice,
            fuelType  ,
        steeringValue ,
    personsValue,
makeValue ,
modelValue     );
    };
    const handleTypeValue=(e)=>{
        setCategoryValue(e.target.id)
        getCars(e.target.id,minPrice,maxPrice,fuelType,steeringValue,personsValue,makeValue,modelValue)
    }
    const handleFuelTypeChange=(e)=>{
        setFuelType(e.target.id);
        getCars(categoryValue,minPrice,maxPrice,e.target.id,steeringValue,personsValue,makeValue,modelValue)
    }
    const handleSteeringChange=(e)=>{
        console.log(e.target.id)
        setSteeringValue(e.target.id)
        getCars(categoryValue,minPrice,maxPrice,fuelType,e.target.id,personsValue,makeValue,modelValue)
    }
    const handlePersonsValue=(e)=>{
        setPersonsValue(e.target.id)
        getCars(categoryValue,minPrice,maxPrice,fuelType,steeringValue,e.target.id,makeValue,modelValue)
    }
    const handleMake=(e)=>{
        setMakeValue(e.target.value)
        getCars(categoryValue,minPrice,maxPrice,fuelType,steeringValue,personsValue,e.target.value,modelValue)
    }

    const handleModel=(e)=>{
        setModelValue(e.target.value)
        getCars(categoryValue,minPrice,maxPrice,fuelType,steeringValue,personsValue,makeValue,e.target.value)
    }
    const Reset=()=>{
        getCars('',0,2000,'','','','','')
    }
    const toggleShowDrop=()=>{
        setShow(!show)
    }
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
    const types=['SUV','Sedan','Hatchback','Convertible','Crossover','Minivan','Pickup trucks','Station Wagon'] 
    const fuel_type=['gas','diesel','electricity'] 
    const steering=['Manual','Automatic'] 
    const persons=['2','4 ','5 ','6', '7',' 8'] 
    
    return (
       
            <div className="d-flex flex-wrap justify-evenly bg-slate-100 w-100  ">
                <div className="col-5 col-md-2 bg-white p-3">
                <div className="d-flex justify-content-center btn btn-primary align-items-center" onClick={Reset}> <span className="fs-5 ">Reset To all cars</span> <TbFilterSearch size={40}/></div>
                <div className="pt-3 d-flex align-items-center">
                <span className="text-muted  fs-5 px-1">Make:</span>
 
                    <div className="w-70">
                        <input type="text" className="border px-2 py-1 w-100 "  placeholder="Enter make" onChange={handleMake}/>
                      
                    </div>
         
                </div>
                <div className="pt-2  pb-3 d-flex align-items-center">
                <span className="text-muted  fs-5 px-1">Model:</span>
 
                    <div className="w-70">
                        <input type="text" className="border px-2 py-1 w-100 "  placeholder="Enter model" onChange={handleModel}/>
                      
                    </div>
         
                </div>
                <hr />
                <div className="py-4">
                <span className="text-muted mt-3 fs-5">Type</span>
 
                    <div className="type-list" onChange={handleTypeValue} >

                        {types.map((item)=>(
                                       <div class="form-check">
                                       <input class="form-check-input" type="radio" name='type' id={item}/>
                                       <label class="form-check-label" for={item}>
                                         {item}
                                       </label>
                                       </div>
                        ))}
                    </div>
         
                </div>
                <hr />
                <div className="py-2">
                <span className="text-muted mt-1 fs-5 d-flex gap-2 align-items-center">Fuel type                                 <FaGasPump className="icon" /></span>
 
                    <div className="type-list" onChange={handleFuelTypeChange}>

                        {fuel_type.map((item)=>(
                                       <div class="form-check">
                                       <input class="form-check-input" type="radio" name='fuel_type' id={item}/>
                                       <label class="form-check-label" for={item}>
                                         {item}
                                       </label>
                                       </div>
                        ))}
                    </div>
         
                </div>
                <hr />
                <div className="py-2">
                <span className="text-muted mt-1 fs-5 d-flex align-items-center gap-2">Steering                         <GiSteeringWheel className="icon" />
</span>
 
                    <div className="type-list" onChange={handleSteeringChange}>

                        {steering.map((item)=>(
                                       <div class="form-check">
                                       <input class="form-check-input" type="radio" name='steering' id={item}/>
                                       <label class="form-check-label" for={item}>
                                         {item}
                                       </label>
                                       </div>
                        ))}
                    </div>
         
                </div>
                <hr />
                <div className="py-2">
                <span className="text-muted mt-1 fs-5 d-flex align-items-center gap-2">Capacity                              <BsPeopleFill className="icon" />
                
</span>
 
                    <div className="type-list" onChange={handlePersonsValue}>

                        {persons.map((item)=>(
                                       <div class="form-check">
                                       <input class="form-check-input" type="radio" name='seats' id={item}/>
                                       <label class="form-check-label" for={item}>
                                         {item} person
                                       </label>
                                       </div>
                        ))}
                    </div>
         
                </div>
                <hr />
                <div className="py-2">
                <span className="text-muted mt-1 fs-5 d-flex align-items-center gap-2">Price Per Day  
                
</span>
 
                    <div className="type-list">
                        <div className="price-content">
                        <div className="price-item">
                            <label htmlFor="">Min</label>
                            <p id="min-value" className="m-0">{minPrice} ₪</p>
                        </div>
                        <div className="price-item">
                            <label htmlFor="">Max</label>
                            <p id="max-value" className="m-0">{maxPrice} ₪</p>
                        </div> 
                        </div>
                        <div className="range-slider">
                            <div className="range-fill" style={{ width: rangeFillWidth ,
                                left: rangeFillLeft==='-2.5%'?'0%':rangeFillLeft
                             }}></div>
                            <input type="range" className="min-price " name="min_price"  min="0" max="2000" step="50" value={minPrice} onChange= {handleMinPriceChange} />
                            <input type="range" className="max-price " name="max_price" min="0" max="2000" step="50"  value={maxPrice} onChange= {handleMaxPriceChange}/>
                        </div>
              
                    </div>
         
                </div>
                </div>
                <div className="col-6 col-md-10  d-flex flex-wrap justify-evenly">
            {loading ? (
                                        <div className=" d-flex justify-center align-middle">

                <Loading />
                </div>
            ) : (
                data.length>0 ?data.map((item, index) => (
                    <CarCard
                        key={item.id}
                        item={item}
                        index={index}
                        toggleFavorite={() => toggleFavorite(item.id)}
                        favoriteList={favoriteList}
                        className={"align-self-start"}
                    />
                )):<div className="fs-4 fw-bold  bg-white align-self-start p-5 rounded mt-5"> No Cars have these features </div>
            )}
            </div>
        </div>
    );
}

export default Cars;
