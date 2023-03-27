import React,{useContext} from 'react'
import classes from './Footer.module.css'
import {useAppDispatch,useAppSelector} from '../../store/store'
import {addIngredients,removeIngredients} from '../../store/burgerSlice'
import {useNavigate} from 'react-router-dom'
import {Context} from '../../context/context'
import Modal from '../UI/Modal/Modal'


export default function Footer() {
  const token = useContext(Context).items.token
  const modalHandler = useContext(Context).modalHandler
  const navigate = useNavigate()
  const navHandler = ()=>{
    navigate('/auth')
  }
    const burgerState =useAppSelector(state=>state.burger.burgerState)
    const currentPrice = useAppSelector(state=>state.burger.currrentPrice).toFixed(2)
    const dispatch = useAppDispatch()
    const addItems = (i:number,pr:any)=>{
      const obj = {
        ind:i,
        price:pr
      }
      dispatch(addIngredients(obj))
    }
    const remIng=(i:number,pr:any)=>{
      const obj = {
        ind:i,
        price:pr
      }
      dispatch(removeIngredients(obj))
    }
    const content =burgerState.map((b,i)=>{
        return(
            <div className={classes.main} key={b.name}>
            <div className={classes.ingredient}>
            <h3>{b.name}</h3>
              <div className={classes.btns}>
                  <button type='button' disabled={b.count<1} onClick={()=>remIng(i,b.price)}>Less</button>
                  <button type='button' onClick={()=>addItems(i,b.price)}>More</button>
              </div>
            </div>
            
            </div>
        )
    })
    const signButton = burgerState.every(b=>b.count <1 )
  return (
    <div className={classes.footer}>
          <h3>Current price:{currentPrice}</h3>
        {content}
        {!token &&<button className={classes.btn} disabled={signButton} type='button' onClick={navHandler}>SIGN UP TO ORDER</button>}
        {token && <button className={classes.btn} disabled={signButton} type='button' onClick={modalHandler} >Order Now</button>}
    </div>
  )
}
