import React, { useState, useEffect } from 'react';
import imghome from '../../../../public/image/homeimage.jpeg'
import image2 from '../../../../public/image/user.png'
import jawwal from '../../../../public/image/jawwal.png'
import image3 from '../../../../public/image/R.jpeg'
import Ads1 from '../../../../public/image/Ads1.jpg'
import Ads2 from '../../../../public/image/Ads2.jpg'
import Ads3 from '../../../../public/image/Ads3.jpg'
import Ads4 from '../../../../public/image/Ads4.jpg'
import Ads5 from '../../../../public/image/Ads5.jpg'




//import imghome from '../../../../public/image/homepage1.png'

import '../../../css/HomeStyle/Home.css';

import ScrollToTopButton from '../../Layout/ScrollToTopButton';
import CardBasic from '../../Layout/Cards/CardBasic';
import { useContext } from 'react';
import { UserContext } from '../../Context/User';
import CategoriesCar from './../Cars/CategoriesCar';
import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Services from './../../Layout/Cards/Services';

function Home() {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [location, setLocation] = useState('');

    const [iscompany, setIscompany] = useState(false);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <>
            <ScrollToTopButton />
            <div className=' ' path="/normal-user">
                <div className='maindiv'>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000, // Set autoplay delay to 3 seconds
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]} // Include all modules here
                        className="swiper_container"

                        onAutoplayTimeLeft={onAutoplayTimeLeft}

                    >
                        <SwiperSlide>
                            <img src={imghome} alt="slide_image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={jawwal} alt="slide_image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Ads1} alt="slide_image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Ads3} alt="slide_image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Ads4} alt="slide_image" />
                        </SwiperSlide>   <SwiperSlide>
                            <img src={Ads5} alt="slide_image" />
                        </SwiperSlide>
                        {/*  <SwiperSlide>
              <img src={image3} alt="slide_image" />
            </SwiperSlide>
          <SwiperSlide>
              <img src={imghome} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imghome} alt="slide_image" />
            </SwiperSlide> */}
                        <div className="autoplay-progress" slot="container-end">
                            <svg viewBox="0 0 48 48" ref={progressCircle}>
                                <circle cx="24" cy="24" r="20"></circle>
                            </svg>
                            <span ref={progressContent}></span>
                        </div>
                        <div className="slider-controler">
                            <div className="swiper-button-prev slider-arrow">
                                <ion-icon name="arrow-back-outline"></ion-icon>
                            </div>
                            <div className="swiper-button-next slider-arrow">
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </Swiper>

                </div>
                <div className=" d-flex justify-content-around mx-5">
                    <CardBasic />

                </div>
                <div className='container'>
                    <Services />
                </div>
                <div >
                    {/* <img src={imgluxury} alt="" /> */}
                    <CategoriesCar />
                    <div>
                        {/* <img src={imgluxury} alt="" /> */}

                    </div>
                </div>
            </div>



        </>

    );
}
export default Home; 