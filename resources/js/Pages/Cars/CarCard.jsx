import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BsPeopleFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";
import { MdElectricCar } from "react-icons/md";
import "../../../css/CardStyle/CarCard.css";
import { useState } from "react";
import Dialog from "../../Layout/Dialog/Dialog";
import { UserContext } from "../../Context/User";
const CarCard = ({ item, index, toggleFavorite, favoriteList }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [ownerid, setOwnerid] = useState(null);
    const { user } = useContext(UserContext);
    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };
    const isFavorite = favoriteList.some(
        (favorite) => favorite.car && favorite.car.id === item.id
    );
    const heartColor = isFavorite ? "red" : "black";
    return (
        <div
            key={item.id}
            className={"  bg-white p-3 rounded-md  my-4 cardMainCar "}
        >
            <div className="card-body ">
                <h2 className="card-title font-bold d-flex justify-content-between">
                    {item.make} - {item.model}
                    {user.role === "Renter" && (
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => toggleFavorite(item.id)}
                            style={{
                                color: heartColor,
                            }}
                            className="iconheart"
                        />
                    )}
                </h2>
                <p className="card-text text-start mx-0 my-1 text-color">
                    {item.catrgory}
                </p>
                {item.sub_images.length > 0 && (
                    <NavLink to={`/cars/${item.id}`}>
                        <img
                            src={item.sub_images[0].photo_car_url}
                            alt="Car"
                            className="carImg"
                        />
                    </NavLink>
                )}
                {item.owneruser && ( // Check if owneruser exists
                    <div
                        className="row border border-red-300 p-1 company"
                        onClick={() => {
                            setOwnerid(item.owneruser.id);
                            openDialog();
                        }}
                    >
                        <div className="col-3 d-flex justify-center">
                            <img
                                src={item.owneruser.photo_user}
                                width={30}
                                height={30}
                                alt="User"
                                className="card-link rounded border"
                            />
                        </div>
                        <span className="col-9 justify-slef-center align-self-start pt-1">
                            {item.owneruser.name} Company
                        </span>
                    </div>
                )}
                {isDialogOpen && <Dialog onClose={closeDialog} id={ownerid} />}
                <div className="d-flex flex-wrap justify-content-center ">
                    <p className=" card-text d-flex justify-content-center align-items-center cardicon ">
                        {item.fuel_type === "electricity" ? (
                            <>
                                <MdElectricCar className="icon" />
                                <span>electric</span>
                            </>
                        ) : (
                            <>
                                <FaGasPump className="icon" />
                                {item.fuel_full}L
                            </>
                        )}
                    </p>
                    <p className=" card-text d-flex justify-content-center align-items-center cardicon ">
                        <GiSteeringWheel className="icon" />
                        <span>{item.steering}</span>
                    </p>
                    <p className=" card-text d-flex justify-content-center align-items-center cardicon ">
                        <BsPeopleFill className="icon" />
                        <span>{item.seats}</span>
                    </p>
                </div>

                <div className=" text-start">
                    <p className=" fs-5">
                        <span>₪</span>
                        <b>{item.prices?.[0]?.price}</b>/day
                    </p>
                </div>

                <div className=" d-flex justify-end m-2">
                    <Link
                        to={`/cars/${item.id}`}
                        className="btn btn-primary px-3 "
                    >
                        Rent Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
