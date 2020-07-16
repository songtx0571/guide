<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<link rel="stylesheet" type="text/css" href="js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="js/easyui/themes/icon.css">
<script type="text/javascript" src="js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/week/login.js?version=1.01"></script>
<meta name="viewport" content="width=device-width,initial-scale=1" />

<head>
    <style>
        body {
            margin: 0;
            width: 1200px;
            height: 1920px;
        }

        .whole {
            width: 1200px;
            height: 1920px;
            background: url("img/loginP.png") no-repeat;
            backgroud-size: 1920px 971px;
        }

        .white_content {
            position: absolute;
            top: 600px;
            left: 300px;
            width: 700px;
            height: 500px;
            background-color: white;
            z-index: 1001;
            border-radius: 8px;
            padding: 20px;
        }

        * {
            padding: 0px;
            margin: 0px;
        }

        #tab {
            padding: 5px;
            height: 400px;
            margin: 20px 50px;
            text-align: center;
        }

        #tab ul {
            list-style: none;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            margin-left: 10px;
        }

        #tab ul li {
            background: #FFF;
            cursor: pointer;
            float: left;
            list-style: none;
            height: 29px;
            line-height: 29px;
            padding: 0px 30px;
            border-bottom: 2px solid #E6E6E6;
            text-align: center;
            font-size: 18px;
            marigin: 20px;
            font-family: "华文黑体";
        }

        #tab ul li.on {
            border-bottom: 2px solid #4A4A4A;
        }

        #tab div {
            height: 400px;
            width: 550px;
            line-height: 24px;
            border-top: none;
            padding: 10px;
        }

        #loginlist {
            line-height: 70px;
            font-family: "华文黑体";
            font-size: 24px;
        }

        .set {
            background: white;
            border-radius: 8px;
            width: 350px;
            height: 60px;
            font-family: "华文黑体";
            font-size: 25px;
            color: #9B9B9B;
            text-align: left;
            outline: none;
            padding: 0 10px 0 10px;
            border: 1px #44ACFF solid;
            margin-left: 10px;
            margin-bottom: 20px;
        }
        input:focus {
            -webkit-box-shadow: 0 0 5px #ccc; /*点击input 外阴影*/
            -moz-box-shadow: 0 0 5px #ccc;
            box-shadow: 0 0 8px #44ACFF;
            outline: 0; /*去掉默认谷歌点击input边框显示蓝色  */
            background: #fff; /*input内背景为白色*/
        }

        .button {
            display: inline-block;
            background: #44ACFF;
            border: 1px solid #44ACFF;
            border-radius: 8px;
            color: white;
            width: 350px;
            height: 60px;
            font-size: 25px;
            outline: none;
            cursor: pointer;
            margin: 20 0px 0 60px;
        }

        .button:active {
            background-color: #E27635;
            border-color: #E27635;
        }

    </style>
    <title>浩维运行引导管理平台</title>
</head>
<body leftmargin=0 topmargin=0 >
<div class="whole">
    <div class="white_content">
        <div style="float: left; width: 30%; text-align: right; height: 120px">
            <img src="img/logo.png" width="120px" height="120px" style="float: bottom" />
        </div>
        <div style="height: 120px; float: bottom; text-align: left; color: #4A4A4A;">
            <a style="line-height: 120px; font-size: 35px;">浩维运行引导管理平台</a>
        </div>
        <div id="tab">
            <div id="secondPage">
                <form action="loginPage" name="register2" method="post" id="loginlist">
                    <span style="font-size: 25px;">账号:</span><input type="text" name="UserName" placeholder="请输入账号" id="UserName" class="set"  onfocus="this.placeholder=''" onblur="this.placeholder='请输入账号'"><br>
                    <span style="font-size: 25px;">密码:</span><input type="password" name="Password" placeholder="请输入密码" id="Password" class="set"  onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"><br>
                    <input type="submit" value="登录" onClick="javascript:loginPage();" class="button" style="text-align: center;" id="button02">
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>
