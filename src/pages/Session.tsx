import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import { Item } from "../types/itemTypes";
import themes from "../themes/new-item-form.module.scss";
import Header from "../components/Header";
import { ContextIds } from "../App";
import sessionProps from "../types/loginProps";

const Session:React.FC<sessionProps> = ({tipo}) => {
    let closed:boolean = true;
    let navigate = useNavigate()
    let contextIds = useContext(ContextIds);

    async function abrir_porta(){
        console.log("abriu porta")
        const response = await api.post('/porta/abrir', {})
        await api.post(`/sessao/${contextIds["type"]}/${contextIds["userId"]}/${contextIds["itemId"]}` );
        if(response.data.error){
            alert("NÃO CONSEGUI ABRIR A PORTA");
            return false;
        }else{
            alert("Tranca Liberada, deposite/obtenha o item e volte para encerrar a sessão");
            return response.data
        }
        
    }
    async function fechar_porta() {
        const response = await api.post('/porta/fechar', {})
        if(response.data.error){
            alert("NÃO CONSEGUI FECHAR PORTA");
            return false;
        }else{
            alert("Sessão Encerrada, favor feche a porta");
            return response.data
        }
    }
    
    useEffect(() => {
        if (closed) abrir_porta();
        closed = false;
    }, []);

    async function end_session() {
        await fechar_porta();
        if(tipo == "buscar")await api.delete(`/itens/${contextIds["itemId"]}`).then( contextIds["setItemId"](""));
        navigate('/');
    }
    
    return (
        <>
            <Header titulo='SESSÃO EM ANDAMENTO'/>
            <button onClick={end_session}>Encerrar Sessão</button>
        </>
    )
}

export default Session;