import React, { useEffect, useState, useRef } from 'react'

function DiscountsDashbord() {
  const [data, setData] = useState([]);


  const form = useRef({
    "note": null,
    "type": null,
    "value": null,
    "expired_date": null,
    "car_id": null,
    "doors": null,
    "active": null,
  })
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
  }, []);
  return (
    <div className='  container'>
      <div className='card p-2 mt-2'> 
      
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Title</label>
            <input type="text" class="form-control" id="inputEmail4"/>
          </div>
          <div class="col-md-6">
            <label for="inputState" class="form-label">Type</label>
            <select id="inputState" class="form-select">
              <option selected>Choose type</option>
              <option>Percentage</option>
              <option>Fixed</option>

            </select>
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">Value</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="20% or 20₪"/>
          </div>
          <div class="col-12">
            <label for="inputAddress2" class="form-label">expired date</label>
            <input type="date" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
        
          <div class="col-md-12">
            <label for="inputState" class="form-label">Car</label>
            <select id="inputState" class="form-select">
              <option selected>Choose Car Number</option>
              {data.map(data => (

                <option key={data.id}>{data.car_number}</option>

              )
              
              )}
            </select>
          </div>
         
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck"/>
                <label class="form-check-label" for="gridCheck">
                  Active
                </label>
            </div>
          </div>
          <div class="col-12 d-flex justify-end">
            <button type="submit" class="btn btn-success m-1">Show all discounts</button>
            <button type="submit" class="btn btn-primary m-1">Save Changes</button>

          </div>
        </form>
      </div>
      </div>
  )
}

export default DiscountsDashbord