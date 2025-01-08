import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Item } from "../types/itemTypes"

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
        item.description.toLowerCase().includes(busca.toLowerCase()) ||
        item.size.toLowerCase().includes(busca.toLowerCase())
    )

    return (
        <>
            <input type="text" value={busca} onChange={(e) => {setBusca(e.target.value)}} />
            {itemListFiltered.map(item => (
                <div className="itemCard">
                    <p>{item.title}</p>
                    <p>{item.color}</p>
                    <p>{item.size}</p>
                    <p>{item.description}</p>
                    <p>{item.date}</p>
                    <img src={item.photo} alt="" />
                    <hr />
                </div>
            ))}
        </>
    )
}

export default Items;