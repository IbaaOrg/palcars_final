import axios from 'axios'
import React, { useContext, useEffect , useState} from 'react'
import '../../../css/ReportStyle/Booking.css'
import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import Loading from '../../Componants/UI/Loading';
function Booking() {
  const {user}=useContext(UserContext);
  const [bookings,setBookings]=useState([]);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const bookingResult=async()=>{
    const token=localStorage.getItem('token');
    try {
      setLoading(true);
      if(user.role ==='Renter'){
        const response= await axios.get(`allBillsOfRenter`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBookings(await response.data.data);
      } else {
        const response= await axios.get(`showAllBillsOfMyCompany`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBookings(await response.data.data);
      }
    }catch(error){
      
    }finally{
      setLoading(false);
    }
   

   
   }
  
   
  useEffect(()=>{
    bookingResult()
  }
   ,[])
   const handelBooking =async (e)=>{
    const id=e.target.id
    const token=localStorage.getItem('token');

    const response =await axios.get(`/showBill/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    
   const resultBill=await response.data.data;
    navigate('/report',{state: {resultBill}})

   }

  return (
    loading?<Loading/>:(
    <div className='d-flex flex-column align-items-center mainBooking'>
      {user.role==="Renter"?<h3 className='fw-bold fs-4 py-3 '>My Booking</h3>:<h3 className='fw-bold fs-4 py-3 '>Booking from us</h3>}
      {bookings.map((item, index) => (
  <div key={item.id} id={item.id} className='minorBooking d-flex flex-wrap border py-2 px-4 m-3 d-flex align-items-center justify-content-between gap-5 w-50' onClick={handelBooking}>
    <span>Booking <span className='text-primary fw-bold'>#{index + 1}</span></span>
    {user.role==='Renter'?<p>
      <span className="text-primary fw-bold">From : </span>
      {item.car.owner ? item.car.owner.name : 'Unknown Owner'} Company
    </p>:<p>
    <span className="text-primary fw-bold">From : </span>
    {item.user_id.name ? item.user_id.name : 'Unknown Owner'} 
  </p>}
    <span>
      <span className="text-primary fw-bold">Total Price : </span>
      {Math.round(item.amount)} ₪
    </span>
  </div>
))}
    </div>
    )
  )
}

export default Booking