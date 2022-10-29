import { useState } from 'react'
import { ClassState } from './components/ClassState/ClassState'
import { UseState } from './components/UseState/UseState'

export const App = () => {
    return (
        <div className='bg-gray-700 flex flex-col justify-center items-center gap-10 py-5'>
            <UseState name="Use State" />
            <ClassState name="Class State" />
        </div>
    )
}

