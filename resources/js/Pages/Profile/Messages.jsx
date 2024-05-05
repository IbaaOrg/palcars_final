import React from 'react'
import { useState,useEffect } from 'react';
import '../../../css/app.css'

import '../../../css/MessageStyle/message.css'
import CommetInput from '../../Layout/Comments/CommetInput'
import MessageInput from '../../Layout/Message/MessageInput'
function Messages() {
  const [data, setData] = useState([])
  const [resever, setResever] = useState(null)
  const [reseverid, setReseverid] = useState(null)
  const [chat, setChat] = useState(null)

  const [message, setMessage] = useState("")

  
  const send_message=async()=>{
   

    const formData = new FormData();
    formData.append("message", message);
    formData.append("reciever_id", reseverid);
   

    const token = localStorage.getItem("token")

    try {
      const response = await axios.post("/messagesStore", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const res = response.data;
      if (res.status === true) {
        setChat(res.data);
       
      }
    } catch (e) {
      console.log(e.response.data.msg);
    } 

  }


  const get_user = async (userId) => {
    setReseverid(userId)


    
    try {
      const response = await axios.get(`/user/${userId}`)

      const res = response.data
      if (res.status === true) {
        setResever(res.data)
        console.log(res.data)


        //onSuccess(res.data)
      }

    } catch (e) {
      console.log(e)
      // onError()
    }
   
  }
  

  const get_users = async (onSuccess, onError) => {
    const token = localStorage.getItem("token")

    try {
      const response = await axios.get("/users")

      const res = response.data
      if (res.status === true) {
        const filteredData = res.data.filter(item => item.role === "Company")
        setData(filteredData)



        //onSuccess(res.data)
      }

    } catch (e) {
      console.log(e)
      // onError()
    }
  }

  useEffect(() => {
    get_users()
  
  }, []);

  return (
    <div className='row ' >
      <div className='col-4 message_list_list'>
      <div className="m-2">
           <form class="d-flex" role="search">
          <input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
     
        {data.map(user => (
          <div>
            <ul class="user-list">
              <li class="user-list-item row">
                <img src={user.photo_user} alt="User Avatar" class=" rounded-full h-10 w-12 col-6" />
                <span class="user-name col-6" onClick={() => { get_user(user.id);}}>{user.name}</span>
              </li>
            </ul>
          </div>

        ))}
      </div>
      <div className='col-7 message_list'>
        <div className="chat-container">
          <div className="message-list">
           
{resever&&(

            <div className="message  text-bg-primary ">{resever.name}</div>
)}
          
            
          </div>
          {chat&&(
            <div>
              <p className="p-3 mb-2 bg-success text-white rounded ">{chat.message}</p>
          </div>
          )}
          

        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Write a Message..."
            onChange={(e)=>{setMessage(e.target.value)}}
            
          />
            <button className="send-button" onClick={send_message}>Send</button>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Messages