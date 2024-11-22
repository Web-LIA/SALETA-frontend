import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Home from './pages/Home';
import Items from './pages/Items';
import NewItemForm from './pages/NewItemForm';
import Login from './components/login/Login';
import Visitante from './components/login/Visitante';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <div className='rota'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login/*' element = {<Login tipo = "encontrar" />}/>
          <Route path='/itens' element={<Items/>}/>
          <Route path='/cadastrar-novo-item' element={<NewItemForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
