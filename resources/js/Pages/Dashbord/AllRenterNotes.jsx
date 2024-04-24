import React, { useContext } from 'react'
import { UserContext } from '../../Context/User'

const AllRenterNotes = () => {
    const {user}=useContext(UserContext);
  return (
    <div className='  container mainrenternote '>
    <div className='card p-2 mt-2'> 
    
      <form class="row g-3 p-4">
        <div className='col-md-6 d-flex justify-content-start align-items-center '>  
            <img src={user.photo_user} alt="photo user" className='rounded-circle userPhoto'/>
            <p><span className='text-primary fw-bold'>{user.name} Comapny</span> add note here :</p>
        </div>
        <div class="col-md-11 mt-3 m-auto d-flex justify-content-start align-items-start gap-2">
          <label for="inputEmail4" class="form-label">Note</label>
          <textarea name="note" id="" cols="128" rows="3" ></textarea>
        </div>
     
    
      
        
       
      
        <div class="col-12 d-flex justify-end">
        
          <button class="btn btn-primary m-1" >Send Note</button>

        </div>
      </form>
    </div>
    </div>  )
}

export default AllRenterNotes