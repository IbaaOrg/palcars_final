import React, { useState, useEffect, useContext }from 'react'
import usericon from '../../../../public/image/usericon.png'
import { NavLink, Outlet } from 'react-router-dom'
import logout from './../../NetWorking/logout';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from '../../Componants/UI/Loading';
import homeimg from '../../../../public/image/backprofile.jpg'
import '../../../css/app.css'
import { UserContext } from '../../Context/User';
//import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


function ProfileRental() {
  const [loading, setLoading] = useState(true);
  const {user, updateUser ,userToken,setUserToken}=useContext(UserContext)
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("");
  



  

  const navigator = useNavigate()

  const out = async () => {
    await logout((out)=>{

      navigator("/")
      

    })

    

  }

  return ( 
    
   
    <div className="container text-center  p-10"> 
   

          <div className="row">
            <div className="profile">
              <div className="profileRight">
                <div className="profileRightTop">
                  <div className="profileCover">
                    <img
                      className="profileCoverImg"
                      src={homeimg}
                      alt=""
                    />
                

                      
                    <img
                      className="profileUserImg"
                      src={user.photo_user}
                      alt=""
                    />
                    
                  </div>
                  <div className="profileInfo">
                    <h4 className="profileInfoName">{user.name}</h4>
                    <span className="profileInfoDesc">{user.email}</span>
                  </div>
                </div>
                
                <div className="d-flex aling-items-center  p-4 profilebuttons bg-slate-100 rounded">
                  <NavLink className=' list-group-item col' to={"information"}>Information</NavLink>
                  <NavLink className=' list-group-item col' to={"booking"}>Booking</NavLink>
                  <NavLink className=' list-group-item col' to={"messages"}>Messages</NavLink>
                  
                  <NavLink className=' list-group-item col' to={"Notes"}>Notes</NavLink> 
                  <NavLink className=' list-group-item col' to={"reviews"}>Reviews</NavLink>
                  <NavLink className=' list-group-item col' to="editprofile">Edit Profile</NavLink>



                </div>
              </div>
            </div>

         
           

            <div className=" mt-16">
              <Outlet />
            </div>
          </div>
    
    </div>
  )
}

export default ProfileRental