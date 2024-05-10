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
import map from '../../../../public/image/map.png'
import moment from 'moment';
import Timer from '../../Componants/UI/Timer'
import CountUp from 'react-countup'
import ScroolTrigger from 'react-scroll-trigger'
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
import { Link } from 'react-router-dom';
import Loading from './../../Componants/UI/Loading';
import { TranslateContext } from "../../Context/Translate";
function Home() {

    const [remainingTime, setRemainingTime] = useState(moment.duration());
    const targetDate = '2024-12-31T23:59:59'
    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const target = moment(targetDate);
            const diff = moment.duration(target.diff(now));
            setRemainingTime(diff);

            if (diff.asSeconds() <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);



    const { changeLanguage, translates } = useContext(TranslateContext);

    const [counterOn, setCounterOn] = useState(false)

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userCount, setUserCount] = useState(0);

    
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [citycount, setCityCount] = useState(0);


    const [loading, setILoading] = useState(true);

    const [iscompany, setIscompany] = useState(false);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const [data, setDate] = useState(null)
  


    const get_all_discounts = async () => {

        try {
            const response = await axios.get(`/showalldiscounts`);
            const data = response.data.data;
            const now = new Date();
            //lastMonth.setMonth(lastMonth.getMonth() - 1);
            const fiftenDayFromNow=new Date(now.getTime()+ 15*24*60*60*1000)
            const filteredData = data.filter(discount => {
                const expiredDate = new Date(discount.expired_date);
                return expiredDate <= fiftenDayFromNow && expiredDate >=now;
            });
            console.log(filteredData)
            console.log(data)

            setDate(filteredData);
            setILoading(false)
           
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        get_all_discounts();
    }, []);

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    //showallcities
    const getcitycount = async () => {
        try {
            const response = await axios.get(`/showallcities`, {

            });
            const data = response.data;
            setCityCount(data.data.length);

        } catch (error) {
            console.error(error);
        }
    }

    const getusercount = async () => {
        try {
            const response = await axios.get(`/userscount`, {

            });
            const data = response.data;
            setUserCount(data.data);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getusercount();
        getcitycount();
        console.log(data)

    }, []);
    const Translate = async (e) => {
        changeLanguage(e);
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
                        <SwiperSlide className="">
                            <img src={imghome} alt="slide_image" className='imgSlider'/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={jawwal} alt="slide_image" className='imgSlider' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Ads1} alt="slide_image" className='imgSlider' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Ads3} alt="slide_image"  className='imgSlider'/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Ads4} alt="slide_image"  className='imgSlider' />
                        </SwiperSlide>   <SwiperSlide>
                            <img src={Ads5} alt="slide_image"  className='imgSlider' />
                        </SwiperSlide>
                      
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
                
                <div className=" offers ">
                {loading?(
                        <div className=" d-flex justify-center align-middle">

                    <Loading />
                    </div>
                ):(

<>
                                <h1 className="text-center fs-3 m-2">Special offers</h1>
                    <div className="  mx-5">{data&&data.length>0?
                        <div className="">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                slidesPerView={3}
                                spaceBetween={15}
                                navigation={true}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                }}
                                className=" mySwiperC"
                            >
                            {data&&(
                                <div className="swiper-wrapper">
                                    {data.map((d) => (
                                        <SwiperSlide key={d.id}>
                                           <div className="card shadow p-1">
                                                <div className="row">
                                                    <div className="col d-flex justify-center align-middle">
                                                        <img src={d.car.sub_images[0].photo_car_url}  className=" "/>
                                                    </div>
                                                    <div className="col ">
                                                        <h1 className="card-header text-center">{d.note}</h1>
                                                        <Timer targetDate={d.expired_date}/>
                                                        <h1 className="old-price text-center">{d.car.prices[0].price}₪ / day</h1>
                                                       
                                                        <div class=" text-red-700 text-center" role="alert">
                                                           You Save {d.value}{d.type == "percentage" ? ("%") : ("₪")} 
                                                        </div>
                                                    </div>
                                                   

                                                </div>
                                                
                                           </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                                )}
                            </Swiper>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Link className="btn btn-primary rounded my-5" to="/discounts">View All Deals</Link>
                            </div>
                        </div>

                   :<div className="d-flex justify-content-center align-items-center w-100 fw-bolc fs-5">There are no offers in the next 15 days </div>} </div>
                            </>
                )}
                    
                </div>
                <div className="counter py-5" >
                    <h1 className=" fs-3 text-center mb-4">Site statistics</h1>
                    <ScroolTrigger onEnter={() => { setCounterOn(true) }} onExit={() => { setCounterOn(false) }}>
                        {counterOn &&
                            <div className=" container p-1 d-flex  justify-around">


                                <div className=" card p-4 shadow">
                                    <div className="fs-1  p-3">

                                        <CountUp start={0} end={userCount} duration={2} delay={1} className="  " />
                                        
                                    </div>
                                    <h1 className="fs-3">Users</h1>

                                </div>
                                <div className=" card p-4 shadow">
                                    <div className="fs-1  p-3">

                                        <CountUp start={0} end={userCount} duration={2} delay={1} className="  " />
                                        
                                    </div>
                                    <h1 className="fs-3">Rented</h1>

                                </div>
                                <div className=" card p-4 shadow">
                                    <div className="fs-1  p-3">

                                        <CountUp start={0} end={citycount} duration={2} delay={1} className="  " />
                                        
                                    </div>
                                    <h1 className="fs-3">Citys</h1>

                                </div>
                            </div>
                        }


                    </ScroolTrigger>
                </div>
                <div className="d-flex divdesmap py-5">
                    <div className="container d-flex justify-center col ">
                        <div className="card p-4 m-2 shadow desmap d-flex justify-center align-middle">
                            <h1 className=" text-center fs-5">Map of palestine</h1>
                            <p className='text-left'>
                                Welcome to the PalCars map
                                On this map, click on the city you want to know about the companies available in this city. For example, when you click on the city of Hebron, the companies available in Hebron are displayed.
                            </p>
                           

                        </div>

                </div>
                <div className="container d-flex justify-center col">
                

                        <div className="card p-4 m-2 shadow ">
                        <h1 className="fs-4 text-center">The Palstine City Map</h1>
                        <img src={map} usemap="#image-map" />

                        <map name="image-map">
                                <area className="map-highlight " target="" alt="الخليل" title="Hebron" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="242,451,228,449,217,450,206,452,196,447,192,438,184,443,176,446,167,442,160,433,158,422,149,418,144,411,140,398,142,389,147,384,143,376,138,369,141,362,143,351,150,344,157,338,165,350,172,346,180,349,185,354,193,362,200,364,203,373,210,372,213,366,218,375,228,378,236,380,237,387,232,397,237,403,243,404,246,409,247,424,246,435,245,442" shape="poly" />
                            <area target="" alt="quds" title="Jerusalem" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="159,337,166,333,175,331,181,328,189,323,198,320,209,319,225,316,241,322,253,327,245,306,251,295,265,291,280,291,283,301,281,312,278,323,273,335,271,340,263,343,258,352,255,363,253,369,249,382,250,396,248,405,240,403,235,392,240,385,231,377,219,376,214,366,209,371,200,365,183,349,176,346,167,345,162,341" shape="poly" />
                            <area target="" alt="ramalla" title="Ramallah" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="249,320,244,306,250,294,249,282,237,282,227,279,214,278,198,277,184,281,179,284,178,293,186,294,184,305,181,315,183,322,204,315,222,312,232,316,239,318" shape="poly" />
                            <area target="" alt="nablus" title="Nablus" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="280,288,278,280,284,272,282,261,276,252,282,237,283,219,280,199,268,201,258,195,252,198,247,208,237,210,236,217,232,223,223,222,213,222,201,221,201,228,202,236,198,241,193,246,186,252,183,256,173,264,170,270,173,275,182,280,195,276,212,273,217,277,230,278,245,278,248,282,251,288,262,286,272,286" shape="poly" />
                            <area target="" alt="jinen" title="Jenin" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="239,207,246,205,252,198,260,189,255,182,243,176,240,168,236,163,228,164,216,165,210,161,202,165,195,165,195,172,192,182,190,188,189,198,196,200,196,209,200,215,210,219,223,219,232,219" shape="poly" />
                            <area target="" alt="tulkarem" title="Tulkarm" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="186,197,150,197,138,244,144,251,153,250,160,251,160,259,164,263,172,264,180,257,190,250,196,241,201,235,199,221,195,209,192,200" shape="poly" />
                            <area target="" alt="gaza" title="Gaza" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="142,346,142,357,138,367,139,373,128,378,122,379,115,382,115,393,116,404,109,402,103,405,93,407,86,412,78,408,69,408,62,416,56,424,63,430,63,436,55,440,47,438,43,428,41,420,37,414,42,405,59,393,71,381,79,369,88,357,94,345,102,332,109,321,111,315,122,330,130,332,140,334" shape="poly" />
                            <area target="" alt="besan" title="Besan" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="241,163,243,173,250,177,256,180,262,187,261,194,270,197,278,191,280,181,282,173,276,165,283,155,270,151,260,146,245,149" shape="poly" />
                            <area target="" alt="nasreh" title="Nasserah" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="238,161,228,161,216,159,208,149,202,144,207,138,212,126,216,118,216,109,220,105,225,110,229,119,236,116,243,114,244,123,247,136,250,144" shape="poly" />
                            <area target="" alt="tabrea" title="Tabaria" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="245,115,249,121,245,127,247,136,253,144,266,146,276,149,282,153,279,143,286,141,292,134,288,128,281,133,275,127,270,116,266,109,270,103,277,99,266,94,257,95,247,94,240,98,242,103" shape="poly" />
                            <area target="" alt="safad" title="Safad" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="276,92,286,93,284,78,284,69,290,64,296,60,294,48,295,40,292,33,282,30,272,26,268,36,264,50,264,61,254,65,244,68,238,71,249,74,250,82,248,91,255,92,264,93" shape="poly" />
                            <area target="" alt="hefa" title="Haifa" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="185,193,190,184,192,174,193,166,203,159,214,158,201,151,200,141,208,130,212,117,202,109,193,101,187,90,181,95,180,104,182,114,176,122,166,121,160,121,156,133,155,148,156,166,150,178,151,189,151,195,163,195,175,196" shape="poly" />
                            <area target="" alt="aka" title="Aka" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="240,111,230,118,223,105,216,105,210,112,201,108,192,101,189,90,182,87,186,75,189,70,197,67,214,67,226,63,234,73,242,73,246,84,245,92,238,97,241,105" shape="poly" />
                            <area target="" alt="yafa" title="Jaffa" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="137,247,123,290,133,295,140,296,144,301,149,292,157,291,161,285,156,276,158,264,158,256,153,251" shape="poly" />
                            <area target="" alt="ramleh" title="Alramlah" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="122,294,112,314,123,329,139,333,142,343,148,344,170,330,160,310,153,293,144,301,133,296" shape="poly" />
                            <area target="" alt="led" title="Allyd" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="160,268,159,276,163,281,160,291,155,296,171,329,182,324,183,295,176,295,178,280,166,269" shape="poly" />
                            <area target="" alt="beralsaba" title="Beersheba" href={`city?city=${city}`} onClick={(e)=>setCity(e.target.title)} coords="52,443,66,436,65,429,57,420,65,415,77,412,90,413,105,404,115,404,117,395,117,384,127,379,139,378,141,384,137,394,137,406,142,413,149,420,157,424,156,431,160,438,169,445,182,444,188,442,191,448,200,450,213,453,223,453,234,452,239,461,244,465,245,472,249,482,250,488,245,492,241,497,240,509,237,515,235,527,230,536,227,547,224,553,221,559,209,568,219,565,225,573,228,579,224,584,222,593,219,601,223,613,227,617,219,629,215,643,212,655,210,668,208,678,206,688,205,701,202,711,199,720,189,727,188,735,180,723,175,694,168,685,157,668,151,658,149,641,138,616,125,592,118,590,110,582,111,561,107,548,99,523,82,502,65,468,60,459,57,453,57,462,63,461,60,459" shape="poly" />
                        </map>
                    </div>
                </div>
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