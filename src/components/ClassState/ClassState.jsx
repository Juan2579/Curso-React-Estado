import { Component } from "react";
import { Loading } from "../Loading/Loading";

export class ClassState extends Component  {
    constructor(props){
        super(props);

        this.state = {
            error: true,
            loading: false,
        }
    }

    // UNSAFE_componentWillMount(){
    //     console.log("Component Will Mount")
    // }

    // componentDidMount(){
    //     console.log("Component Did Mount")
    // }

    componentDidUpdate(){
        console.log("Actualizacion")

        if(this.state.loading){
            setTimeout(() => {
                console.log("Haciendo la validacion")
    
                this.setState({loading: false})
    
                console.log("Terminando la validacion")
            }, 3000)
        }
    }

    render() {
        return (
            <div className="bg-gray-600 text-white flex flex-col items-center justify-center gap-5 p-10">
                <h2 className="text-xl font-bold">Eliminar {this.props.name}</h2>
                <p className="text-gray-300">Por favor, escribe el codigo de seguridad</p>

                {this.state.error && (
                <p>Error: El codigo es incorrecto</p>
                )}
                {this.state.loading && (
                <Loading />
                )}

                <input placeholder="Codigo de seguridad" type="text" />
                <button className="bg-white text-black rounded-xl p-2" onClick={() => this.setState({loading: true}) }>Comprobar</button>
            </div>
        )
    }


}
