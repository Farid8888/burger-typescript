import React,{useContext, useRef,useState} from 'react'
import classes from './Auth.module.css'
import {Context} from '../../context/context'
import {useNavigate} from 'react-router-dom'
import Spinner from '../UI/Spinner/Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Auth() {
const login = useContext(Context).login
const navigate = useNavigate()
const emailRef = useRef<HTMLInputElement>(null)
const passwordRef  =useRef<HTMLInputElement>(null)
const [element,setElement] = useState<any>(true)
const [psw,setPassword] = useState<string>('')
const [mfoc,setMfoc] = useState<boolean>(false)
const [pfoc,setPfoc] = useState<boolean>(false)
const [touched,setTouched] = useState<boolean>(false)
const [sw,setSw] = useState(false)
const [loading,setLoading] = useState(false)

const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
setElement(event.target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
}

const onChangePassword =(event:React.ChangeEvent<HTMLInputElement>)=>{
setPassword(event.target.value)
setTouched(true)
}

const focusMail = ()=>{
  setMfoc(true)
}

const passwordFocus = ()=>{
  setPfoc(true)
}
const switchHandler =()=>{
setSw(prevst=>!prevst)
}

const mailClass = [classes.inp, !element && mfoc ? classes.err : '']
const passwordClass = [classes.inp, psw.length < 6 && pfoc && touched ? classes.err : '']
let URL:string
if(sw){
  URL='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJAZxBVTLJxarmbEUCvzVrqPzh99ONQlQ'
}else{
  URL='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJAZxBVTLJxarmbEUCvzVrqPzh99ONQlQ'
}
const submitHandler =(e:React.FormEvent)=>{
e.preventDefault()
setLoading(true)
const email = emailRef.current!.value
const password = passwordRef.current!.value
const obj={
  email:email,
  password:password,
  returnSecureToken:true
}
fetch(URL,{
  method:'POST',
  headers:{"Content-Type":'application/json'},
  body:JSON.stringify(obj)
}).then(response=>{
  let errmessage:string
if(!response.ok){
   response.json().then(data=>{    
    console.log(data.error.message) 
    const err = data.error.message
    if(err === "EMAIL_NOT_FOUND"){
     errmessage = 'EMAIL NOT FOUND'
    }else if(err === 'EMAIL_EXISTS'){
      errmessage = 'EMAIL EXISTS'
    }else if(err === 'INVALID_PASSWORD'){
      errmessage = 'INVALID PASSWORD'
    }else if(err === 'INVALID_EMAIL'){
      errmessage = 'INVALID EMAIL'
    }
    toast.error(errmessage)
    setLoading(false)
   })
  
}else{
  response.json().then(data=>{
    login(data)
    navigate('/')
    setLoading(false)
  })
}
})
}
if(loading){
  return (
  <div style={{textAlign:'center',marginTop:'10rem'}}><Spinner/></div>
  )
}
  return (
    <div className={classes.auth}> <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
      <form onSubmit={submitHandler}>
        <input id='email' placeholder='Mail Address' required className={mailClass.join(' ')} ref={emailRef} onChange={onChangeHandler} onFocus={focusMail}/>
        <input id='password' placeholder='Password' required type='password' className={passwordClass.join(' ')} ref={passwordRef} onChange={onChangePassword} onFocus={passwordFocus}/>
        <div className={classes.btns}>
            <button className={classes.green} type='submit'>SUBMIT</button>
        </div>
        <div className={classes.btns}> 
        <button className={classes.red} type='button' onClick={switchHandler}>SWITCH TO {!sw ? 'SIGNUP' : 'SIGNIN'}</button>
        </div>
      </form>
    </div>
  )
}
