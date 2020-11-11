<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8" content="width=device-width" name="viewport"/>
<title>设备维护历史记录查询</title>
<!-- DataTables CSS -->
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
<script type="text/javascript" src="../js/week/weeks2.js"></script>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<style type="text/css">
html{height:100%;}
body{width:98%;height: 98%;}
</style>
</head>
<body>
	<div class="table-c">
		<span>
			项目组选择:<select id='project'></select>
			<input id='query' onclick="change()" type="button" value="查询"/>
		</span>
        <div id="divTable" style="height: 90%;">
        	<table class="display" id="DataTable" >
            	<thead>
                	<tr>
                    	<th width="5%">序号</th>
                        <th width="5%" id="date">年</th>
                        <th width="5%">周</th>
                        <th width="10%">类别</th>
                        <th width="20%">编号</th>
                        <th width="20%">填写人</th>
                        <th width="20%" style="word-wrap:break-word;">审核人</th>
                        <th width="15%">操作</th>
                   </tr>
              	</thead>
         	</table>
       	</div>
	</div>
</body>
</html>