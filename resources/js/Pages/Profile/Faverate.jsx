import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Faverate() {

 

  // ... rest of your app
  const notify = () => toast.success("Wow so easy!",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   
    });

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer/>
     
          </div>
  );
}

export default Faverate