import React,{useEffect,useContext,useState} from 'react'
import Orders from '../Orders/Orders'
import { Context } from '../../context/context'


type Burger ={
    price:number,
    count:number,
    name:string
}

type State={
burgerState:Burger[],
currrentPrice:number
}

export default function OrdersPage() {
const token = useContext(Context).items.token
const [arr,setArr] =useState<State[]>([])
const [loading,setLoading] = useState(false)
console.log(token,arr)

useEffect(()=>{
    setLoading(true)
    const ingr = async()=>{
        try{
         const response = await fetch('https://react-my-burger-92fbf-default-rtdb.firebaseio.com/orders/.json?auth=' + token)
         const data = await response.json()
         let arr =[]
         for(let key in data){
            arr.push(data[key].burgerstate)
         }
         setArr(arr)
         setLoading(false)
        }catch(e){
        
        }
    }
    ingr()
},[token])
  return (
    <div>
      <Orders burSt={arr} loading={loading}/>
    </div>
  )
}
