import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
const RatingC = ({ onRateChange, id }) => {
    const [rate, setRate] = useState(0);
    return (
        <div className="d-flex gap-2 py-3 mx-5">
            <h2>Add rating : </h2>
            {[...Array(5)].map((item, index) => {
                const givenRate = index + 1;
                return (
                    <label>
                        <Radio
                            type="radio"
                            value={givenRate}
                            onClick={() => {
                                setRate(givenRate);
                                onRateChange(givenRate);
                            }}
                        />
                        <Rating>
                            <FaStar
                                id={id}
                                className="hoverRate"
                                color={
                                    givenRate < rate || givenRate === rate
                                        ? "000"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </div>
    );
};

export default RatingC;
