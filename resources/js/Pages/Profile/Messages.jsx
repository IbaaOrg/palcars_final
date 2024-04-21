import React from 'react'
import '../../../css/MessageStyle/message.css'
import CommetInput from '../../Layout/Comments/CommetInput'
import MessageInput from '../../Layout/Message/MessageInput'
function Messages() {
  return (
    <div className='row m-2 p-2 ' >
      <div className='col-4 message_list'>
          <h1>List</h1>
      </div>
      <div className='col-7 message_list'>
        <div>
          hi
        </div>


      </div>
    <MessageInput/>
    </div>
  )
}

export default Messages