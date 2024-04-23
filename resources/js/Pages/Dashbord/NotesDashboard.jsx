import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const NotesDashboard = () => {
  return (
    <div className='  container'>
    <div className='card p-2 mt-2'> 
    
      <form class="row g-3">
        <div class="col-md-6 d-flex flex-column justify-contetnt-center align-items-center">
        <FaUser />
        <p>To specific User</p>
        </div>
        <div class="col-md-6 d-flex flex-column justify-contetnt-center align-items-center">
        <FaUsers />
        <p>To All Users</p>
        </div>
    
      </form>
    </div>
    </div>  )
}

export default NotesDashboard