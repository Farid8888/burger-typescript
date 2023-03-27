import React from 'react'
import {useAppSelector} from '../../store/store'
import Footer from '../Burger/Footer'
import BurgerImage from './BurgerImage'
import classes from './Burger.module.css'

export default function Burger() {
    //  const burger = useAppSelector(state=>state.burger.burgerState)
    //  console.log(burger.map(b=>b.count))
  return (
    <div className={classes.burger}>
       <BurgerImage/>
      <Footer/>
    </div>
  )
}
