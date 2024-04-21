import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = async (data, onSuccess, onError) => {

    try {
        const response = await axios.post("/login",
            data
        );
        const res = response.data
        if (res) {
           /*  toast.success('🦄 Wow so easy!', {
                position: "top-right",
                theme: "dark",
              
            }); */
            const token = res.data.token
            localStorage.setItem("token", token)
            onSuccess(res.data)
           
        }

    } catch (e) {
        onError(e.response.data.msg)
    }
}

export default login
