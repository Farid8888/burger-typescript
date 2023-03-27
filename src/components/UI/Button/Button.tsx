import React from 'react'
import classes from './Button.module.css'

type BUTTON={
    children:React.ReactNode,
    classPr:string,
    modalHandler?:()=>void,
    dsb?:boolean,
    t:any
}


const Button:React.FC<BUTTON>=(props)=> {
  return (
      <button className={`${classes.btn} ${props.classPr}`} type={props.t} onClick={props.modalHandler} disabled={props.dsb} >{props.children}</button>
  )
}

export default Button
