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

    return (
        <>
            {itemList.map(item => (
                <div className="itemCard">
                    <p>{item.title}</p>
                    <p>{item.color}</p>
                    <p>{item.size}</p>
                    <p>{item.description}</p>
                    <p>{item.date}</p>
                    <hr />
                </div>
            ))}
        </>
    )
}

export default Items;