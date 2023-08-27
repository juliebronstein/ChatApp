import React, { useState } from "react";
import Add from '../img/addAvatar.png'
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth , db, storage} from '../firebace'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        console.log('File available at', downloadURL);
        console.log(res.user)
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
        //  updateProfile()
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
        <span className="logo">Lama Chat</span>
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
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
