import React, { useContext } from 'react'
import { UserContext } from '../../Context/User'

const RenterNote = () => {
   const {user}= useContext(UserContext)
  return (
    <div className='  container mainrenternote '>
    <div className='card p-2 mt-2'> 
    
      <form class="row g-3">
        <div className='col-md-6 d-flex justify-content-start align-items-center p-2 px-4'>  
            <img src={user.photo_user} alt="photo user" className='rounded-circle userPhoto'/>
            <p><span className='text-primary fw-bold'>{user.name} Comapny</span> add note here :</p>
        </div>
        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">Note</label>
          <textarea name="note" id="" cols="50" rows="20" className='border-black'></textarea>
        </div>
     
    
      
        <div class="col-md-12">
          <label for="car_id" class="form-label">User</label>
          <select id="car_id" name="car_id" class="form-select" >
            <option selected>Choose User</option>
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
    </div>  )
}

export default RenterNote