import {createSlice,PayloadAction} from '@reduxjs/toolkit'




const initialState ={
   burgerState: [
        {
            name:'Salad',
            count:0,
            price:0.5
        },
            {
                name:'Bacon',
                count:0,
                price:0.7
            },
                {
                    name:'Cheese',
                    count:0,
                    price:0.5
                },
                    {
                        name:'Meat',
                        count:0,
                        price:1.3
                    },
    ],
    currrentPrice:4.00
}

type OBJ={
    ind:any,
    price:any
}

const burgerSlice = createSlice({
name:'burger',
initialState,
reducers:{
    addIngredients:(state,action:PayloadAction<OBJ>)=>{
      const index = state.burgerState.findIndex((_,i)=>i === action.payload.ind)
      const newObjInd = state.burgerState[index]
      const newState  = [...state.burgerState]
      const newPrice = state.currrentPrice + action.payload.price
      const newCount = newObjInd.count + 1
      const newObj = {...newObjInd,count:newCount}
      newState[index]= newObj
      state.burgerState = newState
      state.currrentPrice = newPrice
    },
    removeIngredients:(state,action:PayloadAction<OBJ>)=>{
        const index = state.burgerState.findIndex((_,i)=>i === action.payload.ind)
        const newObjInd = state.burgerState[index]
        const newState  = [...state.burgerState]
        const newPrice = state.currrentPrice - action.payload.price
        const newCount = newObjInd.count - 1
        const newObj = {...newObjInd,count:newCount}
        newState[index]= newObj
        state.burgerState = newState
        state.currrentPrice = newPrice
      },
      clearIngredients:(state)=>{
        state.burgerState =initialState.burgerState
      }
}
})

export const {addIngredients,removeIngredients,clearIngredients} = burgerSlice.actions
export  default burgerSlice.reducer
