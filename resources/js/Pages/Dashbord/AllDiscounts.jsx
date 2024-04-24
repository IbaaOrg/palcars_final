import React, { useEffect, useState } from 'react'

import Loading from '../../Componants/UI/Loading';
import Discounts from './../Discounts/Discounts';
import { NavLink, Outlet } from 'react-router-dom'

function AllDiscounts() {
        const [loading, setLoading] = useState(false);
    const [discounts, setDiscounts] = useState([]);

        useEffect(() => {
    
         const token = localStorage.getItem("token");

         axios.get('/getMyDiscounts', {
             headers: {
                 "Authorization": `Bearer ${token}`
             }
         })
             .then(response => {
                 const res = response.data;
                 console.log(res);
                 setDiscounts(res.data);
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
             });

  
  }, []); 
  return (
      <div>{
          loading ? (
              <Loading />
          ) : (

              <div className="container text-center  p-10">
                  <div className="row">
                      <div className="col">
                          <h1 className='fs-1'>Discounts List</h1>
                              <p className=''>Your all Discounts are listed bellow</p>
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
                                  <NavLink to="/dashbord/addDiscount">Add Discount</NavLink>
                          </button>

                      </div>

                  </div>
                  <div>
                      <table class="table">
                          <thead>
                              <tr>
                                  <th scope="col">Title</th>
                                  <th scope="col">Expired Date</th>
                                  <th scope="col">Type</th>

                                  <th scope="col">Value</th>
                                  <th scope="col">Car</th>
                                      <th scope="col">Oprations</th>

                                


                              </tr>
                          </thead>
                          {discounts&&(
                          <tbody>

                              {discounts.map(data => (
                                  <tr key={data.id}>
                                      <td>{data.note}</td>

                                      <td>{data.expired_date}</td>
                                      <td>{data.type}</td>
                                      <td>{data.value}</td>
                                      <td>{data.car.car_number}</td>
                                     

                                      <td className=' p-1'>
                                          <button  className='btn btn-success'>View</button>
                                          <button  className='btn btn-primary'>Update</button>
                                          <button id={data.id} className='btn btn-danger'>Delete</button>


                                      </td>

                                  </tr>
                              ))}
                          </tbody>)}
                      </table>

                  </div> 
             
              </div>


          )}
      </div>
  )
}

export default AllDiscounts