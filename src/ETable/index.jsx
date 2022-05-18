import React, { useState } from "react";
import { Table, Radio } from "antd";

const ETable = (props) => {
    const [selectionType, setSelectionType] = useState('radio');
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            props.filterTableInfo(selectedRows[0])
        },
    };
    <Radio.Group
        onChange={({ target: { value } }) => {
            setSelectionType(value);
        }}
        value={selectionType}
    >
    </Radio.Group>

    const renderTable = () => {
        return <Table
            rowSelection={{
                type: selectionType,
                ...rowSelection
            }}
            bordered
            pagination={true}
            {...props}
        />
    }
    return (
        <div>
            {renderTable()}
        </div>
    );
}

export default ETable;