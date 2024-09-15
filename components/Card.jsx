'use client'
import { useState } from "react"
export default function Card(){

    const[changed, setChanged] = useState(false)

    return(
        <div className="w-20 h-20 relative flex justify-center items-center m-5">
            <div className={`absolute bg-red-900 h-full rounded-md duration-200 ${changed ? 'w-0': 'w-full z-20'}`} onClick={() => setChanged(true)}></div>
            <div className={`absolute bg-red-600 h-full rounded-md duration-200 ${changed ? 'w-full z-20': 'w-0'}`} onClick={() => setChanged(false)}></div>
        </div>
    )
}