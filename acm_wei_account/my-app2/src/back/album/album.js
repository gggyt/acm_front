import React from 'react';
import { Card } from 'antd';
import { Tabs } from 'antd';
import { Upload, Icon, Modal } from 'antd';
import ManageAlbum from './manageAlbum';
import '../static/my/css/album.css';

const { Meta } = Card;
const TabPane = Tabs.TabPane;


class Album extends React.Component{
  render() {
    return(
      <div className="main" style={{height:700}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="相册" key="1"><ManageAlbum /></TabPane>
          <TabPane tab="相片" key="2">选项卡二内容</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Album;