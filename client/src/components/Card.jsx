import React from "react";
import style from "../Estilos/Card.module.css"


export default function Card ({img, name, temperament, weight}) {
    return (
        
            <div className={style.card}>
                <div className={style.card_header}>
                    <img  className={style.img} src={img} alt= 'img not found' width='200px' height='250px'/>
                </div>
                <div className={style.card_body}>
                    <span className={style.tag}>{name}</span>
                    <h3 className={style.tem}>{temperament}</h3>
                    <div className={style.weight}>
                        <h4 className={style.tem}>Weight: {weight} Kg </h4>
                    </div>
                </div>
                          
                
            </div>
        
    )
}