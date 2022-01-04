const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail: []
}


function rootReducer (state = initialState, action) {
    switch (action.type){
        case 'GET_DOGS':
            return{
                ...state, // me copio lo que ya tiene
                dogs: action.payload,
                allDogs:action.payload
                
            }

        case 'POST_DOG':
            return {
                ...state
            }
        
        case 'GET_DOG_NAME':
            return{
                ...state,
                dogs: action.payload
            }

        case 'GET_TEMPERAMENTS': 
            return{
                ...state,
                temperaments: action.payload

            } 

        case 'FILTER_TEMPERAMENTS': 

            let allDogs= state.allDogs
            const temperamentos= action.payload === 'All'?allDogs:allDogs.filter((el=>el.temperament&&el.temperament.split(', ').find((e)=>e===action.payload))) 
            return{                          //devolve todos los perros si el payload es all, sino filtra el perro por el payload que llega
                ...state,
                dogs: temperamentos

            } 

        case 'FILTER_CREATED':
            let data = action.payload === 'Created' ? state.allDogs.filter(el=>el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : data

            }

        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }


        case 'ORDER_NAME':
            const arr = action.payload === 'asc' ?
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0
            })
        return {
            ...state,
            dogs: arr
        }

        case 'ORDER_WEIGHT':
            const ord = action.payload === "men" ?
            [...state.dogs].sort(function (a, b) {
                if (a.weight_min > b.weight_min) {
                    return 1
                }
                if (b.weight_min > a.weight_min) {
                    return -1
                }
                return 0
            }) :
            [...state.dogs].sort(function (a, b) {
                if (a.weight_min > b.weight_min) {
                    return -1
                }
                if (b.weight_min > a.weight_min) {
                    return 1
                }
                return 0
            })
        return {
            ...state,
            dogs: ord
        }

        default:
            return state;

        
    }


}

export default rootReducer;