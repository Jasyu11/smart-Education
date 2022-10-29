import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from "react";

const defaultData = new Array(20).fill(1).map((_, index) => {
    return {
        id: (Date.now() + index).toString(),
        title: `Question ${index+1}`,
        decsa: 'Option A',
        decsb: 'Option B',
        decsc: 'Option C',
        decsd: 'Option D',
        state: 'Option A',
        created_at: '1590486176000',
    };
});

const Fuzzy = () => {

    const [editableKeys, setEditableRowKeys] = useState(() => defaultData.map((item) => item.id));
    const [dataSource, setDataSource] = useState(() => defaultData);
    const columns = [
        {
            title: 'Multiple Choice Questions',
            dataIndex: 'title',
            width: '30%',
        },
        {
            title: 'Option A',
            dataIndex: 'decsa',
        },
        {
            title: 'Option B',
            dataIndex: 'decsb',
        },
        {
            title: 'Option C',
            dataIndex: 'decsc',
        },
        {
            title: 'Option D',
            dataIndex: 'decsd',
        },
        {
            title: 'Sample answer',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
                oa: {
                    text: 'Option A',
                    status: 'Option A',
                },
                ob: {
                    text: 'Option B',
                    status: 'Option B',
                },
                oc: {
                    text: 'Option C',
                    status: 'Option C',
                },
                od: {
                    text: 'Option D',
                    status: 'Option D',
                },
            },
        },
        {
            title: 'Delete',
            valueType: 'option',
            width: 250,
            render: () => {
                return null;
            },
        },
    ];
    return (<>
      <EditableProTable headerTitle="Create Multiple Choice Questions" columns={columns} rowKey="id" scroll={{
            x: 960,
        }} value={dataSource} onChange={setDataSource} recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
                id: Date.now(),
            }),
        }} toolBarRender={() => {
            return [
                <Button type="primary" key="save" onClick={() => {
                        // dataSource 灏辨槸褰撳墠鏁版嵁锛屽彲浠ヨ皟鐢� api 灏嗗叾淇濆瓨
                        console.log(dataSource);
                    }}>
              Save
            </Button>,
            ];
        }} editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
                setDataSource(recordList);
            },
            onChange: setEditableRowKeys,
        }}/>
      
      <Button>test</Button>
    </>);
};

export default Fuzzy;