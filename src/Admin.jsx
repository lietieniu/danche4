import React from "react";
import { Row, Col } from "antd";
import NavLeft from "./components/navLeft";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import './style/common.less'

const Admin = (props) => {
    return (
        <div>
            <Row className="container">
                <Col className="left">
                    <NavLeft />
                </Col>
                <Col className="right">
                    <Header />
                    <Row className="content">
                        {props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        </div>
    );
}

export default Admin;