import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-cover bottom  bg-[url(D:\RIDE-SHAREING\vite-project\public\assets\traffic-light.jpg)]  h-screen pt-8  flex  justify-between flex-col w-full bg-red-400'>
      <img className ='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
      <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold' >Get Started with Uber</h2>
          <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Home
