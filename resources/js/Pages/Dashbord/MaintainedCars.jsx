import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../Componants/UI/Loading';
import { TranslateContext } from '../../Context/Translate';
const MaintainedCars = () => {
    const {translates}=useContext(TranslateContext)
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
                            return item.status !== null && item.status.toLowerCase() === "maintained";
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
                    <h1 className='fs-1'>{translates.VehiclesList}</h1>
                    <p className=''>{translates.VehiclesDetails}</p>
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
                        <NavLink to="/dashbord/addvehical">{translates.AddVehicles}</NavLink>
                    </button>

                </div>
                
            </div>
            {data.length>0?<div className='tablewidth '>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="tableitem">{translates.CarNumber}</th>
                            <th scope="tableitem">{translates.Make}</th>
                            <th scope="tableitem">{translates.Model}</th>

                            <th scope="tableitem">{translates.Category}</th>
                            <th scope="tableitem">{translates.Description}</th>
                            <th scope="tableitem">{translates.Year}</th>
                            <th scope="tableitem">{translates.Seats}</th>
                            <th scope="tableitem">{translates.Doors}</th>
                            <th scope="tableitem">{translates.Bags}</th>
                            <th scope="tableitem">{translates.FuelType}</th>
                            <th scope="tableitem">{translates.FuelFull}</th>
                            <th scope="tableitem">{translates.Status}</th>
                            <th scope="tableitem">{translates.Operation}</th>


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
                                    <NavLink to={`viewvehical/${data.id}`} className='btn btn-success w-70'>{translates.View}</NavLink>
                                </td>

                                {/* Add more table cells for other car attributes */}
                            </tr>
                        ))}
                    </tbody> 
                </table>
                       
            </div>:<div className='d-flex flex-column justify-content-center align-items-center'>
                <p className='fs-3'>{translates.nomaintained}</p>
                <img src={"../../../../image/no-parking-sign.png"} alt="" width={"300px"} height={"300px"}/>
                </div>}
                
        </div>


)}
    </div>   )
}

export default MaintainedCars