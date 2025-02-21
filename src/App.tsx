import React,{useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Home from './pages/Home';
import Items from './pages/Items';
import NewItemForm from './pages/NewItemForm';
import Login from './pages/Login';
import Visitante from './pages/Visitante';
import Door from './pages/Door';
import Session from './pages/Session';

export const ContextItens = React.createContext<any>({
  itemId:'',setItemId: () => {}
});
function App() {
  const [itemId, setItemId] = useState<string>("");
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <div className='rota'>
      <ContextItens.Provider value= {{itemId,setItemId}}>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/itens' element={<Items/>}/>
          <Route path='/cadastrar-novo-item' element={<NewItemForm/>}/>
          <Route path='/abrir-porta' element={<Door/>}/>
          
            <Route path='/login/guardar' element = {<Login tipo = "guardar" />}/>
            <Route path='/login/buscar' element = {<Login tipo = "buscar" />}/>
            <Route path='/sessao/buscar' element={<Session tipo='buscar'/>}/>
            <Route path='/sessao/guardar' element={<Session tipo = 'guardar'/>}/>
          
          
        </Routes>
        </ContextItens.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
