import React, { useContext } from "react";
import { TbBasketDiscount } from "react-icons/tb";
import { IoCarSportSharp } from "react-icons/io5";
import "../../../css/ServicesStyle/services.css";
import { TranslateContext } from "../../Context/Translate";
import { NavLink } from "react-router-dom";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../../../css/HomeStyle/Home.css";
import imgRent from "../../../../public/image/rent.png";
import imgDiscount from "../../../../public/image/dis.png";
import imgSupport from "../../../../public/image/support.png";
const Services = () => {
    const { translates } = useContext(TranslateContext);
    return (
        <div className="mainOffers">
            <h1 className="text-center fs-3 m-2 mainhead">
                {translates.Features}
            </h1>
            <div className="d-flex flex-wrap justify-content-center">
                <div className="col-8 col-lg-3 cards mx-2 d-flex flex-column align-items-center custom-shadow rounded">
                    <div className="image">
                        <img src={imgDiscount} alt="" />
                    </div>
                    <div className="content">
                        <h3 className="my-4 fs-5 py-2">
                            {translates.Discountsanddeals}
                        </h3>
                        <Link
                            to="/discounts"
                            className={
                                "bg-primary my-3 p-3 text-white rounded fw-bold"
                            }
                        >
                            {translates.BrowseNow}
                        </Link>
                    </div>
                </div>
                <div className="col-8 col-lg-3 cards mx-2 d-flex flex-column align-items-center custom-shadow rounded">
                    <div className="image">
                        <img src={imgRent} alt="" />
                    </div>
                    <div className="content">
                        <h3 className="my-4  fs-5 py-2">
                            {translates.AllCars}
                        </h3>
                        <Link
                            to="/cars"
                            className={
                                "bg-primary my-3 p-3 text-white rounded fw-bold"
                            }
                        >
                            {translates.BrowseNow}
                        </Link>
                    </div>
                </div>
                <div className="col-8 col-lg-3 cards mx-2 d-flex flex-column align-items-center custom-shadow rounded">
                    <div className="image">
                        <img src={imgSupport} alt="" />
                    </div>
                    <div className="content">
                        <h3 className="my-4  fs-5 py-2">
                            {translates.ContactWithCompany}
                        </h3>
                        <Link
                            to="/contact"
                            className={
                                "bg-primary my-3 p-3 text-white rounded fw-bold"
                            }
                        >
                            {translates.BrowseNow}
                        </Link>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
