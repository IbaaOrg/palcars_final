import React,{useState,useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Componants/UI/Loading';
import { TranslateContext } from '../../Context/Translate';

function UserInfo() {
  const {translates}=useContext(TranslateContext)
  const [loading, setLoading] = useState(true);

    const [user, setUser] = useState([]);
    const [username, setUserName] = useState("");
    const [role, setRole] = useState("");
  const [locations, setLocations] = useState([]);

 const showalllocation = async()=>{
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("/showLocationsOfMyCompany", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
          
          
        })
        const res = response.data



        if (res) {
          setLocations(res.data.locations)
        }

      }
      catch(e){

      }

    }
    const getuser = async() => {
      const token = localStorage.getItem('token');

      if (token) {

        try {
          const response = await axios.get("/user", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })

          const res = response.data
          


          if (res) {
            setUser(res.data)
            setLoading(false)

          }

        } catch (e) {
          console.log(e)

        }

      } else {
        console.log('Token not found in local storage');
      }
    }

    useEffect(() => {
        getuser();
      showalllocation()

    }, []);


  return (
    <div>
      {loading ? (
                                <div className=" d-flex justify-center align-middle">

        <Loading/>
        </div>
      ) : (
      <div class="card" >
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b className='col text-start'>{translates.UserName}:</b> <span className='col'>{user.name}</span> </li>
          <li class="list-group-item"><b className='col text-start'>{translates.Account}  :</b> <span className='col'>{user.role}</span> </li>
          <li class="list-group-item"><b className='col text-start'>{translates.Email} :</b> <span className='col'> {user.email}</span> </li>
          <li class="list-group-item"><b className='col text-start'>{translates.Phone} :</b> <span className='col'>{user.phone}</span> </li>
              {user.role === 'Company' ? (
                <li class="list-group-item">
                  <b className='col text-start'>{translates.Locations} :</b>
                  {locations.map(location => (
                    <span className='col' key={location.id}>{location.location} , </span>))}
                </li>
              ) : null}
          {user.role === 'Renter' ? (
  <li class="list-group-item">
    <b className='col text-start'>{translates.Birthdate} :</b> 
    <span className='col'>{user.birthdate}</span>
  </li>
) : null}

        </ul>
      </div>
)}





      
    </div>
  )
}

export default UserInfo