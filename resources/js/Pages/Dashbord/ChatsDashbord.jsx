import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../../../css/app.css'
import '../../../css/MessageStyle/message.css'
import CommetInput from '../../Layout/Comments/CommetInput'
import MessageInput from '../../Layout/Message/MessageInput'
import { TranslateContext } from '../../Context/Translate';
function ChatsDashbord() {

  const [data, setData] = useState([]);
  const[dataSearch,setdataSearch]=useState([]);
  const [resever, setResever] = useState(null);
  const [reseverid, setReseverid] = useState(null);
  const [chat, setChat] = useState(null);
  const[allChat,setallChat]=useState([]);
  const [chatSender, setChatSender] = useState(null);
  const[allChatSender,setallChatSender]=useState([]);
  const [message, setMessage] = useState("");

  
  
  const send_message=async()=>{

    const formData = new FormData();
    formData.append("message", message);
    formData.append("reciever_id", reseverid);
 
    const token = localStorage.getItem("token")

    try {
      const response = await axios.post("/messagesStore", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const res = response.data;console.log("rrr=",res.data);
      if (res.status === true) {
        setChat(res.data);
        
      }
      all_send_message();
      all_received_message();
      setMessage("")
    } catch (e) {
      console.log(e.response.data.msg);
    } 
    setMessage("");
      console.log("Message after sending:", message); 
  }
  const all_send_message = async () => {
    const receverid = reseverid; // تأكد من تعيين قيمة `reseverid` بشكل صحيح
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get(`/allmessagesSend/${receverid}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      const res = response.data;
      console.log(res);
      if (res.status === true) {
        setChatSender(res.data);
        setallChatSender(res.data); // استخدم قوسين مربعين لتعيين قيمة المصفوفة
        setMessage(res.data);
        console.log("message", message);
        console.log("res.data", res.data);
      }setMessage("")
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.msg);
      } else {
        console.log('An error occurred:', e);
      }
    }
  };
 
  const all_received_message = async () => {
    const senderId = reseverid; // تأكد من تعيين قيمة `reseverid` بشكل صحيح
  console.log(senderId);
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get(`/allmessagesReceived/${senderId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      const res = response.data;
      console.log(res);
      if (res.status === true) {
        setChat(res.data);
        setallChat(res.data); // استخدم قوسين مربعين لتعيين قيمة المصفوفة
        setMessage(res.data);
        console.log("message", message);
        console.log("res.data", res.data);
      }setMessage("")
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.msg);
      } else {
        console.log('An error occurred:', e);
      }
    }
  };
  const get_user = async (userId) => {
    setReseverid(userId)

    try {
      const response = await axios.get(`/user/${userId}`)

      const res = response.data
      if (res.status === true) {
        setResever(res.data)
        console.log(res.data)

setMessage("")
        //onSuccess(res.data)
      }
all_send_message();
all_received_message();
setMessage("");
    } catch (e) {
      console.log(e)
      // onError()
    }
   
  }
  

  const get_users = async (onSuccess, onError) => {
    const token = localStorage.getItem("token")

    try {
      const response = await axios.get("/users")

      const res = response.data
      if (res.status === true) {
        const filteredData = res.data.filter(item => item.role === "Company")
        setData(filteredData)
        setdataSearch(res.data);


        //onSuccess(res.data)
      }
setMessage("")
    } catch (e) {
      console.log(e)
      // onError()
    }
  }

  useEffect(() => {
    get_users()
    all_send_message()
    all_received_message()
    setMessage("")
  }, []);
  const [searchTerm, setSearchTerm] = useState(""); // الحالة المحلية لتخزين قيمة حقل البحث

  const handleChange = (e) => {
      setSearchTerm(e.target.value); // تحديث القيمة عند تغييرها في حقل البحث
  };
  const handleSearch = (e) => {
      e.preventDefault();
      console.log();
      console.log(data);
      setData(dataSearch.filter(item => {
          return (
              item.name !== null && (searchTerm ? item.name?.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) 
     ) }));
    
  };
  const allMessages = allChat.concat(allChatSender);

console.log("allmessages:",allMessages);
const handleSendMessage = () => {
 
  send_message(message);
  setMessage(""); // Reset the input field after sending the message

};
  return (
    <div className='row ' id='myDiv6'>
      <div className='col-4 message_list_list' id='listDiv' style={{ maxHeight: '800px', overflowY: 'scroll', overflowX: 'hidden' }}>
      <div className="m-2">
           <form class="d-flex" role="search">
           <input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleChange} />
              <button class="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
        </form>
      </div>
     
        {data.map(user => (
          <div>
            <ul class="user-list">
              <li class="user-list-item row">
                <img src={user.photo_user} alt="User Avatar" class=" rounded-full h-10 w-12 col-6" />
                <span class="user-name col-6" onClick={() => { get_user(user.id);}}>{user.name}</span>
              </li>
            </ul>
          </div>

        ))}
      </div>
      <div className='col-7 message_list  border-0'>
        <div className="chat-container" style={{ maxHeight: '800px', overflowY: 'scroll', overflowX: 'hidden' }}>
          <div className="message-list">
           
{resever&&(

            <div className="message  bg-dark text-white ">{resever.name}</div>
)}
          
            
          </div>
{Array.isArray(allMessages) && allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((message, index) => (
    <p key={index} className={`p-3 mb-2 rounded ${message.sender.id === reseverid ? 'bg-primary text-white text-right' : 'bg-success text-white text-left'}`}>
        {message.message}
        <small className="text-dark">{" "+message.timeago}</small>
    </p>
))}


  

        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder={translates.WriteMessage}
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
          />
            <button className="send-button" onClick={handleSendMessage}>{translates.Send}</button>
        </div>

      </div>
      </div>
    </div>
  )
}
     
export default ChatsDashbord