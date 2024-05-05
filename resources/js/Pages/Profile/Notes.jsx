import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/User';
import Loading from './../../Componants/UI/Loading';
import '../../../css/ReportStyle/Booking.css';
import { useNavigate } from 'react-router-dom';
import { data } from 'jquery';

function Notes() {
    const {user}=useContext(UserContext);
    const [note,setNote]=useState([]);
    const[loading,setLoading]=useState(false);
    const navigate =useNavigate();
   
    const MyNotes =async ()=>{
    //     const id=e.target.id
        const token=localStorage.getItem('token');
    try {
        setLoading(true);
        let response;
        if (user.role === "Renter") {
          response = await axios.get(`getAllRecivedNotes`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }else if (user.role === "Company"){
          response=await axios.get(`getAllSendNotes`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        if (response && response.data && response.data.data) {
          setNote(await response.data.data);
          
        }
      } catch (e) {
        console.log(e.response);
      } finally {
        setLoading(false);
      }
    }
    useEffect(()=>{
        MyNotes();
        
    },[user.role]);

    // const handelTo=async(e)=>{
    //    // item.sender.name? item.sender.name  : 'Unknown Owner'
    //     const id=e.target.id;
        
    //     user.role==="Renter"?navigate(`/carofcompany/${id}`):navigate('/profile')
    //     }
// {/* <button onClick={MyNotes}> ghghghg </button> */}
  

return (
    

 loading?<Loading/>:(
    <div className='d-flex flex-column align-items-center mainBooking'>
    {user.role==="Renter"?<h3 className='fw-bold fs-4 py-3 '>My Notes</h3>:<h3 className='fw-bold fs-4 py-3 '>Notes from me</h3>}
    {note.length>0 ?note.map((item, index) => (
<div key={item.id}  className='minorBooking d-flex flex-wrap border py-2 px-4 m-3 d-flex align-items-center justify-content-between gap-1 '>
  <span>Note <span className='text-primary fw-bold'>#{index + 1}</span></span>
  {user.role === "Renter"?<> 
 <p>
    <span className="text-primary fw-bold">The Note : </span>
    {item.note ? <span>{item.note} </span>: 'Unknown Car'} 
  </p>
  <p>
    <span className="text-primary fw-bold">From : </span>
    {item.sender.name? item.sender.name  : 'Unknown Owner'
    }  
  </p></>: <> 
  <p>
    {/* <span className="text-primary fw-bold">On : </span>
    {item.car ? <span>{item.car.make} - {item.car.model}</span>: 'Unknown Car'}  */}
  </p>
  </>} 
  {
    user.role === "Company"?<>
    <p>
    <span className="text-primary fw-bold">The Note : </span>
    {item.note ? <span>{item.note} </span>: 'Unknown Car'
    } 
  </p>
  <p>
    {/* <span className="text-primary fw-bold">From : </span>
    {//item.reciever.name? item.reciever.name  : 'Unknown Owner'
    }  Company */}
  </p></>: <> 
  <p>
    {/* <span className="text-primary fw-bold">On : </span>
    {item.car ? <span>{item.car.make} - {item.car.model}</span>: 'Unknown Car'
    }  */}
  </p>
  </>
}
 
  

<span>
    <span className="text-primary fw-bold">Since : </span>
    {item.timeago}
  </span>
</div>
)): user.role==="Renter"?<div className=' py-3'> You don't have any notes.</div>:<div className=' py-3' >You didn't add note</div>
}
  </div>
    )
    
  


    )
}

export default Notes