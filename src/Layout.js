import { Layout, Menu } from "antd"
import React, { useEffect } from "react"
import { useMatch } from "react-router"
import { Link } from "react-router-dom"
import logo from "./asset/Images/logoiBenefit.png"
import "./App.css"

const { Sider, Header, Content } = Layout
export default function MyLayout({ children }) {
  const routeMatch = useMatch("/question2")
  useEffect(() => {
    console.log("routeMatch", routeMatch)
  }, [])
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ height: "100vh" }} theme="light">
        <div className="layout-logo">
          <img width={"100%"} height={"100%"} src={logo} alt="logo" />
        </div>
        <Menu
          defaultSelectedKeys={["/question1"]}
          selectedKeys={routeMatch?.pathname}
          mode="inline"
        >
          <Menu.Item key={"/question1"}>
            <Link to="/question1">Question 1</Link>
          </Menu.Item>
          <Menu.Item key={"/question2"}>
            <Link to="/question2">Question 2</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <div className={"layout-header"}></div>
        </Header>
        <Content>
          <div
            style={{ margin: 10, padding: "10px", backgroundColor: "white" }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
