import { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma"

export const UseState = ({name}) => {
    const [state, setState] = useState({
        value: "",
        error:false,
        loading: false,
        active: false,
        confirmed: false,
    })

    console.log(state.value)

    useEffect(() => {
        console.log("Empezando el efecto")

        if(state.loading){
            setTimeout(() => {
                console.log("Haciendo la validacion")

                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                    })
                    // setLoading(false)
                }else{
                    setState({
                        ...state,
                        error: true,
                        loading: false,
                    })
                }
    
                console.log("Terminando la validacion")
            }, 3000)
        }

        console.log("Terminando el efecto")
    }, [state.loading])
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
            onChange={(event) => setState({...state, value: event.target.value})}
            value={state.value}
            placeholder="Codigo de seguridad" 
            type="text" />
            <button className="bg-white text-black rounded-xl p-2" onClick={() => setState({...state, loading: true, error: false})}>Comprobar</button>
        </div>
    )
}
