import React, { useState, useEffect }from 'react'
import usericon from '../../../../public/image/usericon.png'
import { NavLink, Outlet } from 'react-router-dom'
import logout from './../../NetWorking/logout';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from '../../Componants/UI/Loading';




function ProfileRental() {
  const [loading, setLoading] = useState(true);

  const [user,setUser] = useState([]);
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("");
  



    async function getuser() {
      const token = localStorage.getItem('token');

      if (token) {

        try {
          const response = await axios.get("/user", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })

          const res = response.data
         
          if (res.status === true) {
            setRole(res.data.role)
            setUser(res.data)
            setLoading(false)
          }
 

        } catch (e) {
          console.log(e)

        }

      } else {
        console.log('Token not found in local storage');
      }
    }
  useEffect( () => {
     getuser();
  }, []);
  const navigator = useNavigate()

  const out = async () => {
    await logout((out)=>{

      navigator("/")
      
      window.location.reload()

    })

    

  }

  return ( 
    
   
    <div className="container text-center  p-10"> 
    {loading ? (
        <Loading/>
      ) : (

          <div className="row">
            <div className="col-2 ">
              <div className='d-flex justify-center'>
                {user && (

                  <img src={user.photo_user} className='w-50 h-50 rounded-circle' />
                )}
              </div>

              <div className='p-3'>

                <button type="button" class="btn btn-outline-danger" onClick={out}>Logout</button>
              </div>

              <div className='p-3'>
                <nav className=' list-group'>



                  <NavLink className=' list-group-item' to={"information"}>Information</NavLink>
                  <NavLink className=' list-group-item' to={"booking"}>Booking</NavLink>
                  <NavLink className=' list-group-item' to={"messages"}>Messages</NavLink>
                  <NavLink className=' list-group-item' to={"Faverate"}>Faverate</NavLink>





                </nav>

              </div>

            </div>

            <div className="col-10  mt-16">
              <Outlet />
            </div>
          </div>

      )}
    
    </div>
  )
}

export default ProfileRental