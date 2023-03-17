import React from "react"
import  ReactDOM  from "react-dom"
import App from "./App"
// import Prac from "./prac"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import "antd/dist/antd.css"
// import { UserContext } from './userContext'
import store from "./app/store"
// import FunctionalComponenet from "./functionalComponenet"
const root = ReactDOM.render(<Router>
              <Provider store={store}>
              <App />
              </Provider>
              </Router>
             ,
         document.getElementById("root"))
