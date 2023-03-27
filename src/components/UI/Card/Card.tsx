import React from 'react'
import classes from './Card.module.css'


type CARD={
    children:React.ReactNode
}

export default function Card(props:CARD) {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  )
}
