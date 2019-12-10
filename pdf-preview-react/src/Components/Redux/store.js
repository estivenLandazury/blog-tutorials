import { createStore } from 'redux'
const stateInitial = {


    prueba: "Hola mundo",
    filer: null,
    nameFile: "",
    state1: "",
    state2: "",
    state3: "",
    state4: "",
    loader:true,
    json: [{
        "Item": 1,
        "FacturaNro": 21896,
        "FechaFactura": "2019/12/24",
        "Marca": "Gato",
        "NombreComercial": "San Andresito",
        "Referencia": 368741,
        "Tipo": "--",
        "Clase": "--",
        "Modelo": "--",
        "SubPartidaArancelaria": "--",
        "Valor": "--",
        "Unidad": "--",
        "Cantidad": "--",
        "CantidadDeclarar": "--",
        "PesoSistema": "--",
        "Preinspeccion": "--",
        "ConservarDatos": "eee",
        "Carpeta": "--",
        "Embarque": "--",
        "CertificadoOrigen": "--",
        "NroRegistro": "677"
    },
    {
        "Item": 2,
        "FacturaNro": 29894,
        "FechaFactura": "2019/09/03",
        "Marca": "China",
        "NombreComercial": "San Victorino",
        "Referencia": 458741,
        "Tipo": "--",
        "Clase": "--",
        "Modelo": "--",
        "SubPartidaArancelaria": "--",
        "Valor": "--",
        "Unidad": "--",
        "Cantidad": "--",
        "CantidadDeclarar": "--",
        "PesoSistema": "--",
        "Preinspeccion": "--",
        "ConservarDatos": "eee",
        "Carpeta": "--",
        "Embarque": "--",
        "CertificadoOrigen": "--",
        "NroRegistro": "444"
    }
    ]


    /** Search normal */

}


const reducerSearch = (state = stateInitial, action) => {



    if (action.type == "Change_File") {
        return {
            ...state,
            filer: action.File,
            nameFile: action.nameFile
        }

    } else if (action.type == "cambiarJson") {
        return {
            ...state,
            json: state.json.concat(action.input)
        }

    }

    else if (action.type == "EliminarFila") {
        return {
            ...state,
            json: state.json.slice(0, -1)
        }

    }

    else if (action.type == "Change_state1") {
        return {
            ...state,
            state1: action.state1,
            state4: "",

            loader: true


        }
    } else if (action.type == "Change_state2") {
        return {
            ...state,
            state2: action.state2,
            state1: "",
            state4: "",
            loader: true

        }

    }
    else if (action.type == "Change_state3") {
        return {
            ...state,
            state3: action.state3,
            state2: "",
            state1: "",
            state4: "",
            loader: true
        }

    }
    else if (action.type == "Change_state4") {
        return {
            ...state,
            state3: "",
            state2: "",
            state1: "",
            state4: action.state4,
            loader: false

        }

    }

    else if (action.type == "File_Table") {
        console.log("desde redux file table")
        return {
            ...state,
            json: action.input,
            loader:action.input1,
            state4: "",

        }

    }

    return state

}

export default createStore(reducerSearch)