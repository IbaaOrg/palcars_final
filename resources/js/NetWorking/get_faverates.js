import axios from "axios"
const get_faverates = async (onSuccess, onerror,category) => {
    try {
        const response = await axios.get(`/favorites`);
        const data = response.data;
        onSuccess(data)
    } catch (error) {
        console.error(error);
    }
}

export default get_faverates
