import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/app.css";
import { FaRegImages } from "react-icons/fa6";
import ImageModel from "../../Layout/Dialog/ImageModel";
import '../../../css/DialogStyle/Model.css'

const RenterDashbord = () => {
    const [renters, setRenters] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getRenters = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`allRentersOfMyCompany`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRenters(response.data.data);
    };
    useEffect(() => {
        getRenters();
    }, []);
    const showImage = (imgUrl) => {
        setSelectedImage(imgUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <div className="container text-center  p-10">
                <div className="row">
                    <div className="col ">
                        <h1 className="fs-1">Renters List</h1>
                        <p className="">Your all Renters are listed bellow</p>
                    </div>
                    <div className="col ">
                        <form class="d-flex" role="search">
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                class="btn btn-outline-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            class="btn btn-primary Addvehicle"
                        >
                            <NavLink
                                to="/dashbord/addEmployee"
                                className={"activeLinkPrim"}
                            >
                                All Bookings
                            </NavLink>
                        </button>
                    </div>
                </div>
                {renters.length > 0 ? (
                    <div className="w-100  mt-4 rounded bg-white px-3 pt-3">
                        {renters.map((item, index) => (
                            <>
                                <div
                                    key={item.id}
                                    className="renters"
                                >
                                        <div className="renterInfoImg">  
                                            <div className="renterInfoImgContainer">
                                            <img
                                                src={item.photo_user}
                                                alt=""
                                                className="rounded"
                                            />
                                            </div> 
                                            <p className="fw-bold  mt-4">
                                                    {item.name}
                                                </p>
                                        </div>
                                     
                                      <div className="renterInfoImg">
                                            <p className="fw-bold  mt-0">
                                                Rental Count :
                                                {item.rental_count>1?`${item.rental_count} times`:`${item.rental_count} time`}
                                            </p>
                                            <p className="fw-bold  mt-0">Points : {item.points}</p>
                                        </div>
                                    <div className="renterInfoImg d-flex justify-content-start align-items-start">
                                      
                                        <div className=" renterInfoImgContainer">
                                            <img
                                                src={item.photo_drivinglicense}
                                                alt=""
                                                className="rounded"
                                            />
                                             <label htmlFor="file-path" id={item.photo_drivinglicense} className="imgShow"  onClick={()=>showImage(item.photo_drivinglicense)}>
            <FaRegImages size={25}   />

            </label>
                                        </div>
                                        <p className="mt-4 fw-bold">Expired date : {item.expireddate}</p>

                                    </div>
                                    <div className=" d-flex  align-items-start">
                                        <button className="btn btn-primary mt-0 p-2">Bookings </button>

                                    </div>
                                </div>
                                <div className="px-4">
                                    <hr />
                                </div>
                            </>
                        ))}
                    </div>
                ) : (
                    <div className="d-flex flex-column justidy-content-center align-items-center mt-5 ">
                        <p className="fs-4 p-5 text-black">
                            There isn't Renters From your company
                        </p>
                        <div className="">
                            <i class="bi bi-person-fill-slash expensesIcon"></i>
                        </div>
                    </div>
                )}
            </div>
            <ImageModel show={isModalOpen} onClose={closeModal} imageUrl={selectedImage} />
        </div>
    );
};

export default RenterDashbord;
