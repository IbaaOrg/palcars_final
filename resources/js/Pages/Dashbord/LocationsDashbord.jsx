import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LocationsDashbord() {
    const navigate = useNavigate();
    const [citys, setCitys] = useState(null);
    const [user, setUser] = useState(null);
    const [locationid, setLocationId] = useState(null);
    const [locationid2, setLocationId2] = useState(null);

    const [locationname, setLocationname] = useState(null);
    const [locationname2, setLocationname2] = useState(null);
    const [locationname3, setLocationname3] = useState(null);

    const [error, setError] = useState(null);
    const [type1, setType1] = useState("pickup_dropoff");
    const [type2, setType2] = useState("dropoff");

    const [seccsses, setSeccsses] = useState(false);

    const [showdropoff, setShowdropoff] = useState(false);
    const toggle = () => {
        setShowdropoff(!showdropoff);
    };

    const chicktype = async () => {
        if (showdropoff) {
            const token = localStorage.getItem("token");
            const formData2 = new FormData();
            formData2.append("city_id", locationid2.id);
            formData2.append("location", locationname2);
            formData2.append("type", type2);
            formData2.append("user_id", user.user_id);

            try {
                const response = await axios.post("/addLocation", formData2, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = response.data;

                if (res.status === true) {
                    setSeccsses(true);
                }
            } catch (e) {}
        }
    };

    const addlocation = async () => {
        const formData1 = new FormData();

        if (showdropoff) {
            formData1.append("city_id", locationid.id);
            formData1.append("location", locationname);
            formData1.append("type", "pickup");
            formData1.append("user_id", user.user_id);
        } else {
            formData1.append("city_id", locationid.id);
            formData1.append("location", locationname);
            formData1.append("type", type1);
            formData1.append("user_id", user.user_id);
        }
        //addLocation
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post("/addLocation", formData1, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = response.data;
            if (res.status === true) {
                setSeccsses(true);
                setLocationname("");
                navigate("/dashbord/LocationDashbord");
            }
        } catch (e) {}

        chicktype();
    };

    async function getuser() {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = response.data;

            if (res.status === true) {
                setUser(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //showallcities
    const getcites = async () => {
        const token = localStorage.getItem("token");
        try {
            var response = await axios.get(`showallcities`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = response.data;
            if (res.status === true) {
                setCitys(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getcites();
        getuser();
        setSeccsses(false);

        // console.log(locationid)
    }, []);
    const setlocation = () => {
        const selectedId = parseInt(event.target.value);
        const selectedOption = citys.find((option) => option.id === selectedId);
        //setSelectedOption();
        //setColor(selectedOption); // Convert to number
        setLocationId(selectedOption);
    };
    const setlocation2 = () => {
        const selectedId = parseInt(event.target.value);
        const selectedOption = citys.find((option) => option.id === selectedId);
        //setSelectedOption();
        //setColor(selectedOption); // Convert to number
        setLocationId2(selectedOption);
    };
    return (
        <div className="  mainlocation">
            <div className="card p-2">
                {citys && (
                    <div className=" d-flex justify-around">
                        <div>
                            <label for="select" className=" mr-3">
                                {" "}
                                {!showdropoff
                                    ? "Pick up and Dropoff"
                                    : "Pick up"}{" "}
                            </label>

                            <select
                                class="select-input m-4"
                                id="select"
                                onChange={setlocation}
                            >
                                <option>Choose City..</option>
                                {citys.map((city) => (
                                    <option
                                        key={city.id}
                                        value={city.id}
                                        id={city.id}
                                    >
                                        {city.city}
                                    </option>
                                ))}
                            </select>
                            <div>
                                <label
                                    for="exampleFormControlInput1"
                                    className=" mr-3"
                                >
                                    Location{" "}
                                </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="location..."
                                    onChange={(e) => {
                                        setLocationname(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        {showdropoff && (
                            <div>
                                <label for="select" className=" mr-3">
                                    Drop off
                                </label>

                                <select
                                    class="select-input m-4"
                                    id="select"
                                    onChange={setlocation2}
                                >
                                                                    <option>Choose City..</option>

                                    {citys.map((city) => (
                                        <option
                                            key={city.id}
                                            value={city.id}
                                            id={city.id}
                                        >
                                            {city.city}
                                        </option>
                                    ))}
                                </select>
                                <div>
                                    <label
                                        for="exampleFormControlInput1"
                                        className=" mr-3"
                                    >
                                        Location{" "}
                                    </label>

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="location..."
                                        onChange={(e) => {
                                            setLocationname2(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        onChange={toggle}
                    />
                    <label class="form-check-label" for="gridCheck">
                        Deffrent Location
                    </label>
                </div>
                <div>
                    {seccsses && (
                        <div class="alert alert-success" role="alert">
                            Done added location
                        </div>
                    )}
                </div>
                <div className=" d-flex justify-end">
                    <button className="btn btn-success" onClick={addlocation}>
                        Save Change
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationsDashbord;
