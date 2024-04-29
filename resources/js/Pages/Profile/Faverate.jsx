import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cars from '../Cars/Cars';
import faverateContext from '../../Context/Faverate.jsx';
function Faverate() {

 //const {favorites} =useContext(faverateContext);
 //const { favorites } = contextValue || {};
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
//const get_fav=(Cars,index)=>{
//if(Cars[index].favorites===true)
//getCars()
//}
 //    <button onClick={favorites}>Show Fav</button>
  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer/>
 
          </div>
  );
}

export default Faverate