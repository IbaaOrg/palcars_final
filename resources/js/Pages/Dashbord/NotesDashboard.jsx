import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const NotesDashboard = () => {
  const navigate=useNavigate();
  const tospecificuser=()=>{
    navigate('/dashbord/NotesDashboard/specificrenter')
  }
  const toAllUser=()=>{
    navigate('/dashbord/NotesDashboard/allusers')
  }
  return (
    <div className='  mainrenternote'>

    <div className='card px-5 py-3 notesmain'> 
      <form class="row g-3">
      <h2 className='fs-5 fw-bold pb-5 w-100 text-center'>Send Notes</h2>

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