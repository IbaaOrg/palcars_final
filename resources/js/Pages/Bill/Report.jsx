import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../../css/ReportStyle/Report.css'
import { useLocation } from 'react-router-dom';
const Report = () => {
    const[date,setDate]=useState('');
    const[time,setTime]=useState('');
    const location = useLocation();
    const {resultBill} = location.state;
    const [numHours,setNumHours]=useState(0);
    useEffect(()=>{
        const createdAt=resultBill.created_at;
        const parts = createdAt.split(' ');
        setDate(parts[0]);
        setTime(parts[1]);
        setNumHours(resultBill.amount / resultBill.car.prices[0].price_per_hour);
    },[])

  return (
    <div className="d-flex flex-column my-4 mainReport p-5">
        <h2 className='fw-bold fs-3 text-center p-3'>Invoice # {resultBill.id}</h2>
    <div className='d-flex flex-column justify-content-around flex-wrap'>
    <div className="d-flex justify-content-center pt-2">

{resultBill.user_id && (
    <>
      <img src={resultBill.user_id.photo_user} alt="" className='rounded-circle' width={"70px"} height={"30px"} />
      <p className='pt-3 fw-bold'>{resultBill.user_id.name}</p>
    </>
  )}



        </div>
        <div className='d-flex  justify-content-around flex-wrap p-2'>
 
        <div className="d-flex flex-column align-items-start">
        <p>Address : {resultBill.address} , {resultBill.city.city} City</p>
        <p>Pohne : {resultBill.phone}</p>
        </div>
        <div className="d-flex flex-column align-items-start">
        <p>Invoice Date : {date}</p>
        <p>Invoice Time : {time}</p>
        
        </div>
        </div>
        <hr />
        <div className="d-flex flex-column p-4 ">
            <h3 className='fw-bold fs-5 text-center'>Locations</h3>
            <div className="d-flex justify-content-around p-2">
            <div className="d-flex flex-column align-items-center">
                <h3>Pickup Location</h3>
                <p>{resultBill.pickup_location.location} , {resultBill.pickup_location.city.city} City</p>
            </div>
            <div className="d-flex flex-column align-items-center">
            <h3>Dropoff Location</h3>
            <p>{resultBill.dropoff_location.location} , {resultBill.pickup_location.city.city} City</p>

            </div>
            </div>
            <div className="d-flex justify-content-around p-2">
            <div className="d-flex flex-column align-items-center">
                <h3>Pickup Time</h3>
                <p>{resultBill.start_date} On {resultBill.start_time} </p>
            </div>
            <div className="d-flex flex-column align-items-center">
            <h3>Dropoff Time</h3>
            <p>{resultBill.end_date} On {resultBill.end_time}</p>

            </div>
            </div>
        </div>
        <hr />
        <div className="d-flex flex-column  ">
            <h3 className='fw-bold fs-5 text-center py-4'>Detials Of Car</h3>
            <div className="d-flex justify-content-center p-2 gap-4 mainReport">
            <div className="d-flex flex-column align-items-center">
               <img src={resultBill.car.sub_images[0].photo_car_url} alt="" width={"300px"} height={"200px"} className='border-rounded'/>
            </div>
            <div className="d-flex flex-column align-items-start pt-2">
            <p>Make : {resultBill.car.make} </p>
            <p>Model : {resultBill.car.model} </p>
            <p>Category : {resultBill.car.catrgory} </p>
            <p>Year : {resultBill.car.year} </p>
            <p>Price : {resultBill.car.prices[0].price ===resultBill.car.prices[0].price_after_discount?<span>{resultBill.car.prices[0].price} ₪ / Day </span>:<span>{resultBill.car.prices[0].price_after_discount} ₪ / Day</span>}   </p>
            </div>
            </div>
        
        </div>
        <hr />
        <div className="d-flex flex-column  ">
            <h3 className='fw-bold fs-5 text-center py-4'>Detials Of Owner Car</h3>
            <div className="d-flex justify-content-center p-2 gap-4 ">
            <div className="d-flex flex-column align-items-center">
               <img src={resultBill.car.owner.photo_user} alt="" className='imgUser'/>
               <div className="d-flex flex-column align-items-center pt-2">
            <p className='fw-bold '> {resultBill.car.owner.name} Company </p>
            <p >Email : {resultBill.car.owner.email} </p>
            <p>Phone : {resultBill.car.owner.phone} </p>
            </div>
            </div>
           
            </div>
        
        </div>
        <hr />
        <div className="d-flex flex-column p-5 ">
            <h3 className='fw-bold fs-5 text-center'>Pay Detials</h3>
            <div className="d-flex justify-content-around p-2">
            <div className="d-flex flex-column align-items-center">
                <h3>Method</h3>
                <p>{resultBill.method.method} </p>
            </div>
            <div className="d-flex flex-column align-items-center">
            <h3>Total Price</h3>
            <p>{Math.round(resultBill.amount)} ₪</p>

            </div>
            </div>
            <div className="d-flex justify-content-around p-2">
            <div className="d-flex flex-column align-items-center">
                <h3>Rental Of Renting</h3>
                <p>{numHours > 24 ?<span>{Math.round(numHours / 24)} Day</span>:<span>{numHours} Hour</span>} </p>
            </div>
            <div className="d-flex flex-column align-items-center">
            <h3>Return Time</h3>
            <p>{resultBill.end_date} On {resultBill.end_time}</p>

            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Report