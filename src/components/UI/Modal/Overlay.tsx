import React,{useContext} from 'react'
import classes from './Overlay.module.css'
import {Context} from '../../../context/context'

type OVERLAY={
    children?:React.ReactNode
}

const  Overlay=(props:OVERLAY)=> {
    const modal = useContext(Context).modal
  return (
    <div className={`${classes.overlay} ${modal ? classes.open : classes.diss}`}>
      {props.children}
    </div>
  )
}


export default Overlay