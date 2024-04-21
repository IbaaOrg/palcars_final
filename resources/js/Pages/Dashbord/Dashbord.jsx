import React, { useState } from 'react'
import Sidebar from '../../Layout/Sidebar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";


function Dashbord() {
    const [toggle , setToggle] = useState(true)
    const Toggle =()=>{
        setToggle(!toggle)
    }
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
    <div className='row'>
       {toggle &&

        <div className='col-2 bg-white vh-100'>
                  <Sidebar />

        </div>
        }
        <div className='col view'>
          <Outlet/>
        </div>
    </div>
    </div>
  )
}

export default Dashbord
