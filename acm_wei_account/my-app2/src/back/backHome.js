import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon, Button } from 'antd';
import DatePicker from 'antd/lib/date-picker'; 
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './static/my/css/home.css';
import routes from './config/backHomeConf';

const SubMenu = Menu.SubMenu;


class Aside extends React.Component {

  render() {
    return (
    <Router basename="Aside">
    <div>
      <div  className="boxB">
      <div className="left" >
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to="/manageUser"><Icon type="pie-chart" />
            <span>用户管理</span></Link>
          </Menu.Item>
           <SubMenu key="sub14" title={<span><Icon type="desktop" /><span>论坛</span></span>}>
            <Menu.Item key="20">
            <Link to="/addInvitation">添加帖子</Link>
            </Menu.Item>
            <Menu.Item key="21">
            <Link to = "/manageInvitation">管理帖子</Link>
            </Menu.Item>
          </SubMenu>
          {/*<Menu.Item key="3">
            <Link to="/classify"><Icon type="inbox" />
            <span>目录</span></Link>
          </Menu.Item>*/}
          <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>相册</span></span>}>
            <Menu.Item key="11">
            <Link to="/album">管理相册</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="appstore" /><span>讲座</span></span>}>
            <Menu.Item key="15">
            <Link to="/addLecture">添加讲座</Link>
            </Menu.Item>
            <Menu.Item key="16">
            <Link to="/managelecture">管理讲座</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" title={<span><Icon type="appstore" /><span>友链</span></span>}>
            <Menu.Item key="17">
            <Link to="/manageFriendurl">管理友链</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" title={<span><Icon type="appstore" /><span>每日问题</span></span>}>
            <Menu.Item key="19">
            <Link to="/manageDayDuty">管理每日问题</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        {routes.map((route, index) => (
            // You can render a <Route> in as many places
            // as you want in your app. It will render along
            // with any other <Route>s that also match the URL.
            // So, a sidebar or breadcrumbs or anything else
            // that requires you to render multiple things
            // in multiple places at the same URL is nothing
            // more than multiple <Route>s.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
      </div>
      </Router>
    );
  }
}

export default Aside;