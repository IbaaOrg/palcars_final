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
    getLocations()
  }, []);
  const [locations, setLocations] = useState([]);


  const getLocations = async () => {

    try {
      const response = await axios.get(`/showAllLocations`);
      const processedLocations = [];

      const userid = id
      // Iterate through the locations array using a for loop
      for (let i = 0; i < response.data.data.length; i++) {

        if (response.data.data[i].ownerCompany.id === id) {

          //console.log(response.data.data[i])
          processedLocations.push(response.data.data[i]); // 
        }
        //const location = locations[i];

        // Process each location object here
      }
      //console.log(processedLocations)
      setLocations(processedLocations);


    } catch (error) {
      // Handle error
      console.error('Error fetching user data:', error);

    }

  }

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
                <p>Locations :</p>
                {locations && (<>

                  {locations.map(l => (
                    <div className='d-flex ' key={l.id}>
                      <p> {l.location}</p>
                      <p> {l.type}</p>
                    </div>

                  ))}
                </>)}

            </div>
            <div className='mt-4'>
                <Link to={`/carofcompany/${id}`} class="card-link btn btn-outline-primary">All Cars</Link>
                <a href="#" class="card-link btn btn-success">Message</a>
            </div>
            
          </div>
        )}

      </div>
    </div>
  )
}

export default ViewProfile