
import React, { useContext, useEffect, useState } from 'react'
import '../../../css/ClockStyle/Clock.css'
import { TranslateContext } from '../../Context/Translate'
const DateToday = () => {
    const {translates}=useContext(TranslateContext);
    const [date,setDate]=useState({
        day:'',
        month:'',
        year: ''
    })
    useEffect(()=>{
        const today=new Date();
        const day=today.getDate();
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();
        setDate({
            day:day,
            month:month,
            year:year
        })
    },[])
  return (
    
    <div className='bg-primary  rounded p-3 d-flex flex-column justify-content-center align-items-center gap-3  '>
        <h2 className='fw-bold text-white fs-5 p-3'>{translates.todaydate}</h2>
        <div className="d-flex flex-wrap gap-3 pb-4">
<div className="time-item ">
                <span > {date.day}</span> 
            </div>
            <div className="time-item">
                <span>Month {date.month} </span> 
            </div>
            <div className="time-item">
                <span>{date.year}</span> 
            </div></div>
                </div>
  )
}

export default DateToday