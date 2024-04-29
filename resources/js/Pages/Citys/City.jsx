import React, { useEffect, useState } from 'react'
import '../../../css/app.css'
function City() {
    const searchParams = new URLSearchParams(location.search);
    const cityname = searchParams.get("city");

    const [companys,setCompanys]= useState([])
    const [nothing, setNothing] = useState(false)


    const allCity =async()=>{
        try {
            const response = await axios.get(`/showAllLocations`, {

            });
            const data = response.data;
            console.log(data.data)
            const citysarray = [];
            let foundCity = false;

            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].city.city === cityname) {

                    citysarray.push({
                        owner: data.data[i].ownerCompany,
                        location: data.data[i]
                    });
                    foundCity = true;
                }
            }

            if (foundCity) {
                console.log(citysarray);
                setCompanys(citysarray);
                setNothing(false);
            } else {
                setCompanys([]);
                setNothing(true);
            }
           // console.log(data.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
       allCity()
    }, []);
    
  return (

        <div className="container">
          {nothing?(
            <>
                <div className="container d-flex justify-center notaskshow">
                    <h1 className="mt-2 fs-3 ">Sorry Nothing Company In This City</h1>
                </div>
            </>
          ):(
            <>
                      {companys && (
                          <div className=" d-flex justify-around">
                              {companys.map(company => (

                                  <div key={company.id} className="card shadow p-3">
                                      <img src={company.owner.photo_user} className="h-20 w-20 rounded-circle d-flex justify-end " />
                                      <div className="card-body">
                                          <div className="card-header">
                                              {company.owner.name}

                                          </div>
                                          <div>
                                          Location : 
                                              {company.location.location}<br/>
                                              {company.location.type}


                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
            </>
          )}
      
         

        </div>
  )
}

export default City