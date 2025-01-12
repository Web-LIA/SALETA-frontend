import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Item } from "../types/itemTypes"
import { format } from "date-fns"
import themes from "../themes/items.module.scss"
import Header from "../components/Header";

function Items() {

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

    return (
        <>
            <header className={themes.header}>
                <input type="text" value={busca} onChange={(e) => {setBusca(e.target.value)}} className={themes.search}/>
            </header>
            <main className={themes.itemMain}>
                {itemListFiltered.map(item => (
                    <div className={themes.itemCard}>
                        <img src={item.photo} alt={item.title} />
                            <div className={themes.itemContent}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Cor: {item.color}</p>
                                <p>Tam: {item.size}</p>
                                <p>{format(item.date, 'dd/MM/yyyy HH:mm')}</p>
                            </div>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Items;