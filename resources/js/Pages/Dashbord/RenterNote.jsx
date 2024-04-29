import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../Context/User'
import axios from 'axios'
const RenterNote = () => {
   const {user}= useContext(UserContext)
   const token=localStorage.getItem('token')
   const[renters,setRenters]=useState([]);
   const[userId,setUserId]=useState('');
   const [error,setError ]=useState(null);
   const [success,setSuccess ]=useState(null);
  

   const form =useRef(
    {
      'note':null,
      'receiver_id':null,
        }
   )
  
   const addNote=async(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token');

    const formData = new FormData();
    formData.append("note", form.current.note);
    formData.append("receiver_id", userId);
    try {
      const res=await axios.post('/sendNoteToSpeceficUser',formData,{
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
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getAllrenterUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRenters(response.data.data);
      } catch (error) {
        console.error('Error fetching renters:', error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className='  container mainrenternote '>
    <div className='card p-2 mt-2'> 
    
      <form class="row g-3 p-4">
        <div className='col-md-6 d-flex justify-content-start align-items-center '>  
            <img src={user.photo_user} alt="photo user" className='rounded-circle userPhoto'/>
            <p><span className='text-primary fw-bold'>{user.name} Comapny</span> add note here :</p>
        </div>
        <div class="col-md-11 mt-3 m-auto  d-flex justify-content-start align-items-start gap-2">
          <label for="inputEmail4" class="form-label">Note</label>
          <textarea name="note" id="" cols="128" rows="3" onChange={set} className='p-2'></textarea>
        </div>
     
    
      
        <div class="col-md-11 mt-3 m-auto  d-flex justify-content-start align-items-start gap-2">
          <label for="user_id" class="form-label">User</label>
          <select id="user_id" name="user_id" class="form-select" onChange={(e) => setUserId(e.target.value)}
>
            <option selected>Choose User</option>
            {renters.map(data => (

<option key={data.id} value={data.id}>{data.name}</option>

)

)}
            
          </select>
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
        <div class="   d-flex justify-end">
        
          <button class="btn btn-primary m-1" onClick={addNote}>Send Note</button>

        </div>
      </form>
    </div>
    </div>  )
}

export default RenterNote