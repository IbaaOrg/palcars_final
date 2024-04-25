import React, { useRef, useState, useEffect } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';


import { useParams } from 'react-router-dom';

function EditCar() {
   const { id } = useParams(); // This will give you the value of "id" from the URL
  const [type, setType] = useState(null)
  const [colors, setColors] = useState(null)
  const [color, setColor] = useState(null)
  const [carforcompany, setCarForCompany] = useState(null)
  const navigate = useNavigate();


  const [next, setNext] = useState(false)

  const [preview, setPreview] = useState(null);



  const [car_number, setCar_number] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [seats, setSeats] = useState(null);
  const [doors, setdDoors] = useState(null);
  const [bags, setBags] = useState(null);
  const [catrgory, setCatrgory] = useState(null);
  const [fuel_type, setFuel_type] = useState(null);
  const [steering, setSteering] = useState(null);
  const [fuel_full, setFuel_full] = useState(null);
  const [color_id, setColor_id] = useState(null);
  const [description, setDescription] = useState(null);


  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }

  const numbers = [ 1,2, 4, 5, 7, 8, 9, 10,20];
  const numbersDoors = [2,4,5];
  const numbersBags = [1, 2, 3, 4, 5, 6, 7, 8];

  const [error, setError] = useState(null)
  const [done, setDone] = useState(null)






  const token = localStorage.getItem("token")
 
  const getcarforcompany = async (e) => {
    try {
      const response = await axios.get(`/cars/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = response.data;
      setCarForCompany(data.data);
      setPreview(data.data.sub_images[0].photo_car_url)
      setCar_number(data.data.car_number)
      setMake(data.data.make)
      setModel(data.data.model)
      setYear(data.data.year)
      setSeats(data.data.seats)
      setdDoors(data.data.doors)
      setBags(data.data.bags)
      setCatrgory(data.data.catrgory)
      setFuel_type(data.data.fuel_type)
      setSteering(data.data.steering)
      setFuel_full(data.data.fuel_full)
      setColor_id(data.data.car_color.id)
      setDescription(data.data.description)
      console.log(data.data);
      console.log(data.data.sub_images[0]);

    } catch (error) {
      console.error(error);
    }

  }




  const addcar = async (e) => {
    e.preventDefault()
    setError(null)
    setDone(null)
    const formData = new FormData()
    formData.append("make", make)
    formData.append("model",model)

    formData.append("year", year)
    formData.append("seats", seats)
    formData.append("doors", doors)
    formData.append("bags", bags)
    formData.append("catrgory", catrgory)
    formData.append("fuel_type", type)
    formData.append("fuel_full", fuel_full)

    formData.append("color_id", color.id)
    formData.append("description", description)


    formData.append("steering", steering)

    try {

      var response = await axios.post(`/cars/update/${id}`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const res = response.data
      if (res.status === true) {
        setDone(res.data)
        console.log("added car")
        navigate("/dashbord/VehiclesDashbord")

        
        setId(res.data.id)

      }

    } catch (e) {
      setError(e)
    }


  }



  const file = useRef(null)


  const show = (e) => {
    file.current = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file.current)
  }

  const addImage = async (e) => {
    e.preventDefault()

    const formData1 = new FormData()
    formData1.append("photo", file.current)
    formData1.append("car_id", id)

    try {

      var response = await axios.post("/carimage", formData1, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const res = response.data

      if (res.status === true) {
        console.log("image")

        console.log(res.data)
        //console.log(res.data.id)



      }

    } catch (e) {
      console.log("img error")

      console.log(e.response.data.msg)
      //alert(e.response.data.msg)

    }

  }



  const getColors = async () => {
    try {
      const response = await axios.get("/colors", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const res = response.data
      setColors(res.data)




    } catch (e) {
      console.log(e)
      //alert(e.response.data.msg)

    }
  }


  useEffect(() => {
    getColors();
    getcarforcompany();

  }, []);
  const setcolorid = (event) => {
    const selectedId = parseInt(event.target.value);
    const selectedOption = colors.find((option) => option.id === selectedId);
    setColor(selectedOption); // Convert to number
    console.log(selectedOption)
  };

 


  return (
    <div className='row p-4'>
    
      <h1 className='p-1 m-2 badge text-bg-primary text-wrap fs-4'>Edit Car #{id}</h1>
      


        <div className=' container col-8'>

        



        <div>



          <div className='col'></div>

          <div className=' container col-8'>

            <Form className='' onSubmit={addcar}>
              <div className='row'>

                <FormGroup className='col'>
                  <FormLabel>Car Number</FormLabel>
                  {carforcompany&&(

                  <FormControl type="text" placeholder="Enter Car Number" disabled name="car_number" id="car_number" value={car_number}/>
                  )}
                </FormGroup>

                <FormGroup className='col'>
                  <FormLabel>Make</FormLabel>
                  <FormControl type="text" placeholder="Enter Make" onChange={(e)=>{setMake(e.target.value)}} value={make} name="make" id="make" />
                </FormGroup>
              </div>
              <div className='row mt-3'>

                <FormGroup className='col'>
                  <FormLabel>Model</FormLabel>
                  <FormControl type="text" placeholder="Enter Car Model" onChange={(e) => { setModel(e.target.value) }} value={model} name="model" id="model" />
                </FormGroup>
                {/* SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks */}
                <FormGroup className='col'>
                  <FormLabel>Description</FormLabel>
                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" onChange={(e) => { setDescription(e.target.value) }} value={description}  name="description" id="description"></textarea>
                    <label for="floatingTextarea">Description</label>
                  </div>            </FormGroup>



              </div>

              <div className='row mt-3'>
                <FormGroup className='col'>
                  <FormLabel>Year</FormLabel>
                  <FormControl as="select" onChange={(e) => { setYear(e.target.value) }} name="year" value={year} id="year">
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className='col'>
                  <FormLabel>Seats</FormLabel>
                  <FormControl as="select" onChange={(e) => { setSeats(e.target.value) }} name="seats" value={seats} id="seats">
                    {numbers.map((number, index) => (
                      <option key={index} value={number}>
                        {number}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className='col'>
                  <FormLabel>Doors</FormLabel>
                  <FormControl as="select" onChange={(e) => { setdDoors(e.target.value) }} name="doors" value={doors} id="doors">
                    {numbersDoors.map((number, index) => (
                      <option key={index} value={number}>
                        {number}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>


                <FormGroup className='col'>
                  <FormLabel>Bags</FormLabel>
                  <FormControl as="select" onChange={(e) => { setBags(e.target.value) }} name="bags" value={bags} id="bags">
                    {numbersBags.map((number, index) => (
                      <option key={index} value={number}>
                        {number}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </div>
              <div className='row mt-4'>
                <div className='col'>

                  <label for="select" className=' mr-3'>Catogory</label>

                  <select class="select-input" onChange={(e) => { setCatrgory(e.target.value) }} name="catrgory" value={catrgory} id="catrgory">
                    <option value="" class="dropdown-item" href="#">Select Catogry</option>
                    <option value="SUV" class="dropdown-item" href="#">SUV</option>

                    <option value="Hatchback" class="dropdown-item" href="#">Hatchback</option>
                    <option value="Sedan" class="dropdown-item" href="#">Sedan</option>
                    <option value="Convertible" class="dropdown-item" href="#">Convertible</option>
                    <option value="Crossover" class="dropdown-item" href="#">Crossover</option>
                    <option value="Station Wagon" class="dropdown-item" href="#">Station Wagon</option>
                    <option value="Minivan" class="dropdown-item" href="#">Minivan</option>
                    <option value="Pickup trucks" class="dropdown-item" href="#">Pickup trucks </option>



                  </select>
                </div>
                {/* gas,diesel,electricity */}
                <div className='col'>
                  <label for="select" className=' mr-3'>Fuel Type</label>

                  <select class="select-input " onChange={(e) => { setFuel_type(e.target.value) }} name="fuel_type" value={fuel_type} id="fuel_type">
                    <option value="" class="dropdown-item" href="#">Select fuel type</option>
                    <option value="gas" class="dropdown-item" href="#">gas</option>

                    <option value="diesel" class="dropdown-item" href="#">diesel</option>
                    <option value="electricity" class="dropdown-item" href="#">electricity</option>
                  </select>
                </div>
                {type === "electricity" ? (
                  <></>
                ) : (


                  <FormGroup className='col'>
                    <FormLabel>Fuel Full</FormLabel>
                      <FormControl type="text" placeholder="Enter fuel full" onChange={(e) => { setFuel_full(e.target.value) }} name="fuel_full" value={fuel_full} id="fuel_full" />
                  </FormGroup>
                )}

                {/* Automatic,Manual */}
                <div className='col'>

                  <label for="select" className=' mr-3'>Steering</label>

                  <select class="select-input" onChange={(e) => { setSteering(e.target.value) }} name="steering" value={steering} id="steering">
                    <option value="" class="dropdown-item" href="#">Select Steering </option>
                    <option value="Automatic" class="dropdown-item" href="#">Automatic </option>

                    <option value="Manual" class="dropdown-item" href="#">Manual </option>
                  </select>
                </div>
                <div>
                  <label for="select" className=' mr-3'>Color Car</label>

                  {colors && (

                    <select class="select-input mt-4" onChange={(e)=>{setcolorid(e)}} >

                      {colors.map(color => (
                        <option key={color.id} value={color.id} id={color.id} >{color.color}</option>

                      ))}
                    </select>
                  )}

                </div>
              </div>
              {/*  <label for="exampleColorInput" class="form-label">Color picker</label>
                <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">
              */}
              <div class="mb-3">
                <form onSubmit={addImage}>
                  <label for="formFile" class="form-label m-2 p-2 text-center">Images</label>
                  {/* <input class="form-control" type="file" onChange={show} id="formFile" /> */}
                  <div className=' mt-4 d-flex justify-content-end'>
                  {/*   <button type='submit' className="btn border border-success btn-success " >Edit Image</button> */}


                    {/* <input type="submit" class="btn border border-success btn-success addcar" value="Add Car" />  */}

                  </div>
                </form>

              </div>

              <div className=' d-flex justify-content-center '>

                <img src={preview} height="500" width="500" className={""} />
              </div>

          


              {done&&(<div className='alert alert-success mt-2'> {done} </div>)}
              {error&&(<div className='alert alert-danger mt-2'> {error} </div>)}

              <div className=' mt-4 d-flex justify-content-end'>
                  <button type='submit' className="btn border border-success btn-success " >Save Car</button>


                {/* <input type="submit" class="btn border border-success btn-success addcar" value="Add Car" />  */}

              </div>
              {/* Repeat the above FormGroup for each input field */}

            </Form>


          </div>
          <div className='col'></div>

        </div>
      



    </div>
    </div>
  )
}

export default EditCar