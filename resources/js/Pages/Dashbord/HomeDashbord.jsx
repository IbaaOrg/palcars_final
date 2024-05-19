import React, { useEffect, useState } from 'react'
import '../../../css/app.css';
import imgCar from '../../../../public/image/City.png'
import Clock from '../../Componants/UI/Clock';
import Time from '../../Componants/UI/DateToday';
import Date from '../../Componants/UI/DateToday';
import DateToday from './../../Componants/UI/DateToday';
function HomeDashbord() {
  const [data, setData] = useState(0);
  const [name, setName] = useState(0);
  const [locations, setLocations] = useState(0);
  const [Bookings, setBookings] = useState(0);
  const [renters,setRenters]=useState(0);
  const [employees,setEmployees]=useState(0);
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
const getBookings = ()=>{
  const token = localStorage.getItem("token");

  axios.get("/showAllBillsOfMyCompany", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const res = response.data;
     setBookings(res.data.length)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
const getRenters= ()=>{
  const token=localStorage.getItem('token');
  axios.get(`allRentersOfMyCompany`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    const res = response.data;
   setRenters(res.data.length)
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}
const getEmployees= ()=>{
  const token=localStorage.getItem('token');
  axios.get(`EmployeesCount`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    const res = response.data;
   setEmployees(res.data.employees_count)
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
          setName(res.data.name)
          setData(res.data.cars.length);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    getlocations();
    getBookings();
    getRenters();
    getEmployees();
  }, []); 
  return (
    <div>
      <div className="row d-flex justify-content-between  align-items-center p-5  m-2  mt-4 bg-white  rounded">
        <div className=' info fs-4 '><p className='fw-bold fs-4'>Welcome <span className='text-primary'>{name}</span> Company</p> 
        <p className=''>
"Here you can add and manage information about your company."          </p></div>
        <div className='containerImg'>
        <img src={imgCar}/></div>
      </div>
      <div className='d-flex p-4 px-5 mx-5 justify-content-center gap-5 align-items-center'>
        <Clock className="mx-4"/>
       <DateToday className="mx-4"/>
      </div>
      <div className='row p-4 m-2 gap-4'>
      
        <div className='col rounded bg-white m-2 position-relative  caricondiv rounded border d-flex justify-content-center px-4 py-2'>
          <i className="bi bi-car-front-fill m-1 caricon text-primary position-absolute top-0 end-0 px-3"></i>
          <div className="d-flex flex-column">
          <div className="fs-1 text-primary text-center">{data}</div>
          <h1 className="fs-2 text-primary text-center">Cars</h1></div>
        </div>
        <div className='col  rounded bg-primary m-2 position-relative caricondiv px-4 py-2'>
        <i class="bi bi-people-fill  m-1 caricon text-white position-absolute top-0 end-0 px-3"></i>
                  <div className="fs-1 text-white text-center">{employees}</div>
          <h1 className="fs-2 text-white text-center">Employees</h1>     
          </div>
        <div className='col rounded bg-white  m-2 position-relative caricondiv border px-4 py-2'>
        <i class="bi bi-person-fill-check caricon text-primary position-absolute top-0 end-0 px-3"></i>
                  <div className="fs-1 text-primary text-center">{renters}</div>
          <h1 className="fs-2 text-primary text-center">Renters</h1>   
          
        </div>
       

      </div>
      <div className='row p-4 m-2 gap-4'>
      <div className='col rounded bg-primary m-2 position-relative caricondiv px-4 py-2'>
          <i className="bi bi-geo-alt-fill m-1 caricon text-white position-absolute top-0 end-0 px-2"></i>
          <div className="fs-1 text-white text-center">{locations}</div>
          <h1 className="fs-2 text-white text-center">Locations</h1>   
          
        </div>
        <div className='col  rounded bg-white m-2 position-relative caricondiv px-4 py-2 border'>
          <i className="bi bi-currency-dollar m-1 caricon text-primary position-absolute top-0 end-0 px-2"></i>
          <div className="fs-1 text-primary text-center">{Bookings}</div>
          <h1 className="fs-2 text-primary text-center">Expenses</h1>     
          </div>
        <div className='col rounded bg-primary m-2 position-relative caricondiv px-4 py-2' >
          <i className="bi  bi-check m-1 caricon text-white position-absolute top-0 end-0 px-2"></i>
          <div className="fs-1 text-white text-center">{Bookings}</div>
          <h1 className="fs-2 text-white text-center">Bookings</h1>   
            
        </div> 
</div>
   
    </div>
  )
}

export default HomeDashbord