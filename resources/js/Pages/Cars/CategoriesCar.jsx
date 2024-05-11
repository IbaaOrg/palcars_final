import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import imgluxury from '../../../../public/image/luxury.avif';
import imgsuv from '../../../../public/image/suv.avif';
import imgminivan from '../../../../public/image/compact.avif';
import imgcompact from '../../../../public/image/minivan.avif';
import imgpickuptruck from '../../../../public/image/pickuptruck.avif';
import imghatchback from '../../../../public/image/hatchback.png';
import imgsedan from '../../../../public/image/sedan.png';
import imgstation from '../../../../public/image/station.png';
import '../../../css/CardStyle/Categories.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../../css/HomeStyle/Home.css'
// Import Swiper styles
import get_all_cars from '../../NetWorking/get_all_cars';

const CategoriesCar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate=useNavigate();
    const categoriesCarArray = [
        {
            id: 1,
            img: imgluxury,
            name: 'Convertible Cars',
            type: 'Convertible'
        },
        {
            id: 2,
            img: imgcompact,
            name: 'Minivan Cars',
            type: 'Minivan'
        },
        {
            id: 3,
            img: imgsuv,
            name: 'Suv Cars',
            type: 'SUV'
        },
        {
            id: 4,
            img: imgpickuptruck,
            name: 'Pickup Truck',
            type:'Pickup trucks'
        },
        {
            id: 5,
            img: imghatchback,
            name: 'Hatchpack Cars',
            type: 'Hatchback'
        },
        {
            id: 6,
            img: imgsedan,
            name: 'Sedan Cars',
            type: 'Sedan'
        },
        {
            id: 7,
            img: imgstation,
            name: 'Station Wagon',
            type:'Station Wagon'
        }
    ];
const getCarByCategory=async(type)=>{
  navigate(`/cars?category=${type}`)
}
    return (
        <div className="container categories mt-5">
            <h1 className="text-center fs-3 mt-4 mainhead">Categories of car</h1>
            <Swiper
             breakpoints={{
              
                450: {
                  slidesPerView: 1,
                },
                676: {
                  slidesPerView: 2,
                },
                868: {
                  slidesPerView: 4,
                },
              }}
                modules={[Navigation, Pagination]}
                slidesPerView={4}
                spaceBetween={7}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                className=" mySwiperC"
            >
                <div className="swiper-wrapper">
                    {categoriesCarArray.map((category) => (
                        <SwiperSlide key={category.id}>
                            <div className='d-flex flex-column '>
                                <img src={category.img} width={"300px"} height={"200px"} />
                                <h3 className='fw-bold text-center' onClick={()=>getCarByCategory(category.type)}>{category.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            <div className='d-flex justify-content-center align-items-center'>
              <Link className="btn btn-primary rounded mt-5" to ="/cars">View All Cars</Link>
            </div>
        </div>
    );
}

export default CategoriesCar;
