import React,{useContext} from 'react'
import img from '../../assets/image/burger-logo.png'
import {NavLink} from 'react-router-dom'
import classes from './Navigation.module.css'
import {Context} from '../../context/context'
import {clearIngredients} from '../../store/burgerSlice'
import {useAppDispatch} from '../../store/store'

export default function Navigation() {
  const dispatch = useAppDispatch()
  const token = useContext(Context).items.token
  console.log(token)
  const logout = useContext(Context).logout
  const logoutHandler =()=>{
    logout()
    dispatch(clearIngredients())
  }
  return (
   <div className={classes.nav}>
    <div className={classes.image}>
    <img src={img} alt=''/>
    </div>
       <ul>
        <li><NavLink to={'/'} className={({isActive})=>isActive ? classes.active : ''}>Burger Builder</NavLink></li>
        {token && <li><NavLink to={'orders'} className={({isActive})=>isActive ? classes.active : ''}>Orders</NavLink></li>}
        {!token ? <li><NavLink to={'auth'} className={({isActive})=>isActive ? classes.active : ''}>Authenticate</NavLink></li> :
        <li><NavLink to='/' onClick={logoutHandler}>Logout</NavLink></li>}
       </ul>
   </div>
  )
}
