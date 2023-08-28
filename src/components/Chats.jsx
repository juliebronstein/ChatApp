import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebace";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const {dispatch}  = useContext(ChatContext);
const calCharMsg=(text)=>{
    if(text==="")
  return ""
  if(text.length>13)
    return text.slice(0, 10)+"..."

return text
}
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Update chats state with fetched data or an empty object
      });

      return () => {
        unsub();
      };
    };

    if (currentUser.uid) {
      getChats();
    }
  }, [currentUser.uid]);


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
// console.log(Object.entries(chats))
try{
  return (
    <div className="chats">
      {chats&& Object?.entries(chats)?.sort((a,b)=>b[1].date - a[1].date)?.map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{calCharMsg(chat[1]?.lastMessage?.text)} </p>
            {/* <p>{chat[1]?.lastMessage?.text} </p> */}
          </div>
        </div>
      ))}
    </div>
  );
}catch(err){
  return( <div>some thing is wrong </div>)
};
}
export default Chats;
