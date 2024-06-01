import React, { useEffect, useState } from "react";
import CarCard from "./../Cars/CarCard";
import { useNavigate } from "react-router-dom";

function Discounts() {
    const [data, setDate] = useState(null);
    const [carid, setCarID] = useState(null);
    const [cars, setCars] = useState(null);
    const navigate = useNavigate();

    const get_all_discounts = async () => {
        const allCarsId = [];

        try {
            const response = await axios.get(`/showalldiscounts`);
            const data = response.data.data;
            const now = new Date();
            const filteredData = data.filter((discount) => {
                const expiredDate = new Date(discount.expired_date);
                return expiredDate >= now;
            });
            setDate(filteredData);
            // setCarID(data.data);

            for (let i = 0; i < data.length; i++) {
                allCarsId.push({
                    id: data[i].id, // Example property access
                    car_id: data[i].car_id, // Example property access
                    // ... other properties you need
                });
            }
            setCarID(allCarsId);
        } catch (error) {
            console.error(error);
        }
    };
    const navigateToDetails = (car_id) => {
        navigate(`/cars/${car_id}`);
    };

    useEffect(() => {
        get_all_discounts();
        console.log(data);
    }, []);
    return (
        <>
            {data && (
                <div className="container d-flex flex-wrap justify-evenly">
                    {data.map((d) => (
                        <div className="card w-80 m-5 p-1" key={d.id}>
                            <div>
                                <h3 className="badge text-bg-danger fs-5"></h3>
                                <div className=" card-body ">
                                    <div className=" card-header fs-4">
                                        {d.car.model}
                                    </div>
                                    <img
                                        className="w-100 h-52"
                                        src={d.car.sub_images[0].photo_car_url}
                                    />
                                </div>

                                <div className=" card-header fs-4">
                                    {d.note}
                                </div>
                            </div>
                            <div className="alert alert-warning" role="alert">
                                Expired Date : {d.expired_date}
                            </div>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-5">
                                {d.value}
                                {d.type == "percentage" ? "%" : "₪"} OFF
                                <span className="visually-hidden">
                                    unread messages
                                </span>
                            </span>
                            <button
                                className="btn btn-danger"
                                onClick={() => navigateToDetails(d.car.id)}
                            >
                                Show More Details{" "}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Discounts;
