import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Home from './pages/Home';
import Login from './components/login/Login';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <div className='rota'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element = {<Login tipo = "encontrar" />}/>
          
          <Route path='/itens' element/>
          <Route path='/cadastrar-novo-item' element/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
