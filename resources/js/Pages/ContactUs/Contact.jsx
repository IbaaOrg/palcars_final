import React from 'react';
import '../../../css/ContactStyle/Contact.css'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { FaSquareFacebook } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Contact() {
  return (
    <div className=' d-flex flex-column justify-centent-center align-items-center'>
      <div className='bg-white '><h2 className='Mainheaading text-primary text-center'>Contact Us</h2>
      <div className="d-flex flex-wrap  justify-content-center  gap-5 maincontct mt-5">
      <div className='d-flex flex-column align-items-center'><GrInstagram size={45}/>
      <Link className='fw-bold mt-4 ' to={"https://www.instagram.com/palcars.ps?igsh=MTFnODQ3b2tnb2xwcA=="} >Palcars.ps</Link>
</div>
      <div className='d-flex flex-column align-items-center'><FaSquareFacebook size={51}/>
      <Link className='fw-bold mt-4  '>Palcars</Link>

</div>
      <div className='d-flex flex-column align-items-center'><ImLinkedin size={45}/>
      <Link className='fw-bold mt-4  '>Palcars Company</Link>

</div>
      </div>
      </div>
      <div className="background-minor">
      <div className='minor d-flex flex-column justify-centent-center align-items-center'>
        <div className="mainContact"> 
        <div className="d-flex flex-column cardcontact">
<div className='h-50'>
        <FaLocationDot size={100} className='text-white rounded-circle bg-primary p-2 iconhover'/>
        </div>
        <div  className='h-50'>
        <h3>Our Office Location</h3>
        <p className='d-flex flex-column align-items-center'>Ein Sara, <span>Hebron</span> </p>
        </div>
        </div>
        <div className="d-flex flex-column cardcontact">
          <div  className='h-50'>
        <FaPhone size={100} className='text-white rounded-circle bg-primary p-2 iconhover'/>
        </div>
        <div  className='h-50'>
        <h3 className='text-center'>Phone Number</h3>
        <p className='d-flex flex-column align-items-center'>
          you can contact with :
        <span>+972592817970</span>
        <span>+972595817880</span>
        </p>
        </div>

        </div>  <div className="d-flex flex-column cardcontact">
          <div  className='h-50'>
        <MdAttachEmail size={100} className='text-white rounded-circle bg-primary p-2 iconhover'/>
        </div>
        <div  className='h-50 d-flex flex-column align-items-center'><h3>Email</h3>
        <p className='d-flex flex-column align-items-center'>
          send email to :
        <span>ebaahmad12@gmail.com</span>
        <span>zaidturman@gmail.com</span> 
        <span>marayahaslamoun@gmail.com</span>
        </p>
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Contact