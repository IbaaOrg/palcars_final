import React from 'react'
import '../../../css/Commentstye/Comments.css'
function MessageInput() {
  return (
      <div>


         {/*  <p className=' text-red-500'> {errors}</p> */}
          <form className="comment-input row m-4" >
              <input
                  type="text"
                  placeholder="Write a Message..."
                  className='col commentinput '
                  name="message"
                  id="message"

                 


              />
              <input type='submit' className='col btn commentbtn' value={"Send"} />
          </form>

      </div>
  )
}

export default MessageInput