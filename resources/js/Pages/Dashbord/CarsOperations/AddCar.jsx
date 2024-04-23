import React, { useRef, useState, useEffect } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../../../../css/app.css'




function AddCar() {

  const [type,setType] = useState(null)
  const [colors, setColors] = useState(null)
  const [color, setColor] = useState(null)
  const navigate = useNavigate();

  const [next, setNext] = useState(false)
  const [id, setId] = useState(null)
const [price,setPrice]=useState(0);

 


  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }

  const numbers = [2, 4, 5, 6, 8,];
  const numbersDoors = [2, 3, 4];
  const numbersBags = [1, 2, 3, 4, 5, 6, 7, 8];
const pickuplocations=[];

  const [error, setError] = useState(null)
  const [done, setDone] = useState(null)
/* 
'car_number'=> 'required|unique:cars,car_number|regex:/^[A-Z]{1,2}-[0-9]{4,5}-[A-Z]{1}$/u',
            'make'=>'required|string|max:255',
            'model'=>'required|string|max:255',
            'catrgory'=>'required|string|in:SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks',
            'description'=>'nullable|string',
            'year'=>'required|integer|digits:4|min:1900|max:' . date('Y'),
            'seats'=>'required|integer|min:1|max:10',
            'doors'=>'required|string|in:2,3,4',
            'bags'=>'nullable|integer|min:1|max:8', 
            'fuel_type'=>'required|string|in:gas,diesel,electricity',
            'fuel_full'=>$fuel_full,
            'steering'=>'required|string|in:Automatic,Manual',
            'color_id'=>'required|exists:colors,id'     
             */

  const form1 = useRef({
    "price": null,




  })

  const form = useRef({
    "car_number": null,
    "make": null,
    "model": null,
    "year": null,
    "seats": null,
    "doors": null,
    "bags": null,
    "catrgory": null,
    "fuel_type": null,
    "fuel_full":null,
    "steering": null,
    "color_id":null
    


  })


  
  const token = localStorage.getItem("token")
  const nextToAddimage = async() => {
    
/*     e.preventDefault()
    setError(null)
    setDone(null)
    const formData = new FormData()
    formData.append("car_number", form.current.car_number)
    formData.append("make", form.current.make)
    formData.append("model", form.current.model)

    formData.append("year", form.current.year)
    formData.append("seats", form.current.seats)
    formData.append("doors", form.current.doors)
    formData.append("bags", form.current.bags)
    formData.append("catrgory", form.current.catrgory)
    formData.append("fuel_type", type)
    formData.append("color_id", form.current.color_id)

    formData.append("steering", form.current.steering)

    try {

      var response = await axios.post("/addcar", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(response)
      const res = response.data
      console.log(res.data)
      if (res.status === true) {
        setDone(res.data)
        console.log(res.data)
        setNext(true)


      }

    } catch (e) {
      console.log(e.response.data.msg)
      //alert(e.response.data.msg)
      setError(e.response.data.msg)
    }
 */

  }

  // Make sure you have the correct library installed for decoding JWT tokens


  const [selectedImages, setSelectedImages] = useState([]);

  const addcar = async (e) => {
     e.preventDefault()
    setError(null)
    setDone(null)
    const formData = new FormData()
    formData.append("car_number", form.current.car_number)
      formData.append("make", form.current.make)
    formData.append("model", form.current.model)

      formData.append("year", form.current.year)
      formData.append("seats", form.current.seats)
      formData.append("doors", form.current.doors)
      formData.append("bags", form.current.bags)
      formData.append("catrgory", form.current.catrgory)
      formData.append("fuel_type", type)
      formData.append("fuel_full", form.current.fuel_full)
    formData.append("color_id", form.current.color_id)
    formData.append("fuel_full", form.current.fuel_full)

    formData.append("color_id", color.id)

      formData.append("steering", form.current.steering)

    try {

      var response = await axios.post("/addcar", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const res = response.data
      if (res.status === true) {
        setDone(res.data)
        console.log("added car")

        console.log(res.data)
        //console.log(res.data.id)

        setNext(true)
        setId(res.data.id)
        
      }

    } catch (e) {
      console.log(e.response.data.msg)
      //alert(e.response.data.msg)
      setError(e.response.data.msg)
    }
 
 
  }


  const [preview, setPreview] = useState(null);

  const file = useRef(null)


  const show = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        setPreview(reader.result);
    };
    reader.onerror = (error) => {
        // Handle FileReader errors
        console.error('Error reading file:', error);
    };
    reader.readAsDataURL(selectedFile);
};


  // const addImage = async (e) => {
  //   e.preventDefault()

  //   const formData1 = new FormData()
  //   formData1.append("photo", selectedImages )
  //   formData1.append("car_id", id)

  //   const formData2 = new FormData()
  //   formData2.append("price", Number(form1.price))
  //   formData2.append("car_id", id)

  //   try {

  //     var response = await axios.post("/carimage", formData1, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     })
      
  //     const res = response.data
      
  //     if (res.status === true) {
  //       console.log("image")
       
  //       console.log(res.data)
  //       //console.log(res.data.id)

        

  //     }

  //   } catch (e) {
  //     console.log(e.response.data.msg)
  //     //alert(e.response.data.msg)
     
  //   }
  //   try {

  //     var response = await axios.post("/prices", formData2, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     })

  //     const res = response.data

  //     if (res.status === true) {
  //       console.log("image")
  //       navigate("/dashbord/VehiclesDashbord")
  //       console.log(res.data)
  //       //console.log(res.data.id)



  //     }

  //   } catch (e) {
  //     console.log("img error")

  //     console.log(e.response.data.msg)
  //     //alert(e.response.data.msg)

  //   }


    
  // }

  const addImage = async (e) => {
    e.preventDefault();
  
    try {
      for (const image of selectedImages) {
        const formData1 = new FormData();
        formData1.append("photo", image);
        formData1.append("car_id", id);
  
        const response = await axios.post("/carimage", formData1, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        const res = response.data;
  
        if (res.status === true) {
          console.log("Image uploaded successfully");
          console.log(res.data);
        }
      }


  
      // After uploading all images, navigate to the next step
      navigate("/dashbord/VehiclesDashbord");
    } catch (error) {
      console.log("Error uploading image:", error.response.data.msg);
      // Handle error here
    }
    const formData2=new FormData();
    formData2.append('price',price);
    formData2.append('car_id',id);
    try {

     const res= await axios.post(`/prices`,formData2,{
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(res)
    }catch(error){

    }
  };
  
const getColors = async() => {
  try { const response = await axios.get("/colors", {
    headers: {
      "Authorization": `Bearer ${token}`
}})
const res = response.data
  setColors(res.data)

    console.log(res.data)




}catch (e) {
  console.log(e)
  //alert(e.response.data.msg)
 
}
    }


useEffect(() => {
  getColors();
 
}, []);
  const setcolorid = (event) => {
    const selectedId = parseInt(event.target.value);
    const selectedOption = colors.find((option) => option.id === selectedId);
    //setSelectedOption();
    setColor(selectedOption); // Convert to number
    console.log(selectedOption)
  };
  const set = (e) => {
    form.current = { ...form.current, [e.target.name]: e.target.value }
    console.log({ ...form.current, [e.target.name]: e.target.value })
  }


  const set1 = (e) => {
    setPrice(e.target.value)
  }
  const handleChangeImages = (event) => {
    const newImages = Array.from(event.target.files);
    if (newImages.length > 4) {
      alert('You can only select up to 4 images.');
      return; // Prevent exceeding the limit
    }
    setSelectedImages(newImages);
  };

  return (
    <div className='row p-4'>

     {next?(
     
   
        <div className=' container col-8'>
          <h1 className='p-1 m-2 badge text-bg-primary text-wrap fs-4'>Add Images and Price </h1>

          <div class="mb-3">
          <form onSubmit={addImage}>
         

  <label for="formFile" class="form-label">Add Images</label>
              <input class="form-control" type="file" accept="image/*" multiple onChange={handleChangeImages} id="formFile" name="photo"/>
              <label for="formFile" class="form-label">Add Price</label>

              <input class="form-control" type="text" id="price" name="price" placeholder='Price ₪' onChange={set1}/>
            
            

              <div className=' mt-4 d-flex justify-content-end'>
                <button type='submit' className="btn border border-success btn-success " >Done</button>


                {/* <input type="submit" class="btn border border-success btn-success addcar" value="Add Car" />  */}

              </div>
          </form>
          
          </div>
  
          <div className="image-preview-container">
            {selectedImages.length > 0 ? (
              selectedImages.map((image, index) => ( // Limit previews to 4
                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
              ))
            ) : (
              <p>No images selected yet.</p>
            )}
          </div>            
        </div>  
        
      
       


      ):(
        <div>
       
            <h1 className='p-1 m-2 badge text-bg-primary text-wrap fs-4'>Add Car </h1>

  
      <div className='col'></div>  
     
      <div className=' container col-8'>
     
              <Form className='' onSubmit={addcar}>
          <div className='row'>

            <FormGroup className='col'>
              <FormLabel>Car Number</FormLabel>
              <FormControl type="text" placeholder="Enter Car Number" onChange={set} name="car_number" id="car_number" />
            </FormGroup>

            <FormGroup className='col'>
              <FormLabel>Make</FormLabel>
              <FormControl type="text" placeholder="Enter Make" onChange={set} name="make" id="make"/>
            </FormGroup>
          </div>
          <div className='row mt-3'>

            <FormGroup  className='col'>
              <FormLabel>Model</FormLabel>
              <FormControl type="text" placeholder="Enter Car Model" onChange={set} name="model" id="model"/>
            </FormGroup>
            {/* SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks */}
            <FormGroup  className='col'>
              <FormLabel>Description</FormLabel>
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here"  onChange={set} name="description" id="description"></textarea>
                <label for="floatingTextarea">Description</label>
              </div>            </FormGroup>



          </div>

          <div className='row mt-3'>
            <FormGroup className='col'>
              <FormLabel>Year</FormLabel>
              <FormControl as="select" onChange={set} name="year" id="year">
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </FormControl>
            </FormGroup>

            <FormGroup   className='col'>
              <FormLabel>Seats</FormLabel>
              <FormControl as="select" onChange={set} name="seats" id="seats">
                {numbers.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </FormControl>
            </FormGroup>

            <FormGroup   className='col'>
              <FormLabel>Doors</FormLabel>
              <FormControl as="select" onChange={set} name="doors" id="doors">
                {numbersDoors.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </FormControl>
            </FormGroup>


            <FormGroup  className='col'>
              <FormLabel>Bags</FormLabel>
              <FormControl as="select" onChange={set} name="bags" id="bags">
                {numbersBags.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </div>
          <div className='row mt-4'>
            <div className="d-flex col-6 gap-4">
            <div className='col-6 d-flex'>
          
          <label for="select" className=' mr-3'>Catogory</label>

          <select class="select-input" onChange={set} name="catrgory" id="catrgory">
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
          {/* Automatic,Manual */}
          <div  className='col-6 d-flex'>
             
             <label for="select" className=' mr-3'>Steering</label>

             <select class="select-input" onChange={set} name="steering" id="steering">
                 <option value="" class="dropdown-item" href="#">Select Steering </option>
               <option value="Automatic" class="dropdown-item" href="#">Automatic </option>

                 <option value="Manual" class="dropdown-item" href="#">Manual </option>
               </select>
           </div>
            </div>
            <div className="d-flex col-6 gap-4">
           
            {/* gas,diesel,electricity */}
            <div className='col-5 d-flex'>
              <label for="select" className=' mr-3'>Fuel type</label>

              <select class="select-input " onChange={(e) => { setType(e.target.value) }} name="fuel_type" id="fuel_type">
                <option value="" class="dropdown-item" href="#">Select fuel type</option>
                <option value="gas" class="dropdown-item" href="#">gas</option>

                  <option value="diesel" class="dropdown-item" href="#">diesel</option>
                  <option value="electricity" class="dropdown-item" href="#">electricity</option>
                </select>
            </div>
            {type === "electricity"?(
              <></>
            ):(

            
            <FormGroup className=' d-flex'>
              <FormLabel className='col-3'>Fuel Full</FormLabel>
              <FormControl type="text" placeholder="Enter fuel full" onChange={set} name="fuel_full" id="fuel_full" />
            </FormGroup>
 )}
       </div>     
          
            <div>
              <label for="select" className=' mr-3'>Color Car</label>

            {colors&&(
           
                      <select class="select-input mt-4" onChange={ setcolorid}>
                        <option  >Chose Color</option>

                {colors.map(color=> (
                  <option key={color.id} value={color.id} id={color.id} >{color.color}</option>
                  
                ))}
              </select> 
            )}
              
            </div>
          </div>
               {/*  <label for="exampleColorInput" class="form-label">Color picker</label>
                <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">
 */}

          
          <div className=' text-success'> {done} </div>
          <div className=' text-danger'> {error} </div>

 <div className=' mt-4 d-flex justify-content-end'>
                  <button type='submit' className="btn border border-success btn-success "  >Next</button>
                        
                    
            {/* <input type="submit" class="btn border border-success btn-success addcar" value="Add Car" />  */}

          </div>
          {/* Repeat the above FormGroup for each input field */}
         
        </Form>
        

      </div>
      <div className='col'></div>

          </div>
      )}

    </div>
  )
}

export default AddCar