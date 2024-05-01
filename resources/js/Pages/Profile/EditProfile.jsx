import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./../../Context/User";
import { TbPhotoEdit } from "react-icons/tb";
import "../../../css/ProfileStyle/Profile.css";
import { CiEdit } from "react-icons/ci";

function EditProfile() {
  const { user } = useContext(UserContext);

  const [showInputEditName ,setShowInputEditName]=useState(false);
  const [showInputEditPhone ,setShowInputEditPhone]=useState(false);
  const [showInputEditPassword ,setShowInputEditPassword]=useState(false);
  const form=useRef({
    name: null,
    phone: null,
    password: null,
    photo_user: null,
    photo_drivinglicense: null,
  })
  const file=useRef(null);
  const fileD=useRef(null);
  const show =(e)=>{
    file.current=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
      document.getElementById("user_img").src=reader.result
    }
    reader.readAsDataURL(file.current)

  }
  const showD =(e)=>{
    fileD.current=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
      document.getElementById("driving_img").src=reader.result
    }
    reader.readAsDataURL(fileD.current)

  } 
  const showEditName=()=>{
    setShowInputEditName(!showInputEditName);
  }
  const showEditPone=()=>{
    setShowInputEditPhone(!showInputEditPhone);

  }
  const showEditPassword=()=>{
    setShowInputEditPassword(!showInputEditPassword);

  }
 const set=(e)=>{
  form.current={...form.current,[e.target.name]:e.target.value}
 }
 const updateProfile=async(e)=>{
  const token=localStorage.getItem('token')
  const formData = new FormData();
  if(form.current.name)
  formData.append("name", form.current.name);
  if(form.current.phone)
  formData.append("phone", form.current.phone);
  if(form.current.password)
  formData.append("password", form.current.password);
  if (file.current) {
    formData.append("photo_user", file.current);
}  if (fileD.current) {
  formData.append("photo_drivinglicense", fileD.current);
}
const response=await axios.post(`users/${user.id}`,formData,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
console.log(response.data)

 }

  return (
    <div>
      <form>
        <div class="mb-3">
          <label htmlFor="" className="py-2">User Photo</label>
          <div className="imgPreview">
            <img src={user.photo_user} alt="" id="user_img"/>
            <label htmlFor="file-path"  className="imgEdit" >
            <TbPhotoEdit size={25} />

            </label>
            <input type="file"
            name="photo_user"
            id="file-path"
            onChange={show}
             />
          </div>
        </div>
        {user.role==="Renter"&&<div class="mb-3">
          <h3 className="py-2">Drivinglicense Photo</h3>
          <div className="imgPreview">
            <img src={user.photo_drivinglicense} alt="" id="driving_img"/>
            <label htmlFor="driving-path"  className="imgEdit" >
            <TbPhotoEdit size={25} />

            </label>
            <input type="file"
            name="photo_drivinglicense"
            id="driving-path"
            onChange={showD}
            />
          </div>
        </div>}
        <div class="mb-3">
          <label for="exampleFormControlInput2" className="form-label d-flex gap-2 justify-content-center align-items-center">
            Name : {user.name}  <CiEdit size={20} onClick={showEditName} className="cursor-pointer"/>

          </label>
          {showInputEditName&&<input
            type="text"
            class="form-control w-25 m-auto my-2 mt-3"
            id="exampleFormControlInput2"
            placeholder="New Name"
            name="name"
            onChange={set}
          />}
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput3" className="form-label d-flex gap-2 justify-content-center align-items-center">
            phone : {user.phone}  <CiEdit size={20} onClick={showEditPone} className="cursor-pointer" />

          </label>
          {showInputEditPhone&&<input
            type="text"
            class="form-control w-25 m-auto my-2 mt-3"
            id="exampleFormControlInput3"
            placeholder="New Phone"
            name="phone"
            onChange={set}

          />}
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput4" className="form-label d-flex gap-2 justify-content-center align-items-center">
            password  <CiEdit size={20} className="cursor-pointer" onClick={showEditPassword}/>
          </label>
          {showInputEditPassword&&<input
            type="text"
            class="form-control w-25 m-auto my-2 mt-3"
            id="exampleFormControlInput4"
            placeholder="New Password"
            name="password"
            onChange={set}

          />}
        </div>
        <input type="submit" className="btn btn-primary" value={"Save Changes"} onClick={updateProfile}/>
      </form>
    </div>
  );
}

export default EditProfile;
