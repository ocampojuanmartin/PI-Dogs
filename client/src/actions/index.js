// conecto el back con el front
import axios from 'axios'

export function getDogs () {
    return async function (dispatch) { // despacha la info
        const infoBack = await axios.get('http://localhost:3001/dogs') // me traigo el back
       
        return dispatch ({
            type: 'GET_DOGS',
            payload: infoBack.data
            
        })
        
    }
}

export function getDogName(name){
    return async function (dispatch){ // hacer con promises
        try  {
            var json = await axios.get ('http://localhost:3001/dogs?name=' + name)
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data  // lo que devuelve la ruta de la linea 20
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog (payload) {
    return async function (dispatch){
        const datai = await axios.post("http://localhost:3001/dogs", payload)
        console.log(datai)
        return datai
    }
}

export function getTemperaments () {
    return async function (dispatch) {
        const infoBackt= await axios.get('http://localhost:3001/temperament')
        console.log(infoBackt)

        return dispatch ({
            type: 'GET_TEMPERAMENTS',
            payload: infoBackt.data
            
        })
    }
}

export function filterTemperaments (payload) {
    return {
        type: 'FILTER_TEMPERAMENTS',
        payload
    }

}

export function filterCreated(payload) {
    return {
        type:'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_WEIGHT',
        payload
    }
}

export function getDetail (id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs/" + id)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    } 
}