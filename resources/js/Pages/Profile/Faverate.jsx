import {React,  useEffect,useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cars from '../Cars/Cars';
import faverateContext from '../../Context/Faverate.jsx';
import CarCard from '../Cars/CarCard.jsx';
import { data } from 'jquery';
import "../../../css/LoadingStyle/Loading.css";
import Loading from "../../Componants/UI/Loading";
import get_faverates from '../../NetWorking/get_faverates.js';
import axios from 'axios';
function Faverate() {
  const [loading, setLoading] = useState(true);
const [favorites,setFavorites]=useState([]);
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  
  const getCars = async () => {
  
        await get_faverates(
            (data) => {
                setData(data.data); //rerender
                console.log(data);
            },
            (error) => {
                console.log(error.message);
            },
            data
        );
   
};
useEffect(() => {
 // getCars();
  //showFaverate();
//setData(data);

  //setFavorites(response.data);
}, []);

  const notify = () => toast.success("Wow so easy!",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   
    });
    
 //    <button onClick={favorites}>Show Fav</button>
 //for (let index = 0; index < f.length; index++) {
  

 //if(Cars.f[index]){  
  // {data.map((item, index) => (
  //                        <CarCard
  //                            key={item.id}
  //                            item={item}
  //                            index={index}
  //                            toggleFavorite={toggleFavorite}
  //                            favorites={favorites}
                        
  //                                                />
  //                    ))}

    const showFaverate = async () => {

    const token = localStorage.getItem("token");
    try {
        const response = await axios.get("/favorites", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        console.log(data);
       // setCars(response.data.data.car)
    } catch (error) {
        console.error(error);
    }
   
};
return (
  <div className="d-flex flex-wrap justify-evenly bg-slate-100 w-100  " >

          <button onClick={showFaverate}>Notify!</button>
          <ul>
          {data.map((dat) => {
               <li>{dat.id}</li> 

                              }
                    )}
          </ul>
       
   
      </div>
      
); 
}
export default Faverate