import React from 'react'
import axios from 'axios';

export default function Home() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const createdAt = localStorage.getItem("createdAt");

  const logout = () => {
    axios
      .delete("http://localhost:8000/api/v1/users/logout")
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='h-screen p-14 flex flex-col'>
      <button onClick={logout} className='absolute top-1 left-1 m-4 text-xl text-red-400'>
        Logout
      </button>
      <h1 className='text-4xl text-center m-5'>Welcome, {username}</h1>
      <section>
        <h2 className='text-3xl text-left m-5'>Dashboard</h2>
       
      <div className='grid grid-flow-row sm:grid-cols-1 lg:grid-cols-2 gap-10'>
        <div className='bg-slate-100 flex flex-col justify-center items-center h-24 rounded-md'>
          <h3 >username</h3>
          <h4 className='text-2xl font-semibold'>{username}</h4>
        </div>
        <div className='bg-slate-100 flex flex-col justify-center items-center h-24 rounded-md'>
          <h3 >email</h3>
          <h4 className='text-2xl font-semibold'>{email}</h4>
        </div>
        <div className='bg-slate-100 flex flex-col justify-center items-center h-24 rounded-md'>
          <h3 >phone</h3>
          <h4 className='text-2xl font-semibold'>{phone}</h4>
        </div>
        <div className='bg-slate-100 flex flex-col justify-center items-center h-24 rounded-md'>
          <h3 >Registration Date <span className='text-xs'>-YYYY/MM/DD-</span>  </h3>
          <h4 className='text-2xl font-semibold'>{createdAt.slice(0,10)}</h4>
        </div>

      </div>
        
      </section>
    
    </div>
  )
}
