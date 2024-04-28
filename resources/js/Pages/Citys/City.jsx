import React, { useEffect, useState } from 'react'
import '../../../css/app.css'
function City() {
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get("city");

    const [companys,setCompanys]= useState([])
    const [nothing, setNothing] = useState(false)


    const allCity =async()=>{
        try {
            const response = await axios.get(`/showAllLocations`, {

            });
            const data = response.data;
            const citysarray=[];
            for(let i =0 ; i<data.data.length ; i++){
                if(data.data[i].city.city === city){
                    citysarray.push({
                        owner: data.data[i].ownerCompany

                    })

                   // console.log(data.data[i].ownerCompany);
                }
                else{
                    setNothing(true)
                }
            }
            setCompanys(citysarray)
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