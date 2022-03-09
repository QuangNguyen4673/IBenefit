import { Button, Col, Form, Input, notification, Row } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

const initUrl = "http://a.vipn.net/api/device/init"
const loginUrl = "http://a.vipn.net/api/auth/login"
export default function Question2() {
  const [device, setDevice] = useState({})
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const buttonRef = useRef()
  const _initDeviceInfo = async () => {
    try {
      const res = await axios({
        url: initUrl,
        "Content-type": "application/json",
        method: "POST",
        data: { device_type: 2 },
      })
      if (res.status === 200) {
        if (res.data.success) {
          const data = new Response(JSON.stringify(res.data.data))
          if ("caches" in window) {
            caches.open("device_info").then((cache) => {
              cache.put(initUrl, data)
            })
          }
          setDevice(res.data.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const _handleCachedData = async () => {
      const cacheStorage = await caches.open("device_info")
      const cachedResponse = await cacheStorage.match(initUrl)
      if (!cachedResponse || !cachedResponse.ok) {
        return false
      }
      const cachedResponseData = await cachedResponse.json()
      const updatedTime = await cachedResponseData?.updated_at
      const isExp =
        new Date().getTime() - Date.parse(updatedTime) > 1000 * 60 * 5
      //Nếu thời gian hiện tại lớn hơn update_at 5 phút thì gọi lại api
      if (isExp) {
        _initDeviceInfo()
      } else {
        setDevice(cachedResponseData)
      }
    }
    _handleCachedData()
  }, [])
  const _onSubmit = () => {
    if (buttonRef.current) {
      clearTimeout(buttonRef.current)
    }
    buttonRef.current = setTimeout(() => {
      _login()
    }, 250)
  }
  const _login = async () => {
    await form.validateFields()
    const formData = form.getFieldsValue()
    try {
      const res = await axios({
        "Content-type": "application/json",
        url: loginUrl,
        method: "POST",
        data: formData,
        headers: { "DEVICE-CODE": device.device_code },
      })
      if (res.status === 408) {
        notification.error({
          message: res.data.msg || "Đăng nhập thất bại",
        })
      }
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({
            message: res.data.data.msg || "Đăng nhập thành công",
          })
          navigate("/question2c", { state: res.data.data })
        } else
          notification.error({
            message: res.data.msg || "Đăng nhập thất bại",
          })
      } else
        notification.error({
          message: res.data.msg || "Đăng nhập thất bại",
        })

      console.log("res login", res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Question 2</h2>
      <Row justify="center">
        <Col span={8}>
          <Form form={form} onFinish={_login} layout="vertical">
            <Form.Item
              label="Tên tài khoản"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
                {
                  type: "email",
                  required: true,
                  message: "Vui lòng nhập đúng định dạng email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={_onSubmit}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
