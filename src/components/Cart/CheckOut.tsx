import React from 'react'
import BurgerImage from '../Burger/BurgerImage'
import Button from '../UI/Button/Button'
import classes from './CheckOut.module.css'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {Routes,Route} from 'react-router-dom'
import ContactPage from '../pages/ContactPage'


export default function CheckOut() {
    const location =useLocation().pathname
    console.log(location)
    const navigate = useNavigate()
    const backHandler = ()=>{
     navigate(-1)
    }
    const contHandler =()=>{
     navigate(`${location}/contact-data`)
    }
  return (
    <div className={classes.main}>
      <h1>We hope it tastes well!!!</h1>
      <BurgerImage/>
      <div className={classes.btn}>
        <Button classPr={classes.red} modalHandler={backHandler} t={'button'}>CANCEL</Button>
        <Button classPr={classes.green} modalHandler={contHandler} t={'button'}>CONTINUE</Button>
      </div>
      <Routes>
        <Route path={`contact-data`} element={<ContactPage/>}/>
      </Routes>
    </div>
  )
}
