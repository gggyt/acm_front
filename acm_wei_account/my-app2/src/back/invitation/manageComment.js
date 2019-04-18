import {
  Table, Badge, Menu, Dropdown, Icon,message,Pagination,Popconfirm
} from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cookie from 'react-cookies';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import '../static/my/css/classfication.css';
import {SelectComment} from '../../config/router.js';
import {DeleteComment} from '../../config/router.js';
import {UpdateAnnounceFirst} from '../../config/router.js';
import {DoneCompetitionUrl} from '../../config/router.js';


const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);


class SubComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      all:[],
      nowPage: 1,
      totalPage: 1,
      pageSize: 1,
    }
    this.columns= [
      { title: '评论人', dataIndex: 'username', key: 'username' },
      { title: '评论信息', dataIndex: 'commentBody', key: 'commentBody' },
      { title: '评论时间', dataIndex: 'createDate', key: 'createDate' },
      
      {
         title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.commentId)}>
                <a  href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          ),
      },
    ];
  }
  handleDelete = (commentId) => {
    fetch(DeleteComment,{   //Fetch方法
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'commentId='+commentId

    }).then(res => res.json()).then(
      data => {
        if (data.code==0) {
          message.info(data.msg);
          this.getComment();
        }
        else {
          message.error(data.msg)
        }
      }
    )
  }
  componentDidMount(){
    this.getComment();
  }
  pageChange = (page) => {
      console.log(page);
      this.setState({ nowPage: page }, () => this.getComment());
       document.documentElement.scrollTop =0;
  }
  getComment = () => {
    fetch(SelectComment,{   //Fetch方法
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'invitationId='+this.props.invitationId+'&p_commentId='+this.props.p_commentId+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize

    }).then(res => res.json()).then(
      data => {
        //window.alert('code'+data.code);
        if(data.code==0) {
          console.log(data.resultBean.items)
          this.setState({all:data.resultBean.items});
          this.setState({nowPage: data.resultBean.currentPage});
          this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
        }
        else {
         message.error(data.msg);
        }
      }
    )
  }
  render() {
    return (
      <div>
        <div>
          <Table
            columns={this.columns}
            dataSource={this.state.all}
            pagination={false}
          />
        </div>
      
        <div className="searchPage">
          <Pagination size="small" simple onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize}
          pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
        </div>
      </div>
   );
  }
  
}
class ManageComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      all:[],
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,

      data1:[]
    }
    this.columns= [
      { title: '评论人', dataIndex: 'username', key: 'username' },
      { title: '评论信息', dataIndex: 'commentBody', key: 'commentBody' },
      { title: '评论时间', dataIndex: 'createDate', key: 'createDate' },
      {
        title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.commentId)}>
                <a  href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          
        ),
      },
    ];
    for (let i = 0; i < 3; ++i) {
      this.state.data1.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }
  }
  handleDelete = (commentId) => {
    fetch(DeleteComment,{   //Fetch方法
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'commentId='+commentId

    }).then(res => res.json()).then(
      data => {
        //window.alert('code'+data.code);
        if (data.code==0) {
          message.info(data.msg)
          this.getComment();
        }
        else {
          message.error(data.msg)
        }
      }
    )
  }
  componentDidMount(){
    this.getComment();
  }
  getComment = () => {
    fetch(SelectComment,{   //Fetch方法
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'invitationId='+this.props.match.params.id+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize

    }).then(res => res.json()).then(
      data => {
        //window.alert('code'+data.code);
        if(data.code==0) {
          console.log(data.resultBean.items)
          this.setState({all:data.resultBean.items});
          this.setState({nowPage: data.resultBean.currentPage});
          this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
        }
        else {
         message.error(data.msg);
        }
      }
    )
  }
 expandedRowRender = (record) => {
    console.log(record);
    return (
      <SubComment p_commentId={record.commentId} invitationId={this.props.match.params.id}/>
    );
  };
  pageChange = (page) => {
      console.log(page);
      this.setState({ nowPage: page }, () => this.getComment());
       document.documentElement.scrollTop =0;
  }
  render() {
    return (
    <div style={{ flex: 1, padding: "10px" }}>
        <div className="title">
          <h3>评论</h3>
        </div>
        <div className="search"> 
          <Table
            className="components-table-demo-nested"
            columns={this.columns}
            expandedRowRender={record => this.expandedRowRender(record)}
            dataSource={this.state.all}
            pagination={false}
          />
        </div>
        <div className="searchPage">
        <Pagination size="small" simple onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize}
        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
      </div>
    </div>
    
  );
  }
  
}
export default ManageComment;