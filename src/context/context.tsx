import {createContext,useState,useEffect} from 'react'
import {clearIngredients} from '../store/burgerSlice'
import {useAppDispatch} from '../store/store'


type Items={
    idToken:string,
    localId:string,
    expiresIn:string
}

export const Context = createContext({
    items:{
        token:'',
        userId:'',
        expiresIn:'',
    },
login:(obj:Items)=>{},
logout:()=>{},
modalHandler:()=>{},
modal:false
})


type CH ={
    children:React.ReactNode
}

const AuthContext:React.FC<CH>=(props)=>{
    const dispatch = useAppDispatch()
 const [modal,setModal] = useState(false)   
const [items,setItems]=useState({
         token:'',
        userId:'',
        expiresIn:''
})

const modalHandler =()=>{
    setModal(prevst=>!prevst)
}

const calculating = (time:string)=>{
    const fetchedDate = new Date().getTime() + parseInt(time)*1000
    const currDate = new Date().getTime()
    const newDate = fetchedDate - currDate
    console.log(newDate)
    return newDate
    }
let timer:any

const login =(obj:Items)=>{
    const calculate = calculating(obj.expiresIn)
    console.log(calculate)
    localStorage.setItem('items',JSON.stringify(obj))
    timer = setTimeout(()=>{
     logout()
    },calculate)
setItems({
    token:obj.idToken,
    userId:obj.localId,
    expiresIn:obj.expiresIn
})
}

const logout = ()=>{
    clearTimeout(timer)
    dispatch(clearIngredients())
    localStorage.removeItem('items')
    setItems(
        {
            token:'',
           userId:'',
           expiresIn:''
   }
    )
}

useEffect(()=>{
const items= localStorage.getItem('items')
if(items){
    const parsed:Items = JSON.parse(items)
    setItems({
        token:parsed.idToken,
        userId:parsed.localId,
        expiresIn:parsed.expiresIn,
    })
}
},[])

    return(
        <Context.Provider value={{items:items,login:login,logout:logout,modal:modal,modalHandler:modalHandler}}>
            {props.children}
        </Context.Provider>
    )
}

export default AuthContext