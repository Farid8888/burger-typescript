import React from 'react'
import Spinner from '../UI/Spinner/Spinner'
import classes from './Orders.module.css'


type Burger ={
    price:number,
    count:number,
    name:string
}

type State={
burgerState:Burger[],
currrentPrice:number
}

type BURGERSTATE={
burSt:State[],
loading:boolean
}

const Orders:React.FC<BURGERSTATE> = (props)=> {
    let content = props.burSt.map(burgerSt=>{
        return (
        <div className={classes.main}>
            <div className={classes.order}>
                <h3>ingredients:</h3>
                {burgerSt.burgerState.map(burger=>{
                    return (
                    <div className={classes.item}>
                        {burger.name} {burger.count}
                    </div>
                    )
                })}
            </div>
            <p>
               Price:<span className={classes.sp}>USD {burgerSt.currrentPrice}</span>
            </p>
        </div>
        )
    })
    if(props.loading){
     return (
        <div style={{textAlign:'center'}}>
            <Spinner/>
        </div>
     )
    }
  return (
    <div className={classes.orders}>
        {content}
    </div>
  )
}

export default Orders
