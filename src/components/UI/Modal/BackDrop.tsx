import React from 'react'
import Overlay from './Overlay'
import classes from './BackDrop.module.css'



type BACK={
    modalHandler:()=>void,
    modal:boolean
}

const  BackDrop:React.FC<BACK>=(props)=> {
    console.log(props.modal)
  return (
    <div onClick={props.modalHandler} className={`${props.modal ? classes.back : ''}`}>
      <Overlay/>
    </div>
  )
}

export default BackDrop
