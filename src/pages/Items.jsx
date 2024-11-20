import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";

function Items() {

    const [itemList, setItemList] = useState([]);
    useEffect(() => {  
        getItems();
    }, []);
      
    async function getItems() {
        const response = await api.get('/itens');
        setItemList(response.data)
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