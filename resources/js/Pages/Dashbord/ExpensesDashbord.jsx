import React, { useEffect, useState } from 'react'
import '../../../css/app.css'
function ExpensesDashbord() {
  const [data,setData]=useState([]);
  const [totla,setTotal]=useState(0);
  const getData=async()=>{
    const token=localStorage.getItem('token');
    const response=await axios.get(`/showAllBillsOfMyCompany`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data.data)
    const fetchedData = response.data.data;
    setData(fetchedData);

    // Calculate the sum of all amounts
    const sum = fetchedData.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotal(sum);
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 mx-5'>
      <h2 className='fs-4 fw-bold'>Expenses From all bookings</h2>
      
      {data.length>0?<div className='w-100  mt-4 rounded bg-white px-3'>
     { data.map((item,index) => (
                    <><div
                        key={item.id}
                        className="d-flex justify-content-between align-items-center bg-white  rounded px-3 "
                    >
                      <div className='imgUserBill m-2 '>
                      <h1>Booking #<span className='fw-bold text-primary'>{(index+1)}</span> </h1> 
                        <h2 className=" ">From <span className='fw-bold text-primary'>{item.user_id.name}</span></h2>
                        <img src={item.user_id.photo_user} alt=""  className='rounded'/></div>
                        <div className="d-flex ">
                        <p>From : {item.start_date}</p>
                        <p>To : {item.end_date}</p></div>
                        <p>Method : {item.method.method}</p>
                      <p>{Math.round(item.amount)} ₪</p>
                                      </div>
                                    <div className='px-4'><hr /></div>  
                                      </>
     
                ))}
                <p className='fs-5 fw-bold'> Total Profit : {Math.round(totla)} ₪</p>
      </div>:<div className="d-flex flex-column justidy-content-center align-items-center mt-5 ">
                    <p className="fs-4 p-5 text-black">
                        There isn't exist Expenses for your company
                    </p>
                    <div className=''>
                    <i class="bi bi-cash-coin expensesIcon "></i>
                    </div>
                </div>}
      </div>
  )
}

export default ExpensesDashbord