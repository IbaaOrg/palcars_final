import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/User';
import Loading from './../../Componants/UI/Loading';
import '../../../css/ReportStyle/Booking.css';
import { useNavigate } from 'react-router-dom';
import { TranslateContext } from '../../Context/Translate';
function Reviews() {
  const {translates}=useContext(TranslateContext)
  const {user}=useContext(UserContext);
  const [comments,setComments]=useState([]);
  const[loading,setLoading]=useState(false);
  const navigate =useNavigate();
  const myComments = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      let response;
      if (user.role === "Renter") {
        response = await axios.get(`getMyComments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }else if (user.role === "Company"){
        response=await axios.get(`getAllcomentsOfMyCar`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      if (response && response.data && response.data.data) {
        setComments(await response.data.data);
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    myComments();
},[user.role]);
const handelTo=async(e)=>{
const id=e.target.id;
user.role==="Renter"?navigate(`/cars/${id}`):navigate('/profile');

}
  return (
    loading?(                        <div className=" d-flex justify-center align-middle">
    <Loading/></div>):(
    <div className='d-flex flex-column align-items-center mainBooking'>
    {user.role==="Renter"?<h3 className='fw-bold fs-4 py-3 '>{translates.MyComments}</h3>:<h3 className='fw-bold fs-4 py-3 '>{translates.commentcar}</h3>}
    {comments.length>0 ?comments.map((item, index) => (
<div key={item.id} id={item.car.id} className='minorBooking d-flex flex-wrap border py-2 px-4 m-3 d-flex align-items-center justify-content-between gap-5 ' onClick={handelTo}>
  <span>{translates.Comment} <span className='text-primary fw-bold'>#{index + 1}</span></span>
 {user.role === "Renter"?<> 
 <p>
    <span className="text-primary fw-bold">{translates.On} : </span>
    {item.car ? <span>{item.car.make} - {item.car.model}</span>: 'Unknown Car'} 
  </p>
  <p>
    <span className="text-primary fw-bold">{translates.From} : </span>
    {item.car.Owner_Of_Car ? item.car.Owner_Of_Car.name : 'Unknown Owner'} Company
  </p></>: <> <p>
    <span className="text-primary fw-bold">{translates.From} : </span>
    {item.owner_of_comment.name ? item.owner_of_comment.name : 'Unknown Owner'} 
  </p>
  <p>
    <span className="text-primary fw-bold">{translates.On} : </span>
    {item.car ? <span>{item.car.make} - {item.car.model}</span>: 'Unknown Car'} 
  </p>
  </>}
 

  <span>
    <span className="text-primary fw-bold">{translates.Since} : </span>
    {item.timeago}
  </span>
</div>
)): user.role==="Renter"?<div className=' py-3'>{translates.notcomment}</div>:<div className=' py-3' >{translates.nocomment}</div>
}
  </div>
    )
    
  )
}

export default Reviews