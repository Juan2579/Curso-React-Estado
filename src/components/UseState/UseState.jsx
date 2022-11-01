import { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma"

export const UseState = ({name}) => {
    const [state, setState] = useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        })
    }
    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        })
    }
    const onWrite = (newValue) => {
        setState({...state, value: newValue})
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
                onChange={(event) => onWrite(event.target.value)}
                value={state.value}
                placeholder="Codigo de seguridad" 
                type="text" />
                <button className="bg-white text-black rounded-xl p-2 disabled:opacity-50" onClick={() => setState({...state, loading: true, error: false})} disabled={state.value == "" || state.loading}>Comprobar</button>
            </div>
        )
    }else if(state.confirmed && !state.deleted){
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">
                <h2 className="text-xl font-bold">Eliminar {name}</h2>
                <p className="text-gray-300">¿Seguro que quieres eliminar UseState?</p>

                <div className="flex gap-3">
                    <button className="bg-white text-black rounded-xl p-2" onClick={() => setState({...state, deleted: true})}>Si, eliminar</button>
                    <button className="bg-white text-black rounded-xl p-2" onClick={() => setState({...state, value: "", confirmed: false})}>No, volver</button>
                </div>
            </div>
        )

    }else {
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">

                <h2 className="text-xl font-bold">{name} fue eliminado</h2>
                <button className="bg-white text-black rounded-xl p-2" onClick={() => setState({value: "", deleted: false, confirmed: false,})}>Recuperar {name}</button>

            </div>
        )
    }
}
