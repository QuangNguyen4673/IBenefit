import { Layout, Menu } from "antd"
import React, { Children, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import logo from "./asset/Images/logoiBenefit.png"
import "./App.css"
import Question1 from "./pages/question1"
import Question2 from "./pages/question2"
import MyLayout from "./Layout"
import Question2c from "./pages/question2c"

function App({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const _toggle = () => setCollapsed(!collapsed)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MyLayout>
              <Question1 />
            </MyLayout>
          }
        />
        <Route
          path="/question1"
          element={
            <MyLayout>
              <Question1 />
            </MyLayout>
          }
        />
        <Route
          path="/question2"
          element={
            <MyLayout>
              <Question2 />
            </MyLayout>
          }
        />
        <Route
          path="/question2c"
          element={
            <MyLayout>
              <Question2c />
            </MyLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
