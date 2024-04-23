import React, { useEffect, useState } from 'react'

function Discounts() {
 const [data,setDate] = useState(null)
    const [carid, setCarID] = useState(null)
    const [cars, setCars] = useState(null)

    

    const get_all_discounts = async () => {
        const allCarsId = [];

        try {
            const response = await axios.get(`/showalldiscounts`);
            const data = response.data.data;
            setDate(data);
           // setCarID(data.data);

           for(let i=0 ; i< data.length ; i++){
               allCarsId.push({
                   id: data[i].id, // Example property access
                   car_id: data[i].car_id, // Example property access
                   // ... other properties you need
               });

           } 
            setCarID(allCarsId)
        } catch (error) {
            console.error(error);
        }
    }

/*     const getCarById = async () => {
        if(carid){

            const allcars = [];

        for(let i=0;i<2 ; i++){
            const id = carid[i].car_id

            try {
                const response = await axios.get(`/cars/${id}`);
                allcars.push({
                    car: response.data.data[i]
                });
            } catch (error) {
                // Handle error
                console.error('Error fetching user data:', error);
    
            }
        }
            setCars(allcars)

        }
    }; */
    useEffect(() => {
        get_all_discounts();
       //getCarById()
        console.log(data)


    }, []);
  return (
    <>
    {data &&(

  
      <div className="container d-flex flex-wrap justify-evenly">
        {data.map(d=>(
            <div className="card w-80 m-5 p-1" key={d.id}>
                <div >
                    <h3 class="badge text-bg-danger fs-5"></h3>

                <div className=" card-header fs-4">{d.note}</div>
                
                </div>
                <div class="alert alert-warning" role="alert">
                    Expired Date : {d.expired_date}
                </div>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-5">
                    {d.value}{d.type == "percentage" ? ("%") : ("₪")}
                    <span class="visually-hidden">unread messages</span>
                </span>

        </div>
        ))}

    </div> 
     )}
      </>
  )
}

export default Discounts