import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../../Componants/UI/Loading';
function ViewProfile({id}) {

  console.log("id view profile")
  console.log(id)
  console.log(`/user/${id}`)

  const [loading, setLoading] = useState(true);

   
  const [user , setUser] = useState(null)

  const getUserById = async () => {
    console.log("get User By Id ")

    console.log(id)
    try {
      const response = await axios.get(`/user/${id}`);
      console.log(response.data) ;
      setUser(response.data.data)
      setLoading(false)
    } catch (error) {
      // Handle error
      console.error('Error fetching user data:', error);
      
    }
  };
  useEffect(() => {
    getUserById()
  }, []);

  return (
    <div>
      <div className='card w-120 bg-white'>
        {loading ? (
          <Loading />
        ) : (
          <div class="card-body">
          <div className='row '>

            <div className='col-4'>
                  <img src={user.photo_user} width={50} height={50} alt="User" className=' card-link rounded' />

            </div>
                <div className='col-4 text-start d-flex align-items-center'>
                  <h5 class="card-title ">{user.name}</h5>

                </div>
                <div className='col-4'></div>


          </div>
         

         
            <h6 class="card-subtitle mb-2 text-body-secondary m-2">Company</h6>
            <div class="card-text text-start">
              <p>Email :  {user.email}</p>
                <p>Phone : {user.phone}</p>

            </div>
            <div className='mt-4'>
                <a href="#" class="card-link btn btn-outline-primary">All Cars</a>
                <a href="#" class="card-link btn btn-success">Message</a>
            </div>
            
          </div>
        )}

      </div>
    </div>
  )
}

export default ViewProfile