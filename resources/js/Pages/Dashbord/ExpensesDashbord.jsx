import React, { useContext, useEffect, useState } from "react";
import "../../../css/app.css";
import { TranslateContext } from "../../Context/Translate";
function ExpensesDashbord() {
    const {translates}=useContext(TranslateContext)
    const [data, setData] = useState([]);
    const [totla, setTotal] = useState(0);
    const getData = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/showAllBillsOfMyCompany`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.data);
        const fetchedData = response.data.data;
        setData(fetchedData);

        // Calculate the sum of all amounts
        const sum = fetchedData.reduce(
            (acc, item) => acc + Number(item.final_amount),
            0
        );
        setTotal(sum);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 mx-5">
            <h2 className="fs-4 fw-bold">{translates.expensesfrom}</h2>

            {data.length > 0 ? (
                <div className="w-100  mt-4 rounded bg-white px-3">
                    {data.map((item, index) => (
                        <>
                            <div
                                key={item.id}
                                className="d-flex justify-content-between align-items-center bg-white  rounded px-3 "
                            >
                                <div className="imgUserContainer m-2 ">
                                    <h1>
                                        {translates.Booking} #
                                        <span className="fw-bold text-primary">
                                            {index + 1}
                                        </span>
                                    </h1>
                                    <h2 className=" ">
                                        {translates.From} <span className="fw-bold text-primary">
                                            {item.user_id.name}
                                        </span>
                                    </h2>
                                    <div className="imgUserBill">
                                        <img
                                            src={item.user_id.photo_user}
                                            alt=""
                                            className="rounded"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex ">
                                    <p>{translates.From} : {item.start_date}</p>
                                    <p>{translates.To} : {item.end_date}</p>
                                </div>
                                <p>{translates.Method} : {item.method.method}</p>
                                <p>{Math.round(item.final_amount)} ₪</p>
                            </div>
                            <div className="px-4">
                                <hr />
                            </div>
                        </>
                    ))}
                    <p className="fs-5 fw-bold">
                        {" "}
                        {translates.TotalProfit} : {Math.round(totla)} ₪
                    </p>
                </div>
            ) : (
                <div className="d-flex flex-column justidy-content-center align-items-center mt-5 ">
                    <p className="fs-4 p-5 text-black">
                        {translates.notexpenses}
                    </p>
                    <div className="">
                        <i class="bi bi-cash-coin expensesIcon "></i>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExpensesDashbord;
