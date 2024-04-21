import axios from "axios";

const Signup = async (formData, onSuccess, onError) => {

    try {
        const response = await axios.post("/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        const res = response.data
        if (res.status === true) {
            const token = res.data.token
            localStorage.setItem("token", token)
            onSuccess(res.data)
        }

    } catch (e) {
        console.log(e.response.data)
        onError(e.response.data.msg)
    }

}

export default Signup
