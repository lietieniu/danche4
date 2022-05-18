import React from "react";
import './index.less';
import menuConfig from '../../config/menuConfig';
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu

const NavLeft = () => {
    const renderMenu = (list) => {
        return list.map((item) => {
            if (item.children) {
                return <SubMenu title={item.title} key={item.key}>
                    {renderMenu(item.children)}
                </SubMenu>
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
                {/* {item.title} */}
            </Menu.Item>
        })
    }
    return (
        <div>
            <div className="navLeft">
                <img src="/assets/logo-ant.svg" alt="" />
                <h1>Imooc MS</h1>
            </div>
            {/* 一.旧方法  */}
             <Menu theme="dark">
                {renderMenu(menuConfig)}
            </Menu>

            {/* 2.新版本方法
            <Menu 
            items={menuConfig}
            theme="dark"
            //onClick={( item)=>{<NavLink to={item.key}></NavLink>}}
            >

            </Menu> */}
</div>
    );
}

export default NavLeft;