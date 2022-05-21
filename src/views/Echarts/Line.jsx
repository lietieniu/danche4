import React from "react";
import './Echarts.less';
import { Card } from "antd";
//1.图表配置
//1.1React中图表引用
import ReactECharts from 'echarts-for-react';
//1.2折线图
import 'echarts/lib/chart/line';
//1.2图表属性
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';

const getOption1 = () => {
    let option = {
        title: {
            text: "订单量走势"
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ["天猫", "京东"],
            left: "center"
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 亿'
            }
        },
        series: [
            {
                name: "天猫",
                data: [820, 932, 901, 934, 1400, 1330, 1320],
                type: 'line',
                smooth: true
            },
            {
                name: "京东",
                data: [700, 900, 1000, 1120, 1350, 1440, 1500],
                type: 'line',
                smooth: true
            }
        ]
    };
    return option;
}
const getOption2 = () => {
    let option = {
        title:{
            text:"折线面积图"
        },
        legend:{
            data:["面积图"],
            left:'center'
        },
        tooltip:{
            trigger:'axis',
            // position: [10,10] //弹框显示位置
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:"面积图",
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    return option;
}
const Line = () => {
    return (
        <div>
            <Card className="card" style={{ marginBottom: 20 }}>
                <ReactECharts option={getOption1()} style={{ height: 410 }} />
            </Card>
            <Card className="card">
                <ReactECharts option={getOption2()} style={{ height: 410 }} />
            </Card>
        </div>
    );
}

export default Line;