import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../../Componants/UI/Loading';
import { Link, useNavigate } from 'react-router-dom';
function ViewProfile({id}) {

  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);

   
  const [user , setUser] = useState(null)

  const getUserById = async () => {

    try {
      const response = await axios.get(`/user/${id}`);
      setUser(response.data.data)
      setLoading(false)
    } catch (error) {
      // Handle error
      console.error('Error fetching user data:', error);
      
    }
  };
  const getCarByCompany = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/carsofcompany/${id}`)
      const res = response.data
      console.log(res)
      navigate(`/cars?company=${id}`)


    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserById()
  }, []);
 
  return (
    <div>
      <div className='card w-120 bg-white'>
        {loading ? (
                          <div className=" d-flex justify-center align-middle">
        
          <Loading />
          </div>
        ) : (
          <div class="card-body">
          <div className='row '>

            <div className='col-4'>
                  <img src={user.photo_user} width={50} height={50} alt="User" className=' card-link rounded' />

            </div>
                <div className='col-8 text-start d-flex align-items-center'>
                  <h5 class="card-title ">{user.name} <span className='card-subtitle mb-2 text-body-secondary'>Company</span></h5>

                </div>


          </div>
         

         
            <div class="card-text text-start">
              <p>Email :  {user.email}</p>
                <p>Phone : {user.phone}</p>

            </div>
            <div className='mt-4'>
                <Link to={`/carofcompany/${id}`} class="card-link btn btn-outline-primary">Profile</Link>
                <Link to={localStorage.getItem('token')?`/profile/messages`:`/login`} class="card-link btn btn-success">Message</Link>
            </div>
            
          </div>
        )}

      </div>
    </div>
  )
}

export default ViewProfile