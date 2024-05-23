import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/app.css";
import { FaRegImages } from "react-icons/fa6";
import ImageModel from "../../Layout/Dialog/ImageModel";
import '../../../css/DialogStyle/Model.css'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function BookingsDashbord(){
    const [renters, setRenters] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();  
    const [data, setData] = useState([]);

    const getRenters = async () => {
        const token = localStorage.getItem("token");
       try{
        
         const response = await axios.get(`allBills/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRenters( response.data.data);
        setData(response.data.data);
     console.log(response.data.data);
    
    } catch (error) {
        console.error('Error fetching renters:', error);
    }
      //  setRenters(response.data);
        //console.log(response.data.data);

    };
    useEffect(() => {
        getRenters();
    }, [id]);
    const showImage = (imgUrl) => {
        setSelectedImage(imgUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const [searchTerm, setSearchTerm] = useState(""); // الحالة المحلية لتخزين قيمة حقل البحث

    const handleChange = (e) => {
        setSearchTerm(e.target.value); // تحديث القيمة عند تغييرها في حقل البحث
    };
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(data);
        setRenters(data.filter(item => {
            return (
                item.start_date !== null && (searchTerm ? item.start_date?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.end_date !== null && (searchTerm ? item.end_date?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
                item.car.car_number !== null && (searchTerm ? item.car.car_number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false)   ||     
                item.amount !== null && (searchTerm ? item.amount?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) 

            ); 

        }));
      
    };

    return (
    //   <div>
    //    {renters.map((item)=>(<h1>{item.name}</h1>)
        
    //    )}
    //  {id}
       
    //    </div>
    <div>
    <div className="container text-center  p-10">
        <div className="row">
            <div className="col ">
                <h1 className="fs-1">Renter Bills List</h1>
                <p className="">Your all Renter Bills are listed bellow</p>
            </div>
                        <div className="col ">
                        <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleChange} />
                                <button className="btn btn-outline-success" type="submit" onClick={handleSearch} > Search </button>
                            </form>
                        </div>
        </div>
        {renters.length > 0 ? (
            <div className="w-100  mt-4 rounded bg-white px-3 pt-3">
                {renters.map((item, index) => (
                    <>
                        <div
                            key={item.id}
                            className="renters"
                        >
                                <div className="renterInfoImg">  
                                    <div className="renterInfoImgContainer">
                                    <img
                                        src={item.car.sub_images[0].photo_car_url}
                                        alt=""
                                        className="rounded"
                                    />
                                    </div> 
                                   
                                </div>
                             
                              
                                    <p className="fw-bold  mt-4">Booking date : {item.start_date}</p>
                                
                                    <p className="fw-bold  mt-4">Expired date : {item.end_date}</p>
                                
                            
                              
                                {/* <div className=" renterInfoImgContainer">
                                    <img
                                        src={item.photo_drivinglicense}
                                        alt=""
                                        className="rounded"
                                    />
                                     <label htmlFor="file-path" id={item.photo_drivinglicense} className="imgShow"  onClick={()=>showImage(item.photo_drivinglicense)}>
    <FaRegImages size={25}   />

    </label>
                                </div> */}
                                <p className="fw-bold  mt-4">Car Number : {item.car.car_number}</p>
                                <p className="fw-bold  mt-4">
                                             {item.final_amount} ₪
                                        </p>
                            
                        </div>
                        <div className="px-4">
                            <hr />
                        </div>
                    </>
                ))}
            </div>
        ) : (
            <div className="d-flex flex-column justidy-content-center align-items-center mt-5 ">
                <p className="fs-4 p-5 text-black">
                    There isn't Renters From your company
                </p>
                <div className="">
                    <i class="bi bi-person-fill-slash expensesIcon"></i>
                </div>
            </div>
        )}
    </div>
    <ImageModel show={isModalOpen} onClose={closeModal} imageUrl={selectedImage} />
</div>
    );
};

export default BookingsDashbord;
