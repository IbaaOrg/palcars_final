import React from "react";
function note_for_company() {
    user.role === "Company"?<>
    <p>
    <span className="text-primary fw-bold">The Note : </span>
    {item.note ? <span>{item.note} </span>: 'Unknown Car'
    } 
  </p>
  <p>
    <span className="text-primary fw-bold">From : </span>
    {item.reciever.name? item.reciever.name  : 'Unknown Owner'
    }  Company
  </p></>: <> <p>
    <span className="text-primary fw-bold">From : </span>
    {item.owner_of_comment.name ? item.owner_of_comment.name : 'Unknown Owner'
    } 
  </p>
  <p>
    <span className="text-primary fw-bold">On : </span>
    {item.car ? <span>{item.car.make} - {item.car.model}</span>: 'Unknown Car'
    } 
  </p>
  </>
}
export default note_for_company;