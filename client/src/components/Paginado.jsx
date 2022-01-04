import React from "react";
import style from "../Estilos/Paginado.module.css"

export default function Paginado ({dogsPerPage, dogs, paginado}) {
    const pageNumber = []

    for (let i=1; i <=Math.ceil(dogs/dogsPerPage); i++) {// el math ceil redondea para arriba. este ciclo redonde todos los dogs sobre los dogs que quiero por pag.
        pageNumber.push(i) // pushea al array la division de arriba
    }

    return (
        <nav>
            <ul className= {style.paginado}>
                { pageNumber && //me fijo si existe antes de aplicarle el map
                pageNumber.map(number =>( //el map renderiza a todos por separado
                    <li key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))

                }

            </ul>
        </nav>
    )
}

