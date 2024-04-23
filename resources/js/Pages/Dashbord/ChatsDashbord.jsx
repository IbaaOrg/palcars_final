import React from 'react'
import '../../../css/app.css'
function ChatsDashbord() {
  return (
    <div>

      <div className="container text-center  p-10">
        <div className="row">
          <div className="col-8 d-flex ">
          <h1>Chats</h1>
           
          </div>
          <div className="col-4 bg-white">
            <h1>Lists</h1>
          </div>
          
        </div>
        <form class="row g-3 chatinput" >
             
              <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden">Password</label>
                <input type="text" class="form-control" id="inputPassword2" placeholder="message"/>
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">send</button>
              </div>
            </form>
      </div>
    </div>
  )
}

export default ChatsDashbord