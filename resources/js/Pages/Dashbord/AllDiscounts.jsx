import React from 'react'

import Loading from '../../Componants/UI/Loading';

function AllDiscounts() {
        const [loading, setLoading] = useState(false);

  return (
      <div>{
          loading ? (
              <Loading />
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
                  <div>
                      <table class="table">
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
                  {message && (
                      <div class="alert alert-danger" role="alert">
                          {message}
                      </div>
                  )}
              </div>


          )}
      </div>
  )
}

export default AllDiscounts