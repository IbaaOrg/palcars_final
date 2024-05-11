import React, { useEffect, useState } from 'react'

import axios from 'axios';


import { NavLink, Outlet } from 'react-router-dom'
import get_user from './../../NetWorking/get_user';
import Loading from '../../Componants/UI/Loading';
import RecordButton from './../../Componants/UI/RecordButton';
import { GrFormEdit } from "react-icons/gr";

function VehiclesDashbord() {
   

  const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statuses,setStatuses]=useState([])
    const [statusInput,setStatusInput]=useState('');
    const [editStatusId,setEditStatusId]=useState(null)
        const deleteVehical =async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token")
        const clickedId = e.target.id; // Get ID from the clicked button
        setMessage('Deleted Car ...')
        alert(`delete car No ${clickedId}`)
       
        try {
            var response = await axios.delete(`cars/${clickedId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const res = response.data
            if (res.status === true) {
               
                setMessage("Done")


               

            }

        } catch (e) {
            console.log(e)
            //alert(e.response.data.msg)
          
        }


    }
    const handleEditClick = (id,index, currentStatus) => {
        setEditStatusId(id); // Set the ID of the status being edited
        setStatuses(prevStatuses=>{
            const newStatuses=[...prevStatuses];
            newStatuses[index]=currentStatus;
            return newStatuses;
        }); // Initialize input field with current status
    };

    const handleSaveClick =async (index,id) => {
        // Implement save logic
        setEditStatusId(null); // Reset edit mode
        const token =localStorage.getItem('token');
       
        const response =await axios.post (`cars/updateStatus/${id}`,{status:  statuses[index]},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

    };

    const handleCancelClick = () => {
        setEditStatusId(null); // Reset edit mode
    };

    const handleInputChange = async(index,e ,id) => {
        const {value}=e.target
        setStatuses(prevStatuses=>{const newStatuses=[...prevStatuses];
            newStatuses[index]=value
            return newStatuses;
        }); // Update status input value 
       
        
    };

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
                  if (res.data.cars.length > 0) {
                    const allStatus = res.data.cars.map(car => car.status);
                    setStatuses(allStatus);
                }

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
                <div className=" d-flex justify-center align-middle">

                <Loading/>
                </div>
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
                                <th scope="tableitem">Car Number</th>
                                <th scope="tableitem">Make</th>
                                <th scope="tableitem">model</th>

                                <th scope="tableitem">catrgory</th>
                                <th scope="tableitem">description</th>
                                <th scope="tableitem">year</th>
                                <th scope="tableitem">seats</th>
                                <th scope="tableitem">doors</th>
                                <th scope="tableitem">bags</th>
                                <th scope="tableitem">fuel_type</th>
                                <th scope="tableitem">fuel_full</th>
                                <th scope="tableitem">status</th>
                                <th scope="tableitem">operation</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data.map((data,index) => (
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
                                    <td className=''>
                                    {editStatusId === data.id ? (
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <input type='text'  className="text-center" value={statuses[index]} onChange={(e)=>handleInputChange(index,e,data.id)} />
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button onClick={() => handleSaveClick(index,data.id)} className='btn border'>Save</button>
                                            <button onClick={handleCancelClick} className='btn border'>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (<span className='d-flex justify-content-center cursor-auto'>
                                            {statuses[index]} 
                                            <GrFormEdit className='cursor-pointer' onClick={()=>handleEditClick(data.id,index,statuses[index])}/>
                                        </span>)}
                                
                                </td>
                                  
                                    <td className=' d-flex flex-column gap-2'>
                                        <NavLink to={`viewvehical/${data.id}`} className='btn btn-success w-70'>View</NavLink>
                                        <NavLink to={`editvehical/${data.id}`} className='btn btn-primary w-70'>Update</NavLink>
                                        <button id={data.id} onClick={deleteVehical} className='btn btn-danger me-2'>Delete</button>


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