import { Select } from "antd";

export default {
    renderList(list) {
        if (list.length == 0 || !list) {
            return ''
        } else {
            let ListArray = [];
            list.map((item, index) => {
                ListArray.push(<Select.Option key={index} value={item.key}>{item.name}</Select.Option>)
            })
            return ListArray;
        }
    }
}