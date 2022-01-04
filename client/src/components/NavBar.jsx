import React from "react"
import { Link } from 'react-router-dom'
import style from "../Estilos/NavBar.module.css"
import rott from '../Estilos/Rott.png'

export default function NavBar() {
    return (
        <nav className={style.bar}>
            <div>
               
                <div className={style.logo}>
                    <img src={rott} id='rottlogo' alt="" width='120px' height='100px'/>
                </div>

               <div className={style.container}>
                    <div>
                        <Link to='/home'>
                            <button className={style.button}>Home</button>
                        </Link>
                    </div>

                    <div>
                        <Link to='/dog'>
                            <button className={style.button2}>Create your own dog</button>
                        </Link>
                    </div>
                </div>
                
            </div>
            
        </nav>
    )
}