import React, { useState, useEffect, useRef } from "react";
import './index.less'
import { Button, Card, Form, message, Modal, Select } from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import axios from "../../axios";
//1.表单封装
import BaseForm from "../../BaseForm";
//2.表格封装
import ETable from "../../ETable";
//3.时间封装
import renderTime from "../../time/time";

const City = () => {
    //1.表单按钮文字
    let buttonType = "查询";
    //2.表单模块封装数据
    const formList = [
        {
            type: 'SELECT',
            name: "city",
            label: "城市",
            initialValue: 0,
            message: "请选择城市",
            list: [{ name: "全部", key: 0 }, { name: "北京", key: 1 }, { name: "杭州", key: 2 }],
            width: 70,
        },
        {
            type: 'SELECT',
            name: 'mode',
            label: "用车模式",
            initialValue: 0,
            message: "请选择用车模式",
            list: [{ name: "全部", key: 0 }, { name: "用车模式", key: 1 }, { name: "停车点模式", key: 2 }],
            width: 115
        },
        {
            type: 'SELECT',
            name: 'module',
            label: "营运模式",
            initialValue: 0,
            message: "请选择营运模式",
            list: [{ name: "全部", key: 0 }, { name: "加盟", key: 1 }, { name: "自营", key: 2 }],
            width: 70
        },
        {
            type: 'SELECT',
            name: 'status',
            label: "加盟商授权状态",
            initialValue: 0,
            message: "请选择授权模式",
            list: [{ name: "全部", key: 0 }, { name: "已授权", key: 1 }, { name: "未授权", key: 2 }],
            width: 85
        }
    ];

    //3.获取表单数据,后台传递
    const filterSubmit = (data) => {
        // console.log("data",data)
        axios.ajax({
            url: 'search/city',
            data: { data,isLoading:true }
        }).then((res) => {
            if (res.code == 0) {
                message.success("查询成功")
            }
        })
    };

    //4.设置表格表头索引值
    const columns = [
        {
            title: "城市ID",
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: "城市名称",
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: "用车模式",
            dataIndex: 'mode',
            align: 'center',
            render(mode) {
                let config = {
                    1: '停车点模式',
                    2: '禁停区模式'
                };
                return config[mode]
            }
        },
        {
            title: "营运模式",
            dataIndex: 'op_mode',
            align: 'center',
            render(op_mode) {
                return op_mode == 1 ? '加盟' : '自营'
            }
        },
        {
            title: '授权加盟商',
            dataIndex: 'franchisee_name',
            align: 'center'
        },
        {
            title: '城市管理员',
            dataIndex: 'city_admins',
            align: 'center',
            render(city_admins) {
                return city_admins.map((item) => {
                    return item.user_name;
                }).join(', ')
            }
        },
        {
            title: "城市开通时间",
            dataIndex: "open_time",
            align: 'center'
        },
        {
            title: "操作时间",
            dataIndex: "update_time",
            render(update_time) {
                return renderTime(update_time)
            },
            align: 'center'
        },
        {
            title: "操作人",
            dataIndex: "sys_user_name",
            align: 'center'
        },
    ];
    //5.设置初始表格数据
    const [dataSource, setDataSource] = useState([]);
    const renderTableList = () => {
        axios.ajax({
            url: 'city/list',
            data: { page: 1 }
        }).then((res) => {
            if (res.code == 0) {
                //给每一项数据添加唯一的key值
                res.result.city_list.map((item, index) => {
                    item.key = index;
                })
            };
            setDataSource(res.result.city_list)
        })
    };
    //页面初始化渲染数据
    useEffect(() => {
        renderTableList()
    }, []);

    //6.开通城市函数;
    const [cityShow, setCityShow] = useState(false)
    const openCity = () => {
        setCityShow(true)
    };
    //7.设置表单布局
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 6 }
    };
    //8.获取表单ref值
    let [form] = Form.useForm();
    let bt1 = React.useRef()
    //9.表单onFinsh方法
    const onFinish = () => {
        let value = form.getFieldsValue();
        //console.log("value99", value)
        axios.ajax({
            url: 'open/city',
            data: { 
                value,
               
             }
        }).then((res) => {
            if (res.code == 0) {
                message.success("城市开通成功");
                renderTableList() //重新刷新表格数据
            };
            //1.表单值清空
            form.resetFields();
            //2.弹窗关闭
            setCityShow(false);
        })
    }
    return (
        <div>
            <Card className="card">
                <BaseForm
                    formList={formList}
                    buttonType={buttonType}
                    filterSubmit={filterSubmit}
                />
            </Card>
            <Card className="card" style={{ marginTop: 15 }}>
                <Button type="primary" style={{ marginRight: 15, marginBottom: 15 }} onClick={() => { openCity() }}><PlusOutlined />开通城市</Button>
                <Button type="primary"><CloseOutlined />删除城市</Button>
                <Modal
                    visible={cityShow}
                    title="开通城市"
                    okText="开通"
                    onOk={() => { bt1.current.click() }}
                    cancelText="算了"
                    onCancel={() => { setCityShow(false) }}
                >
                    <Form
                        layout="horizontal"
                        {...formLayout}
                        form={form}
                        onFinish={onFinish}
                     //initialValues={{city:"99",mode:"55",model:"请选择"}}

                    >
                        <Form.Item
                            name="city"
                            label="城市"
                            initialValue={0}
                            rules={[{ required: true, message: "请选择城市" }]}
                        >
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>北京</Select.Option>
                                <Select.Option value={2}>杭州</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="mode"
                            label="用车模式"
                            initialValue={0}
                            rules={[{ required: true, message: "请选择用车模式" }]}
                        >
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>禁停区模式</Select.Option>
                                <Select.Option value={2}>停车点模式</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="model"
                            label="经营模式"
                            initialValue={0}
                            rules={[{ required: true, message: "请选择经营模式" }]}
                        >
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>加盟</Select.Option>
                                <Select.Option value={2}>自营</Select.Option>
                            </Select>
                        </Form.Item>
                        <Button htmlType="submit" ref={bt1} style={{ display: 'none' }}>按钮</Button>
                    </Form>
                </Modal>
                <ETable
                    columns={columns}
                    dataSource={dataSource}
                />
            </Card>
        </div>
    );
}

export default City;