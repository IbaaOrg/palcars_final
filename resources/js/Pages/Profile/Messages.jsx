import React from 'react'
import { useState,useEffect } from 'react';
import '../../../css/app.css'

import '../../../css/MessageStyle/message.css'
import CommetInput from '../../Layout/Comments/CommetInput'
import MessageInput from '../../Layout/Message/MessageInput'
function Messages() {
  const [data, setData] = useState([])
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
        {data.map(user => (
          <div>
            <ul class="user-list">
              <li class="user-list-item row">
                <img src={user.photo_user} alt="User Avatar" class=" rounded-full h-10 w-12 col-6" />
                <span class="user-name col-6" >{user.name}</span>
              </li>
            </ul>
          </div>

        ))}
      </div>
      <div className='col-7 message_list'>
        <div className="chat-container">
          <div className="message-list">
           
            <div className="message  text-bg-primary ">message</div>
            
          </div>

        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Write a Message..."

            
          />
          <button className="send-button" >Send</button>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Messages