import React, { useState } from "react";
import Add from '../img/addAvatar.png'
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth , db, storage} from '../firebace'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import Swal from 'sweetalert2';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const [isFirstRun, setIsFirstRun] = useState(true);
  const refreshFunc=()=>{
      if (isFirstRun) {
        // window.location.reload();
        window.location.replace('https://samanta580.github.io/ChatApp')
        setIsFirstRun(false);
      }
        }
//   const navHomeFunc=()=>{
//   let timerInterval     
// Swal.fire({
//   title: 'Auto close alert!',
//   html: 'I will close in <b></b> milliseconds.',
//   timer: 2000,
//   timerProgressBar: true,
//   didOpen: () => {
//     Swal.showLoading()
//     const b = Swal.getHtmlContainer().querySelector('b')
//     timerInterval = setInterval(() => {
//       b.textContent = Swal.getTimerLeft()
//       refreshFunc()
//       navigate('/')
//     }, 100)
//   },
//   willClose: () => {
    
//     clearInterval(timerInterval)
//   }
// }).then((result) => {
//   /* Read more about handling dismissals below */
//   if (result.dismiss === Swal.DismissReason.timer) {
//     console.log('I was closed by the timer')
//   }
// })
//   }


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const displayName = e.target["name"].value;
    const email = e.target["email"].value;
    const password = e.target["pass"].value;
    const file = e.target["pic"].files[0];

  
   try{
   
    const res=await createUserWithEmailAndPassword(auth, email, password)
const storageRef = ref(storage, displayName);
const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on(
  (error) => {
    setErr(true)
  },   
    () => {
     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateProfile(res.user,{
          displayName,
          photoURL:downloadURL
        })
        await setDoc(doc(db,"users",res.user.uid),{
          uid:res.user.uid,
          displayName,
          email,
          photoURL:downloadURL,
        }) 
        await setDoc(doc(db, "userChats", res.user.uid), {});
      //  navHomeFunc() 
      refreshFunc()
        navigate('/')
      });
    }
  

);
  
  }catch(err){
        setErr(true)
      }
    
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Register</span>
        <form 
        onSubmit={handleSubmit}
        >
          <input required name="name" type="text" placeholder="display name" />
          <input required name="email" type="email" placeholder="email" />
          <input required name="pass" type="password" placeholder="password" />
          <input required name="pic" style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
