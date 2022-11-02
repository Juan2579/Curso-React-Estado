import { useState } from 'react'
import { UseState } from './components/UseState/UseState'
import { UseReducer } from './useReducer'

export const App = () => {
    return (
        <div className='bg-gray-700 flex flex-col justify-center items-center gap-10 py-5'>
            <UseState name="Use State" />
            <UseReducer name="Use Reducer" />
        </div>
    )
}

