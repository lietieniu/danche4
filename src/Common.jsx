import React from "react";
import { Row, Col } from "antd";
import Header from './components/Header/index';
import './style/common.less';

const Common = (props) => {
    return (
        <div>
            <Row>
                <Col className="common">
                    <Header common="common" />
                </Col>
            </Row>
            {props.children}
        </div>
    );
}

export default Common;