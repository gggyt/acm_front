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
            <span>首页</span></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/manageUser"><Icon type="pie-chart" />
            <span>用户管理</span></Link>
          </Menu.Item>
          {/*<Menu.Item key="3">
            <Link to="/classify"><Icon type="inbox" />
            <span>目录</span></Link>
          </Menu.Item>*/}
          <SubMenu key="sub1" title={<span><Icon type="desktop" /><span>新闻</span></span>}>
            <Menu.Item key="6">
            <Link to="/classify">目录</Link>
            </Menu.Item>
            <Menu.Item key="5">
            <Link to = "/addNews">添加新闻</Link>
            </Menu.Item>
            <Menu.Item key="7">
            <Link to = "/manageNews">所有新闻</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>公告</span></span>}>
            <Menu.Item key="9">
            <Link to="/announcement">添加公告</Link>
            </Menu.Item>
            <Menu.Item key="10">
            <Link to="/manageAnnounce">所有公告</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>校赛</span></span>}>
            <Menu.Item key="13">
            <Link to="/competition">添加校赛</Link>
            </Menu.Item>
            <Menu.Item key="14">
            <Link to="/manageCompetition">管理校赛</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub10" title={<span><Icon type="appstore" /><span>印象</span></span>}>
            <Menu.Item key="23">
            <Link to="/manageImpression">管理印象</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" title={<span><Icon type="appstore" /><span>值日</span></span>}>
            <Menu.Item key="19">
            <Link to="/manageDayDuty">管理值日</Link>
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