import React,{useEffect} from 'react'
import classes from './BurgerImage.module.css'
import {useAppSelector} from '../../store/store'



const BurgerImage=()=> {
  const burger = useAppSelector(state=>state.burger.burgerState)

  useEffect(()=>{

  },[])
  let content
 
   content = burger.map(b=>{ 
  return Array.from(new Array(b.count),(_,i)=>i).map(item=>{
    return (
      <div key={Math.random()} className={classes.centered}>
         <div className={classes[b.name]}></div>
      </div>
    )
  })
   })


const y = burger.every(f=>f.count === 0)


  return (
    <div className={classes.burger}>
      <div className={classes.top}>
          <div className={classes.fst}></div>
          <div className={classes.secst}></div>
          <div className={classes.thrt}></div>
          <div className={classes.fort}></div>
          <div className={classes.ft}></div>
      </div>
      
      <div className={classes.noIng}>
       {y ? <div>Please start adding ingredients</div> : content}
      </div>
      <div className={classes.bottom}>

      </div>
    </div>
  )
}

export default  BurgerImage