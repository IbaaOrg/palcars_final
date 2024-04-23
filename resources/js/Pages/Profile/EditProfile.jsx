import React from 'react'

function EditProfile() {
  return (
    <div>
    <form>

              <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
              </div>
              <div class="mb-3">
                  <label for="exampleFormControlInput2" class="form-label">Name</label>
                  <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="name" />
              </div>
              <div class="mb-3">
                  <label for="exampleFormControlInput3" class="form-label">Phone</label>
                  <input type="text" class="form-control" id="exampleFormControlInput3" placeholder="Phone" />
              </div>
             
    </form>
    
    </div>
  )
}

export default EditProfile