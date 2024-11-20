import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Items from './pages/Items';
import NewItemForm from './pages/NewItemForm';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <div className='rota'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element/>
          <Route path='/itens' element={<Items/>}/>
          <Route path='/cadastrar-novo-item' element={<NewItemForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
