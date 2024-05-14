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
                                    <div className=" d-flex justify-center align-middle">

              <Loading />
</div>
          ) : ( 
                  <div className='container d-flex justify-items-center mt-5 pt-5'>

                      <div className="car col mb-3 m-2  ">
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
                                  <li className="list-group-item">Seats : {car.seats}</li>
                                  <li className="list-group-item">Gear: {car.steering}</li>
                                  <li className="list-group-item">Year : {car.year}</li>
                                  <li className="list-group-item">Door : {car.doors}</li>
                                  <li className="list-group-item">Fuel Type : {car.fuel_type}</li>
                                  <li className="list-group-item">Car Color : {car.car_color.color}</li>









                              </ul>
                            
                            


                          </div>

                      </div>


                  </div>
              


           )

          }  
      </div>
  )
}

export default ViewCar




