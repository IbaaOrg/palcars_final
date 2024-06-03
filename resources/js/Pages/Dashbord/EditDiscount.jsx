import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { useRef } from 'react';
import { TranslateContext } from '../../Context/Translate';
const EditDiscount = () => {
    const {translates}=useContext(TranslateContext)
    const {id}=useParams();
    const [discount,setDiscount]=useState({});
    const [done,setDone]=useState(false);
    const [error,setError]=useState("");
    const[ loading,setLoading]=useState(false);
    const [showDiscountValue,setShowDiscountValue]=useState(false);
    const [showDiscountType,setShowDiscountType]=useState(false);
    const [showExpiredDate,setShowExpiredDate]=useState(false);
   const form =useRef({
    value:'',
    type:'',
    expired_date:''
   })
   const set=(e)=>{
form.current={...form.current,[e.target.name]:e.target.value}  
 }
    const getDiscount=async()=>{
      const token =localStorage.getItem('token')
      const response=await axios.get(`showOneDiscount/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      setDiscount(response.data.data)
    }
  
    const showEditDiscountValue=()=>{
      setShowDiscountValue(true);
    }
    const showEditDiscountType=()=>{
      setShowDiscountType(true);
    }
    
    const showEditExpiredDate=()=>{
      setShowExpiredDate(true);
    }
    const updateDiscount=async(e)=>{
      e.preventDefault();
      const token =localStorage.getItem('token');
      const formData=new FormData();
      if(form.current.value)
        formData.append('value',form.current.value)
      if(form.current.type)
        formData.append('type',form.current.type)
      if(form.current.expired_date)
        formData.append('expired_date',form.current.expired_date)
     try{
      const response=await axios.post(`discounts/update/${id}`,formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setDone(true);
      setError("");
      setShowDiscountValue(false);
      setShowDiscountType(false);
      setShowExpiredDate(false);


     } catch(error){
      setDone(false);
      setError(error.response.data.msg)
     }
    }
    useEffect(()=>{
      getDiscount();
    },[done])
  return (
    <div className="w-75 d-flex justify-content-center align-items-center m-auto mt-5">
    <div className="bg-white w-100  border rounded px-3 py-2">
        <form
            className="w-75 m-auto d-flex flex-column justify-content-center align-items-center"
            onSubmit={updateDiscount}
        >
            <h2 className="text-center fs-4 p-3">
               {translates.UpdateDiscountInformation}
            </h2>
            {error && (
                <div className="alert alert-danger w-100" role="alert">
                    {error}
                </div>
            )}
            {done && (
                <div className="alert alert-success w-100" role="100">
                    {translates.DiscountUpdatedSuccessfully}
                </div>
            )}
            <div className="employeeItem d-flex flex-column justify-content-center ">
                <label htmlFor="exampleInputEmail1" className="py-2">
                    {translates.DiscountValue}
                </label>
                {!showDiscountValue ? (
                    <p
                        className="d-flex justify-content-start gap-2 border w-80 ms-0 p-1"
                        id="DiscountValue"
                    >
                        {discount.value}
                        <CiEdit
                            size={18}
                            className="text-primary"
                            onClick={showEditDiscountValue}
                        />
                    </p>
                ) : (
                    <input
                        type="text"
                        className="form-control w-60 ms-0"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="value"
                        placeholder="Enter value of discount"
                        onChange={set}
                    />
                )}
            </div>
            <div className="employeeItem">
                <label htmlFor="exampleInputEmail2" className="py-2">
                    {translates.DiscountType}
                </label>
                {!showDiscountType ? (
                    <p
                        className="d-flex justify-content-start gap-2 border  w-70 ms-0 p-1"
                        id="email"
                    >
                        {discount.type}
                        <CiEdit
                            size={18}
                            className="text-primary"
                            onClick={showEditDiscountType}
                        />
                    </p>
                ) : (
                  <select
                                className="form-select  w-60"
                                aria-label="Default select example"
                                name="type"
                                defaultValue=""
                                onChange={set}
                            >
                                <option value="" disabled className="text-muted">
                                    {translates.ChooseType} ...
                                </option>
                                <option value="fixed">{translates.fixed}</option>
                                <option value="percentage">{translates.percentage}</option>
                            </select>
                )}
            </div>
            <div className="employeeItem">
                <label htmlFor="exampleInputEmail3" className="py-2">
{translates.ExpiredDate}                </label>
                {!showExpiredDate ? (
                    <p
                        className="d-flex justify-content-start gap-2 border  w-70 ms-0 p-1"
                        id="phone"
                    >
                        {discount.expired_date }
                        <CiEdit
                            size={18}
                            className="text-primary"
                            onClick={showEditExpiredDate}
                        />
                    </p>
                ) : (
                  <input
                  type="date"
                  class="form-control w-60 ms-0"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  name="expired_date"
                  onChange={set}
              />
                  
                )}
            </div>
            <div className="d-flex justify-content-center py-5">
                <button type="submit" className="btn btn-primary">
                    {loading ? "loading..." : "Save"}
                </button>
            </div>
        </form>
    </div>
</div>  )
}

export default EditDiscount