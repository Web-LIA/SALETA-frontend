import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import { Item } from "../types/itemTypes"
import { format } from "date-fns"
import themes from "../themes/items.module.scss"
import Header from "../components/Header";

function Items() {
    let navigate = useNavigate();
    const [itemList, setItemList] = useState<Item[]>([]);
    useEffect(() => {  
        getItems();
    }, []);
      
    async function getItems() {
        const response = await api.get('/itens');
        const apiItems: Item[] = response.data;
        setItemList(apiItems);
    }

    const [busca,setBusca] = useState("")
    const lowerBusca = busca.toLowerCase()
    const itemListFiltered = itemList.filter((item) => 
        item.title.toLowerCase().includes(busca.toLowerCase()) ||
        item.color.toLowerCase().includes(busca.toLowerCase()) ||
        item.description.toLowerCase().includes(busca.toLowerCase())
    ) 

    function start_session() {
        navigate('/sessao')   
    }

    return (
        <>
            <header className={themes.header}>
                <input type="text" value={busca} onChange={(e) => {setBusca(e.target.value)}} className={themes.search}/>
            </header>
            <main className={themes.itemMain}>
                {itemListFiltered.map(item => (
                    <div className={themes.itemCard}>
                        <div className={themes.itemInfo}>
                            <img src={item.photo} alt={item.title} />
                            <div className={themes.itemContent}>
                                <h3>{item.title}</h3>
                                <p className={themes.itemDesc}>{item.description}</p>
                                <div className={themes.itemFeats}>
                                    <p>Cor: {item.color}</p>
                                    <p>Tam: {item.size}</p>
                                </div>
                                <p className={themes.itemDate}>{format(item.date, 'dd/MM/yyyy HH:mm')}</p>
                            </div>
                        </div>
                        <button onClick={start_session} className={themes.itemButton}>Recuperar Item</button>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Items;