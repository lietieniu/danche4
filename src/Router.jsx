import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import Home from './components/Content/index';
import NoMatch from "./components/NoMatch";
//1.城市管理
import City from "./views/City";
//2.订单管理
import Order from "./views/Order";
//3.二级详情页面
import Common from "./Common";
//3.1订单详情
import OrderDetail from './views/Order/orderDetail'
//4.员工管理
import User from "./views/User";

const Router1 = () => {
    return (
        <div>
            <Router>
                <App>
                    <Switch>
                        <Route path='/Common' render={() =>
                            <Common>
                                <Switch>
                                    <Route exact={true} path='/Common/OrderDetail/:orderId' component={OrderDetail}/>
                                </Switch>
                            </Common>
                        } />
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                    <Route exact={true} path='/' component={Home} />
                                    <Route exact={true} path='/Home' component={Home} />
                                    <Route exact={true} path='/city' component={City} />
                                    <Route exact={true} path='/order' component={Order} />
                                    <Route exact={true} path='/user' component={User}/>
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </Router>
        </div>
    );
}

export default Router1;