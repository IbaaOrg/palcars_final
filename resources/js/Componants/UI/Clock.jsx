import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import '../../../css/ClockStyle/Clock.css'
const Clock = () => {
    const deg=6;
    const hourRef=useRef(null);
    const minRef=useRef(null);
    const secRef=useRef(null);
    const [theme,setTheme]=useState('light');
    const setClock=()=>{
        let day=new Date();
        let hh=day.getHours() * 30;
        let mm=day.getMinutes() * deg;
        let ss=day.getSeconds() * deg;
        if (hourRef.current) hourRef.current.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        if (minRef.current) minRef.current.style.transform = `rotateZ(${mm}deg)`;
        if (secRef.current) secRef.current.style.transform = `rotateZ(${ss}deg)`;
    };
    useEffect(() => {
        setClock(); // First time
        const intervalId = setInterval(setClock, 1000); // Update every 1000 ms
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);
    
  
  return (
    <>
    <div className='d-flex flex-column '>
<div class="clock">
  <div class="hour" ref={hourRef}></div>
  <div class="min" ref={minRef}></div>
  <div class="sec" ref={secRef}></div>
</div>
</div></>  )
}

export default Clock