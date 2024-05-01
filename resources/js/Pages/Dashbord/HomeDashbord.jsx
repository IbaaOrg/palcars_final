import React, { useEffect, useState } from 'react'
import '../../../css/app.css';

function HomeDashbord() {
  const [data, setData] = useState(0);
  const [locations, setLocations] = useState(0);
  const center = {
    lat: 59.95,
    lng: 30.33
  };
  const zoom = 11;

  const getlocations = ()=>{
      const token = localStorage.getItem("token");

      axios.get("/showLocationsOfMyCompany", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const res = response.data;
          setLocations(res.data.locations.length);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }

  useEffect(() => {

    try {
      const token = localStorage.getItem("token");

      axios.get('/carsuser', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          const res = response.data;
         // console.log(res.data.cars.length);
          setData(res.data.cars.length);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    getlocations()

  }, []); 
  return (
    <div>
      <div className='row p-4 m-2'>
        <div className='col rounded bg-red-300 m-2 position-relative caricondiv'>
          <i className="bi bi-car-front-fill m-1 caricon text-red-900 position-absolute top-0 end-0"></i>
          <div className="fs-1 text-red-900 text-center">{data}</div>
          <h1 className="fs-2 text-red-900 text-center">Cars</h1>
        </div>
        <div className='col  rounded bg-orange-300 m-2 position-relative caricondiv'>
          <i className="bi bi-currency-dollar m-1 caricon text-orange-900 position-absolute top-0 end-0"></i>
          <div className="fs-1 text-orange-900 text-center">{data}</div>
          <h1 className="fs-2 text-orange-900 text-center">Expenses</h1>     
          </div>
        <div className='col rounded bg-lime-300 m-2 position-relative caricondiv'>
          <i className="bi bi-geo-alt-fill m-1 caricon text-lime-900 position-absolute top-0 end-0"></i>
          <div className="fs-1 text-lime-900 text-center">{locations}</div>
          <h1 className="fs-2 text-lime-900 text-center">Locations</h1>   
          
        </div>
        <div className='col rounded bg-sky-300 m-2 position-relative caricondiv'>
          <i className="bi  bi-check m-1 caricon text-sky-900 position-absolute top-0 end-0"></i>
          <div className="fs-1 text-sky-900 text-center">{data}</div>
          <h1 className="fs-2 text-sky-900 text-center">Booking</h1>   
            
        </div>

      </div>
   
    </div>
  )
}

export default HomeDashbord