import React from "react";
import './Echarts.less';
import { Card } from "antd";
//1.引入图表参数

//1.1图表适应React
import ReactECharts from 'echarts-for-react';
//1.2引入柱状图
import 'echarts/lib/chart/bar';
//1.3图表属性
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markPoint';

const getOption1 = () => {
    let option = {
        //1.标题
        title:{
            text:"订单量"
        },
        //2.划入显示
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        //3.图形位置
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        //4.x轴
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        //5.数据源
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '53%',
                data: [10, 52, 200, 334, 390, 330, 220]
            },
          
        ]
    };
    return option;
}

const getOption2 = () => {
    let option = {
        title: { text: "用户骑行订单" },
        legend: {},
        tooltip: {},
        dataset: {
            // 1.数据源--对象数组类型
            dimensions: ['product', '2015', '2016', '2017'],
            source: [
                { product: '一季度', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
                { product: '二季度', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
                { product: '三季度', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
                { product: '四季度', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
            ]
            
            // 2.基本类型
            // source: [
            //     ['product', '摩拜', '小蓝', 'ofO'],
            //     ['一季度', 43.3, 85.8, 93.7],
            //     ['二季度', 83.1, 73.4, 55.1],
            //     ['三季度', 86.4, 65.2, 82.5],
            //     ['四季度', 72.4, 53.9, 39.1]
            //   ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };
    return option;
}

const Bar = () => {
    return (
        <div>
            <Card className="card" style={{marginBottom: 20}}>
                <ReactECharts style={{ height: 410}} option={getOption1()} />
            </Card>
            <Card className="card">
                <ReactECharts style={{ height: 410 }} option={getOption2()} />
            </Card>
        </div>
    );
}

export default Bar;