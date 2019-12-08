import { createStore } from 'redux'
const stateInitial = {


    prueba: "Hola mundo",
    
    /** Search normal */

}


const reducerSearch = (state = stateInitial, action) => {


    if (action.type == "MostrarImagen") {
        return {
            ...state,
            image: action.input
        }
    } else if (action.type == "cambiarLoader") {
        return {
            ...state,
            loader: action.input
        }


    }

    return state

}

export default createStore(reducerSearch)