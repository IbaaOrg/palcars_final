import React, { useEffect, useState } from 'react'

import axios from 'axios';


import { NavLink, Outlet } from 'react-router-dom'
import get_user from './../../NetWorking/get_user';
import Loading from '../../Componants/UI/Loading';
import RecordButton from './../../Componants/UI/RecordButton';

function VehiclesDashbord() {
   

  const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const deleteVehical =async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token")
        const clickedId = e.target.id; // Get ID from the clicked button
        setMessage('Deleted Car ...')
        alert(`delete car No ${clickedId}`)
       
        try {
            console.log(token)
            var response = await axios.delete(`cars/${clickedId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const res = response.data
            if (res.status === true) {
               
                setMessage("Done")

                //window.location.reload()

                //console.log(res.data.id)

               

            }

        } catch (e) {
            console.log(e)
            //alert(e.response.data.msg)
          
        }


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
                 console.log(res);
                  setData(res.data.cars);
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
             });

     } catch (error) {
         console.error('Error fetching data:', error);
     }
  }, [message]); 
    // /cars/{id}   post
 
    return (
        <div>{
            loading ? (
                <Loading/>
            ) : (

            <div className="container text-center  p-10">
                <div className="row">
                    <div className="col">
                        <h1 className='fs-1'>Vehicles List</h1>
                        <p className=''>Your all vehicles are listed bellow</p>
                    </div>
                    <div className="col ">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col">
                        <button type="button" class="btn btn-light">Filter</button>

                        <button type="button" class="btn btn-primary Addvehicle" >
                            <NavLink to="/dashbord/addvehical">Add vehicle</NavLink>
                        </button>

                    </div>
                    
                </div>
                <div className='tablewidth '>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">Car Number</th>
                                <th scope="col">Make</th>
                                <th scope="col">model</th>

                                <th scope="col">catrgory</th>
                                <th scope="col">description</th>
                                <th scope="col">year</th>
                                <th scope="col">seats</th>
                                <th scope="col">doors</th>
                                <th scope="col">bags</th>
                                <th scope="col">fuel_type</th>
                                <th scope="col">fuel_full</th>
                                <th scope="col">operation</th>


                            </tr>
                        </thead>
                        <tbody>
                         
                            {data.map(data => (
                                <tr key={data.id}>
                                    <td>{data.car_number}</td>
                                    <td>{data.make}</td>
                                    <td>{data.model}</td>
                                    <td>{data.catrgory}</td>
                                    <td>{data.description}</td>
                                    <td>{data.year}</td>
                                    <td>{data.seats}</td>
                                    <td>{data.doors}</td>
                                    <td>{data.bags}</td>
                                    <td>{data.fuel_type}</td>
                                    <td>{data.fuel_full}</td>
                                  
                                    <td className=' p-1'>
                                        <NavLink to={`viewvehical/${data.id}`} className='btn btn-success'>View</NavLink>
                                        <NavLink to={`editvehical/${data.id}`} className='btn btn-primary'>Update</NavLink>
                                        <button id={data.id} onClick={deleteVehical} className='btn btn-danger'>Delete</button>


                                    </td>

                                    {/* Add more table cells for other car attributes */}
                                </tr>
                            ))}
                        </tbody> 
                    </table>
                           
                </div>
                        {message==='Deleted Car ...' && (
                                <div class="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            )}
                                {message==='Done' && (
                                <div class="alert alert-success" role="alert">
                                    {message}
                                </div>
                            )}
            </div>


)}
        </div>
    )
}

export default VehiclesDashbord