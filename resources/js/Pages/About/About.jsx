import React, { useState } from 'react';
import '../../../css/AboutStyle/About.css'
import videoSource from '../../../../public/image/bgabout1.mp4'; // Local video (replace with your video filename)
import man from '../../../../public/image/man.jpg'
import woman from '../../../../public/image/woman.jpg'

function About() {
   

    return (   
    <>
            <div className="video-background">
                
                <video autoPlay loop muted playsInline className='video'>

                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

        <div className=' container p-3 '>
         
        <div className=''>
                    <h2 className='d-flex justify-center badge text-bg-primary text-wrap fs-4 p-11'>About Us</h2>

        </div>
            <div className=''>
                    <p className=' fs-5 text-start'>the first and only website and mobile app in the state of palestine for car rental and to facilitate communication between rental companies between the govenorates</p>

            </div>
           
                <div className=''>
                    <h2 className='d-flex justify-center badge text-bg-primary text-wrap fs-4 p-11'>Our Team</h2>

                </div>
                <div className='row p-3'>
                    <div className='col'>
                        <div class="card" >
                            <img src={man} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Zaid Ameen Turman</h5>
                                    <p class="card-text">zaidturman17@gmail.com</p>
                                    <a href="#" class="btn btn-primary">Send Email</a>
                                </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div class="card" >
                            <img src={woman} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Ibaa alsid ahmad</h5>
                                    <p class="card-text">ibaa@gmail.com</p>
                                    <a href="#" class="btn btn-primary">Send Email</a>
                                </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div class="card">
                            <img src={woman} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Maryam al-hashlamon</h5>
                                    <p class="card-text">Maryam@gmail.com</p>
                                    <a href="#" class="btn btn-primary">Send Email</a>
                                </div>
                        </div>
                    </div>

                </div>


        
        </div>
        
        </>
    );
}
export default About;