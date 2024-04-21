import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgpaypal from '../../../../public/image/paypal.png'
import imgbank from '../../../../public/image/bank.png'
import imgvisa from '../../../../public/image/visa.png'
import axios from "axios";
import { AiOutlineSafety } from "react-icons/ai";

import { A11y } from 'swiper/modules';
const Bill = () => {
    const { id } = useParams();
    const [car,setCar]=useState({});
    const [price,setPrice]=useState({})
    const getCar=async()=>{
        try{
        const res=await axios.get(`/cars/${id}`);
        setCar(res.data.data);
        setPrice(car.prices[car.prices.length - 1]);
        }catch(error){
            
        }
    }
    useEffect(()=>{
        getCar();
    },[])
    return (
        <>
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
                                <div className="col  d-flex flex-column">
                                    <label
                                        for="Name"
                                        className="fw-bold rounded"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="Name"
                                        id="Name"
                                        placeholder="Your full name"
                                        className="form-label py-3 bg-slate-100 rounded px-3 my-2"
                                    />
                                </div>
                                <div className="col d-flex flex-column">
                                    <label
                                        for="phone"
                                        className="fw-bold rounded"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Your phone Number"
                                        className="form-label py-3 bg-slate-100 rounded px-3 my-2"
                                    />
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
                                    />
                                </div>
                                <div className="col d-flex flex-column">
                                    <label for="city" className="fw-bold">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Town Or City"
                                        className="form-label py-3 bg-slate-100 rounded px-3 my-2 "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 bg-white rounded  my-5 p-4">
                        <h2 className="fw-bold px-2">Rental Summary</h2>
                        <p className="text-start">{car.description}</p>
                        <div className="d-flex">
                        {car.sub_images && car.sub_images.length > 0 && (
                                                    <img src={car.sub_images[0].photo_car_url} alt="" width={"270px"} height={"270px"} className="border-rounded imgcar"/>

)}
<div className="d-flex flex-column justify-content-center ">
<h3 class="carname">{car.model}</h3>
<h3 className="py-3">make by {car.make}</h3>
<div className="d-flex">
{[...Array(5)].map((_,index)=>{
                return <span key={index} className={`${index+1<=4?'selected':''} fs-5 fw-bold mx-1`} 
                >&#9733;</span>
            })}
            </div>

</div>

</div>
<hr  className="text-slate-400 mt-4"/>
<div className="fw-bold d-flex flex-column align-items-start">
    {
        price.price===price.price_after_discount?(
            <>
            <p>Price per day : {price.price}</p>
            <p>Total price: {price.price} ₪</p>
            </>
        ):(
            <>
            <p>Price before discount : <span className="text-primary">{price.price} ₪ / day</span></p>
            <p>Price per day : <span className="text-primary">{price.price_after_discount} ₪ / day</span></p>
            <p>Total price: {price.price} ₪</p>
            </>
        )
}
</div>

                    </div>
                </div>
                <div className="  billpay mt-2 bg-white px-5 py-3">
                    <h2 className="fw-bold fs-5 py-2">Rental Info</h2>
                    <div className="d-flex justify-content-between text-slate-400">
                        <span>Please enter your rental date</span>
                        <span>step 2 of 4</span>
                    </div>

                    <div className="billing-body d-flex justify-content-between flex-wrap ">
                        <div className="col-md-5  col-10 mx-3 ">
                            <div className="col  d-flex flex-column">
                                <label for="pivkup" className="fw-bold rounded">
                                    Pickup
                                </label>
                                <div className="row" id={"pickup"}>
                                    <label
                                        htmlFor="locationpick"
                                        className="fw-bold  "
                                    >
                                        Location{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-label py-3 bg-slate-100 rounded px-3 my-2 "
                                        id="locationpick"
                                        placeholder={"Enter location "}
                                    />
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
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-10 mx-3">
                            <div className="col  d-flex flex-column">
                                <label for="dropoff" className="fw-bold rounded">
                                    Dropoff{" "}
                                </label>
                                <div className="row" id={"dropoff"}>
                                    <label
                                        htmlFor="inputlocation"
                                        className="fw-bold  "
                                    >
                                        Location{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-label py-3 bg-slate-100 rounded px-3 my-2 "
                                        id="inputlocation"
                                        placeholder={"Enter location "}
                                    />
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="startDate"
                                            className="form-label fw-bold"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            class="form-control "
                                            id="startDate"
                                        />
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="startTime"
                                            className="form-label fw-bold"
                                        >
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            class="form-control"
                                            id="startTime"
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

                    <div className="billing-body d-flex flex-column flex-wrap gap-3 ">
                        <label className="col d-flex bg-slate-100  rounded px-3" htmlFor="creditcard">
                        <input type="radio" name="method" id="creditcard" />
                        <div className="d-flex w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">
                        Credit Card
                        <img src={imgvisa} alt="" width={"80px"} height={"60px"}/>
                        </div>
                        </label>
                        <label className="col d-flex  bg-slate-100  rounded px-3" htmlFor="creditcard">
                        <input type="radio" name="method" id="paypal" />
                        <div className="d-flex w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">

                       Pay Pal
                        <img src={imgpaypal} alt=""  width={"80px"} height={"60px"}/>
                        </div>
                        </label>
                        <label className="col d-flex  bg-slate-100 rounded px-3" htmlFor="bank">
                        <input type="radio" name="method" id="bank" />
                        <div className="d-flex w-100 align-items-center justify-content-between bg-slate-100 rounded px-2">

                        Bank Transfer
                        <img src={imgbank} alt=""  width={"80px"} height={"60px"}/>

                        </div>
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

                        <p className="text-start fw-bold">All your data are in safe</p>
                        <input type="submit" value="Check rental" className="btn btn-primary rounded-md px-3 py-2 fw-bold my-3"/>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Bill;
