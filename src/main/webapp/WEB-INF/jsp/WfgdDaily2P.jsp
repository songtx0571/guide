<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>杭州浩维管理平台</title>
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <script type="text/javascript" src="../layui/layui.all.js"></script>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/ajaxfileupload.js"></script>
    <script src="../layui/layui.js" charset="utf-8"></script>
    <!--    <script type="text/javascript" src="../js/inf.js"></script>-->
    <script type="text/javascript" src="../js/polling.js"></script>
    <script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
    <script type="text/javascript"  src="../layer/layer.js"></script>
    <script type="text/javascript"  src="../js/week/wfgdDaily2.js"></script>
    <script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
    <link rel="stylesheet" href="../css/iframe.css" media="screen"/>
    <link rel="stylesheet" href="../css/tr.css"/>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta charset="utf-8">
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
<!--    <link rel="stylesheet" href="css/Inform.css" >-->
    <!--easyui-->
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <link href="css/logo.css" rel="stylesheet"/>
    <style>
        .site-doc-icon li .layui-anim {
            width: 150px;
            height: 150px;
            line-height: 150px;
            margin: 0 auto 10px;
            text-align: center;
            /*background-color: #009688;*/
            background-color: #44ACFF;

            cursor: pointer;
            color: #fff;
            border-radius: 50%;
        }
    </style>
</head>
<style>
    #banner-2{
        width: 100%;
        height: 100%;
        z-index: 1000;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        outline: 0;
        -webkit-overflow-scrolling: touch;
        filter: alpha(opacity=20);
        background-color: rgba(0,0,0,0.5);
        display: none;
    }
    #white_content1-labor-2 {
        display: none;
        position: absolute;
        border-radius: 4px;
        top: 300px;
        left: 550px;
        width: 800px;
        height: 580px;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(74, 144, 226, 0.80);
        z-index: 1002;
        /*overflow: none;*/
    }
    th .layui-table-cell{
        text-align: center;
    }
    th .layui-table-cell{
        text-align: center;
    }
    #logo{
        width: 64px;!important;
        height: 64px;!important;
    }
</style>
<body leftmargin=0 topmargin=0 width=100% height=100%>
<div>
		<span class='span'>
		日期选择<input type="text" id="datetime" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-M-d',maxDate:'%y-%M-{%d+1}'})" class="Wdate"/>
		交班时间<select id="type">
			<option value="3" selected="selected">00:00</option>
			<option value="1">8:00</option>
			<option value="2">16:00</option>
		</select>
		    项目组选择:<select id='project'></select>
		    <input id='query' onclick="change()" type="button" value="查询"/>
            <input id="return" onclick="window.location.href='/pollingSystem';pollingCreate()" type="button" value="返回">
		</span>

    <table  style="width: 60%;margin-top: 50px;">
        <thead >
        <tr>
            <!-- <td>班组</td>
            <td id='group' ></td> -->
            <td>接班人</td>
            <td id='successor' colspan="2"></td>
            <td >交班人</td>
            <td colspan="2" id='traders'></td>
            <td>纪录人</td>
            <td colspan="3" id='recorder'></td>
            <!-- <td><img src='img/week/update.png' onclick = 'updScrDaily()'/></td> -->
        </tr>
        <tr>
            <td>序号</td>
            <td colspan="8">交班情况</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody1'>

        </tbody>
        <tbody>
        <tr>
            <td rowspan="2" width="10%">工器具</td>
            <td width="10%">对讲机(部)</td><td width="10%" id='1-1'>0</td>
            <td width="10%">电子秤(台)</td><td width="10%" id='1-2'>0</td>
            <td width="10%">测震仪(部)</td><td width="10%" id='1-3'>0</td>
            <td width="10%">测温仪(部)</td><td width="10%" id='1-4'>0</td>
            <td width="10%" id='1-5'><img src='img/week/update.png' onclick = 'add1(1)'/></td>
        </tr>
        <tr>
            <td>PH计(台)</td><td id='2-1'>0</td>
            <td>量筒(只)</td><td id='2-2'>0</td>
            <td>取样杯(只)</td><td id='2-3'>0</td>
            <td>其他</td><td id='2-4'>0</td>
            <td width="10%" id='2-5'><img src='img/week/update.png' onclick = 'add1(2)'/></td>
        </tr>
        </tbody>
        <thead>
        <tr><td colspan="10">班组运行情况</td></tr>
        <tr>
            <td>序号</td>
            <td colspan="3">时间</td>
            <td colspan="5">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody3'>

        </tbody>
        <thead>
        <tr><td colspan="10">异常参数记录</td></tr>
        <tr>
            <td>序号</td>
            <td colspan="3">时间</td>
            <td colspan="5">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody4'>

        </tbody>
    </table>
</div>
</body>
<!--<script type="text/javascript" src="../js/inf.js"></script>-->
</html>


