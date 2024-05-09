import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/app.css";
import "../../../css/Commentstye/Comments.css";
import { TiDelete } from "react-icons/ti";
import Loading from "../../Componants/UI/Loading";
import CarFilter from "../../Layout/Filter/CarFilter";
import CommentView from "../../Layout/Comments/CommentView";
import CommetInput from "../../Layout/Comments/CommetInput";
import { ToastContainer, Bounce, Zoom, toast } from "react-toastify";
import "../../../css/PasswordStyle/forget.css";
import axios from "axios";
import RatingC from "../../Layout/Comments/RatingC";
import "../../../css/Commentstye/Rating.css";
import ResetPassword from "./../../Auth/Login/ResetPassword";
import { UserContext } from "../../Context/User";
import { IoCloseCircleOutline } from "react-icons/io5";


function CarDitails() {
    const { id } = useParams(); // This will give you the value of "id" from the URL
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(null);
    const [car, setCar] = useState(null);
    const [rate, setRate] = useState(null);
    const [deleted, setDeleted] = useState(null);
    const {user}=useContext(UserContext);
    const navigator = useNavigate();
    const getUserById = async () => {
        try {
            const response = await axios.get(`/cars/${id}`);
            setCar(response.data.data);
            setLoading(false);
        } catch (error) {
            // Handle error
            console.error("Error fetching user data:", error);
        }
    };
    const [comments, setComments] = useState([]);
    //const { id } = useParams(); // This will give you the value of "id" from the URL

    const getComments = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`/getReviewes/${id}`);
            const data = response.data;
            setComments(data.data.comments);
        } catch (error) {
            console.error(error);
        }
        if (!token) {
            setView("please login or register account to write Comment");
        }
    };

    useEffect(() => {
        getComments();
        getUserById();
    }, [id, deleted]);

    const appendComment = (comment) => {
        console.log("append car details");

        console.log(comment);
        setComments([...comments, comment]);
    };
    const openBill = () => {
        const token = localStorage.getItem("token");

        if (token) {
            // getUserById
            navigator(`/bill/${id}`, { state: { car } });
        } else {
            toast.error("you must have account to rent car", {
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
            navigator("/login");
        }
    };
    const deleteComment = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleted(response.data.data);
        } catch (e) {}
    };
    return (
        <div>
            {loading ? (
                                        <div className=" d-flex justify-center align-middle">

                <Loading  />
                </div>
            ) : (
                <div>
                    <div className="container d-flex justify-items-center">
                        <div className="car col m-2 mb-3 ">
                            <div className="DetialsImg">
                                <img
                                    src={car.sub_images[0].photo_car_url}
                                    alt="imgcar"
                                   className="imgCarDetials"
                                />
                                <div className="mt-4  row">
                                    {car.sub_images.length >= 2 && (
                                        <div className="col">
                                            <img
                                                src={
                                                    car.sub_images[1]
                                                        .photo_car_url
                                                }
                                                alt="imgcar"
                                                className=" imgdetials "
                                            />
                                        </div>
                                    )}
                                    {car.sub_images.length >= 3 && (
                                        <div className="col">
                                            <img
                                                src={
                                                    car.sub_images[2]
                                                        .photo_car_url
                                                }
                                                alt="imgcar"
                                                className="  imgdetials"
                                            />
                                        </div>
                                    )}
                                    {car.sub_images.length >= 4 && (
                                        <div className="col">
                                            <img
                                                src={
                                                    car.sub_images[3]
                                                        .photo_car_url
                                                }
                                                alt="imgcar"
                                                className=" imgdetials "
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3  col m-2">
                            <div className="card-body">
                                <div className=" d-flex justify-content-between">
                                    <h5 className="card-title-details  font-bold ">
                                        {car.make}
                                    </h5>
                                    <h5 className="card-title-details ">
                                        Model : {car.model}
                                    </h5>

                                    <i class="bi bi-heart  justify-end"></i>
                                </div>
                                <div className="d-flex align-items-center gap-5">
                                    <h6 className="card-subtitle  my-2 text-muted col-4">
                                        Reviewer
                                    </h6>
                                    <h6 className="card-text  my-2 col-4 px-5">
                                        Owner : {car.owneruser.name}
                                    </h6>
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        Car Number : {car.car_number}
                                    </li>
                                    <li className="list-group-item">
                                        Cartogery : {car.catrgory}
                                    </li>
                                    <li className="list-group-item">
                                        seats : {car.seats}
                                    </li>
                                    <li className="list-group-item">
                                    Gear : {car.steering}
                                    </li>
                                    <li className="list-group-item">
                                        Year : {car.year}
                                    </li>
                                    <li className="list-group-item">
                                        Door : {car.doors}
                                    </li>
                                    <li className="list-group-item">
                                        Fuel Type : {car.fuel_type}
                                    </li>
                                    <li className="list-group-item">
                                        Car Color : {car.car_color.color}
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        Price :
                                        <span className=" text-success d-flex">
                                            {" "}
                                            {car.prices[0].price !== car.prices[0].price_after_discount ?                                                 
                                                       (<> <p className="old-price ">{car.prices[0].price}₪ / day</p>
                                                       <p>{car.prices[0].price_after_discount}₪ / day</p>
                                                       </>)
                                                        : (<> <h1 className=" text-success">{car.prices[0].price}₪ / day</h1>
                                                       
                                                        </>)}
                                        </span>
                                    </li>
                                </ul>
                                {/*      <div className="card-text">
                                      {car.prices[0].price}
                                     
                                  </div> */}
                                <button
                                    type="button"
                                    className="btn commentbtn mx-3"
                                    onClick={openBill}
                                >
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="commentsbox">
                        <h1 className="reviews">
                            Reviews{" "}
                            <span className="reviewcount">
                                {comments.length}
                            </span>
                        </h1>
                        <div className=" reviewsBox">
                            <p className=" text-red-700 fs-4">{view}</p>
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <div
                                        className=" d-flex justify-content-between align-items-center py-2 gap-3"
                                        key={index}
                                    >
                                        <div className="user_img d-flex justify-content-center align-items-center">
                                            <img
                                                src={
                                                    comment.owner_of_comment
                                                        .photo_user
                                                }
                                                alt=""
                                                className={"comment__avatar"}
                                            />
                                        </div>
                                        <div className=" comment_body">
                                            <div className="d-flex justify-content-between">
                                                <h4
                                                    className={
                                                        "comment__author "
                                                    }
                                                >
                                                    {
                                                        comment.owner_of_comment
                                                            .name
                                                    }{" "}
                                                    comment :
                                                </h4>
                                               {comment.owner_of_comment.name===user.name &&(
                                                           <IoCloseCircleOutline  size={30}
                                                           className="DeleteBtn"
                                                           onClick={() =>
                                                               deleteComment(
                                                                   comment.id
                                                               )
                                                           } />

                                               )}
                                            </div>

                                            <div
                                                className={"comment__content "}
                                            >
                                                <p className={"comment__text "}>
                                                    {comment.comment}
                                                </p>
                                            </div>
                                            <div className="timeago">
                                                <p
                                                    className={
                                                        "comment__text_timeago"
                                                    }
                                                >
                                                    {comment.timeago}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2 py-3 comment_rating">
                                            <h2> rating : </h2>
                                            <div className="d-flex">
                                                {[...Array(5)].map(
                                                    (_, index) => {
                                                        return (
                                                            <span
                                                                key={index}
                                                                className={`${
                                                                    index + 1 <=
                                                                    comment.rating
                                                                        ? "selected"
                                                                        : ""
                                                                } fs-5 fw-bold mx-1`}
                                                            >
                                                                &#9733;
                                                            </span>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>{" "}
                                    </div>
                                ))
                            ) : (
                                <p className="py-2 fs-4">
                                    No Comments on this car
                                </p>
                            )}
                        </div>
                        {!view && (
                            <CommetInput
                                id={id}
                                appendComment={appendComment}
                            />
                        )}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default CarDitails;
