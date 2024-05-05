import axios from "axios";

const get_all_cars = async (onSuccess, onError, categoryValue, minPrice, maxPrice,fuelType,steeringValue,personsValue,makeValue,modelValue) => {
    console.log(minPrice)
    console.log(maxPrice)
    try {
        const response = await axios.get(`/cars`, {
            params: {
                category: categoryValue,
                min_price: minPrice,
                max_price: maxPrice,
                fuel_type: fuelType,
                steering: steeringValue,
                seats: personsValue,
                make: makeValue,
                model: modelValue,
            }
        });
        const data = await response.data;
        onSuccess(data);
        console.log(data);

    } catch (error) {
        console.error(error);
        onError(error);
    }
};

export default get_all_cars;
