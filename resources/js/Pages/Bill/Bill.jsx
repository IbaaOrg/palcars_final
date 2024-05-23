import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import imgpaypal from "../../../../public/image/paypal.png";
import imgbank from "../../../../public/image/bank.png";
import imgvisa from "../../../../public/image/visa.png";
import imgcash from "../../../../public/image/cash.png";
import axios from "axios";
import { AiOutlineSafety } from "react-icons/ai";
import { A11y } from "swiper/modules";
import { UserContext } from "../../Context/User";
import { ToastContainer, toast } from "react-toastify";
import { Bounce, Zoom } from "react-toastify";
import DialogTitle from '@mui/material/DialogTitle';
import { CiDiscount1 } from "react-icons/ci";
//import { DialogTitle } from ".mui/material";
import Dialog from "@mui/material/Dialog";
import { PiTimerBold } from "react-icons/pi";
import { MdOutlinePriceCheck } from "react-icons/md";
//import { Dialog } from ".mui/material";
import moment from 'moment';

import { height, margin, padding, width } from "@mui/system";
const Bill = () => {
    const [openDialog, handleDisplay] = React.useState(false);
    const[resultBill,setResultBill]=useState('');
    const handleClose = () => {
       handleDisplay(false);
    };
 
    const openDialogBox = () => {
       handleDisplay(true);
    };
  
    // Define your custom styles
const dialogStyle = {
    width:"80%",
    height:"300px",
  };
    const buttonStyle = {
       width: "10rem",
       fontsize: "1.5rem",
       height: "2rem",
       padding: "5px",
       borderRadius: "10px",
       backgroundColor: "green",
       color: "White",
       border: "2px solid yellow",
    };
    const divStyle = {
       display: "flex",
       felxDirection: "row",
       position: "absolute",
       right: "0px",
       bottom: "0px",
    //    paddingTop: "3rem",
    };
    const confirmButtonStyle = {
       width: "5rem",
       height: "2rem",
       fontsize: "1rem",
       backgroundColor: "#0d6efd",
       color: "white",
       margin: "40px 5px 10px",
       borderRadius: "5px",
       border: "1px solid white",
    };
    const { id } = useParams();
    const [price, setPrice] = useState("");
    const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
    const { user } = useContext(UserContext);
    const [selectedMethos, setSelectedMethod] = useState("");
    const location = useLocation();
    const { car } = location.state;
    const [inputPickupValue, setInputPickupValue] = useState("");
    const [inputDropoffValue, setInputDropoffValue] = useState("");
    const [showPickupList, setShowPickupList] = useState(true);
    const [showDropoffList, setShowDropoffList] = useState(true);
    const [arrayPickup, setArrayPickup] = useState([]);
    const [arrayDropoff, setArrayDropoff] = useState([]);
    const [filteredPickupLocations, setFilterePickupLocations] = useState([]);
    const [filteredDropoffLocations, setFilteredDropoffLocations] = useState(
        []
    );
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [userName, setUserName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pickuplocationId, setPickuplocationId] = useState("");
    const [dropofflocationId, setDropofflocationId] = useState("");
    const [methodId, setMethodId] = useState("");
    const [cityId, setCityId] = useState("");
    const [carId, setCarId] = useState("");
    const [carOwner, setCarOwner] = useState("");
    const [disoucntId, setDiscountId] = useState("");
    const [showCity, setShowCity] = useState(false);
    const [arrayCity, setArrayCity] = useState([]);
    const [filteredCity, setFilteredCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ownerUser,setOwnerUser]=useState(car.owneruser.id);
    const [step2,setStep2]=useState(false);
    const [step3,setStep3]=useState(false);
    const [step4,setStep4]=useState(false);
    const [step5,setStep5]=useState(false);
    const[totalPrice,setTotalPrice]=useState(0);4
    const[disabledDate,setDisabledDate]=useState([]);
    const [enabledDates, setEnabledDates] = useState([]);
    const [availableTimes,setAvailableTimes]=useState({});
    const [totalDays,setTotalDays]=useState('');
    const [totalHours,setTotalHours]=useState('');
    const [discountVal,setDiscountVal]=useState('');
    const navigate=useNavigate();
    function todayDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return `${year}-${month}-${day}`;
    }
    const pickuplocations = [];

    const getPickup = async () => {
        const res = await axios.get(`/alllocationpickup/${ownerUser}`);
        setArrayPickup(await res.data.data.locations);
    };
    const dropofflocations = [];

    const getDropoff = async () => {
        const res = await axios.get(`/alllocationdropoff/${ownerUser}`);
        setArrayDropoff(await res.data.data.locations);
    };
    const getCities = async () => {
        const res = await axios.get("/showallcities");
        setArrayCity(await res.data.data);
    };
    const getDatesInRange=(startDate,endDate)=>{
        const dates=[];
        const currentDate=new Date(startDate);
        while (currentDate<=endDate){
            const dateString=currentDate.toISOString().slice(0, 10);
            dates.push(dateString)
            currentDate.setDate(currentDate.getDate()+1)
        }
        return dates;
    }
    const getBillsOnCar=async (id)=>{
        const token=localStorage.getItem('token');
        const response= await axios.get (`/showAllBillsOnCar/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        const disabledDates=response.data.data.reduce((acc,bill)=>{
            const startDate=new Date(bill.start_date);
            const endDate=new Date(bill.end_date);
            const datesInRange=getDatesInRange(startDate,endDate);
            return acc.concat(datesInRange);
        },[])
        setDisabledDate(disabledDates)
    }
    const fetchEnabledDate=async()=>{

        const response=await axios.get(`/showAll/${id}`)
        const dates = response.data.data.map(date => date.date);
        const times = response.data.data.reduce((acc,entry)=>{
            acc[entry.date]={start: entry.start_time, end: entry.end_time}
            return acc;

        })

        setEnabledDates(dates);
        setAvailableTimes(times)
      }
      const checkDicount=()=>{
       if(user.points==5 || user.points==10||user.points==15){
        setDiscountVal(0.05);
       }else if(user.points==20 || user.points==25||user.points==30){
        setDiscountVal(0.1);
       }else if(user.points==35 || user.points==40||user.points==45){
        setDiscountVal(0.1);
       }else if (user.points==50|| user.points >50 ){
        setDiscountVal(0.2);

       }
      }
      useEffect(() => {
        fetchEnabledDate();
    }, [id]);
    useEffect(() => {
        getPickup();
        getDropoff();
        getCities();
        setCarId(id);
        getBillsOnCar(id);
        fetchEnabledDate();
        checkDicount();
    }, []);
    useEffect(() => {
        const pickuplocations = arrayPickup.filter(
            (location) =>
                location.location
                    .toLowerCase()
                    .includes(inputPickupValue.toLowerCase()) ||
                location.city.city
                    .toLowerCase()
                    .includes(inputPickupValue.toLowerCase())
        );
        setFilterePickupLocations(pickuplocations);
    }, [inputPickupValue, arrayPickup]);
    useEffect(() => {
        const dropofflocations = arrayDropoff.filter(
            (location) =>
                location.location
                    .toLowerCase()
                    .includes(inputDropoffValue.toLowerCase()) ||
                location.city.city
                    .toLowerCase()
                    .includes(inputDropoffValue.toLowerCase())
        );
        setFilteredDropoffLocations(dropofflocations);
    }, [inputDropoffValue, arrayDropoff]);
    useEffect(() => {
        const cities = arrayCity.filter((cityName) =>
            cityName.city.toLowerCase().includes(city.toLowerCase())
        );
        setFilteredCity(cities);
    }, [city, arrayCity]);
    useEffect(() => {
        if (car && car.prices) {
            setPrice(car.prices[car.prices.length - 1].price);
            setPriceAfterDiscount(
                car.prices[car.prices.length - 1].price_after_discount
            );
        }
    });
   

    arrayPickup.map((location) => {
        pickuplocations.push(location.location);
    });
    arrayDropoff.map((location) => {
        dropofflocations.push(location.location);
    });
    const handelMethodChange = (e) => {
        setSelectedMethod(e.target.value);
        if (e.target.value === "creditcard") {
            setMethodId("1");
        } else if (e.target.value === "paypal") {
            setMethodId("2");
        } else if (e.target.value === "cash") {
            setMethodId("3");
        } else if (e.target.value === "banktransfer") {
            setMethodId("4");
        }
    };
    const handlePickupInputChange = (e) => {
        setInputPickupValue(e.target.value);
        setShowPickupList(true);
    };
    const handleDropoffInputChange = (e) => {
        setInputDropoffValue(e.target.value);
        setShowDropoffList(true);
    };
    const handlePickupLocationClick = (location, id) => {
        setInputPickupValue(location);
        setPickuplocationId(id);
        setShowPickupList(false);
    };
    const handleDropoffLocationClick = (location, id) => {
        setInputDropoffValue(location);
        setDropofflocationId(id);
        setShowDropoffList(false);
    };
    const handleCityClick = (city) => {
        setCity(city.city);
        setCityId(city.id);
        setShowCity(false);
    };
    const isDateDisabled=(date)=>{
        const formattedDate=moment(date).format('YYYY-MM-DD')
        return disabledDate.includes(formattedDate)
    }   
    const handelStartDate = (e) => {
        const selctedDate=e.target.value;
        if(isDateDisabled(selctedDate)){
            console.log("this car rented from another in this date")
            // alert("This car is rented by another person on this date.");
            toast.error("This car is rented by another person on this date , please change it !", {
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
        }else if(!enabledDates.includes(selctedDate)){
            toast.error("Owner company of car isn't work in this day , please change it !", {
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
        } else{
            setStartDate(e.target.value);
        }
    };
    const handelEndDate = (e) => {
        const selectedDate=e.target.value;
        if(isDateDisabled(selectedDate)){
            toast.error("This car is rented by another person on this day ", {
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
            // alert(" This car is rented by another person on this date.");
        }else if(!enabledDates.includes(selectedDate)){
            toast.error("Owner company of car isn't work in this day", {
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
        }else {
            setEndDate(e.target.value);
        }
    };
    const handelStartTime =  (e) => {
        const selectedTime = e.target.value;
        const { start, end } = availableTimes[startDate];
        const formattedStartTime = moment(start, 'HH:mm').format('h:mm A');
        const formattedEndTime = moment(end, 'HH:mm').format('h:mm A');
        // Check if the selected time is within the available range
        if (selectedTime < start || selectedTime > end) {
            // If not, reset to the nearest valid time within the range
            toast.error(`in ${startDate} this company work from ${formattedStartTime} to ${formattedEndTime}`, {
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
        } else {
            // If within the range, update the state with the selected time
            setStartTime(selectedTime);
        }    };
    const handelEndTime = (e) => {
        const selectedTime = e.target.value;
        const { start, end } = availableTimes[endDate];
     const formattedStartTime = moment(start, 'HH:mm').format('h:mm A');
     const formattedEndTime = moment(end, 'HH:mm').format('h:mm A');
        // Check if the selected time is within the available range
        if (selectedTime < start || selectedTime > end) {
            // If not, reset to the nearest valid time within the range
            toast.error(`in ${endDate} this company work from ${formattedStartTime} to ${formattedEndTime} `, {
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
        } else {
            // If within the range, update the state with the selected time
            setEndTime(selectedTime);
        }    };

    const handelValues = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.post(
                    `/storeBill`,
                    {
                        name: userName,
                        phone: phoneNumber,
                        address: address,
                        city_id: cityId,
                        car_id: carId,
                        method_id: methodId,
                        start_date: startDate,
                        end_date: endDate,
                        start_time: startTime,
                        end_time: endTime,
                        pickup_location_id: pickuplocationId,
                        dropoff_location_id: dropofflocationId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setResultBill(response.data.data);
                openDialogBox();
                setLoading(false);
            } catch (error) {
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
    };
    const navigateToReport=()=>{
        navigate('/report',{state:{resultBill,discountVal}});
    }
    const NextStep2=()=>{
        setStep2(true);
    }
    const NextStep3=()=>{
        setStep3(true);
    }
    const NextStep4=()=>{
        setStep4(true);
    }
    const NextStep5=()=>{
        setStep5(true);
    }
    useEffect(()=>{
        const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startDateObj = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);

    // Parse end date and time
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const endDateObj = new Date(endYear, endMonth - 1, endDay, endHour, endMinute);

    // Calculate milliseconds between start and end date-time
    const timeDiffInMillis = endDateObj.getTime() - startDateObj.getTime();

    // Convert milliseconds to hours
    const hours = timeDiffInMillis / (1000 * 60 * 60);
    const days = Math.floor(timeDiffInMillis / (1000 * 60 * 60 * 24));
    const remainingHours = (timeDiffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
    setTotalDays(days);
    setTotalHours(remainingHours);
    setTotalPrice(car.prices[0].price_per_hour*hours);
    },[startDate,startTime,endDate,endTime])
   
    return (
        <>
            <ToastContainer />
            <div className="d-flex flex-column  bg-slate-100  w-100 ">
                <div className="d-flex flex-wrap  justify-content-between billinfo">
                    <div className="col-12 col-md-7 bg-white rounded py-3 px-5 mt-5 mb-3">
                        <h2 className="fw-bold fs-5 py-2">Billing Info</h2>
                        <div className="d-flex justify-content-between text-slate-400">
                            <span>Please enter your billing info</span>
                            <span>step 1 of 5</span>
                        </div>

                        <div className="billing-body">
                            <div className="row">
                                <div className="col  d-flex  flex-column">
                                    <label
                                        for="Name"
                                        className="fw-bold rounded"
                                    >
                                        Name
                                    </label>
                                    {user && (
                                        <input
                                            type="text"
                                            name="name"
                                            id="Name"
                                            placeholder="Your full name"
                                            className="form-label py-3 bg-slate-100 rounded px-3 my-2"
                                            value={user.name}
                                            onChange={(e) => {
                                                setUserName(e.target, value);
                                            }}
                                            disabled
                                        />
                                    )}
                                </div>
                                <div className="col d-flex flex-column">
                                    <label
                                        for="phone"
                                        className="fw-bold rounded"
                                    >
                                        Phone Number
                                    </label>
                                    {user && (
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Your phone Number"
                                            className="form-label py-3 bg-slate-100 rounded px-3 my-2"
                                            value={user.phone}
                                            onChange={(e) => {
                                                setPhoneNumber(e.target, value);
                                            }}
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex flex-column ">
                                    <label for="address" className="fw-bold">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Your Address"
                                        className="form-label py-3 bg-slate-100 rounded px-3 my-2"
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col d-flex flex-column">
                                    <label for="city" className="fw-bold">
                                        City
                                    </label>
                                    <div className="mainlist">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            placeholder="Town Or City"
                                            className="form-label py-3 bg-slate-100 rounded px-3 my-2 w-100"
                                            value={city}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                                setShowCity(true);
                                            }}
                                        />
                                        {city && showCity && (
                                            <ul className="autocomplete-list h-120 border">
                                                {filteredCity.map(
                                                    (city, index) => (
                                                        <li
                                                            key={city.id}
                                                            onClick={() => {
                                                                handleCityClick(
                                                                    city
                                                                );
                                                            }}
                                                            className="autocomplete-item"
                                                        >
                                                            {city.city} city
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="submit" value={"Next Step"} onClick={NextStep2} className="btn btn-primary"/>

                    </div>
                    <div className="col-12 col-md-4 bg-white rounded  mt-5 mb-3 px-5 py-4">
                        <h2 className="fw-bold px-2">Rental Summary</h2>
                        <p className="text-start">{car.description}</p>
                        <div className="d-flex gap-2 flex-wrap">
                            {car.sub_images && car.sub_images.length > 0 && (
                                <img
                                    src={car.sub_images[0].photo_car_url}
                                    alt=""
                                    width={"270px"}
                                    height={"270px"}
                                    className="border-rounded imgcarbill"
                                />
                            )}
                            <div className="d-flex flex-column justify-content-center ">
                                <h3 class="carname">{car.model}</h3>
                                <h3 className="py-3">make by {car.make}</h3>
                                <div className="d-flex">
                                    {[...Array(5)].map((_, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className={`${
                                                    index + 1 <= 4
                                                        ? "selected"
                                                        : ""
                                                } fs-5 fw-bold mx-1`}
                                            >
                                                &#9733;
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <hr className="text-slate-400 mt-4" />
                        <div className="fw-bold d-flex flex-column align-items-start">
                            {price === priceAfterDiscount ? (
                                <>
                                    <p>Price per day : {price}₪</p>
                                    <p>Total price: {totalPrice?Math.ceil(totalPrice):0} ₪</p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Price before discount :{" "}
                                        <span className="text-primary">
                                            {price} ₪ / day
                                        </span>
                                    </p>
                                    <p>
                                        Price per day :
                                        <span className="text-primary">
                                            {priceAfterDiscount} ₪ / day
                                        </span>
                                    </p>
                                    <p>Total price: {totalPrice?Math.ceil(totalPrice):0} ₪</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {step2&&<div className="  billpay  mt-4 mb-4 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Rental Info</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Please enter your rental date</span>
                        <span>step 2 of 5</span>
                    </div>

                    <div className="billing-body d-flex justify-content-between flex-wrap  mb-5">
                        <div className="col-md-5  col-10 mx-3 ">
                            <div className="col  d-flex flex-column">
                                <label
                                    for="pickup"
                                    className="fw-bold fs-5 mb-2 rounded"
                                >
                                    Pickup
                                </label>
                                <div className="row  " id={"pickup"}>
                                    <label
                                        htmlFor="locationpick"
                                        className="fw-bold  "
                                    >
                                        Location{" "}
                                    </label>
                                    <div className="mainlist ">
                                        <input
                                            type="text"
                                            className="form-label py-3 bg-slate-100 rounded px-3 my-2 w-100"
                                            id="locationpick"
                                            placeholder={"Enter location "}
                                            value={inputPickupValue}
                                            onChange={handlePickupInputChange}
                                        />
                                        {inputPickupValue && showPickupList && (
                                            <ul className="autocomplete-list h-120 border">
                                                {filteredPickupLocations.map(
                                                    (location, index) => (
                                                        <li
                                                            key={index}
                                                            onClick={() => {
                                                                handlePickupLocationClick(
                                                                    location.location,
                                                                    location.id
                                                                );
                                                            }}
                                                            className="autocomplete-item"
                                                        >
                                                            {location.location}
                                                            <p className="text-primary">
                                                                In
                                                                {
                                                                    location
                                                                        .city
                                                                        .city
                                                                }
                                                                City
                                                            </p>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="startDatepick"
                                            className="form-label fw-bold"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            class="form-control"
                                            id="startDatepick"
                                            min={enabledDates.length > 0 ? enabledDates[0] : todayDate()}
                                            max={enabledDates.length > 0 ? enabledDates[enabledDates.length - 1] : todayDate()}                                            value={startDate}
                                            onChange={handelStartDate}

                                        />
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="startTimepick"
                                            className="form-label fw-bold"
                                        >
                                            Time
                                        </label>
                                        <input
                                        type="time"
                                        className="form-control"
                                        id="startTimepick"
                                        value={startTime}
                                        onChange={handelStartTime}
                                        min={startDate && availableTimes[startDate] ? availableTimes[startDate].start : '00:00'}
                                        max={startDate && availableTimes[startDate] ? availableTimes[startDate].end : '23:59'}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-10 mx-3">
                            <div className="col  d-flex  flex-column">
                                <label
                                    for="dropoff"
                                    className="fw-bold  fs-5 mb-2 rounded"
                                >
                                    Dropoff{" "}
                                </label>
                                <div className="row" id={"dropoff"}>
                                    <label
                                        htmlFor="inputlocation"
                                        className="fw-bold  "
                                    >
                                        Location{" "}
                                    </label>
                                    <div className="mainlist">
                                        <input
                                            type="text"
                                            className="form-label py-3 bg-slate-100 rounded px-3 my-2 w-100"
                                            id="inputlocation"
                                            placeholder="Enter location"
                                            value={inputDropoffValue}
                                            onChange={handleDropoffInputChange}
                                        />
                                        {inputDropoffValue &&
                                            showDropoffList && (
                                                <ul className="autocomplete-list h-120 border">
                                                    {filteredDropoffLocations.map(
                                                        (location, index) => (
                                                            <li
                                                                key={index}
                                                                className="autocomplete-item"
                                                                onClick={() => {
                                                                    handleDropoffLocationClick(
                                                                        location.location,
                                                                        location.id
                                                                    );
                                                                }}
                                                            >
                                                                {
                                                                    location.location
                                                                }
                                                                <p className="text-primary">
                                                                    In{" "}
                                                                    {
                                                                        location
                                                                            .city
                                                                            .city
                                                                    }{" "}
                                                                    City
                                                                </p>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                    </div>

                                    <div class="col-12 col-md-6">
                                        <label
                                            for="endDate"
                                            className="form-label fw-bold"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            class="form-control "
                                            id="endDate"
                                            min={enabledDates.length > 0 ? enabledDates[0] : startDate}
                                            max={enabledDates.length > 0 ? enabledDates[enabledDates.length - 1] : startDate}
                                            value={endDate}
                                            onChange={handelEndDate}
                                        />
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="endTime"
                                            className="form-label fw-bold"
                                        >
                                            Time
                                        </label>
                                        <input
                                        type="time"
                                        className="form-control"
                                        id="endTime"
                                        value={endTime}
                                        onChange={ handelEndTime}
                                        min={endDate && availableTimes[endDate] ? availableTimes[endDate].start : '00:00'}
                                        max={endDate && availableTimes[endDate] ? availableTimes[endDate].end : '23:59'}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value={"Next Step"} onClick={NextStep3} className="btn btn-primary"/>

                </div>}

              {step3&&<div className="  billpay mt-4 mb-4 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Payment Info</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                    <span>Please check this payment info , each rental you gain 5 points </span>
                    <span>{`5 - 19 points -> 5% , 20 - 34 points -> 10% , 35 - 49 points -> 15%, greater than 50 -> 20% `} </span>
                        <span>step 3 of 5</span>
                    </div>

                    <div className="billing-body d-flex  justify-content-around gap-5 flex-wrap  mb-5">
                        <div className="d-flex flex-column align-items-center justif-content-center gap-2">
                        <PiTimerBold  size={100}/>

                            <label className="fs-5 fw-bold">Rental period</label>
                            <span className="fs-5 fw-bold p-3">{totalDays&&totalDays>1?`${totalDays} Days`:`${totalDays} Day`}  {totalHours&&totalHours>1?`and ${Math.ceil(totalHours)} Hours`:`and ${Math.ceil(totalHours)} Hour`}</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justif-content-center  gap-2">
                            <MdOutlinePriceCheck size={100}/>

                            <label className="fs-5 fw-bold">Total price: </label>
                            <span className="fs-5 fw-bold p-3">{totalPrice?Math.ceil(totalPrice):0} ₪</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justif-content-center  gap-2">
                            <CiDiscount1 size={100}/>
                            <label className="fs-5 fw-bold">Total Points: </label>
                            <span className="fs-5 fw-bold p-3">{user.points>0 ? user.points  : 'no' } point</span>
                            </div>
                            {user.points>0 ? <div className="d-flex flex-column align-items-center justif-content-center  gap-2">
                            <MdOutlinePriceCheck size={100}/>
                            <label className="fs-5 fw-bold">Price After Discount: </label>
                            <span className="fs-5 fw-bold p-3">{user.points>0  &&(Math.ceil(totalPrice) - Math.ceil(Math.ceil(totalPrice) *  discountVal)) } ₪</span>
                            </div>:''}
</div>
<div className="w-100 d-flex justify-content-start">
<input type="submit" value={"Check"} onClick={NextStep4} className="btn btn-primary"/>

</div>

                </div>
}
{step4&&<div className="  billpay mt-4 mb-4 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Payment Info</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Please enter your payment method</span>
                        <span>step 4 of 5</span>
                    </div>

                    <div className="billing-body d-flex flex-column flex-wrap gap-3">
                        <label
                            className=" d-flex flex-wrap flex-column bg-slate-100  rounded px-3"
                            htmlFor="creditcard"
                        >
                            <div className="d-flex ">
                                <input
                                    type="radio"
                                    name="method"
                                    id="creditcard"
                                    value={"creditcard"}
                                    onChange={handelMethodChange}
                                />
                                <div className="col-md-6 col-12 d-flex flex-wrap w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">
                                    Credit Card
                                    <img
                                        src={imgvisa}
                                        alt=""
                                        width={"80px"}
                                        height={"60px"}
                                    />
                                </div>
                            </div>
                            {selectedMethos === "creditcard" ? (
                                <div className="d-flex flex-wrap p-3 justify-content-around align-items-center ">
                                    <div className="d-felx justify-content-center align-items-center  col-12 col-md-4">
                                        <div className="d-flex flex-column">
                                            <label
                                                htmlFor="cardnumber "
                                                className="fw-bold py-2"
                                            >
                                                CardNumber
                                            </label>
                                            <input
                                                type="text"
                                                id="cardnumber"
                                                name="cardnumber"
                                                placeholder="CardNumber"
                                                className="form-label py-3 bg-white-100 rounded px-3 my-2 "
                                            />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <label
                                                htmlFor="expdate"
                                                className="fw-bold py-2"
                                            >
                                                Expiration Date
                                            </label>
                                            <input
                                                type="date"
                                                id="expdate"
                                                name="expdate"
                                                placeholder="DD/MM/YY"
                                                className="form-label py-3 bg-white-100 rounded px-3 my-2 "
                                                min={todayDate()}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-felx  col-12 col-md-4">
                                        <div className="d-flex flex-column">
                                            <label
                                                htmlFor="cardholder"
                                                className="fw-bold py-2"
                                            >
                                                CardHolder
                                            </label>
                                            <input
                                                type="text"
                                                id="cardholder"
                                                name="cardholder"
                                                placeholder="Cardholder"
                                                className="form-label py-3 bg-white-100 rounded px-3 my-2 "
                                            />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <label
                                                htmlFor="expdate"
                                                className="fw-bold py-2"
                                            >
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                id="cvc"
                                                name="cvc"
                                                placeholder="cvc"
                                                className="form-label py-3 bg-white-100 rounded px-3 my-2 "
                                            />
                                        </div>
                                    </div>{" "}
                                </div>
                            ) : (
                                <></>
                            )}
                        </label>
                        <label
                            className="col d-flex flex-column bg-slate-100  rounded px-3"
                            htmlFor="paypal"
                        >
                            <div className="d-flex">
                                <input
                                    type="radio"
                                    name="method"
                                    id="paypal"
                                    value={"paypal"}
                                    onChange={handelMethodChange}
                                />
                                <div className="d-flex w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">
                                    Pay Pal
                                    <img
                                        src={imgpaypal}
                                        alt=""
                                        width={"80px"}
                                        height={"60px"}
                                    />
                                </div>
                            </div>
                            {selectedMethos === "paypal" ? (
                                <div>paypal</div>
                            ) : (
                                <></>
                            )}
                        </label>
                        <label
                            className="col d-flex  flex-column bg-slate-100 rounded px-3"
                            htmlFor="bank"
                        >
                            <div className="d-flex">
                                <input
                                    type="radio"
                                    name="method"
                                    id="bank"
                                    value={"banktransfer"}
                                    onChange={handelMethodChange}
                                />
                                <div className="d-flex w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">
                                    Bank Transfer
                                    <img
                                        src={imgbank}
                                        alt=""
                                        width={"80px"}
                                        height={"60px"}
                                    />
                                </div>
                            </div>
                            {selectedMethos === "banktransfer" ? (
                                <div>bank</div>
                            ) : (
                                <></>
                            )}
                        </label>
                        <label
                            className="col d-flex flex-column bg-slate-100  rounded px-3"
                            htmlFor="cash"
                        >
                            <div className="d-flex">
                                <input
                                    type="radio"
                                    name="method"
                                    id="cash"
                                    value={"cash"}
                                    onChange={handelMethodChange}
                                />
                                <div className="d-flex w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">
                                    Cash{" "}
                                    <img
                                        src={imgcash}
                                        alt=""
                                        width={"70px"}
                                        height={"60px"}
                                    />
                                </div>
                            </div>
                            {selectedMethos === "cash" ? (
                                <div>cash</div>
                            ) : (
                                <></>
                            )}
                        </label>
                    </div>
                    <input type="submit" value={"Next Step"} onClick={NextStep5} className="btn btn-primary"/>

                </div>
}
                {step5&&<div className="billpay mt-4 mb-4 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Confirmation</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Just check . and your renatl is ready</span>
                        <span>step 5 of 5</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <AiOutlineSafety size={60} />

                        <p className="text-start fw-bold">
                            All your data are in safe
                        </p>
                        <input
                            type="submit"
                            value={loading ? "Loading..." : "Check rental"}
                            className="btn btn-primary rounded-md px-3 py-2 fw-bold my-3"
                            onClick={handelValues}
                        />
                    </div>
                </div>}
                
            </div>
            <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle style = {{  padding: "40px 40px 10px" }}> Confirm Dialog </DialogTitle>
            <h3 style = {{ marginTop: "-10px", padding: "20px 40px 30px" ,fontSize:"20px"}}>
                  Are you sure to check this bill? {" "}
            </h3>
            <br></br>
            <div style = {divStyle}>
               <button style = {confirmButtonStyle} onClick = {navigateToReport}>
                  Confirm
               </button>
               <button style = {confirmButtonStyle} onClick = {handleClose}>
                  Cancel
               </button>
            </div>
         </Dialog>
        </>
    );
};

export default Bill;
