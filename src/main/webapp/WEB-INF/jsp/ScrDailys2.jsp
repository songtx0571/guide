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
    <!--easyui-->
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
<!--    <script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>-->
<!--    <script type="text/javascript"  src="../layer/layer.js"></script>-->
<!--    <script type="text/javascript"  src="../js/week/wfgdDaily2.js"></script>-->
<!--    <script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>-->
<!--    <link rel="stylesheet" href="css/iframe.css" media="screen"/>-->
<!--    <link rel="stylesheet" href="css/tr.css"/>-->
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta charset="utf-8">
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="../DataTables-1.10.15/media/css/jquery.dataTables.css"/>
    <link rel="stylesheet" type="text/css" href="../Buttons-1.4.2/css/buttons.dataTables.min.css"/>
    <link rel="stylesheet" type="text/css" href="../Select-1.2.3/css/select.dataTables.min.css"/>
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/taskRecord.css"/>
    <!-- jQuery -->
    <script type="text/javascript" charset="utf8" src="../DataTables-1.10.15/media/js/jquery.js"></script>
    <!-- DataTables -->
    <script type="text/javascript" charset="utf8" src="../DataTables-1.10.15/media/js/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="utf8" src="../Select-1.2.3/js/dataTables.select.js"></script>
    <script type="text/javascript" charset="utf8" src="../Select-1.2.3/js/dataTables.select.min.js"></script>
    <script type="text/javascript" charset="utf8" src="../Buttons-1.4.2/js/buttons.html5.min.js"></script>
    <script type="text/javascript" charset="utf8" src="../Buttons-1.4.2/js/buttons.print.min.js"></script>
    <script type="text/javascript" src="../js/week/scrDailys.js"></script>

    <script type="text/javascript"  src="../layer/layer.js"></script>
    <!--    <link rel="stylesheet" href="css/Inform.css" >-->

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
<div class="table-c">
		<span>
			项目组选择:<select id='project'></select>
			<input id='query' onclick="change()" type="button" value="查询"/>
            <input id="return" onclick="window.location.href='/pollingSystem';pollingCreate()" type="button" value="返回">
		</span>
    <div id="divTable" style="height: 90%;">
        <table class="display" id="DataTable" >
            <thead>
            <tr>
                <th width="5%">序号</th>
                <th width="15%">日期</th>
                <th width="20%">交班时间</th>
                <th width="30%">交班人</th>
                <th width="30%">接班人</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>
<!--<script type="text/javascript" src="../js/inf.js"></script>-->
</html>


