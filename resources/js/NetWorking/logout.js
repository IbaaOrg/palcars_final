
const logout = async(onSuccess)=>{
    localStorage.removeItem("token")
    onSuccess()
}

export default logout
