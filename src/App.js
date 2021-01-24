import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { useEffect } from 'react';

import LogIn from './components/LogIn'
import { observer, inject } from 'mobx-react'
import Orders from './components/Orders';
import MapContainer from './components/MapContainer';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import Scan from './components/Scan';

function App(props) {

  props.ordersStore.checkLocalStorage()
  return (
    <Router>
      {props.ordersStore.islogIn && <NavBar/> }
      <Route exact path='/' render={() =>props.ordersStore.islogIn ? <Orders/> : <LogIn/>} /> 
      <Route exact path='/contact' render={() =>props.ordersStore.islogIn ? <Contact/> : <LogIn/>} /> 
      <Route exact path='/map' render={() =>props.ordersStore.islogIn ? <MapContainer /> : <LogIn/>} />
      <Route exact path='/Scan' render={() =>props.ordersStore.islogIn ? <Scan /> : <LogIn/>} />

    </Router>
  )
}

export default inject('ordersStore')(observer(App));
