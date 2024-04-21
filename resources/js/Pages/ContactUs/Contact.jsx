import React from 'react';
import '../../../css/ContactStyle/Contact.css'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

function Contact() {
  return (
    <div className=' d-flex flex-column justify-centent-center align-items-center'>
      <div className='bg-white'><h2 className='Mainheaading text-primary'>Contact Us</h2>
      <div className="d-flex gap-5 maincontct">
      <div>Instagram</div>
      <div>Facebook</div>
      <div>LinkedIn</div>
      </div>
      </div>
      <div className="background-minor">
      <div className='minor d-flex flex-column justify-centent-center align-items-center'>
        <div className="d-flex gap-5"> 
        <div className="d-flex flex-column">

        <FaLocationDot size={100} className='text-white rounded-circle bg-primary p-2 iconhove'/>
        <h3>Our Office Location</h3>
        <p>Ein Sara, <span>Hebron</span> </p>
        </div>
        <div className="d-flex flex-column">
        <FaPhone size={100} className='text-white rounded-circle bg-primary p-2 iconhove'/>
        <h3>Phone Number</h3>
        <p>you can contact with :
        <span>+972592817970</span>
        <span>+972595817880</span>
        </p>
        

        </div>  <div className="d-flex flex-column">
        <MdAttachEmail size={100} className='text-white rounded-circle bg-primary p-2 iconhover'/>
        <h3>Email</h3>
        <p>send email to :
        <span>ebaahmad12@gmail.com</span>
        <span>zaidturman@gmail.com</span> 
        <span>marayahaslamoun@gmail.com</span>
        </p>
          </div>

        </div>
      </div>
      </div>
    </div>
  )
}

export default Contact