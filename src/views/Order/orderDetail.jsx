import React, { useEffect, useState } from "react";
import axios from "../../axios";
import './index.less';

const OrderDetail = (props) => {
    useEffect(() => {
        getMapList();
    }, [])
    //1.路由传值获得对应携带的参数
    let id = props.match.params.orderId;
    const [mapInfo, setMapInfo] = useState({})
    const getMapList = () => {
        axios.ajax({
            url: 'order/detail',
            data: { id }
        }).then((res) => {
            if (res.code == 0) {
                setMapInfo(res.result)
                renderMap(res.result)
            }
        })
    };
    const renderMap = (result) => {
        let list1 = result.position_list; //路线list
        let list2 = result.area; //服务区list
        //1.创建地图实例
        var map = new window.BMapGL.Map("container");
        //2.路线图起始和终点
        let startPoint = new window.BMapGL.Point(list1[0].lon, list1[0].lat);
        let endPoint = new window.BMapGL.Point(list1[list1.length - 1].lon, list1[list1.length - 1].lat)
        //3.设置地图级别+地图中心点
        map.centerAndZoom(endPoint, 15);
        //4.添加地图控件
        map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
        map.addControl(cityCtrl);

        //5.1.起始点坐标
        let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42), //图片偏移量
            anchor: new window.BMapGL.Size(18, 42) //图片定位位置(从地图左上角定位)
        });
        let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon });
        map.addOverlay(startMarker);
        //5.2
        let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42), //图片偏移量
            anchor: new window.BMapGL.Size(18, 42) //图片定位位置(从地图左上角定位)
        });
        let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
        map.addOverlay(endMarker);
        //5.3连接路线图
        let positionList = [];
        list1.map((item, index) => {
            positionList.push(new window.BMapGL.Point(item.lon, item.lat));
        })
        let polyline = new window.BMapGL.Polyline(positionList, {
            strokeColor: "red",
            strokeWeight: 3,
            strokeOpacity: 0.5
        });
        map.addOverlay(polyline);

        //6.绘制服务区
        let areaList = [];
        list2.map((item, index) => {
            areaList.push(new window.BMapGL.Point(item.lon, item.lat));
        });
        let polygon = new window.BMapGL.Polygon(areaList, {
            strokeColor: "blue", //描边颜色
            strokeWeight: 2, //描边宽度
            strokeOpacity: 0.5, //
            fillColor:'green'
        });
        map.addOverlay(polygon)
    }

    return (
        <div>
            <div id="container" className="map"></div>
            <div className="detail-items">
                <div className="item-title">基础信息</div>
                <ul className="detail-form">
                    <li>
                        <div className="detail-form-left">用车模式</div>
                        <div className="detail-form-content">{mapInfo.mode == 1 ? "服务区" : "停车点"}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">订单编号</div>
                        <div className="detail-form-content">{mapInfo.order_sn}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">车辆编号</div>
                        <div className="detail-form-content">{mapInfo.bike_sn}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">用户姓名</div>
                        <div className="detail-form-content">{mapInfo.user_name}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">手机号码</div>
                        <div className="detail-form-content">{mapInfo.mobile}</div>
                    </li>
                </ul>
            </div>
            <div className="detail-items">
                <div className="item-title">行驶轨迹</div>
                <ul className="detail-form">
                    <li>
                        <div className="detail-form-left">行程起点</div>
                        <div className="detail-form-content">{mapInfo.start_location}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">行程终点</div>
                        <div className="detail-form-content">{mapInfo.end_location}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">行驶里程</div>
                        <div className="detail-form-content">{mapInfo.distance / 1000 + '公里'}</div>
                    </li>

                </ul>
            </div>

        </div>
    );
}

export default OrderDetail;