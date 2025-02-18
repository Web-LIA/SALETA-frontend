import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Home from './pages/Home';
import Items from './pages/Items';
import NewItemForm from './pages/NewItemForm';
import Login from './pages/Login';
import Visitante from './pages/Visitante';
import Door from './pages/Door';
import Session from './pages/Session';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <div className='rota'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login/guardar' element = {<Login tipo = "guardar" />}/>
          <Route path='/login/buscar' element = {<Login tipo = "buscar" />}/>
          <Route path='/itens' element={<Items/>}/>
          <Route path='/cadastrar-novo-item' element={<NewItemForm/>}/>
          <Route path='/abrir-porta' element={<Door/>}/>
          <Route path='/sessao' element={<Session/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
