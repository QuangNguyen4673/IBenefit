import { Button, Col, Form, Image, Input, notification, Row, Space } from "antd"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import logo from "../../asset/Images/user.png"
import { formatCash, unFormatCash } from "../../utils/format-cash"

const initUrl = "http://a.vipn.net/api/device/init"
const logoutUrl = "http://a.vipn.net/api/auth/logout"
export default function Question2c() {
  const location = useLocation()
  const buttonRef = useRef()
  const [phone, setPhone] = useState("")
  const [form] = Form.useForm()
  const user = location.state?.user
  const navigate = useNavigate()
  useEffect(() => {
    if (!location.state) {
      navigate("/question2")
    }
    form.setFieldsValue(user)
  }, [])

  const _getDeviceCode = async () => {
    const cacheStorage = await caches.open("device_info")
    const cachedResponse = await cacheStorage.match(initUrl)
    if (!cachedResponse || !cachedResponse.ok) {
      return false
    }
    const cachedResponseData = await cachedResponse.json()
    return cachedResponseData.device_code
  }
  const _onLogOut = () => {
    if (buttonRef.current) {
      clearTimeout(buttonRef.current)
    }
    buttonRef.current = setTimeout(() => {
      _logOut()
    }, 250)
  }
  const _onUpdate = () => {
    const formData = { ...form.getFieldsValue(), uncen_phone_number: phone }
    console.log(formData)
  }
  const _logOut = async () => {
    try {
      const res = await axios({
        url: logoutUrl,
        "Content-type": "application/json",
        method: "GET",
        headers: { "DEVICE-CODE": await _getDeviceCode() },
      })
      if (res.status === 408) {
        notification.error({
          message: res.data.msg || "Đăng xuất thất bại",
        })
      }
      if (res.status === 200) {
        if (res.data.success) {
          navigate(-1)
        } else
          notification.error({
            message: res.data.msg || "Đăng xuất thất bại",
          })
      } else
        notification.error({
          message: res.data.msg || "Đăng xuất thất bại",
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Question 2c</h2>
      <Row justify="center">
        <Col span={8}>
          <h3>Avatar</h3>
          <Image width={200} height={200} src={user?.avatar} fallback={logo} />
        </Col>
        <Col span={8}>
          <h3>Xin chào {user?.email}</h3>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên " }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              name="uncen_phone_number"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại " },
              ]}
              getValueProps={(value) => {
                setPhone(unFormatCash(value))
              }}
            >
              <Input
                allowClear
                value={formatCash(phone) || ""}
                placeholder="Nhập số điện thoại "
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
          <Space>
            <Button onClick={_onUpdate}>Chỉnh sửa</Button>
            <Button type="primary" onClick={_onLogOut}>
              Đăng xuất
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}
