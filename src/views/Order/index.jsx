import React, { useState, useEffect } from "react";
import './index.less'
import { Card, Button, message, Modal, Form } from 'antd';
//1.表单封装
import BaseForm from "../../BaseForm";
//2.表格封装
import ETable from "../../ETable";
//3.axios封装
import axios from "../../axios";

const Order = () => {
    let buttonType = "查询"
    const formList = [
        {
            type: 'SELECT',
            name: "city",
            label: "城市",
            initialValue: 0,
            message: "请选择城市",
            list: [{ name: "全部", key: 0 }, { name: "北京", key: 1 }, { name: "杭州", key: 2 }],
            width: 80,
        },
        {
            type: 'DATE',
            name: "time",
            label: "截至时间",
            message: "请选择截止时间",
            width: 320
        },
        {
            type: 'SELECT',
            name: "status",
            label: "订单状态",
            message: "请选择订单状态",
            initialValue: 0,
            list: [{ name: "全部", key: 0 }, { name: "进行中", key: 1 }, { name: "订单结束", key: 2 },],
            width: 98
        },
        {
            type: 'INPUT',
            name: "mode",
            label: '模式',
            message: "请输入模式",
            placeholder: "请输入模式",
            width: 100
        }
    ];
    //2.获取表单数据,进行后台传递
    const filterSubmit = (data) => {
        console.log("data", data)
        axios.ajax({
            url: 'search/order',
            data: { data }
        }).then((res) => {
            if (res.code == 0) {
                message.success("查询成功");
                renerTableList() //表格重新刷新
            }
        })
    };
    //3.表格标题及索引值
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'order_sn',
            align: 'center'
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            align: 'center'
        },
        {
            title: "手机号",
            dataIndex: "mobile",
            align: 'center'
        },
        {
            title: "里程",
            dataIndex: 'distance',
            align: 'center',
            render(distance) {
                return distance / 1000 + 'Km'
            }
        },
        {
            title: "行驶时长",
            dataIndex: "total_time",
            align: "center"
        },
        {
            title: "状态",
            dataIndex: 'status',
            render(status) {
                let config = {
                    1: "进行中",
                    2: "结束行程"
                };
                return config[status]
            }
        },
        {
            title: "开始时间",
            dataIndex: "start_time",
            align: 'center'
        },
        {
            title: "结束时间",
            dataIndex: "end_time",
            align: 'center'
        },
        {
            title: "订单金额",
            dataIndex: "total_fee",
            align: 'center'
        },
        {
            title: "实付金额",
            dataIndex: "user_pay",
            align: 'center'
        }
    ];

    //3.1表格初始数据
    const [dataSource, setDataSource] = useState([]);
    //3.2获取后台表格
    const renerTableList = () => {
        axios.ajax({
            url: 'order/list',
            data: { page: 1 }
        }).then((res) => {
            if (res.code == 0) {
                res.result.item_list.map((item, index) => {
                    item.key = index;
                });
                setDataSource(res.result.item_list)
            }
        })
    }
    //3.3 初始化渲染
    useEffect(() => {
        renerTableList()
    }, []);

    //4.1获取表格对应行数据
    const [tableInfo, setTableInfo] = useState({});
    const filterTableInfo = (data) => {
        //console.log("data",data)
        setTableInfo(data)

    };
    //4.2删除订单详情按钮函数
    const [orderShow, setOrderShow] = useState(false);
    const deleteOrder = () => {
        if (Object.keys(tableInfo).length == 0) {
            Modal.error({
                title: "提示",
                content: "请先选择一条数据",
                okText: "知道了"
            })
        } else {
            setOrderShow(true)
        }
    };
    //4.3设置表单布局+Form的DOM元素
    let [form] = Form.useForm();
    const formLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 7 }
    };
    //4.4 点击弹框里的删除按钮函数;
    const modalDeleteOrder = () => {
        let id = tableInfo.id;
        //console.log("id", id);
        axios.ajax({
            url: 'delete/order',
            data: { id }
        }).then((res) => {
            if (res.code == 0) {
                setOrderShow(false);
                message.success("删除成功");
                renerTableList()
            }
        })
    }

    //5.点击订单详情按钮函数
    const orderDetail = () => {
        if (Object.keys(tableInfo).length == 0) {
            Modal.error({
                title: "提示",
                content: '请先选择一条数据',
                okText: "知道了"
            })
        } else {
            window.open(`/#/Common/OrderDetail/:${tableInfo.id}`)
        }
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
                <Button type="primary" onClick={() => { orderDetail() }} style={{ marginBottom: 15, marginRight: 15 }}>订单详情</Button>
                <Button type="primary" onClick={() => { deleteOrder() }}>删除订单</Button>
                <Modal
                    title="删除订单信息"
                    visible={orderShow}
                    okText="删除"
                    onOk={() => { modalDeleteOrder() }}
                    cancelText="算了"
                    onCancel={() => { setOrderShow(false) }}
                >
                    <Form layout="horizontal" form={form} {...formLayout}>
                        <Form.Item
                            label="车辆编号"
                        >
                            {tableInfo.bike_sn}
                        </Form.Item>
                        <Form.Item
                            label="用户名"
                        >
                            {tableInfo.user_name}
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                        >
                            {tableInfo.mobile}
                        </Form.Item>
                        <Form.Item
                            label="行驶里程"
                        >
                            {tableInfo.distance / 1000 + 'Km'}
                        </Form.Item>
                        <Form.Item
                            label="实付金额"
                        >
                            {'￥' + tableInfo.user_pay}
                        </Form.Item>
                    </Form>
                </Modal>
                <ETable
                    columns={columns}
                    dataSource={dataSource}
                    filterTableInfo={filterTableInfo}
                />
            </Card>
        </div>
    );
}

export default Order;