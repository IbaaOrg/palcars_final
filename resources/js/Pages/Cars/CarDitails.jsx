import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../../../css/app.css'
import '../../../css/Commentstye/Comments.css'

import Loading from '../../Componants/UI/Loading';
import CarFilter from '../../Layout/Filter/CarFilter';
import CommentView from '../../Layout/Comments/CommentView';
import CommetInput from '../../Layout/Comments/CommetInput';
import { ToastContainer, Bounce, Zoom, toast } from 'react-toastify';
import '../../../css/PasswordStyle/forget.css';
import axios from 'axios';

function CarDitails() {
    const { id } = useParams(); // This will give you the value of "id" from the URL
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(null)
    const [car, setCar] = useState(null)
    const navigator=useNavigate();
    const getUserById = async () => {

        try {
            const response = await axios.get(`/cars/${id}`);
            setCar(response.data.data)
            setLoading(false)
        } catch (error) {
            // Handle error
            console.error('Error fetching user data:', error);

        }
    };
    const [comments, setComments] = useState([]);
    //const { id } = useParams(); // This will give you the value of "id" from the URL

    const getComments = async () => {
        const token = localStorage.getItem("token")
        if(token){
            try {
                const response = await axios.get(`/getReviewes/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = response.data;
                setComments(data.data.comments);
            } catch (error) {
                console.error(error);
            }
        }else{
            setView("please login or register account to view and write Review")
        }
         
    };

    useEffect(() => {
        getComments()
        getUserById()

    }, [id]);

    const appendComment = (comment) => {
        console.log("append car details")

        console.log(comment)
        setComments([ ...comments,comment])
    }
    const openBill=()=>{
    const token = localStorage.getItem("token")

    if(token){
        // getUserById
    navigator(`/bill/${id}`,{ state : { car } })
    }else {
        toast.error('you must have account to rent car', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });  
        navigator('/login');
     
    }
   }
  return (
    <div>

          {loading ?(
            <Loading className=" d-flex justify-items-center align-items-center"/>

    ):(
        <div>
                  <div className='container d-flex justify-items-center'>
                 
              <div className="car col m-2 mb-3 ">
              <div>
                                  <img src={car.sub_images[0].photo_car_url} alt="imgcar" width={500} height={500} className='imgcar' />
                                  <div className='mt-4  row'>
                                      {car.sub_images.length >= 2 && (

                                          <div className='col'>
                                              <img src={car.sub_images[1].photo_car_url} alt="imgcar" className=' imgdetials '  />


                                          </div>
                                      )}
                                      {car.sub_images.length >= 3 && (

                                          <div className='col'>

                                              <img src={car.sub_images[2].photo_car_url} alt="imgcar" className='  imgdetials'  />


                                          </div>
                                      )}
                                      {car.sub_images.length >= 4 && (

                                          <div className='col'>
                                              <img src={car.sub_images[3].photo_car_url} alt="imgcar" className=' imgdetials '  />


                                          </div>
                                      )}

                                  </div>
                                  
              </div>
                          
                              

                              
                             

              </div>
                          <div className="card mb-3  col m-2" >
                              <div className="card-body">
                              <div className='row d-flex justify-content-between'>
                                 <h5 className="card-title-details col font-bold ">{car.make}</h5>
                                      <h5 className="card-title-details col">{car.model}</h5>

                                      <i class="bi bi-heart col justify-end"></i>
                              </div>
                                 
                                  <h6 className="card-subtitle mb-2 text-muted">Reviewer</h6>
                                  <p className="card-text">
                                      Owner : {car.owneruser.name}
                                  </p>
                                  <ul className="list-group list-group-flush">
                                      <li className="list-group-item">Car Number : {car.car_number}</li>
                                      <li className="list-group-item">Cartogery : {car.catrgory}</li>
                                      <li className="list-group-item">seats : {car.seats}</li>
                                      <li className="list-group-item">Steering: {car.steering}</li>
                                      <li className="list-group-item">Year : {car.year}</li>
                                      <li className="list-group-item">Door : {car.doors}</li>
                                      <li className="list-group-item">Fuel Type : {car.fuel_type}</li>
                                      <li className="list-group-item">Car Color : {car.car_color.color}</li>
                                      <li className="list-group-item">Price :<span className=" text-success"> {car.prices[0].price}</span> ₪</li>


                                      



                                      


                                  </ul>
                             {/*      <div className="card-text">
                                      {car.prices[0].price}
                                     
                                  </div> */}
                                  <button type="button" className="btn commentbtn" onClick={openBill}>Rent Now</button>
                              </div>   
                             
                          </div>  
                        
                  
              </div>
              <div className='commentsbox'>
                          <h1 className='reviews'>Reviews <span className='reviewcount'>{comments.length}</span></h1>
                              <div className=''>
                                <p className=' text-red-700'>{view}</p>
                                  {comments.map((comment, index) => (
                                      <div className={'comment '} key={index}>
                                          <div className='row comment_user'>
                                              <div className='col-2 comment_user_img'>
                                                  <img src={comment.owner_of_comment.photo_user} alt='' className={'comment__avatar'} />

                                              </div>
                                              <div className='col-10 comment_body'>
                                                  <h4 className={'comment__author '}>{comment.owner_of_comment.name}</h4>
                                                  <p>{comment.rate}</p>
                                                  <div className={'comment__content '}>
                                                      <p className={'comment__text '}>{comment.comment}</p>

                                                  </div>

                                              </div>
                                              <div className='timeago'>
                                                  <p className={'comment__text_timeago'}>{comment.timeago}</p>

                                              </div>



                                          </div>





                                      </div>

                                  ))}
                              </div>
                              <CommetInput id={id} appendComment={appendComment }/>
                            </div>
        
                  </div>
          
    )
         
          }
                              <ToastContainer />

    </div>
  
    
  )
}

export default CarDitails