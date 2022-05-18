import React from "react";
import { Modal, Form } from "antd";

const DetailUser = (props) => {
    //1.弹框显示信息
    let detailShow = props.detailShow;
    let setDetailShow = props.setDetailShow;
    let tableInfo = props.tableInfo;
    //2.表单布局
    const formLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 }
    };
    //3.职称等级渲染
    const renderState = (state) => {
        let list = {
            1: "中级",
            2: "高级",
            3: "高级+",
            4: "资深",
            5: "如来"
        }
        return list[state]
    }
    return (
        <div>
            <Modal
                forceRender
                title="员工详情"
                visible={detailShow}
                okText="知道了"
                onOk={() => { setDetailShow(false)}}
                cancelText="取消"
                onCancel={() => { setDetailShow(false) }}
            >
                <Form {...formLayout}>
                    <Form.Item label="员工姓名:">
                        {tableInfo.username}
                    </Form.Item>
                    <Form.Item
                        label="性别:"
                    >
                        {tableInfo.sex == 0 ? "男" : "女"}
                    </Form.Item>
                    <Form.Item
                        label="职称等级:"
                    >
                        {renderState(tableInfo.state)}
                    </Form.Item>
                    <Form.Item
                        label="出生日期:"
                    >
                        {tableInfo.birthday}
                    </Form.Item>
                    <Form.Item
                        label="联系地址:"
                    >
                        {tableInfo.address}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default React.memo(DetailUser);