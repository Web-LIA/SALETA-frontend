import React from "react";
import { useState } from "react";
import api from "../services/api";
import { Item } from "../types/itemTypes"

function NewItemForm() {

    const [title, setTitle] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [size, setSize] = useState<string>("P");
    const [description, setDescription] = useState<string>("");


    async function postItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await api.post('/itens', {
            title,
            color,
            size,
            description
        })
    }

    return (
        <>
            <form onSubmit={postItem}>
                <label htmlFor="title">Título</label>
                <input type="text" placeholder="o que você encontrou?" required onChange={e => setTitle(e.target.value)}/>
                <label htmlFor="color">Cor</label>
                <input type="text" placeholder="cor do item" required onChange={e => setColor(e.target.value)}/>
                <label htmlFor="size">Tamanho</label>
                <select onChange={e => setSize(e.target.value)}>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                </select>
                <label htmlFor="description">Descrição</label>
                <textarea onChange={e => setDescription(e.target.value)}></textarea>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default NewItemForm;