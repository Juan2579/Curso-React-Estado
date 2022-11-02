const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

// const reducer = (state, action) => {   
// }
const reducerIf = (state, action) => {   
    if(action.type === "ERROR") {
        return {
            ...state,
            error: true,
            loading: false
        }
    }else if(action.type === "CHECK"){
        return {
            ...state,
            loading: true,
            error: false
        }
    }else{
        return {
            ...initialState
        }
    }
}

const reducerSwitch = (state, action) => {
    switch (action.type) {
        case "ERROR":
            return {
                ...state,
                error: true,
                loading: false
            }
            break;
        case "CHECK":
            return {
                ...state,
                error: false,
                loading: true,
            }
            break;
    
        default:
            return {
                ...state
            }
            break;
    }
}

const reducerObject = (state) => {
    return {
        "ERROR": {
            ...state,
            error: true,
            loading: false
        },
        "CHECK": {
            ...state,
            error: false,
            loading: true
        },

    }
}

const reducer = (state, action) =>{
    if(reducerObject(state)[action.type]){
        return reducerObject(state)[action.type]
    }else{
        return state
    }
}


