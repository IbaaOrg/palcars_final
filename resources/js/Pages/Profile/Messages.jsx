import React from 'react'
import '../../../css/MessageStyle/message.css'
import CommetInput from '../../Layout/Comments/CommetInput'
import MessageInput from '../../Layout/Message/MessageInput'
function Messages() {
  return (
    <div className='row ' >
      <div className='col-4 message_list'>
          <h1>List</h1>
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