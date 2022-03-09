import { Button, Col, Form, Input, List, notification, Row, Space } from "antd"
import React, { useState } from "react"

export default function Question1() {
  const [result, setResult] = useState("")
  const [form] = Form.useForm()
  const _onFinish = (formData) => {
    const array = formData.number_input?.replace(/\s/g, "")?.split(",")
    const _isNaN = (e) => isNaN(e)
    if (array.some(_isNaN)) {
      notification.warning({ message: "Vui lòng nhập đúng định dạng" })
      return false
    }
    setResult(array.sort(myCompare).join(""))
  }
  function myCompare(X, Y) {
    let XY = X + Y
    let YX = Y + X
    return YX - XY
  }
  const _onReset = () => {
    form.resetFields()
    setResult("")
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Question 1</h2>
      <Row>
        <Col span={12}>
          <List
            style={{ width: 500, marginBottom: 30 }}
            header={<div>Number Lists</div>}
            bordered
            dataSource={[
              "0, 10, 1, 99, 9, 8, 79, 91, 22, 32, 12",
              "99, 19, 29, 39, 11, 21, 32, 33, 35, 50, 60, 90",
              "1, 10, 19, 11, 13, 16, 19",
            ]}
            renderItem={(item) => <List.Item> {item}</List.Item>}
          />
        </Col>
        <Col span={12}>
          <Form
            onFinish={_onFinish}
            form={form}
            style={{ marginBottom: 20, width: "80%" }}
          >
            <Form.Item
              label="Numbers"
              name="number_input"
              extra={<div>VD: 6,13,8</div>}
            >
              <Input placeholder='Nhập các số cách nhau bằng dấu ","' />
            </Form.Item>
            <Space>
              <Button htmlType="button" onClick={_onReset}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form>
          {result && `Largest number possible: ${result}`}
        </Col>
      </Row>
    </div>
  )
}
