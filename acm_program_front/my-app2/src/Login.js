import React from 'react';
import cookie from 'react-cookies';
import {LoginUrl} from './config/router.js';
import {  Button } from 'antd';
require('./static/css/style.css');
require('./static/css/bootstrap.min.css');
require('./static/my/css/login.css');

class Reason extends React.Component{
	render() {
		return (
			<div className="form-group">
				<div className="alert alert-danger" role="alert" id="message">
					{this.props.reason}
				</div>
			</div>
		);
	}
}

class Login extends React.Component{

	constructor(props) {
		super(props);
		this.state={
			username: '',
			password: '',
			fail: false,
			failReason: 'xx',
			formValid: false
		}
		this.usernameChange = this.usernameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	usernameChange(e) {
		this.setState({username: e.target.value})
	}
	passwordChange(e) {
		this.setState({password: e.target.value})
	}
	
	 submit(e) {
	// 	window.alert(this.state.username)
	// 	window.alert(this.state.password)
		//e.preventDefault();
		e.preventDefault();
	 	this.getDate();
	}

	getDate() {
		console.log('this.state.userName'+this.state.username);
		if (this.state.username.length==0) {
			this.setState({fail: true});
            this.setState({failReason: '请输入用户名'});
			return;
		}
		if (this.state.password==0) {
			this.setState({fail: true});
            this.setState({failReason: '请输入密码'});
			return;
		}
        fetch(LoginUrl,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'username='+this.state.username+'&password='+this.state.password

        }).then(res => res.json()).then(
            data => {
				//window.alert('code'+data.code);
                if(data.code==0) {
					cookie.save('token', data.resultBean.token, 1000);
                	//window.alert('验证成功，欢迎登录');
                	console.log(cookie.load('token'));
                	this.props.history.push('/Aside/manageUser');
                }
                else {
                	//cookie.remove('token');
                	this.setState({fail: true});
                	this.setState({failReason: data.msg});
                	return false;
                }
            }
        )
	}

	render() {

		let reason;
		if (this.state.fail) {
			reason = <Reason reason={this.state.failReason}/>;
		}
		return(
			<div className="backg bai">

			<center>
			<div className="container">
				
				<div className="row">
					<div style={{width:300, marginTop:200}}>
						

						<form  className="fh5co-form animate-box"  id="formLogin">
							<h2>登 录</h2>
							{reason}
							<div className="form-group">
								<label  className="sr-only">Username</label>
								<input type="text" className="form-control" id="username" placeholder="Username" onChange={this.usernameChange} autocomplete="off"/>
							</div>
							<div className="form-group">
								<label  className="sr-only">Password</label>
								<input type="password" className="form-control" id="password" placeholder="Password" onChange={this.passwordChange} autocomplete="off"/>
							</div>
							
							<div className="form-group">
								<Button onClick={this.submit}>提交</Button>
							</div>
						</form>


					</div>
				</div>
			</div>
			</center>
		</div>
		);
	}
}

export default Login;