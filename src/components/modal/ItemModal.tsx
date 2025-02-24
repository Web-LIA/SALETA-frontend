import React, { useContext } from "react";
import { useState} from "react";
import { useNavigate } from "react-router";
import ReactModal from "react-modal";
import { Item } from "../../types/itemTypes"
import { format } from "date-fns"
import { ContextIds } from "../../App";
import themes from "../../themes/items.module.scss"

interface itemModalProps{
    item:Item,
    show:boolean,
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

const ItemModal:React.FC<itemModalProps> = (props:itemModalProps) => {
    // const [showModal,setShowModal] = useState(false)
    function handleOpenModal (item:Item) {
        props.setShow(true)
    }
        
    function handleCloseModal () {
        props.setShow(false)
    }

    return (
        <>
        {props.item? 
        <ReactModal 
            isOpen={props.show} 
            onRequestClose={handleCloseModal} 
            shouldCloseOnOverlayClick={true}
            className={themes.itemMain}
        >
            <div className={themes.itemCard}>
                <div className={themes.itemInfo}>
                    <img src={props.item.photo} alt={props.item.title} />
                    <div className={themes.itemContent}>
                        <h3>{props.item.title}</h3>
                        <p className={themes.itemDesc}>{props.item.description}</p>
                        <div className={themes.itemFeats}>
                            <p>Cor: {props.item.color}</p>
                            <p>Tam: {props.item.size}</p>
                        </div>
                        <p className={themes.itemDate}>{format(props.item.date, 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                </div>
                {/* <button onClick={() => {start_session(props.item._id)}} className={themes.itemButton}>Recuperar Item</button> */}
                <button onClick={handleCloseModal} className={themes.itemButton}>Recuperar Item</button>
            </div>
        </ReactModal> :
        <></>
        }
        </>
    )
}

export default ItemModal