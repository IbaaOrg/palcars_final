import React from 'react'

const AllRenterNotes = () => {
  return (
    <div className='  container mainrenternote '>
    <div className='card p-2 mt-2'> 
    
      <form class="row g-3">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Title</label>
          <input type="text" class="form-control" id="note" name="note" />
        </div>
        <div class="col-md-6">
          <label for="type" class="form-label">Type</label>
          <select id="type" class="form-select" name="type"  >
            <option selected>Choose type</option>
            <option>percentage</option>
            <option>fixed</option>

          </select>
        </div>
        <div class="col-12">
          <label for="value" class="form-label">Value</label>
          <input type="text" class="form-control" id="value" name="value" placeholder="20% or 20₪" />
        </div>
        <div class="col-12">
          <label for="expired_date" class="form-label">expired date</label>
          <input type="datetime-local" class="form-control" id="expired_date" name="expired_date" placeholder="Apartment, studio, or floor" />
        </div>
      
        <div class="col-md-12">
          <label for="car_id" class="form-label">Car</label>
          <select id="car_id" name="car_id" class="form-select" >
            <option selected>Choose Car Number</option>
            {/* {data.map(data => (

              <option key={data.id} value={data.id}>{data.car_number} </option>

            )
            
            )} */}
          </select>
        </div>
       
      
        <div class="col-12 d-flex justify-end">
        
          <button class="btn btn-primary m-1" >Save Changes</button>

        </div>
      </form>
    </div>
    </div>   )
}

export default AllRenterNotes