import { useReducer, useEffect } from "react"

const SECURITY_CODE = "paradigma"

export const UseReducer = ({name}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const onConfirm = () => {
        dispatch({type: actionTypes.confirm})
    }
    const onError = () => {
        dispatch({type: actionTypes.error})
    }
    const onWrite = ({target: { value }}) => {
        dispatch({type: actionTypes.write, payload: value})
    }
    const onCheck = () => {
        dispatch({type: actionTypes.check})
    }
    const onDelete = () => {
        dispatch({type: actionTypes.delete})
    }
    const onReset = () => {
        dispatch({type: actionTypes.reset})
    }


    useEffect(() => {
        console.log("Empezando el efecto")

        if(state.loading){
            setTimeout(() => {
                console.log("Haciendo la validacion")

                if(state.value === SECURITY_CODE){
                    onConfirm()
                }else{
                    onError()
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
                onChange={onWrite}
                value={state.value}
                placeholder="Codigo de seguridad" 
                type="text" />
                <button 
                className="bg-white text-black rounded-xl p-2 disabled:opacity-50" 
                onClick={() => onCheck()} 
                disabled={state.value == "" || state.loading}>Comprobar</button>
            </div>
        )
    }else if(state.confirmed && !state.deleted){
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">
                <h2 className="text-xl font-bold">Eliminar {name}</h2>
                <p className="text-gray-300">¿Seguro que quieres eliminar UseState?</p>

                <div className="flex gap-3">
                    <button className="bg-white text-black rounded-xl p-2" onClick={onDelete}>Si, eliminar</button>
                    <button className="bg-white text-black rounded-xl p-2" onClick={onReset}>No, volver</button>
                </div>
            </div>
        )

    }else {
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">

                <h2 className="text-xl font-bold">{name} fue eliminado</h2>
                <button className="bg-white text-black rounded-xl p-2" onClick={onReset}>Recuperar {name}</button>

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

const actionTypes = {
    confirm: "CONFIRM",
    delete: "DELETE",
    error: "ERROR",
    check: "CHECK",
    reset: "RESET",
    write: "WRITE",
}

const reducerObject = (state, payload) => {
    return {
        [actionTypes.confirm]: {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        },
        [actionTypes.error]: {
            ...state,
            error: true,
            loading: false
        },
        [actionTypes.write]: {
            ...state,
            value: payload

        },
        [actionTypes.check]: {
            ...state,
            error: false,
            loading: true
        },
        [actionTypes.delete]: {
            ...state,
            deleted: true
        },
        [actionTypes.reset]: {
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