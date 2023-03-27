import React,{useContext} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import {useAppSelector} from '../../store/store'
import Button from '../UI/Button/Button'
import {Context} from '../../context/context'
import classes from './Cart.module.css'
import {useNavigate} from 'react-router-dom'


export default function Cart() {
    const navigate = useNavigate()
    const burgerSt = useAppSelector(state=>state.burger.burgerState)
    const totalPrice=useAppSelector(state=>state.burger.currrentPrice).toFixed(2)
    const modal = useContext(Context).modal
    const modalHandler = useContext(Context).modalHandler
    const contHandler=()=>{
        modalHandler()
      navigate('/checkout')
    }
  return (
    <>
    <Modal modalHandler={modalHandler} modal={modal}>
    <div className={classes.modal} >
  <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        {burgerSt.map(item=>{
            return (
                <ul key={item.name}>
                    <li>{item.name}:{item.count}</li>
                </ul>
            )
        })}
        <p>Continue to Checkout?</p>
        <p>Total price:{totalPrice}</p>
        <div className={classes.flex}>
        <div className={classes.btns}>
         <Button classPr={classes.red} modalHandler={modalHandler} t={'button'}>CANCEL</Button>
         <Button classPr={classes.green} modalHandler={contHandler} t={'button'}>CONTINUE</Button>
        </div>
        </div>
        </div>
  </Modal>
  </>
  )
}
