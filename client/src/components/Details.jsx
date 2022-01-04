import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect} from "react"
import { useParams } from "react-router";
import style from '../Estilos/Details.module.css'


export default function Detail(props){

    const dispatch = useDispatch()
    const {id}  = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])

    const myDog = useSelector ((state) => state.detail)
    

    return (
        
        <div className={style.container}>
            {
                myDog.length>0 ? (
                <div className={style.card}>
                    <img src= {myDog[0]?.img? myDog[0]?.img : myDog[0]?.image} className={style.img} alt="" width= "500px" height="700px"/>
                    <h1 className={style.name}>{myDog[0].name}</h1>
                    <p className={style.tem}>{myDog[0]?.temperament ? myDog[0]?.temperament : myDog[0]?.temperaments?.map((el) => {
                    return <h3>{el?.name + " "}</h3>;
                    })}</p>
                    <p className={style.height}> Height: {myDog[0].height_min + '-' + myDog[0].height_max} cm</p>
                    <p className={style.weight}> Weight: {myDog[0].weight_min + '-' + myDog[0].weight_max} Kg</p>
                    <a className={style.life}> Life span: {myDog[0].life_span}</a>
                    
                
                </div>) : <p>Loading...</p>
            }
            <Link to ='/home'>
                <button>Return</button>
            </Link>
        </div>
    )
}