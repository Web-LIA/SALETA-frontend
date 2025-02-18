import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import { Item } from "../types/itemTypes";
import themes from "../themes/new-item-form.module.scss";
import Header from "../components/Header";

function Session() {
    let closed:boolean = true;
    let navigate = useNavigate()

    async function abrir_porta(){
        console.log("abriu porta")
        const response = await api.post('/open-door', {
            requisicao: "ON"
        })
        if(response.data.error){
            alert("NÃO CONSEGUI ABRIR A PORTA");
            return false;
        }else{
            alert("Tranca Liberada, deposite/obtenha o item e volte para encerrar a sessão");
            return response.data
        }
    }
    async function fechar_porta() {
        const response = await api.post('/open-door', {
            requisicao: "OFF"
        })
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

    function end_session() {
        fechar_porta()
        navigate('/')
    }
    
    return (
        <>
            <Header titulo='SESSÃO EM ANDAMENTO'/>
            <button onClick={end_session}>Encerrar Sessão</button>
        </>
    )
}

export default Session;