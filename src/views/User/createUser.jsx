import React, { useRef } from "react";
import { Modal, Form, Input, Radio, Select, DatePicker, Button, message } from "antd";
import axios from "../../axios";
const { TextArea } = Input;

const CreateUser = (props) => {
    //1.获得弹框开关信息+表格刷新函数
    let createShow = props.createShow;
    let setCreateShow = props.setCreateShow;
    let renderTableList = props.renderTableList;
    //2.表单布局+创建表单DOM元素
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    };
    const [form] = Form.useForm();
    const bt1 = useRef();
    //3.表单完成事件
    const onFinish = () => {
        let value = form.getFieldsValue();
        // console.log("value",value)
        axios.ajax({
            url: "user/create",
            data: value
        }).then((res) => {
            if (res.code == 0) {
                setCreateShow(false);
                message.success("员工创建成功");
                form.resetFields();//表单数据清空
                renderTableList() //表格重新刷新
            }
        })
    }
    return (
        <div>
            <Modal
                forceRender
                title="创建员工"
                visible={createShow}
                okText="创建"
                onOk={() => { bt1.current.click() }}
                cancelText="取消"
                onCancel={() => { setCreateShow(false) }}
            >
                <Form {...formLayout} form={form} onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="员工姓名"
                        rules={[{ required: true, message: "请输入姓名" }]}
                    >
                        <Input placeholder="请输入姓名" style={{ width: 120 }} />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        label="性别"
                        rules={[{ required: true }]}
                        initialValue={0}
                    >
                        <Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="状态"
                        rules={[{ required: true }]}
                        initialValue={2}
                    >
                        <Select style={{ width: 80 }}>
                            <Select.Option value={1}>中级</Select.Option>
                            <Select.Option value={2}>高级</Select.Option>
                            <Select.Option value={3}>高级+</Select.Option>
                            <Select.Option value={4}>资深</Select.Option>
                            <Select.Option value={5}>如来</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        label="出生日期"
                        rules={[{ required: true, message: "请选择出生日期" }]}
                    >
                        <DatePicker placeholder="请选择日期" style={{ width: 130 }} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="联系地址"
                        rules={[{ required: true, message: "请输入联系地址" }]}

                    >
                        <Input.TextArea rows={3} placeholder="联系地址" />
                    </Form.Item>

                    <Button ref={bt1} type="primary" htmlType="submit" style={{ display: 'none' }}>666</Button>

                </Form>
            </Modal>
        </div>
    );
}

export default React.memo(CreateUser);