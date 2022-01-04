import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { getDogName } from '../actions'
import style from "../Estilos/SearchBar.module.css"

import { AiOutlineSearch } from "react-icons/ai";


//guardo lo que typea el usuario en mi estado local 'name'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('') //creo un estado local

    function handleInputChange (e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getDogName(name))
    }
    
    return (
        <div className={style.search_box} >
            <button className={style.btn_search} onClick={(e) => handleSubmit(e)} type='submit'> <AiOutlineSearch/></button>
            <input type="text" className={style.input_search} placeholder="Type to Search..." onChange={(e)=> handleInputChange(e)}></input>
            
        </div>
    )
}

