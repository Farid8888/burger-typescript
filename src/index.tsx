import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store';
import AuthContext from './context/context';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
  <Provider store={store}>
  <AuthContext>
   <App />
   </AuthContext>
   </Provider>
  </BrowserRouter>
  
);

