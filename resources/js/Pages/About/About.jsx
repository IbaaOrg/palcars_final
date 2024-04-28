import React, { useState } from 'react';
import '../../../css/AboutStyle/About.css'
import videoSource from '../../../../public/image/bgabout1.mp4'; // Local video (replace with your video filename)
import man from '../../../../public/image/man.jpg'
import woman from '../../../../public/image/woman.jpg'
import about from '../../../../public/image/undraw_navigator_a479.png'
import valus from '../../../../public/image/undraw_Stock_prices_re_js33.png'



function About() {


    return (
        <>
            <div className="video-background">

                <video autoPlay loop muted playsInline className='video'>

                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className='  p-3 '>
                <div className='row m-2 p-2 container aboutmain'>
                    <div className='col'>
                        <h3 className=' fs-1 d-flex align-top justify-center'>About Us</h3>
                        <p className=' fs-5 text-start'>Welcome to PalCars Car Rental, your ultimate destination for convenient and reliable car rentals across all cities in Palestine. Whether you're a local resident or a tourist exploring our beautiful country, we're here to provide you with top-notch car rental services that meet your needs.
                            <br/>
                            The first and only website and mobile app in the state of palestine for car rental and to facilitate communication between rental companies between the govenorates</p>

                    </div>
                    <div className='col'>
                        <img src={about} />
                    </div>

                </div>
                <div className='row missing'>
                    <div className='col'>
                        <img src={valus} />
                    </div>
                    <div className='col'>

                        <h3 className=' fs-1 d-flex align-center justify-center'>Our Mission</h3>
                        <p className=' fs-5 text-start'>At Palestine Car Rental, our mission is to make car rental easy, accessible, and affordable for everyone. We aim to provide a seamless booking experience, exceptional customer service, and a wide range of vehicles to choose from.</p>
                        <h3 className=' fs-1 d-flex align-center justify-center'>Why Choose Us?</h3>
                        <p className=' fs-5 text-start'>
                            1-Wide Selection of Vehicles: From compact cars for city trips to spacious SUVs for family vacations, we offer a diverse fleet of vehicles to suit your preferences and needs.<br/>
                            2-Convenient Booking: Our user-friendly website and app allow you to book your rental car with just a few clicks. Choose your pickup location, select your dates, and find the perfect car for your journey.<br/>
                            3-Competitive Prices: We offer competitive rental rates and regular promotions to ensure that you get the best value for your money.<br/>
                            4-24/7 Customer Support: Our dedicated customer support team is available 24/7 to assist you with any inquiries or issues you may have during your rental period.<br/>
                            5-Secure Online Payments: Our online payment system is safe and secure, giving you peace of mind when booking your rental car.<br/>
                        </p>

                    </div>

                </div>

                {/*   <div className=''>
                    <h2 className='d-flex justify-center badge text-bg-primary text-wrap fs-4 p-11'>About Us</h2>

        </div>
            <div className=''>
                    <p className=' fs-5 text-start'>the first and only website and mobile app in the state of palestine for car rental and to facilitate communication between rental companies between the govenorates</p>

            </div> */}

                <div className=' container mt-4'>
                    <h2 className='d-flex justify-center badge text-bg-primary text-wrap fs-4 p-11'>Our Team</h2>

                </div>
                <div className='row p-3  d-flex justify-center'>
                    <div className='col'>
                        <div class="card" >
                            <img src={man} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Zaid Ameen Turman</h5>
                                <p class="card-text">zaidturman17@gmail.com</p>
                                <a href="#" class="btn btn-primary d-flex justify-center">Send Email</a>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div class="card" >
                            <img src={woman} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Ibaa alsid ahmad</h5>
                                <p class="card-text">ibaa@gmail.com</p>
                                <a href="#" class="btn btn-primary d-flex justify-center">Send Email</a>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div class="card">
                            <img src={woman} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Maryam al-hashlamon</h5>
                                <p class="card-text">Maryam@gmail.com</p>
                                <a href="#" class="btn btn-primary d-flex justify-center">Send Email</a>
                            </div>
                        </div>
                    </div>

                </div>



            </div>

        </>
    );
}
export default About;