import { useReducer, useEffect } from "react"

const SECURITY_CODE = "paradigma"

export const UseReducer = ({name}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        console.log("Empezando el efecto")

        if(state.loading){
            setTimeout(() => {
                console.log("Haciendo la validacion")

                if(state.value === SECURITY_CODE){
                    dispatch({ type: "CONFIRM" })
                }else{
                    dispatch({ type: "ERROR" })
                }
    
                console.log("Terminando la validacion")
            }, 3000)
        }

        console.log("Terminando el efecto")
    }, [state.loading])
    
    if(!state.deleted && !state.confirmed){
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">
                <h2 className="text-xl font-bold">Eliminar {name}</h2>
                <p className="text-gray-300">Por favor, escribe el codigo de seguridad</p>
    
                {state.error && (
                    <p>Error: El codigo es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input className="text-black" 
                disabled={state.loading}
                onChange={(event) => { dispatch({type: "WRITE", payload: event.target.value }) 
                    // onWrite(event.target.value)
                }}
                value={state.value}
                placeholder="Codigo de seguridad" 
                type="text" />
                <button 
                className="bg-white text-black rounded-xl p-2 disabled:opacity-50" 
                onClick={() => dispatch({ type: "CHECK" })} 
                disabled={state.value == "" || state.loading}>Comprobar</button>
            </div>
        )
    }else if(state.confirmed && !state.deleted){
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">
                <h2 className="text-xl font-bold">Eliminar {name}</h2>
                <p className="text-gray-300">¿Seguro que quieres eliminar UseState?</p>

                <div className="flex gap-3">
                    <button className="bg-white text-black rounded-xl p-2" onClick={() => dispatch({ type: "DELETE" })}>Si, eliminar</button>
                    <button className="bg-white text-black rounded-xl p-2" onClick={() => dispatch({ type: "RESET" })}>No, volver</button>
                </div>
            </div>
        )

    }else {
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">

                <h2 className="text-xl font-bold">{name} fue eliminado</h2>
                <button className="bg-white text-black rounded-xl p-2" onClick={() => dispatch({ type: "RESET" })}>Recuperar {name}</button>

            </div>
        )
    }
}


const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}


const reducerObject = (state, payload) => {
    return {
        "CONFIRM": {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        },
        "ERROR": {
            ...state,
            error: true,
            loading: false
        },
        "WRITE": {
            ...state,
            value: payload

        },
        "CHECK": {
            ...state,
            error: false,
            loading: true
        },
        "DELETE": {
            ...state,
            deleted: true
        },
        "RESET": {
            ...state,
            value: "", 
            deleted: false, 
            confirmed: false,
        },

    }
}

const reducer = (state, action) =>{
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    }else{
        return state
    }
}