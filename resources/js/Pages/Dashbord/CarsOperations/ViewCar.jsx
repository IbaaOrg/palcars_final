import React, { useState, useEffect }from 'react'

import { useParams } from 'react-router-dom';
import Loading from '../../../Componants/UI/Loading';

function ViewCar() {
    const { id } = useParams(); // This will give you the value of "id" from the URL

    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(null)

    const [car, setCar] = useState(null)

    const getCars = async () => {
        
        try {
            const response = await axios.get(`/cars/${id}`);
            console.log("response.data.data");

            console.log(response.data.data);
            setCar(response.data.data)
            setLoading(false) 
        } catch (error) {
            // Handle error
            console.error('Error fetching user data:', error);

        }
    };

    useEffect(() => {
        getCars()

    }, []);
  return (
      <div>
         {loading ? (
              <Loading className=" d-flex justify-items-center align-items-center" />

          ) : ( 
              <div>
                  <div className='container d-flex justify-items-center'>

                      <div className="car col  ">
                          <div>
                               <img src={car.sub_images[0].photo_car_url} alt="imgcar" width={500} height={500} className='imgcar' />
                             
                          </div>






                      </div>
                      <div className="card mb-3  col m-2" >
                          <div className="card-body">
                              <div className='row d-flex justify-content-between'>
                                  <h5 className="card-title-details col font-bold ">{car.make}</h5>
                                  <h5 className="card-title-details col">{car.model}</h5>

                              </div>

                              <h6 className="card-subtitle mb-2 text-muted">Reviewer</h6>
                              <p className="card-text">
                                  Owner : {car.owneruser.name}
                              </p>
                              <ul className="list-group list-group-flush">
                                  <li className="list-group-item">Car Number : {car.car_number}</li>
                                  <li className="list-group-item">Cartogery : {car.catrgory}</li>
                                  <li className="list-group-item">seats : {car.seats}</li>
                                  <li className="list-group-item">Steering: {car.steering}</li>
                                  <li className="list-group-item">Year : {car.year}</li>
                                  <li className="list-group-item">Door : {car.doors}</li>
                                  <li className="list-group-item">Fuel Type : {car.fuel_type}</li>
                                  <li className="list-group-item">Car Color : {car.car_color.color}</li>









                              </ul>
                                <div className=' p-2 m-2'>
                                      <button type="button" className="btn commentbtn">Edit</button>
                                  <button type="button" className="btn btn-secondary">Hide</button>
                                  <button type="button" className="btn btn-danger">Delete</button>
                                </div>
                            


                          </div>

                      </div>


                  </div>
              

              </div>

           )

          }  
      </div>
  )
}

export default ViewCar




