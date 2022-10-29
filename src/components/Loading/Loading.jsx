import { Component } from "react";

export class Loading extends Component  {

    componentWillUnmount(){
        console.log("Component will unmount")
    }

    render() {
        return (
            <p>Cargando...</p>
        )
    }


}