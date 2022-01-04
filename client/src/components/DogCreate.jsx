import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {postDog, getTemperaments} from '../actions/index'
import {useDispatch, useSelector} from "react-redux"
import style from "../Estilos/DogCreate.module.css"





function validate(input) {
    let errors = {}
    if(!input.name || !/^[a-zA-Z]?\s?[a-zA-Z]/.test(input.name)){
        errors.name = 'Insert an alphabetic character';
    } else if (!input.height_min) {
        errors.height_min = ''
    } else if (!input.height_max) {
        errors.height_max = ''
    } else if (!input.weight_min) {
        errors.weight_min = ''
    } else if (!input.weight_max) {
        errors.weight_max = ''
    } else if (!input.life_span) {
        errors.life_span = ''
    } else if (!input.img) {
        errors.img = ''
    }

    return errors
}



export default function DogCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state)=>state.temperaments)
    const [errors, setErrors] = useState({})

   

    const [input,setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        img: "",
        temperament: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value] //trae lo que ya tenia temp y concatena el target value, para agregar en un arreglo lo que agregue al select
        })
    }

    const ErroresValidacion=()=>{
        debugger
            if(!input.name) {alert("NAME MISSING"); return false;}
            if(!input.height_min) {alert("MIN HEIGHT MISSING"); return false;}
            if(!input.height_max) {alert("MAX HEIGHT MISSING"); return false;}
            if(!input.weight_min) {alert("MIN WEIGHT MISSING"); return false;}
            if(!input.weight_max) {alert("MAX WEIGHT MISSING"); return false;}
            if(!input.life_span) {alert("LIFE SPAN MISSING"); return false;}
            return true;
    }

    function handleSubmit(e){
        e.preventDefault()
        if (ErroresValidacion()) {
            dispatch(postDog(input))
        alert("Dog created")
        setInput({
            name: "",
            height_min: "",
            height_max: "",
            weight_min: "",
            weight_max: "",
            life_span: "",
            img: "",
            temperament: []
            
        })
        history.push('/home')

        }  
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(tem => tem !== el)
        })
    }


    useEffect(()=> {
        dispatch(getTemperaments())
    },[])

    return(
        <div>
        <div>
        <Link to= 'home'><button className={style.return}> Return </button></Link>
        </div>
        <div className={style.container}>
        

        <div className={style.form}>

            <div className={style.title}>Dog creation</div>

            <div className={style.subtitle}>Let's create your dog!</div>

            <form onSubmit={(e)=>handleSubmit(e)}>
                
                <div className={style.botones}>
                <div className={style.input_container}>
                    <input
                    id="name"
                    className={style.input}
                    type= "text"
                    placeholder=" "
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    />
                    <div className={style.cut}></div>
                    <label for="name" className={style.placeholder}>Name</label>
                    {errors.name && (
                    <p className={style.err}>{errors.name}</p>
                    )}
                </div>

                <div className={style.divider}/>

                <div className={style.input_container}>
                    <input
                        id="height_min"
                        className={style.input}
                        type="number"
                        placeholder=" "
                        value={input.height_min}
                        name="height_min"
                        onChange={handleChange}
                    />
                    <div className={style.cut}></div>
                    <label for="height_min" className={style.placeholder}>Min height</label>
                    {errors.height_min && (
                    <p className='error'>{errors.height_min}</p>
                    )}
                </div>

                <div className={style.divider}/>

                <div className={style.input_container}>
                    <input
                        id="height_max"
                        className={style.input}     
                        type="number"
                        placeholder=" "
                        value={input.height_max}
                        name="height_max"
                        onChange={handleChange}
                    />
                    <div className={style.cut}></div>
                    <label for="height_max" className={style.placeholder}>Max height</label>
                    {errors.height_max && (
                    <p className='error'>{errors.height_min}</p>
                    )}
                </div>
                
                <div className={style.divider}/>

                <div className={style.input_container}>
                    <input
                        id="weight_min"
                        className={style.input}
                        type="number"
                        placeholder=" "
                        value={input.weight_min}
                        name="weight_min" 
                        onChange={handleChange}
                    />
                    <div className={style.cut}></div>
                    <label for="weight_min" className={style.placeholder}>Min weight</label>
                    {errors.weight_min && (
                    <p className='error'>{errors.weight_min}</p>
                    )}
                </div>
                    
                <div className={style.divider}/>

                <div className={style.input_container}>
                    <input
                        id="weight_max"
                        className={style.input}
                        type="number"
                        placeholder=" "
                        value={input.weight_max}
                        name="weight_max"
                        onChange={handleChange}
                    />
                    <div className={style.cut}></div>
                    <label for="weight_max" className={style.placeholder}>Max weight</label>
                    {errors.weight_max && (
                    <p className='error'>{errors.weight_max}</p>
                    )}
                </div>


                <div className={style.divider}/>


                <div className={style.input_container}>
                    <input
                        id="life_span"
                        className={style.input}
                        type= "number"
                        placeholder=" "
                        value= {input.life_span}
                        name="life_span"
                        onChange={handleChange}
                    />
                    <div className={style.cut}></div>
                    <label for="life_span" className={style.placeholder}>Life span</label>
                    {errors.life_span && (
                    <p className='error'>{errors.life_span}</p>
                    )}
                </div>


                <div className={style.divider}/>
                

                <div className={style.input_container}>
                    <input
                    type= "url"
                    className={style.input_img}
                    value= {input.img}
                    placeholder='Image url...'
                    // defaultValue={"https://media.traveler.es/photos/613760adcb06ad0f20e11980/master/w_1600%2Cc_limit/202931.jpg"}
                    name="img"
                    onChange={handleChange}
                    />
                </div>

                <div className={style.divider}/>

                <select className={style.input2} onChange={(e) => handleSelect(e)}>
                    {temperaments.map((tem) => (
                        <option value={tem.name}>{tem.name}</option>
                    ))}
                </select>


               


                <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>

                

                {
                    errors.name || errors.height_min || errors.height_max || errors.weight_min || errors.weight_max || errors.life_span 
                    ? <p className={style.texto}>All fields must be completed to create the dog</p> 
                    : <button type='Submit' className={style.submit}>Create dog</button>
                }

                {input.temperament.map(el =>
                                <div>
                                    <p>{el}</p>
                                    <button className={style.botonx} onClick={()=> handleDelete(el)}>X</button>
                                    </div>
                                    )}
                </div> 
                 

            </form>

            

           
            
        </div>
        </div>
        </div>
    )
}
