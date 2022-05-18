import React, { useState } from "react";
import { Row, Col } from "antd";
import './index.less';
import renderTime from '../../time/time'

const Header = (props) => {
    const [time, setTime] = useState('');
    setTimeout(() => {
        let date = new Date();
        let time = date.getTime() //获取当前时间戳
        let newDate = renderTime(time);
        setTime(newDate)
    }, 1000);
    let common = props.common;
    return (
        <div className="header">
            <Row>
                {
                    common ? <Col span={8} className="header1-left">
                        <img src="/assets/logo-ant.svg" alt="" />
                        <span>IMooc 通用管理系统</span>
                    </Col> : ''
                }
                <Col className="header1" span={common ? 16 : 24}>
                    <span>欢迎,抱妹妹走</span>
                    <a href="###">登录</a>
                </Col>
            </Row>
            {common ? "" : <Row className="header2">
                <Col span={6} className="header2-left">
                    <h2>首页</h2>
                </Col>
                <Col span={18} className="header2-right">
                    <h2>{time}</h2>
                </Col>
            </Row>}
        </div>
    );
}

export default Header;