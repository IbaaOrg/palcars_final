import React, { useContext } from 'react'
import { TbBasketDiscount } from "react-icons/tb";
import { IoCarSportSharp } from "react-icons/io5";
import '../../../css/ServicesStyle/services.css'
import { TranslateContext } from '../../Context/Translate';
import { NavLink } from 'react-router-dom';
import { TbShoppingCartDiscount } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";

const Services = () => {
    const {translates}=useContext(TranslateContext)
  return (
    <div >
        <h2 className='fw-bold fs-5 text-center p-4'>{translates.Features}</h2>
        <div className='d-flex flex-wrap justify-content-center'>
        <div className='col-8 col-lg-3 cards mx-2 d-flex flex-column align-items-center custom-shadow rounded'>
        <div className="image">
        <TbShoppingCartDiscount size={"90px"} className='text-primary p-2 ' />


        </div>
        <div className='content'>
        <h3 className='my-4 fw-bold'>{translates.Discountsanddeals}</h3>
        <NavLink href="" className={'bg-primary my-3 p-3 text-white rounded'}>{translates.BrowseNow}</NavLink>
      </div>
        </div>
        <div  className='col-8 col-lg-3 cards mx-2 d-flex flex-column align-items-center custom-shadow rounded'>
        <div className="image">
        <IoCarSportSharp  size={"90px"} className='text-primary p-2 '  />
        </div>
        <div className='content'>
        <h3 className='my-4 fw-bold'>{translates.AllCars}</h3>
        <NavLink to="/cars" className={'bg-primary my-3 p-3 text-white rounded'}>{translates.BrowseNow}</NavLink>
      </div>
        </div>
        <div className='col-8 col-lg-3 cards mx-2 d-flex flex-column align-items-center custom-shadow rounded' >
        <div className="image">
        <RiCustomerServiceFill  size={"90px"} className='text-primary p-2 '  />
        </div> 
        <div className="content">
        <h3 className='my-4 fw-bold'>{translates.ContactWithCompany}</h3>
        <NavLink to="/cars" className={'bg-primary my-3 p-3 text-white rounded'}>{translates.BrowseNow}</NavLink>        </div>
        </div>
        </div>

    </div>
  )
}

export default Services