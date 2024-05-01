import React, { useState, useRef } from "react";
import "../../../css/Commentstye/Comments.css";
import axios from "axios";
import Messages from "./../../Pages/Profile/Messages";
import { object, string } from "yup";
import Rating from "./RatingC";
import RatingC from "./RatingC";

function CommetInput({ id, appendComment }) {
    const idCar = id;
    const [comment, setComment] = useState([]);
    const [errors, setErrors] = useState(null);
    const [seccsses, setSeccsses] = useState(null);
    const [rate, setRate] = useState(null);
    const form = useRef({
        comment: null,
        rating: null,
        car_id: idCar,
    });

    const validate = async () => {
        let userSchema = object({
            comment: string().required(),
        });
        try {
            await userSchema.validate(form.current);
            setSeccsses("User is valid!");
            setErrors(null);
            return true;
        } catch (e) {
            setErrors(e.errors);
            setSeccsses(null);
            return false;
        }
    };
    const set = (e) => {
        form.current = { ...form.current, [e.target.name]: e.target.value };
    };
    const handleRateChange = (newRate) => {
        setRate(newRate);
    };
    const addComment = async (e) => {
        e.preventDefault();

        if (errors != null) {
            const validatedata = await validate();
            console.log(validatedata);
            setErrors(null);
        }

        const formData = new FormData();
        formData.append("comment", form.current.comment);
        formData.append("rating", rate);
        formData.append("car_id", form.current.car_id);

        try {
            const token = localStorage.getItem("token");

            //console.log(token)
            var response = await axios.post("/comments", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
            const res = response.data;
            //console.log(res.data)
            if (res.status === true) {
                //setDone(res.data)
                appendComment(response.data.data);
            }
            document.getElementById("comment").value = "";
        } catch (e) {
            console.log(e);
            //alert(e.response.data.msg)
            // setError(e.response.data.msg)
        }
    };

    return (
        <div>
            <p className=" text-red-500"> {errors}</p>
            <form className="comment-input " onSubmit={addComment}>
                <div className="d-flex my-3 gap-5">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        className="col commentInput "
                        name="comment"
                        id="comment"
                        onChange={set}
                    />
                    <RatingC onRateChange={handleRateChange} id={"rating"} />
                </div>

                <input
                    type="submit"
                    className="col btn commentbtn "
                    value={"Comment"}
                />
            </form>
        </div>
    );
}

export default CommetInput;
