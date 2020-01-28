<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>网站管理系统</title>
<link rel="icon" href="Source/ico/brics-logo.ico" type="image/x-icon" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- easyui标准引用 -->
<script type="text/javascript" src="Source/easyui/jquery-3.3.1.min.js"></script>
</head>
    
  <!--共用js-->
  <style type="text/css">
    body,html,div,form,span{
      padding: 0;
      margin: 0;
    }
    body{
      font-size: 16px;
      color: #fff;
    }
    .login{
      width: 400px;
      margin: 0px auto 0;
      border-radius: 8px;
	  margin-top:13%;
      /* padding: 25px 30px; */
      position: relative
    }
    .header{
      font-size: 20px;
      text-align: center;
      margin-bottom: 25px;
      margin-top: 25px;
    }
    .input-item{
      width: 95%;
      margin: 20px auto 0;
    }
    .input-item input{
      width: 100%;
      height: 49px;
      padding: 0 15px 0 40px;
      box-sizing: border-box;
      box-shadow: none;
      border: 0;
      border-bottom: 1px solid#484856;
      font-size: 16px;
      color: #fff;
      background: none;
      outline:none;
    }
    .input-item input.user{
      background: url('Source/img/user.png') 10px 14px no-repeat;
      background-size: 18px 16px;
    }
    .input-item input.pass{
      background: url('Source/img/pass.png') 10px 18px no-repeat;
      background-size: 21px;
    }
    .submit{
      width: 100%;
      background: #8B2028;
      color: #fff;
      text-align: center;
      margin: 35px auto;
      line-height: 50px;
      border-radius: 0 0 10px 10px;
      cursor: default;
      font-size: 20px;
    }
    
    .submit:hover {
       background-color: #bb1522;
    }



   .submit:focus {
       background-color: #00ff00;
    }
    
    
    .input-item label{
      display: inline-block;
      width: 100%;
      margin-bottom: 15px;
    }
    .bg{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left:0;
      /* background: url(Source/img/bg_header2.jpg) top center repeat-x; */
      background: url(Source/img/bg5.jpg) top center repeat-x;
      background-size: 100% 100%;
    }
    .error-tip{
      color: #fff;
      text-align: left;
      padding-left: 10px;
    }
    
    .box{
      background: #2b2b36;
      text-align: center;
      border-radius: 10px;
    }
    .box .dot-bg{
      padding: 5px 0;
      text-align: center;
      font-weight: 600;
      color: #fff;
      background: #23232e;
      height: 50px;
      border-radius: 10px 10px 0 0;
    }
    .box .dot-bg .dot{
      width: 20px;
      height: 20px;
      display: block;
      float: right;
      border-radius: 50%;
      margin: 16px 10px 0px 0px
    }
    .box .dot-bg .dot.dot3{
      background: #f1c85f;
    }
    .box .dot-bg .dot.dot2{
      background: #2BAF95;
    }
    .box .dot-bg .dot.dot1{
      background: #8B2028;
    }
    .logo{
      width:130px;
      margin: 25px 0 15px;
    }
  </style>
</head>
<body>
<div>
  <div class="bg"></div>
  <form class="login" id="loginForm"  action="getLogin" method="post">
   <!-- <div class="header">BRICS网站管理系统</div>-->
    <div class="box">
      <div class="dot-bg">        
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
        </div>
        <img class="logo" src="Source/img/brics-logo.png" alt="">
        <div class="input-item">
            <label for="user">
                <input class="user" type="text"  id="username" name="username" placeholder="请输入账号">
            </label>
        </div>
        <div class="input-item">
            <label for="user">
                <input class="pass" type="password" id="password" name="password" placeholder="请输入密码">
            </label>
        </div>
        <div class="error-tip" id="error_msg">${msg}</div>
      <div class="submit" onclick="onLogin()">登陆</div>
    </div>
  </form>
</div>
</body>

<script type="text/javascript">

function onLogin(){
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	if (username == null || username == "") {
		$('#error_msg').text('用户名不能为空');
		return false;
	}
	if (password == null || password == "") {
		$('#error_msg').text('密码不能为空');
		return false;
	}
	document.getElementById('loginForm').submit();
	
}

</script>
</html>