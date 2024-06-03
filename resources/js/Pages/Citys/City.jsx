import React, { useEffect, useState } from "react";
import "../../../css/app.css";
import { MdHomeWork } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";

function City() {
    const searchParams = new URLSearchParams(location.search);
    const cityname = searchParams.get("city");

    const [companys, setCompanys] = useState([]);
    const [nothing, setNothing] = useState(false);

    const allCity = async () => {
        try {
            const response = await axios.get(`/showAllLocations`, {});
            const data = response.data;
            console.log(data.data);
            const citysarray = [];
            let foundCity = false;
            const companiesSet = new Set(); // To store unique company IDs

            for (let i = 0; i < data.data.length; i++) {
                const companyID = data.data[i].ownerCompany.id;

                if (
                    data.data[i].city.city === cityname &&
                    !companiesSet.has(companyID)
                ) {
                    citysarray.push({
                        owner: data.data[i].ownerCompany,
                    });
                    companiesSet.add(companyID);

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
    };

    useEffect(() => {
        allCity();
    }, []);

    return (
        <div className="container">
            {nothing ? (
                <>
                    <div className="container d-flex justify-center notaskshow">
                        <h1 className="mt-2 fs-3 ">
                            Sorry Nothing Company In This City
                        </h1>
                    </div>
                </>
            ) : (
                <>
                    {companys && (
                        <div className=" d-flex justify-around m-4">
                            {companys.map((company) => (
                                <div
                                    key={company.id}
                                    className="card shadow p-3"
                                >
                                    {/* <img src={company.owner.photo_user} className="h-20 w-20 rounded-circle d-flex justify-end " />
                                      <div className="card-body">
                                          <div className="card-header">
                                              {company.owner.name}

                                          </div>
                                          <div>
                                          Location : 
                                              {company.location.location}<br/>
                                              {company.location.typ
                                          </div> 
                                      </div> */}

                                    <div className="d-flex flex-column justify-content-between align-items-center pt-5">
                                        <div className="containerImgCompany">
                                            {" "}
                                            <img
                                                src={company.owner.photo_user}
                                                alt=""
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                        <p className="d-flex gap-3 justify-content-start align-items-center fw-bold pt-2 w-15">
                                            {" "}
                                            <i class="bi bi-house-door-fill fs-2"></i>
                                            {company.owner.name} Company
                                        </p>
                                    </div>
                                    <NavLink
                                        to={`/carofcompany/${company.owner.id}`}
                                        className="btn btn-outline-primary"
                                    >
                                        Show Profile
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default City;
