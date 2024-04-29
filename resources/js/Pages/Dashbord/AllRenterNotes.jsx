import React, { useContext,useRef,useState } from 'react'
import { UserContext } from '../../Context/User'

const AllRenterNotes = () => {
  const {user}= useContext(UserContext)
  const token=localStorage.getItem('token')
  const[renters,setRenters]=useState([]);
  const[userId,setUserId]=useState('');
  const [error,setError ]=useState(null);
  const [success,setSuccess ]=useState(null);
 

  const form =useRef(
   {
     'note':null,
       }
  )
 
  const addNote=async(e)=>{
   e.preventDefault();
   const token=localStorage.getItem('token');

   const formData = new FormData();
   formData.append("note", form.current.note);
   try {
     const res=await axios.post('/sendNoteToAllRenters',formData,{
       headers:{
         Authorization: `Bearer ${token}`
       }
     })
     if(res.data.status===true){
       setSuccess(res.data.data);
       setError(null);
     }

   }catch(e){
     setError(e.response.data.msg);
     setSuccess(null)
   }
  }
  const set = (e) => {
   form.current = { ...form.current, [e.target.name]: e.target.value }
 } 
  
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
          <textarea name="note" id="" cols="128" rows="3" onChange={set} className='p-2'></textarea>
        </div>
     
    
      
        
        {error && (
                    <div class="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}
                {success && (
                    <div class="alert alert-success mt-3" role="alert">
                        {success}
                    </div>
                )}
      
        <div class="col-12 d-flex justify-end">
        
          <button class="btn btn-primary m-1" onClick={addNote}>Send Note</button>

        </div>
      </form>
    </div>
    </div>  )
}

export default AllRenterNotes