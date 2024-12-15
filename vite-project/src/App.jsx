import React from 'react'
import {Route , Routes } from 'react-router-dom';
import Home from './pages/Home';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
const App = () => {
  return (
    <Routes>
      <Route path='/'  element = { <Home />}/>
      <Route path='/captain-login'  element = { <CaptainLogin/> }/>
      <Route path='/captain-signup'  element = { <CaptainSignup/> }/>
      <Route path='/login'  element = { <UserLogin/> }/>
      <Route path='/signup'  element = { <UserSignup/> }/>

    </Routes>
  )
}

export default App
