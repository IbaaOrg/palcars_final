import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../Componants/UI/Loading';
const MaintainedCars = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
   
            axios.get('/carsuser', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    const res = response.data;
                    console.log(res);
                     setData(res.data.cars.filter(item => {
                        // يمكنك استبدال "item" بالاسم الذي تحتاجه في بياناتك
                            return item.status !== null && item.status.toLowerCase() === "maintained ";
                            // قم بإضافة المزيد من الحقول حسب الحاجة
                        }))
                   
   
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
   
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally{
            setLoading(false)
        }
     }, [message]); 
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
                    {/* <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit" onClick={SearchFunction}>Search</button>
                    </form> */}
                        {/* <form className="d-flex" role="search">
  <input
    className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleChange} />
  <button className="btn btn-outline-success" type="submit" onClick={handleSearch} > Search </button>
</form> */}
                </div>
                <div className="col">
                    <button type="button" class="btn btn-primary Addvehicle" >
                        <NavLink to="/dashbord/addvehical">Add vehicle</NavLink>
                    </button>

                </div>
                
            </div>
            {data.length>0?<div className='tablewidth '>
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
                                <td>{data.status}</td>
                    
                              
                                <td className=' d-flex flex-column gap-2'>
                                    <NavLink to={`viewvehical/${data.id}`} className='btn btn-success w-70'>View</NavLink>
                                </td>

                                {/* Add more table cells for other car attributes */}
                            </tr>
                        ))}
                    </tbody> 
                </table>
                       
            </div>:<div className='d-flex flex-column justify-content-center align-items-center'>
                <p className='fs-3'>No Maintained cars in this time</p>
                <img src={"../../../../image/no-parking-sign.png"} alt="" width={"300px"} height={"300px"}/>
                </div>}
                
        </div>


)}
    </div>   )
}

export default MaintainedCars