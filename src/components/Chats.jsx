import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebace";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const {dispatch}  = useContext(ChatContext);
// console.log("dispatch",dispatch)
  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);








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




  // useEffect(() => {
  //   const getChats = () => {
  //     // Set up a subscription to the userChats document
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data()); // Update chats state with fetched data
  //     });
  
  //     return () => {
  //       unsub(); // Unsubscribe when the component unmounts or the UID changes
  //     };
  //   };
  
  //   // Only call getChats if currentUser.uid is defined
  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const chatsSnapshot = await getDocs(collection(db, "chats"));
  //       const chatsData = {};
  //       chatsSnapshot.forEach((doc) => {
  //         chatsData[doc.id] = doc.data();
  //       });
  //       setChats(chatsData); // Update chats state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching chats:", error);
  //     }
  //   };

  //   fetchData();
  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
console.log(Object.entries(chats))
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
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
