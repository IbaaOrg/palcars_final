import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TranslateContext } from '../../Context/Translate';

const ViewDiscount = () => {
    const {translates}=useContext(TranslateContext)
    const {id}=useParams();
    const [detials,setDetials]=useState({})
    const getDetials=async()=>{
        const token =localStorage.getItem('token')
        const response=await axios.get(`showOneDiscount/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setDetials(response.data.data)
    }
    useEffect(()=>{
        getDetials();
    },[id])
  return (
    <div className='container d-flex justify-items-center mt-5 pt-5'>

    <div className="car col mb-3 m-2  ">
        <div>
             <img src={detials.car&&detials.car.sub_images[0].photo_car_url} alt="imgcar" width={500} height={500} className='imgcar' />
           
        </div>






    </div>
    <div className="card mb-3  col m-2" >
        <div className="card-body">
            <div className='row d-flex justify-content-between'>
                <h5 className="card-title-details col font-bold ">{detials.car&&detials.car.make}</h5>
                <h5 className="card-title-details col">{detials.car&&detials.car.model}</h5>

            </div>

           
            <ul className="list-group list-group-flush pt-5 mt-4">
                <li className="list-group-item">{translates.CarNumber} : {detials.car&&detials.car.car_number}</li>
                <li className="list-group-item">{translates.DiscountValue} : {detials&&detials.type==='fixed'?`${detials&&detials.value} ₪ `:`${detials&&detials.value} %`}</li>
                <li className="list-group-item">{translates.PriceBeforeDiscount} : {detials.car&&detials.car.prices&&detials.car.prices[0]&&detials.car.prices[0].price} ₪ / {translates.day}</li>
                <li className="list-group-item">{translates.PriceAfterDiscount} : {detials.car&&detials.car.prices&&detials.car.prices[0]&&detials.car.prices[0].price_after_discount} ₪ / {translates.day}</li>

                <li className="list-group-item">{translates.ExpiredDate} : {detials&&detials.expired_date}</li>
             








            </ul>
          
          


        </div>

    </div>


</div>
  )
}

export default ViewDiscount