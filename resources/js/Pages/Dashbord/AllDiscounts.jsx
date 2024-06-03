import React, { useContext, useEffect, useState } from 'react'

import Loading from '../../Componants/UI/Loading';
import Discounts from './../Discounts/Discounts';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { TranslateContext } from '../../Context/Translate';

function AllDiscounts() {
    const {translates}=useContext(TranslateContext)
        const [loading, setLoading] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [deleted,setDeleted]=useState(null);
    const [data, setData] = useState([]);
    const navigate=useNavigate();
        const deleteDiscount=(e)=>{
        e.preventDefault();
        const id=e.target.id;
        const token=localStorage.getItem('token');
        setDeleted('Delete Discount ...');
        alert(`delete Discount No ${id}`)

        const response=axios.delete(`discounts/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.data.status === true){
            setDeleted('Done')
        }
    }
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
                 setData(res.data);
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
             });

  
  }, [deleted]); 

  const [searchTerm, setSearchTerm] = useState(""); // الحالة المحلية لتخزين قيمة حقل البحث

    const handleChange = (e) => {
        setSearchTerm(e.target.value); // تحديث القيمة عند تغييرها في حقل البحث
    };
    const handleSearch = (e) => {
        e.preventDefault();
        //console.log(data);
        setDiscounts(data.filter(item => {
            return (
                item.note !== null && (searchTerm ? item.note?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.expired_date !== null && (searchTerm ? item.expired_date?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.type !== null && (searchTerm ? item.type?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.value !== null && (searchTerm ? item.value?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.car.car_number !== null && (searchTerm ? item.car.car_number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) 

            ); 
        }));
    };
    const viewDiscount=(id)=>{
        navigate(`/dashbord/viewDiscount/${id}`);
    }
    const editDiscount=(id)=>{
        navigate(`/dashbord/editDiscount/${id}`)
    }
  return (
      <div>{
          loading ? (
            <div className=" d-flex justify-center align-middle">

              <Loading />
              </div>
          ) : (

              <div className="container text-center  p-10">
                  <div className="row">
                      <div className="col">
                          <h1 className='fs-1'>Discounts List</h1>
                              <p className=''>Your all Discounts are listed bellow</p>
                      </div>
                      <div className="col ">
                      <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2" type="search" placeholder={translates.Search} aria-label="Search" value={searchTerm} onChange={handleChange} />
                                <button className="btn btn-outline-success" type="submit" onClick={handleSearch} > {translates.Search} </button>
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
                                     

                                      <td className=' p-1 d-flex justify-content-center gap-2'>
                                          <button  className='btn btn-success' onClick={()=>viewDiscount(data.id)}>View</button>
                                          <button  className='btn btn-primary' onClick={()=>editDiscount(data.id)}>Update</button>
                                          <button id={data.id} className='btn btn-danger' onClick={deleteDiscount}>Delete</button>


                                      </td>

                                  </tr>
                              ))}
                          </tbody>)}
                      </table>

                  </div> 
                  {deleted==='Deleted Car ...' && (
                                <div class="alert alert-danger" role="alert">
                                    {deleted}
                                </div>
                            )}
                                {deleted ==='Done' && (
                                <div class="alert alert-success" role="alert">
                                    {deleted}
                                </div>
                            )}
              </div>


          )}
      </div>
  )
}

export default AllDiscounts