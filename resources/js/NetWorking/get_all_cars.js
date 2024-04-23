import axios from "axios"

const get_all_cars = async (onSuccess, onerror,category) => {
    try {
        const response = await axios.get(`/cars?category=${category}`);
        const data = response.data;
        onSuccess(data)
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

export default get_all_cars
