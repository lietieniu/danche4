import React, { useCallback, useEffect, useState } from "react";
import './index.less';
import { Card, Button, message, Modal } from "antd";
import { PlusOutlined, InfoOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
//1.表单封装
import BaseForm from '../../BaseForm/index';
//2.表格封装
import ETable from "../../ETable";
//3.axios封装
import axios from "../../axios";
//4.1创建员工组件
import CreateUser from './createUser'
//4.2员工详情组件
import DetailUser from './detailUser'
//5.编辑员工页面
import EditUser from "./editUser";


const User = () => {
    //1.表单封装数据
    let buttonType = "查询"
    const formList = [
        {
            type: 'INPUT',
            name: "username",
            label: "姓名",
            placeholder: "员工姓名",
            message: '请输入员工姓名',
            width: 122
        },
        {
            type: 'INPUT',
            name: "mobile",
            label: "员工电话",
            placeholder: "电话",
            message: '请输入员工电话',
            width: 110
        },
        {
            type: 'TIME',
            name: "time",
            label: "入职时间",
            message: '请选择入职时间',
            width: 150
        },

    ];
    //2.获取表单数据进行后台提交
    const filterSubmit = (data) => {
        //    console.log("data",data)
        axios.ajax({
            // url: "search/user",
            url: "user/list",
            data: { data }
        }).then((res) => {
            if (res.code == 0) {
                message.success("查询成功")
                res.result.user_list.map((item, index) => {
                    item.key = index;
                });
                setDataSource(res.result.user_list)
            }
        })
    };

    //3.1表格表头及索引值
    const columns = [
        {
            title: "员工Id",
            dataIndex: "id",
            align: 'center'
        },
        {
            title: "员工姓名",
            dataIndex: "username",
            align: 'center'
        },
        {
            title: "性别",
            dataIndex: "sex",
            render(sex) {
                return sex == 0 ? "男" : "女"
            },
            align: 'center'
        },
        {
            title: "职称级别",
            dataIndex: "state",
            render(state) {
                return {
                    1: "中级",
                    2: "高级",
                    3: "高级+",
                    4: "资深",
                    5: "如来"
                }[state]
            },
            align: 'center'
        },
        {
            title: "爱好",
            dataIndex: "interest",
            align: "center",
            render(interest) {
                return {
                    1: '游戏',
                    2: '麻将',
                    3: '看书'
                }[interest]
            }
        },
        {
            title: "生日",
            dataIndex: "birthday",
            align: "center"
        },
        {
            title: "联系地址",
            dataIndex: "address", align: "center"
        },
        {
            title: "早起时间",
            dataIndex: "time",
            align: "center"
        }
    ];
    //3.2获取表格数据函数
    const [dataSource, setDataSource] = useState([])
    const renderTableList = () => {
        axios.ajax({
            url: "user/list",
            data: { page: 1 }
        }).then((res) => {
            if (res.code == 0) {
                res.result.user_list.map((item, index) => {
                    item.key = index;
                });
                setDataSource(res.result.user_list)
            }
        })
    };
    //3.3初始化渲染
    useEffect(() => {
        renderTableList()
    }, []);

    //4.1创建员工函数
    const [createShow, setCreateShow] = useState(false);
    const createUser = () => {
        setCreateShow(true)
    }
    //4.2员工详情
    //4.2.1获得表格对应行数据
    const [tableInfo, setTableInfo] = useState({})
    const filterTableInfo = (value) => {
        //   console.log("value",value);
        setTableInfo(value);


    };
    //4.2.2员工详情函数
    const [detailShow, setDetailShow] = useState(false);
    const detailUser = () => {
        if (Object.keys(tableInfo).length == 0) {
            Modal.error({
                title: "提示",
                content: "请先选择一条数据"
            })
        } else {
            setDetailShow(true);
            //console.log(tableInfo)
        }
    };

    //5.编辑员工页面
    const [editShow, setEditShow] = useState(false);
    //5.1点击编辑员工按钮函数
    const editUser = () => {
        if (Object.keys(tableInfo).length == 0) {
            Modal.error({
                title: "提示",
                content: "请先选择一条员工信息"
            })
        } else {
            setEditShow(true)
        }
    };

    //6.删除员工
    // const [deleteShow,setDeleteShow]=useState(false);
    const deleteUser = (tableInfo) => {
        if (Object.keys(tableInfo).length == 0) {
            Modal.error({
                title: "提示",
                content: "请先选择一条员工信息"
            })
        } else {
            Modal.confirm({
                title: "提示",
                content: `确定删除员工,${tableInfo.username}的信息吗?`,
                okText: "确定",
                onOk: () => { onokDeleteUser(tableInfo) },
                cancelText: "取消"
            })
        }
    };
    const onokDeleteUser = (tableInfo) => {
        let id = tableInfo.id;
        // console.log("id",id);
        axios.ajax({
            url: "delete/user",
            data: id
        }).then((res) => {
            if (res.code == 0) {
                message.success("员工删除成功");
                renderTableList();
            }
        })

    }
    return (
        <div>
            <Card className="card" style={{}}>
                <BaseForm
                    formList={formList}
                    buttonType={buttonType}
                    filterSubmit={filterSubmit}
                />
            </Card>
            <Card className="card">
                <Button type="primary" onClick={() => { createUser() }} style={{ marginRight: 16, marginBottom: 15 }}><PlusOutlined />创建员工</Button>
                <Button type="primary" onClick={() => { detailUser() }} style={{ marginRight: 16 }}><InfoOutlined />员工详情</Button>
                <Button type="primary" onClick={() => { editUser() }} style={{ marginRight: 16 }}><EditOutlined />编辑员工</Button>
                <Button type="primary" onClick={() => { deleteUser(tableInfo) }}><CloseOutlined />删除员工</Button>
                {/* 1.创建员工 */}
                <CreateUser
                    createShow={createShow}
                    setCreateShow={setCreateShow}
                    renderTableList={useCallback(renderTableList)}
                />
                {/* 2.员工详情 */}
                <DetailUser
                    detailShow={detailShow}
                    setDetailShow={setDetailShow}
                    tableInfo={tableInfo}
                />
                {/* 3.编辑员工 */}
                <EditUser
                    editShow={editShow}
                    setEditShow={setEditShow}
                    tableInfo={tableInfo}
                    renderTableList={useCallback(renderTableList)}
                />

                <ETable
                    columns={columns}
                    dataSource={dataSource}
                    filterTableInfo={filterTableInfo}
                />

            </Card>
        </div>
    );
}

export default User;