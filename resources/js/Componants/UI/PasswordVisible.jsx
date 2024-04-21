import React from 'react'
import { useState } from 'react';
import '../../../css/PasswordStyle/forget.css'
import { BiShowAlt } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";
const PasswordVisible = ({set}) => {
    const[visibale,setVisible]=useState(false);
    const[password,setPassword]=useState('');
  
  return (
    <>
    <div className="password-input-container">
    <input
        type={visibale?'text':'password'}
        id={"newPassword"}
        name="password"
        className="form-control"
        onChange={set}
    />
    <div className="p-2 icon-container">
    {visibale?<BiShowAlt onClick={()=>setVisible(false)} />:<IoEyeOffOutline onClick={()=>setVisible(true)}/>}
    </div>
    </div>
    </>
      )
}

export default PasswordVisible