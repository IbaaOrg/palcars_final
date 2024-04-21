import React from 'react'

function RecordButton({id}) {
  console.log("id")
  console.log(id)

  return (
    <>
      <button className='btn btn-success'>View</button>
        <button  className='btn btn-primary'>Update</button>
        <button className='btn btn-danger'>Delete</button>
    </>
        
  )
}

export default RecordButton