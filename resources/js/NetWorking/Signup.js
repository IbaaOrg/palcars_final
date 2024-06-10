import axios from "axios";

const Signup = async (formData, onSuccess, onError) => {
    try {
        const response = await axios.post("/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        const res = response.data;
        if (res.status === true) {
            const token = res.data.token;
            localStorage.setItem("token", token);
            onSuccess(res.data);
        } else {
            onError(res.msg);
        }
    } catch (e) {
        console.error("Signup error:", e);
        const errorMsg = e.response?.data?.msg || "An error occurred";
        onError(errorMsg);
    }
};

export default Signup;