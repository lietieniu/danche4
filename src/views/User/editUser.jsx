import React, { useEffect, useRef } from "react";
import { Modal, Form, Button, Input, Radio, Select, DatePicker, message } from "antd";
import moment from "moment";
import axios from "../../axios";

const EditUser = (props) => {
    //1.弹框开关信息+表格信息
    let editShow = props.editShow;
    let setEditShow = props.setEditShow;
    let tableInfo = props.tableInfo;
    let renderTableList = props.renderTableList;
    //2.表单布局+获取表单Dom
    const formLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 10 }
    };
    //2.1Dom元素+表单渲染初始化数据
    let [form] = Form.useForm();
    let form1 = useRef();
    let bt1 = useRef();
    useEffect(() => {
        form1.current.setFieldsValue({
            "username": tableInfo.username,
            "sex": tableInfo.sex,
            "state": tableInfo.state,
            "address": tableInfo.address,
            "birthday": moment(tableInfo.birthday) //时间转换
        })
    }, [tableInfo]);

    //2.2表单Onfinsh事件+后台数据传递，表格重新刷新
    const onFinish = () => {
        //1.获取表单数据
        let value = form.getFieldsValue();
        //   console.log("value",value)
        axios.ajax({
            url: 'edit/user',
            data: { value }
        }).then((res) => {
            if (res.code == 0) {
                setEditShow(false);
                message.success("员工修改成功");
                form.resetFields() //表单清空
            }
            renderTableList() //表格刷新
        })
    }

    return (
        <div>
            <Modal
                forceRender //1.预渲染
                title="编辑员工"
                visible={editShow}
                okText="修改"
                onOk={() => { bt1.current.click() }}
                cancelText="取消"
                onCancel={() => { setEditShow(false) }}
            >
                <Form {...formLayout} form={form} ref={form1} onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="员工姓名"
                        initialValue={tableInfo.username}
                        rules={[{ required: true, message: "请输入姓名" }]}
                    >
                        <Input style={{ width: 100 }} />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        label="性别"
                        initialValue={tableInfo.sex}
                    >
                        <Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="职称等级"
                        initialValue={3}
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
                    >
                        <DatePicker showToday format={'YYYY-MM-DD'} defaultPickerValue={moment(tableInfo.birthday)} style={{ width: 118 }} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="联系地址"
                        initialValue={tableInfo.address}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Button htmlType="submit" ref={bt1} style={{ display: 'none' }}>提交</Button>
                </Form>

            </Modal>
        </div>
    );
}

export default EditUser;