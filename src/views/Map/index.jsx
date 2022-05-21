import React, { useState, useEffect } from "react";
import { Card, message } from "antd";
import './index.less'
import BaseForm from "../../BaseForm";
import axios from "../../axios";

const Map = () => {
    //1.表单信息列表
    let buttonType = "查询";
    let formList = [
        {
            type: 'SELECT',
            name: "city",
            label: "城市",
            width: 73,
            initialValue: 0,
            list: [{ name: "全部", key: 0 }, { name: "北京", key: 1 }, { name: "杭州", key: 2 },]
        },
        {
            type: "DATE",
            name: "date",
            label: "截取时间",
            message: "请选择时间",
            width: 320
        },
        {
            type: "SELECT",
            name: "status",
            label: "订单状态",
            initialValue: 0,
            list: [{ name: "全部", key: 0 }, { name: "进行中", key: 1 }, { name: "已结束", key: 2 }]
        }
    ];
    //2.获取表单数据进行查询
    let flag = true;
    const filterSubmit = (data) => {
        console.log("data", data);
        axios.ajax({
            // url: "search/map",
            url:'/map/list',
            data: data
        }).then((res) => {
            if (res.code == 0) {
                message.success("查询如下");
                setCarNum(res.result.total_count);
                renderMapList(res.result);
                // renderMapList(res.result); 重新调用地图函数,数据刷新
            }
        })
    };
    //3.渲染地图函数
    //3.1初始化渲染
    useEffect(() => {
        renderMap();
    }, [])
    //3.2后台请求数据
    const [carNum, setCarNum] = useState('');
    const renderMap = () => {
        axios.ajax({
            url: '/map/list',
            data: { page: 1 }
        }).then((res) => {
            if (res.code == 0) {
                setCarNum(res.result.total_count);
                renderMapList(res.result);
            };
        })
    }
    //3.3地图信息处理函数
    const renderMapList = (result) => {
        let routeList = result.route_list;
        let bikeList = result.bike_list;
        let serveList = result.service_list;
        //1.路线起始/终点
        let firstPoint = new window.BMapGL.Point(routeList[0].split(",")[0], routeList[0].split(",")[1]);
        let endPoint = new window.BMapGL.Point(routeList[routeList.length - 1].split(",")[0], routeList[routeList.length - 1].split(",")[1])
        //1.1 创建地图实例 
        var map = new window.BMapGL.Map("container");
        //1.2初始化地图，设置中心点坐标和地图级别 
        map.centerAndZoom(endPoint, 15);
        //1.3地图控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
        map.addControl(cityCtrl);

        //2.绘制起始点坐标
        let firstIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
            //imageofest 偏移量
        });
        //起始点覆盖物
        let firstMarker = new window.BMapGL.Marker(firstPoint, { icon: firstIcon });
        map.addOverlay(firstMarker);
        //2.1终点坐标
        let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)

        });
        let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
        map.addOverlay(endMarker);
        //2.2连接路线图
        let routeListArray = [];
        routeList.map((item) => {
            routeListArray.push(new window.BMapGL.Point(item.split(',')[0], item.split(',')[1]))
        });
        let routePolyline = new window.BMapGL.Polyline(routeListArray, {
            strokeColor: "red",
            strokeWeight: 2.5,
            strokeOpacity: 0.5
        });
        map.addOverlay(routePolyline);

        //3.绘制车辆分布图
        let bikeListArray = [];
        bikeList.map((item) => {
            let bikePoint = new window.BMapGL.Point(item.split(',')[0], item.split(',')[1]);
            let bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(18, 42)
            });
            let bikeMarker = new window.BMapGL.Marker(bikePoint, { icon: bikeIcon });
            map.addOverlay(bikeMarker)
        });

        //4.绘制服务区
        let serveListArray = [];
        serveList.map((item) => {
            serveListArray.push(new window.BMapGL.Point(item.lon, item.lat));
        });
        let servePolygon = new window.BMapGL.Polygon(serveListArray, {
            strokeColor: "red",
            strokeWeight: 3,
            strokeOpacity: 0.6,
            fillColor: '#CCFF99'
        });
        map.addOverlay(servePolygon);


    }
    return (
        <div>
            <Card className="card">
                <BaseForm
                    formList={formList}
                    buttonType={buttonType}
                    filterSubmit={filterSubmit}
                    flag={flag}
                />
            </Card>
            <Card className="card" style={{ marginTop: 18 }}>
                <div className="car">共<span className="carNum">{carNum}</span>辆车</div>
                <div id="container" className="map1"></div>
            </Card>
        </div>
    );
}

export default Map;