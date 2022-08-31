import React from 'react'
import { useState,useEffect } from 'react'
const Practice = () => {
    const [mode, setMode] = useState("light")

    const handleClick=()=>{
        if(mode==="light")
     { setMode()
        document.body.style.backgroundColor = " black";}
      else{
      document.body.style.backgroundColor = " white";

      }           
    }
    const [count, setCount] = useState(0)
    useEffect(() => {
    setTimeout(() => {
      setCount((count)=>count+1)
    }, 1000);
    })
  return (
    <>
    <button onClick={handleClick} >This is button</button>
    <h1 style={{color:"white"}}>render by {count}</h1>
    </>
  )

 
  
}

export default Practice