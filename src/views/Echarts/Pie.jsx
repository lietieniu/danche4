import React from "react";
import './Echarts.less';
import { Card } from "antd";
//1.图表信息
//1.1
import EChartsReact from "echarts-for-react";
//1.2引入饼图
import 'echarts/lib/chart/pie';
//1.3引入图表属性
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markPoint';

//2.图表函数
const getOption1 = () => {
    let option = {
        title: {
            text: '每周出口量',
            subtext: 'Fake Data',
            left: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/> {b}: {c}({d}%)'
        },
        legend: {
            orient: 'vertical',  //1.垂直分布
            // orient:'horizontal', //2.水平排布
            left: 'right',
            align: 'left'
        },
        series: [
            {
                name: '出口量',
                type: 'pie',
                radius: '76%',
                data: [
                    { value: 1048, name: '周一' },
                    { value: 735, name: '周二' },
                    { value: 580, name: '周三' },
                    { value: 484, name: '周四' },
                    { value: 300, name: '周五' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}
//2.2
const getOption2 = () => {
    let option = {
        title: { text: "订单量" },
        tooltip: {
            trigger: 'item',
            //模板字符串
            formatter: '{a}<br/> {b}: {c}({d}%)'
        },
        legend: {
            orient: 'vertial', //垂直排布
            left: 'right', //右侧
            align: 'left' //标记在左侧
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
            }
        ]
    };
    return option;
};
const getOption3 = () => {
    let option = {
        title: {
            text: "日出口量"
        },
        legend: {
            // right:"60px",
            // top: "23px",
            // orient: 'vertial'
            top:"top",
            origin:'horizontal'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br> {b}: {c}({d}%)'
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '出口量',
                type: 'pie',
                radius: [50, 170],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    { value: 32, name: 'rose 3' },
                    { value: 30, name: 'rose 4' },
                    { value: 28, name: 'rose 5' },
                    { value: 26, name: 'rose 6' },
                    { value: 22, name: 'rose 7' },
                    { value: 18, name: 'rose 8' }
                ]
            }
        ]
    };
    return option;
}
const Pie = () => {
    return (
        <div>
            <Card className="card" style={{ marginBottom: 20 }}>
                <EChartsReact option={getOption1()} style={{ height: 410 }} />
            </Card>
            <Card className="card" style={{ marginBottom: 20 }}>
                <EChartsReact option={getOption2()} style={{ height: 410 }} />
            </Card>
            <Card className="card" style={{ marginBottom: 20 }}>
                <EChartsReact option={getOption3()} style={{ height: 410 }} />
            </Card>
        </div>
    );
}

export default Pie;