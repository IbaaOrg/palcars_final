import React from 'react'

function EmployeeDashbord() {
  return (
    <div>

      <div className="container text-center  p-10">
        <div className="row">
          <div className="col">
            <h1 className='fs-1'>Employees List</h1>
            <p className=''>Your all Employees are listed bellow</p>
          </div>
          <div className="col ">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
          <div className="col">
            <button type="button" class="btn btn-light">Filter</button>

            <button type="button" class="btn btn-primary Addvehicle">Add Employee</button>

          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default EmployeeDashbord