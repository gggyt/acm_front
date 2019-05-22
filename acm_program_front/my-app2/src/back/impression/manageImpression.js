import React from 'react';

import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert ,Popconfirm, message, Modal } from 'antd';
import cookie from 'react-cookies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import '../static/my/css/classfication.css';
import {SelectImpression} from '../../config/router.js';
import {UpdateImpressionUrl} from '../../config/router.js';
import {UpdateFriendUrl} from '../../config/router.js';
import {DetailImpression} from '../../config/router.js';
import {DeleteImpressionUrl} from "../../config/router.js"
import {AddFriendUrl} from '../../config/router.js';
import {DoneCompetitionUrl} from '../../config/router.js';
import {EventEmitter2} from 'eventemitter2'
var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()

const id = -1;

class UpdateImpression extends React.Component {
  state = { visible: false }

  constructor(props) {
    super(props);
    this.state = {
      impressionTxt:'',
      agreeNum:'',
      impressionId:''
    }
    this.impressionTxtChange = this.impressionTxtChange.bind(this);
    this.agreeNumChange = this.agreeNumChange.bind(this);
    this.updateClass = this.updateClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  showDeleteModal = () => {
    this.setState({
      deleteVisible: true,
    })
  }

  handleDeleteCancel = (e) => {
    console.log(e);
    this.setState({
      deleteVisible: false,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentWillMount(){
    this.getClass();
  }

  updateClass() {
    console.log(this.state.impressionTxt);
    console.log(this.state.agreeNum);
    fetch(UpdateImpressionUrl, {
      method: 'POST',
      headers : {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body:'impressionId='+this.props.items.impressionId+'&impressionTitle='+this.state.impressionTxt+"&agreeNum="+this.state.agreeNum
    }).then(res => res.json()).then(
      data => {
        if (data.code==0) {
          message.success('修改成功');
          emitter.emit('changeFirstText', '修改')
        } else {
          message.error(data.msg);
        }
      }
    )
  }

  deleteClass() {
    fetch(DeleteImpressionUrl, {
      method: 'POST',
      headers : {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body:'impressionId='+this.props.items.impressionId
    }).then(res => res.json()).then(
      data => {
        if (data.code==0) {
          message.success('删除成功');
          emitter.emit('changeFirstText', '删除')
        } else {
          message.error(data.msg);
        }
      }
    )    
  }

  impressionTxtChange = (e) => {
    this.setState({impressionTxt: e.target.value});
  }

  agreeNumChange = (e) => {
    this.setState({agreeNum: e.target.value});
  }

  render(){
    return (
      <span>
        <a href="javascript:;" onClick={this.showModal}>修改</a>
         <Modal
          title="修改"
          visible={this.state.visible}
          onOk={this.updateClass}
          onCancel={this.handleCancel}
          okText="确认修改"
          cancelText="取消"
        >
          <div>
            印象：<Input size="small" style={{height:30 , width:300}} 
            onChange={this.impressionTxtChange} value={this.state.impressionTxt}/>
          </div>
          <div>
            点赞数：
            <Input size="small"  style={{height:30 , width:300}} 
            onChange={this.agreeNumChange} value={this.state.agreeNum}/>
          </div>
        </Modal>
        &nbsp;|&nbsp;
        <a href="javascript:;" onClick={this.showDeleteModal}>删除</a>
         <Modal
          title="删除"
          visible={this.state.deleteVisible}
          onOk={this.deleteClass}
          onCancel={this.handleDeleteCancel}
          okText="确认删除"
          cancelText="取消删除"
        >
        </Modal>
      </span>
    )
  }
}

class ShowTable extends React.Component{
  constructor(props) {
    super(props);
    this.tmp = this.tmp.bind(this);
    this.subTable = (items) => {
      const columns = [
        {
          title: "印象",
          dataIndex: 'impressionTitle',
          key: 'impressionTitle',
        },
        {
          title: "点赞数",
          dataIndex: 'agreeNum',
          key: 'agreeNum',
        },
        {
          title: "添加时间",
          dataIndex: 'createDate',
          key: 'createDate',
        },
        {
          title: '操作',
          key: 'action',
          render: (items) => (
            <span>
              <UpdateImpression items={items}/>
            </span>
          ),
        }
      ];
      return <Table columns={columns} dataSource={items.impressionList} pagination={false} />;
    };
    this.columns = [
      {
        title: '用户',
        dataIndex: 'username',
        key: 'username',
      }
    ];
  };
  
  tmp = (key) => {
    console.log("------"+key);
    emitter2.emit('changeShow', key);

  }

  render() {
    console.log(this.props.all);
    return(
    <div>
      <Table columns={this.columns} 
      dataSource={this.props.all}
      expandedRowRender={items => this.subTable(items)}
      pagination={false} />
      
    </div>
    
    );
  }
}

class AllImpression extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,
      all: [],
    }
    this.buttonClick = this.buttonClick.bind(this);
    emitter.on('changeFirstText', this.changeText.bind(this))
  }

  

  changeText( msg ){
    this.getClass();
  }
  componentWillMount() {
    this.getClass();
  }
  getClass() {
    //alert(this.state.competitionTitle);
    fetch(SelectImpression, {
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: '&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
    }).then( res=> res.json()).then(
      data => {
        console.log(data);
        if (data.code==0) {
          if(data.resultBean.currentPage>0) {
            this.setState({nowPage: data.resultBean.currentPage});
          }else {
            this.setState({nowPage: 1});
          }
          this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
          this.setState({all: data.resultBean.items});
        } else {
          this.setState({nowPage: 1});
          this.setState({totalPage: 1});
          this.setState({all: ''});
          message.error(data.msg);
        }
      }
    )
  }
  competitionTitleChange(e) {
    this.setState({competitionTitle: e.target.value}, ()=>this.getClass());
  }
  pageChange = (page) => {
    console.log(page);
    this.setState({ nowPage: page }, () => this.getClass());
    
  }
  buttonClick() {
    this.getClass();
  }
  render() {
    return(
      <div style={{ flex: 1, padding: "10px" }}>
        <div className="title">
          <h3>印象</h3>
        </div>
        <div className="search"> 
         <ShowTable all={this.state.all}/> 
        </div>
        
      </div>
    );
  }
}
class ShowImpression extends React.Component{
  render() {
    return(
      <div>
       <AllImpression />
      </div>
    );
  }
}
export default ShowImpression;