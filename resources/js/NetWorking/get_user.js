import axios from "axios"

const get_user = async ( onSuccess, onError) => {
    const token = localStorage.getItem("token")
  
    try {
        const response = await axios.get("/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const res = response.data
        if (res.status === true) {
            onSuccess(res.data)
        }

    } catch (e) {
        console.log(e)
        onError()
    }

}

export default get_user
