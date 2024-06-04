import React, { useContext, useEffect, useState } from "react";
import "../../../css/app.css";
import { TranslateContext } from "./../../Context/Translate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CardBasic({ title }) {
    const [toggle, setToggle] = useState(false);
    const [arraypickup, setArraypickup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [arraydropoff, setArraydropoff] = useState([]);
    const [arraypickupdropoff, setArraypickupdropoff] = useState([]);
    const [inputPickupValue, setInputPickupValue] = useState("");
    const [inputDropoffValue, setInputDropoffValue] = useState("");
    const [inputPickupDropoffValue, setInputPickupDropoffValue] = useState("");
    const [filteredPickupLocations, setFilterePickupLocations] = useState([]);
    const [filteredDropoffLocations, setFilteredDropoffLocations] = useState(
        []
    );
    const [filteredPickupDropoffLocations, setFilteredPickupDropoffLocations] =
        useState([]);
    const [finalPickupValue, setFinalPickupValue] = useState("");
    const [finalDropoffValue, setFinalDropoffValue] = useState("");
    const [showDropoffPickupList, setShowDropoffPickupList] = useState(true);
    const [showPickupList, setShowPickupList] = useState(true);
    const [showDropoffList, setShowDropoffList] = useState(true);
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const [dropoffTime, setDropoffTime] = useState("");
    const navigate = useNavigate();

    const difrentLocation = () => {
        setToggle(!toggle);
    };
    const { translates } = useContext(TranslateContext);
    const pickuplocations = [];
    const getPickup = async () => {
        const res = await axios.get("/alllocationpickup");
        setArraypickup(await res.data.data);
    };
    const dropofflocations = [];
    const getDropoff = async () => {
        const res = await axios.get("/alllocationdropoff");
        setArraydropoff(await res.data.data);
    };
    const pickupdropofflocations = [];
    const getPickupDropoff = async () => {
        const res = await axios.get("/alllocationpickupdropoff");
        setArraypickupdropoff(await res.data.data);
    };
    arraypickup.map((location) => {
        pickuplocations.push(location.location);
    });
    arraydropoff.map((location) => {
        dropofflocations.push(location.location);
    });
    arraypickupdropoff.map((location) => {
        pickupdropofflocations.push(location.location);
    });
    useEffect(() => {
        getPickup();
        getDropoff();
        getPickupDropoff();
    }, []);

    useEffect(() => {
        const pickuplocations = arraypickup.filter(
            (location) =>
                location.location
                    .toLowerCase()
                    .includes(inputPickupValue.toLowerCase()) ||
                location.city.city
                    .toLowerCase()
                    .includes(inputPickupValue.toLowerCase())
        );
        setFilterePickupLocations(pickuplocations);
    }, [inputPickupValue, arraypickup]);
    useEffect(() => {
        const dropofflocations = arraydropoff.filter(
            (location) =>
                location.location
                    .toLowerCase()
                    .includes(inputDropoffValue.toLowerCase()) ||
                location.city.city
                    .toLowerCase()
                    .includes(inputDropoffValue.toLowerCase())
        );
        setFilteredDropoffLocations(dropofflocations);
    }, [inputDropoffValue, arraydropoff]);
    useEffect(() => {
        const pickupdropofflocations = arraypickupdropoff.filter(
            (location) =>
                location.location
                    .toLowerCase()
                    .includes(inputPickupDropoffValue.toLowerCase()) ||
                location.city.city
                    .toLowerCase()
                    .includes(inputPickupDropoffValue.toLowerCase())
        );
        setFilteredPickupDropoffLocations(pickupdropofflocations);
    }, [inputPickupDropoffValue, arraypickupdropoff]);

    const handelPickupInputChange = (e) => {
        setInputPickupValue(e.target.value);
        setShowPickupList(true);
    };
    const handleDropoffInputChange = (e) => {
        setInputDropoffValue(e.target.value);
        setShowDropoffList(true);
    };
    const handlePickupDropoffInputChange = (e) => {
        setInputPickupDropoffValue(e.target.value);
        setShowDropoffPickupList(true);
    };
    const handlePickupLocationClick = (location) => {
        setInputPickupValue(location);
        setShowPickupList(false);
    };

    const handleDropoffLocationClick = (location) => {
        setInputDropoffValue(location);
        setShowDropoffList(false);
    };
    const handlePickupDropoffLocationClick = (location) => {
        setInputPickupDropoffValue(location);
        setShowDropoffPickupList(false);
    };
    const PickupDate = (e) => {
        setPickupDate(e.target.value);
    };
    const PickupTime = (e) => {
        const selectedTime = e.target.value;
        setPickupTime(selectedTime);
    };
    const DropoffDate = (e) => {
        setDropoffDate(e.target.value);
    };
    const DropoffTime = (e) => {
        const selectedTime = e.target.value;

        setDropoffTime(selectedTime);
    };
    const searchCar = (e, pickup, dropoff, pickupdropoff) => {
        e.preventDefault();
        if (pickupdropoff !== "") {
            setFinalPickupValue(pickupdropoff);
            setFinalDropoffValue(pickupdropoff);
        } else {
            setFinalDropoffValue(dropoff);
            setFinalPickupValue(pickup);
        }
    };
    const getCars = async (
        pickup,
        dropoff,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime
    ) => {
        setLoading(true);
        if (pickup !== "" || dropoff !== "") {
            const response = await axios.get(
                `/carsInSpecifiedeLocations?pickup_location_name=${pickup}&dropoff_location_name=${dropoff}&start_date=${pickupDate}&end_date=${dropoffDate}&start_time=${pickupTime}&end_time=${dropoffTime}`
            );
            const carsData = response.data.data;
            navigate("filteredcar", { state: { carsData } });
        }
    };
    useEffect(() => {
        if (
            finalPickupValue !== "" &&
            finalDropoffValue !== "" &&
            pickupDate !== "" &&
            pickupTime !== "" &&
            dropoffDate !== "" &&
            dropoffTime !== ""
        ) {
            getCars(
                finalPickupValue,
                finalDropoffValue,
                pickupDate,
                pickupTime,
                dropoffDate,
                dropoffTime
            );
        }
    }, [
        finalPickupValue,
        finalDropoffValue,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
    ]);
    useEffect(() => {
        const cleanup = () => {
            setLoading(false);
        };
        return cleanup;
    }, [navigate]);
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

    return (
        <div className=" container cardmain shadow">
            <form className="row g-3">
                {!toggle ? (
                    <div className="col-md-12 mainlist">
                        <label htmlFor="inputEmail4" className="form-label">
                           {translates.pickupdropoff}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            placeholder={translates.enterlocation}
                            value={inputPickupDropoffValue}
                            onChange={handlePickupDropoffInputChange}
                        />
                        {inputPickupDropoffValue && showDropoffPickupList && (
                            <ul className="autocomplete-list">
                                {filteredPickupDropoffLocations.map(
                                    (location, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                handlePickupDropoffLocationClick(
                                                    location.location
                                                );
                                            }}
                                            className="autocomplete-item"
                                        >
                                            {location.location}
                                            <p className="text-primary">
                                                In {location.city.city} City
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="col-md-6 mainlist">
                        <label htmlFor="inputEmail5" className="form-label">
                            {translates.pickup}
                        </label>
                        <input
                            type="text"
                            className="form-control "
                            id="inputEmail5"
                            placeholder={translates.enterlocation}
                            value={inputPickupValue}
                            onChange={handelPickupInputChange}
                        />
                        {inputPickupValue && showPickupList && (
                            <ul className="autocomplete-list">
                                {filteredPickupLocations.map(
                                    (location, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                handlePickupLocationClick(
                                                    location.location
                                                );
                                            }}
                                            className="autocomplete-item"
                                        >
                                            {location.location}
                                            <p className="text-primary ">
                                                In {location.city.city} City
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}

                        {inputPickupDropoffValue && showDropoffPickupList && (
                            <ul className="autocomplete-list">
                                {filteredPickupDropoffLocations.map(
                                    (location, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                !toggle
                                                    ? handlePickupLocationClick(
                                                          location.location
                                                      )
                                                    : handlePickupDropoffLocationClick(
                                                          location.location
                                                      );
                                            }}
                                            className="autocomplete-item"
                                        >
                                            {location.location}
                                            <p className="text-primary">
                                                In {location.city.city} City
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                )}

                {toggle && (
                    <div className="col-md-6 mainlist">
                        <label htmlFor="inputPassword6" className="form-label">
                            {translates.dropoff}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPassword6"
                            placeholder={translates.enterlocation}
                            value={inputDropoffValue}
                            onChange={handleDropoffInputChange}
                        />
                        {inputDropoffValue && showDropoffList && (
                            <ul className="autocomplete-list">
                                {filteredDropoffLocations.map(
                                    (location, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                handleDropoffLocationClick(
                                                    location.location
                                                )
                                            }
                                            className="autocomplete-item"
                                        >
                                            {location.location}
                                            <p className="text-primary">
                                                {location.city.city}
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                )}

                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="gridCheck"
                            onClick={difrentLocation}
                        />
                        <label
                            className="form-check-label "
                            htmlFor="gridCheck"
                        >
                            {translates.returncar}
                        </label>
                    </div>
                </div>
                <div className="col-3">
                    <label htmlFor="startDate" className="form-label">
                        {translates.pickupdate}
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        min={todayDate()}
                        onChange={PickupDate}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="startTime" className="form-label">
                        {translates.pickuptime}
                    </label>
                    <input
                        type="time"
                        className="form-control"
                        id="startTime"
                        onChange={PickupTime}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="endDate" className="form-label">
                        {translates.dropoffdate}
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        min={pickupDate}
                        onChange={DropoffDate}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="endTime" className="form-label">
                        {translates.dropofftime}
                    </label>
                    <input
                        type="time"
                        className="form-control"
                        id="endTime"
                        onChange={DropoffTime}
                    />
                </div>

                <div className="col-12 d-flex justify-end">
                    {loading ? (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) =>
                                searchCar(
                                    e,
                                    inputPickupValue,
                                    inputDropoffValue,
                                    inputPickupDropoffValue
                                )
                            }
                        >
                            <i className="bi bi-search"></i> loading...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) =>
                                searchCar(
                                    e,
                                    inputPickupValue,
                                    inputDropoffValue,
                                    inputPickupDropoffValue
                                )
                            }
                        >
                            <i className="bi bi-search"></i> {translates.Search}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CardBasic;
