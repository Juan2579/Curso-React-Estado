import { useEffect } from "react";
import { useState } from "react";

const SECURITY_CODE = "paradigma"

export const UseState = ({name}) => {
    const [value, setValue] = useState("")
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    console.log(value)

    useEffect(() => {
        console.log("Empezando el efecto")

        if(loading){
            setError(false)
            setTimeout(() => {
                console.log("Haciendo la validacion")

                if(value === SECURITY_CODE){
                    
                    setLoading(false)
                }else{
                    setError(true)
                    setLoading(false)
                }
    
                console.log("Terminando la validacion")
            }, 3000)
        }

        console.log("Terminando el efecto")
    }, [loading])
    return (
        <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">
            <h2 className="text-xl font-bold">Eliminar {name}</h2>
            <p className="text-gray-300">Por favor, escribe el codigo de seguridad</p>

            {error && (
                <p>Error: El codigo es incorrecto</p>
            )}
            {loading && (
                <p>Cargando...</p>
            )}

            <input className="text-black" 
            onChange={(event) => setValue(event.target.value)}
            value={value}
            placeholder="Codigo de seguridad" 
            type="text" />
            <button className="bg-white text-black rounded-xl p-2" onClick={() => setLoading(true)}>Comprobar</button>
        </div>
    )
}
