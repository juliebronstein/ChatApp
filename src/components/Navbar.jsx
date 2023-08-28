import React, { useContext, useEffect, useState} from 'react';
import {signOut} from "firebase/auth";

import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebace';
import Swal from 'sweetalert2';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const handelSignOut=()=>{
    Swal.fire({
      title: 'Are you sure?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'LogOut!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Log outed!',
          'You are logged out.',
          'success'
        )
        signOut(auth)
      }
    })
  }

  return (
    <div className='navbar'>
      <div className="user">
        <img src={currentUser&&currentUser?.photoURL} alt="" />
        <span>{currentUser&&currentUser?.displayName}</span>
        <button 
        onClick={handelSignOut}
        >logout</button>
      </div>
    </div>
     )
}

export default Navbar