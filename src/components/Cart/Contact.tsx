import React,{ useReducer,useEffect,useState,useContext} from 'react'
import classes from './Contact.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import {Context} from '../../context/context'
import {useAppSelector} from '../../store/store'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '../../store/store'
import {clearIngredients} from '../../store/burgerSlice'

export default function Contact() {
  const navigate = useNavigate()
const token = useContext(Context).items.token
const dch = useAppDispatch()
const burgerSt = useAppSelector(state=>state.burger)
 type ST={
  name?:{
   nameValue:string,
   nameTouched:boolean,
   nameValidate:boolean
  },
   email?:{
    nameValue:string,
    nameTouched:boolean,
    nameValidate:boolean
   },
   street?:{
    nameValue:string,
    nameTouched:boolean,
    nameValidate:boolean
   },
   country?:{
    nameValue:string,
    nameTouched:boolean,
    nameValidate:boolean
   },
   zip?:{
    nameValue:string,
    nameTouched:boolean,
    nameValidate:boolean
   }
 } 

const initialState:ST | any ={

}

type ACT={
    payload:any,
    type:string
}

const reducer =(state=initialState,action:ACT)=>{
switch(action.type){
    case('NAME'):return {...state,[action.payload.name]:{...state[action.payload.name],nameValue:action.payload.value}}
    case('TOUCH'):return {...state,[action.payload.name]:{...state[action.payload.name],nameTouched:action.payload.value}}
    case('CLASS'):return {...state,[action.payload.name]:{...state[action.payload.name],nameValidate:action.payload.value}}
    default:return state
}
}

const [validSt,dispatch] = useReducer(reducer,initialState)  
const changeHandler =(event:React.ChangeEvent<HTMLInputElement>)=>{
const {name,value} = event.target
dispatch({type:'NAME',payload:{name:name,value:value}})


if(validSt[name].nameTouched && !value){
  dispatch({type:'CLASS',payload:{name:name,value:true}})
  }else{
    dispatch({type:'CLASS',payload:{name:name,value:false}})
  }
}

const focusHandler=(event:React.FocusEvent<HTMLInputElement>)=>{
 const {name} = event.target
 dispatch({type:'TOUCH',payload:{name:name,value:true}})
}

const zipVal = validSt.zip?.nameValue?.length !== 5 && validSt.zip?.nameTouched
const buttonVal = !!validSt.name?.nameValue && !!validSt.email?.nameValue && !!validSt.street?.nameValue &&  !!validSt.country?.nameValue && !zipVal
console.log(buttonVal,!!validSt.name?.nameValue,!!validSt.name?.nameTouched)
const submitHandler = async (event:React.FormEvent)=>{
event.preventDefault()
  try{
    const response = await fetch('https://react-my-burger-92fbf-default-rtdb.firebaseio.com/orders.json?auth=' + token,{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({burgerstate:burgerSt,orderData:validSt})
    })
    const data = await response.json()
    console.log(data)
     dch(clearIngredients())
    navigate('/')
  }catch(e){
    console.log(e)
  }
}

  return (
    <Card>
        <h2>Enter your Contact Data</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <input className={`${classes.case} ${validSt.name?.nameValidate ? classes.err : ''}`} type='text' name='name' placeholder='Your name' onChange={changeHandler} onFocus={focusHandler}/>
        <input className={`${classes.case} ${validSt.street?.nameValidate ? classes.err : ''}`} type='text' name='street' placeholder='Street' onChange={changeHandler} onFocus={focusHandler}/>
        <input className={`${classes.case} ${zipVal ? classes.err : ''}`} type='text' name='zip' placeholder='ZIP' onChange={changeHandler} onFocus={focusHandler}/>
        <input className={`${classes.case} ${validSt.country?.nameValidate ? classes.err : ''}`} type='text' name='country' placeholder='Country' onChange={changeHandler} onFocus={focusHandler}/>
        <input className={`${classes.case} ${validSt.email?.nameValidate ? classes.err : ''}`} type='text' name='email' placeholder='Your E-Mail' onChange={changeHandler} onFocus={focusHandler} required/>
        <select className={classes.case} defaultValue='Fastest'>
            <option>Fastest</option>
            <option>Cheapest</option>
        </select>
        <Button classPr={classes.btn} dsb={!buttonVal} t={'submit'}>ORDER</Button>
      </form>
    </Card>
  )
}
