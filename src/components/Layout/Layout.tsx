import React from 'react'
import Navigation from './Navigation'


type AUXPROPS ={
    children:React.ReactNode
}
export const  Layout=(props:AUXPROPS)=> {
  return (
    <>
      <Navigation/>
      {props.children}
    </>
  )
}

export default Layout
