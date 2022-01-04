import React from 'react'
import { useState , useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getDogs, getTemperaments, filterTemperaments, filterCreated, orderByName, orderByWeight} from '../actions/index.js'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado.jsx'
import SearchBar from './SearchBar.jsx'
import style from "../Estilos/Home.module.css"



export default function Home () {
    const dispatch= useDispatch()
    const [orden, setOrden]= useState('')
    const dogs= useSelector((state)=> state.dogs) //traigo el array de perros estado del reducer
    const [currentPage, setCurrentPage] = useState(1) // guarda la pagina actual en un estado local y una const que setea la pagina actual. el 1 es para que arranque de la pag 1
    const [dogsPerPage, setDogsPerPage] = useState(8) // guarda 8 razas por pagina
    const indexOfLastDog = currentPage * dogsPerPage // 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 0
    const currentDogs = dogs.slice(indexOfFirstDog , indexOfLastDog)

    const temperamentos= useSelector((state)=>state.temperaments) //traigo el array de temperamentos estado del reducer

    const paginado= (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    useEffect(()=>{
        dispatch(getDogs()) // cada vez que el componente se renderiza, se ejecuta el useEffect
        dispatch(getTemperaments())
    },[dispatch])


    function handleClick(e) {
        e.preventDefault()
        dispatch(getDogs())
    }

    function handleSort (e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort2 (e){
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleTemperament(e) {
        dispatch(filterTemperaments(e.target.value))

    }

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
    }

    return (
        <div className={style.home}>
            
            <button onClick={e=> {handleClick(e)}} className={style.btn}> RELOAD</button>
            <div>
                    <div>
                        <div className={style.box1}>
                        <label htmlFor='select' className={style.word}> FILTER BY:  </label>
                            <select onChange={e => handleSort(e)}>
                                <option value= "asc"> A-Z </option>
                                <option value= "desc"> Z-A </option>
                            </select>
                        </div>

                        <div className={style.box4}>
                            <select onChange={e => handleSort2(e)}>
                                <option value= "men"> Min weight </option>
                                <option value= "may"> Max weight </option>
                            </select>
                        </div>
                    
                            <div className={style.box2}>
                                
                                <select onChange={handleTemperament}>
                                    <option value='All'> Any</option>
                                    {temperamentos.map((temp)=>(
                                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                                    ))}
                                </select>
                            </div>
                        <div className={style.box3}>
                            
                            <select onChange={(e)=> handleFilterCreated(e)}>
                                <option value='All'> All</option>
                                <option value='Created'> Created</option>
                                <option value= 'api'>Existent</option>
                            </select>
                        </div>
                        
                    <Paginado
                    dogsPerPage={dogsPerPage}
                    dogs={dogs.length}
                    paginado={paginado}
                    />
                    <SearchBar/>
                </div>
                
                <div className={style.cards}>
                
                    {currentDogs?.map(el =>
                        (<div>
                            <Link to={'/dogs/' + el.id}>
                                <Card
                                    key={el.id}
                                    name={el.name}
                                    img={el.img}
                                    temperament={el.temperament?el.temperament:el.temperaments?.map((el)=>el?.name + ', ')? el.temperaments?.map((el)=>el?.name + ', '):'unknown temperament'}
                                    weight={el?.weight_min + '-' + el?.weight_max}
                                    />
                            </Link>
                        </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
        
    )
}


