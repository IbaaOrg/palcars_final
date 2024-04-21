import React, { useState, useRef } from 'react'
import '../../../css/Commentstye/Comments.css'
import axios from "axios";
import Messages from './../../Pages/Profile/Messages';
import { object, string } from 'yup';

function CommetInput({ id, appendComment }) {
    const idCar = id;
    const [comment, setComment] = useState([]);
    const [errors, setErrors] = useState(null)

    const [seccsses, setSeccsses] = useState(null)
    //    /comments
    const form = useRef({
        "comment": null,
        "rating": 4,
        "car_id": idCar,
        
    })

   


    const validate = async () => {
        let userSchema = object({
            comment: string().required(),
        });
        try {
            await userSchema.validate(form.current);
            setSeccsses("User is valid!");
            setErrors(null);
            return true;
        } catch (e) {
            console.log("e.errors")

            console.log(e.errors)
            setErrors(e.errors);
            setSeccsses(null);
            return false;
        }
    };
    const set = (e) => {
        form.current = { ...form.current, [e.target.name]: e.target.value }
        console.log(form.current)
    }
     const addComment = async (e) => {
        e.preventDefault()
        
        if(errors != null){

            const validatedata = await validate();
            console.log(validatedata)
            setErrors(null)

        }
         
        const formData = new FormData()
         formData.append("comment", form.current.comment)
         formData.append("rating", form.current.rating)
         formData.append("car_id", form.current.car_id)
         
        try {
            const token = localStorage.getItem("token")

//console.log(token)
            var response = await axios.post("/comments", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
           
           console.log(response)
            const res = response.data
            //console.log(res.data)
            if (res.status === true) {
                //setDone(res.data)
                console.log(res.data)
                appendComment(response.data.data)


            }
            document.getElementById('comment').value="";

        } catch (e) {
            console.log(e)
            //alert(e.response.data.msg)
           // setError(e.response.data.msg)
        }


    } 


  return (
      <div>


          <p className=' text-red-500'> {errors}</p>
          <form className="comment-input row m-4" onSubmit={addComment}>
            <input
                  type="text"
                  placeholder="Write a comment..."
                  className='col commentinput '
                  name="comment"
                  id="comment"

                  onChange={set}


              />
          {/*     <input
                  type="text"
                  placeholder="Write a Rate..."
                  className='col commentinput '
                  name="rate"
                  id="rate"

                  onChange={set}


              /> */}
              <input type='submit' className='col btn commentbtn' value={"Comment"}/>
          </form>
              
          </div>
      
  )
}

export default CommetInput