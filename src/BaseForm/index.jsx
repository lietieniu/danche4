import React from "react";
import { Button, Form, Select, DatePicker, Input } from "antd";
import utils from '../utils/index';
import moment from "moment";
const { RangePicker } = DatePicker;


const BaseForm = (props) => {
    let formList = props.formList
    let buttonType = props.buttonType
    const renderForm = () => {
        let ItemList = [];
        if (formList.length > 0 && formList) {
            formList.map((item) => {
                let type = item.type;
                let name = item.name;
                let label = item.label;
                let initialValue = item.initialValue;
                let message = item.message;
                let list = item.list;
                let placeholder = item.placeholder;
                let width = item.width;
                //1.单选下拉菜单
                if (type == 'SELECT') {
                    const SELECT = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        initialValue={initialValue}
                        rules={[{ required: true, message: message }]}

                    >
                        <Select style={{ width: width }}>
                            {utils.renderList(list)}
                        </Select>
                    </Form.Item>
                    { ItemList.push(SELECT) }
                };
                //2.时间截至框
                if (type == 'DATE') {
                    const DATE = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        rules={[{ required: true, message: message }]}
                    >
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            style={{ width: width }}

                        />
                    </Form.Item>
                    { ItemList.push(DATE) }
                };
                //3.时间选择框
                if (type == 'TIME') {
                    const TIME = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        rules={[{ required: true, message: message }]}
                        
                    >
                        <DatePicker 
                        showNow
                        style={{width:width}} 
                        placeholder="请选择时间"
                        //defaultPickerValue={moment().format('MMMM Do YYYY, h:mm:ss a')}
                        format='YYYY-MM-DD'
                        />
                    </Form.Item>
                    { ItemList.push(TIME) }
                }
                //4.输入框
                if (type == 'INPUT') {
                    const INPUT = <Form.Item
                        name={name}
                        label={label}
                        key={name}
                        rules={[{ required: true, message: message }]}
                    >
                        <Input placeholder={placeholder} style={{ width: width }} />
                    </Form.Item>
                    { ItemList.push(INPUT) }
                }
            })
        }
        return ItemList;
    };
    const [form] = Form.useForm()
    const onFinsh = () => {
        let value = form.getFieldsValue();
        //console.log("value",value);

        //获取表单选中的值,将其传递给父组件，进行后台传递
        props.filterSubmit(value);
        form.resetFields() //数据完成后表单清空
    }
    return (
        <div>
            <Form layout="inline" onFinish={onFinsh} form={form}>
                {renderForm()}
                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>{buttonType}</Button>
                <Button htmlType="reset" style={{ marginLeft: 18 }}>重置</Button>
            </Form>
        </div>
    );
}

export default BaseForm;