import React,{useContext} from 'react'
import Layout from './components/Layout/Layout'
import {Routes,Route,Navigate} from 'react-router-dom'
import BurgerPage from './components/pages/BurgerPage'
import AuthPage from './components/pages/AuthPage'
import CheckoutPage from './components/pages/CheckoutPage'
import {Context} from './context/context'
import OrdersPage from './components/pages/OrdersPage'
import './App.css'
import Cart from './components/Cart/Cart'



export default function App() {
  const token = useContext(Context).items.token
  
 
  return (
    <>
    <Cart/>
    <Layout>
      <Routes>
        <Route path='/' element={<BurgerPage/>}/>
        {!token && <Route path='/auth' element={<AuthPage/>}/>}
        {token && <Route path='/orders' element={<OrdersPage/>}/>}
        {token && <Route path='checkout/*' element={<CheckoutPage/>}/>}
        <Route path='*' element={<Navigate to={'/'} replace/>}/>
      </Routes>
    </Layout>
    </>
  )
}
