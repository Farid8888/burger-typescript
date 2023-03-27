import {createPortal} from 'react-dom'
import React from 'react'
import BackDrop from './BackDrop'
import Overlay from './Overlay'


type MODAL={
modalHandler:()=>void,
modal:boolean,
children:React.ReactNode
}




const Modal=(props:MODAL)=>{
    return(
    <>
    {createPortal(<BackDrop modalHandler={props.modalHandler} modal={props.modal}/>,document.getElementById('modal')!)}
    {createPortal(<Overlay>{props.children}</Overlay>,document.getElementById('modal')!)}
    </>
    )
}

export default Modal

