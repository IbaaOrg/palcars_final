import React, { useContext } from 'react'
import { FavoriteContext } from '../../Context/Favorite'
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { IoPeople } from "react-icons/io5";
import { MdElectricCar } from "react-icons/md";
import { FaGasPump } from "react-icons/fa6";
import { GiSteeringWheel } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const navigate=useNavigate();
    const {favoriteList,setFavoriteList}=useContext(FavoriteContext)
    const clearAll=async()=>{
        const token=localStorage.getItem('token')
        try{
            const response = await axios.patch(`/favorites/clear`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
        setFavoriteList([]);

    }catch(e){
console.log(e)
    }
    }
const deleteItem=async(car_id)=>{
    const isFavorite=favoriteList.some((favorite)=>favorite.car.id===car_id);
    const token=localStorage.getItem('token');
    if(isFavorite){
        await axios.delete(`/favorites/${car_id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setFavoriteList(favoriteList.filter((favorite)=>favorite.car.id !== car_id))
    }
}
const navigateToCarDetials=(car_id)=>{
    navigate(`/cars/${car_id}`)
}
  return (
    <div className=" border-none card py-5 d-flex flex-column  align-items-center justify-content-center">
    {favoriteList.length>0?(favoriteList.map((item,index)=>(
        <div key={item.id} className='card-header w-50 rounded border p-3 mb-4 bg-white rounded card-favorite ' onClick={()=>navigateToCarDetials(item.car.id)} >
            <div className="d-flex justify-content-between">
            <h2 className='fw-bold '>Item # {index+1}</h2>
            <IoCloseCircleOutline  size={20} className="DeleteBtn "
                                                   onClick={()=>deleteItem(item.car.id)}       />

            </div>
            <div className="d-flex justify-content-between py-3">
            <div className="d-flex flex-column align-items-start">
                <p className='m-1 fw-bold'>{item.car.make} <span className='fw-bold'>-</span> {item.car.model}</p>
                <p className='m-1'>Category : <span className='fw-bold'>{item.car.catrgory}</span></p>
                <p className='m-1'>Year : <span className='fw-bold'>{item.car.year}</span></p>
                </div>
                <div className="d-flex flex-column align-items-start">
                <p className='m-1 fw-bold d-flex align-items-start gap-1'><IoPeople size={20} /> {item.car.seats} person</p>
                <p className='m-1  d-flex align-items-start gap-1'>{item.car.fuel_type==="electricity"?<><MdElectricCar size={20}/> <span>{item.car.fuel_type}</span></>:<><FaGasPump /> <span>{item.car.fuel_type}</span></>}</p>
                <p className='m-1  d-flex align-items-start '><GiSteeringWheel size={20}/>{item.car.steering}</p>
                </div>
               <div className="imgFavorite">
               <img src={item.car&&item.car.sub_images&&item.car.sub_images[0].photo_car_url} alt=""  className='rounded border w-100'/>

               </div>
      
            </div>
           <div className="d-flex justify-content-end">
           <p>Price : <span className='fw-bold'>{item.car.prices[item.car.prices.length-1].price}₪/day</span></p>

           </div>
          
        </div>

    ))):(<div className='fw-bold fs-5 d-flex justify-content-center p-3'>No items in favorite list</div>)}
    {favoriteList.length>0&&<button className='btn btn-primary' onClick={clearAll}>Clear All</button>}
    </div>
  )
}

export default Favorites