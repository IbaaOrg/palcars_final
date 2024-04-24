import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const NotesDashboard = () => {
  const navigate=useNavigate();
  const tospecificuser=()=>{
    navigate('/specificrenter')
  }
  const toAllUser=()=>{
    navigate('/allusers')
  }
  return (
    <div className='  container '>
    <div className='card p-2   notesmain'> 
    
      <form class="row g-3">
        <div class="d-flex flex-column justify-contetnt-center align-items-center cardnote " onClick={tospecificuser}>
        <FaUser size={50} />
        <p>To specific User</p>
        </div>
        <div class="d-flex flex-column justify-contetnt-center align-items-center cardnote "onClick={toAllUser}>
        <FaUsers size={60} />
        <p>To All Users</p>
        </div>
    
      </form>
    </div>
    </div>  )
}

export default NotesDashboard