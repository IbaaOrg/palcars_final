import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function DiscountsDashbord() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(null)
  const [carid, setCarId] = useState(null)
  const navigate = useNavigate();

  
  const activevalue =()=>{

  }
  const form = useRef({
    "note": null,
    "type": null,
    "value": null,
    "expired_date": null,

  })

  const set = (e) => {
    form.current = { ...form.current, [e.target.name]: e.target.value }
    console.log({ ...form.current, [e.target.name]: e.target.value })
    console.log(carid)
  }

  //
  const token = localStorage.getItem("token")

  const addDiscount = async (e)=>{
    e.preventDefault();
    //setDone(null)
    const formData = new FormData()
    formData.append("note", form.current.note)
    formData.append("type", form.current.type)
    formData.append("value", form.current.value)

    formData.append("expired_date", form.current.expired_date)
    formData.append("car_id", carid)


    try {

      var response = await axios.post("/discounts", formData , {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const res = response.data
      if (res.status === true) {
        //setDone(res.data)
        navigate("/dashbord/DiscountsDashbord");

        console.log("added descount")
        
        console.log(res.data)
        //console.log(res.data.id)

      

      }

    } catch (e) {
      console.log(e.response.data.msg)
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
          setData(res.data.cars);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);



  return (
    <div className='  mainrenternote'>
      <div className='card p-2 mt-2'> 
      
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Title</label>
            <input type="text" class="form-control" id="note" name="note"  onChange={set}/>
          </div>
          <div class="col-md-6">
            <label for="type" class="form-label">Type</label>
            <select id="type" class="form-select" name="type" onChange={set} >
              <option selected>Choose type</option>
              <option>percentage</option>
              <option>fixed</option>

            </select>
          </div>
          <div class="col-12">
            <label for="value" class="form-label">Value</label>
            <input type="text" class="form-control" id="value" name="value" placeholder="20% or 20₪" onChange={set}/>
          </div>
          <div class="col-12">
            <label for="expired_date" class="form-label">expired date</label>
            <input type="datetime-local" class="form-control" id="expired_date" name="expired_date" placeholder="Apartment, studio, or floor" onChange={set}/>
          </div>
        
          <div class="col-md-12">
            <label for="car_id" class="form-label">Car</label>
            <select id="car_id" name="car_id" class="form-select" onChange={(e)=>{setCarId(e.target.value)}}>
              <option selected>Choose Car Number</option>
              {data.map(data => (

                <option key={data.id} value={data.id}>{data.car_number} </option>

              )
              
              )}
            </select>
          </div>
         
        
          <div class="col-12 d-flex justify-end">
          
            <button class="btn btn-primary m-1" onClick={addDiscount}>Save Changes</button>

          </div>
        </form>
      </div>
      </div>
  )
}

export default DiscountsDashbord