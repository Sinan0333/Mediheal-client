import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux"
import store,{persistor} from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { SocketProvider } from './store/context/socketContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <SocketProvider>
          <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <App />
          </PersistGate>
        </SocketProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
)
