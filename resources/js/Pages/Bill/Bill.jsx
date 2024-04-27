import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
const Bill = () => {
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
    const [disoucntId, setDiscountId] = useState("");
    const [showCity, setShowCity] = useState(false);
    const [arrayCity, setArrayCity] = useState([]);
    const [filteredCity, setFilteredCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ownerUser,setOwnerUser]=useState(car.owneruser.id);
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
    useEffect(() => {
        getPickup();
        getDropoff();
        getCities();
        setCarId(id);
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
        console.log(car)
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
    const handelStartDate = (e) => {
        setStartDate(e.target.value);
    };
    const handelEndDate = (e) => {
        setEndDate(e.target.value);
    };
    const handelStartTime = (e) => {
        setStartTime(e.target.value);
    };
    const handelEndTime = (e) => {
        setEndTime(e.target.value);
    };

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
                console.log(response)
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

    return (
        <>
            <ToastContainer />
            <div className="d-flex flex-column  bg-slate-100  w-100 ">
                <div className="d-flex flex-wrap  justify-content-between billinfo">
                    <div className="col-12 col-md-7 bg-white rounded py-3 px-5 my-5">
                        <h2 className="fw-bold fs-5 py-2">Billing Info</h2>
                        <div className="d-flex justify-content-between text-slate-400">
                            <span>Please enter your billing info</span>
                            <span>step 1 of 4</span>
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
                    </div>
                    <div className="col-12 col-md-4 bg-white rounded  my-5 px-5 py-4">
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
                                    <p>Total price: {priceAfterDiscount} ₪</p>
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
                                        Price per day :{" "}
                                        <span className="text-primary">
                                            {price.price_after_discount} ₪ / day
                                        </span>
                                    </p>
                                    <p>Total price: {price.price} ₪</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="  billpay mt-2 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Rental Info</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Please enter your rental date</span>
                        <span>step 2 of 4</span>
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
                                            for="startDatepick"
                                            className="form-label fw-bold"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            class="form-control"
                                            id="startDatepick"
                                            min={todayDate()}
                                            value={startDate}
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
                                            class="form-control"
                                            id="startTimepick"
                                            value={startTime}
                                            onChange={handelStartTime}
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
                                            min={startDate}
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
                                            class="form-control"
                                            id="endTime"
                                            value={endTime}
                                            onChange={handelEndTime}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="  billpay mt-5 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Payment Method</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Please enter your payment method</span>
                        <span>step 3 of 4</span>
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
                            htmlFor="creditcard"
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
                </div>
                <div className="billpay mt-5 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Confirmation</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Just check . and your renatl is ready</span>
                        <span>step 4 of 4</span>
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
                </div>
            </div>
        </>
    );
};

export default Bill;
