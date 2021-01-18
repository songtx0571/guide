<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8" content="width=device-width" name="viewport"/>
<title>检修日志记录查询</title>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
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
<script type="text/javascript" src="../js/week/maintenances.js"></script>

<script type="text/javascript"  src="../layer/layer.js"></script>
<style type="text/css">
html{height:100%;}
body{width:98%;height: 98%;}
</style>
</head>
<body>
	<div class="table-c">
		<span>
			<shiro:hasPermission name='项目部选择'>
				项目组选择:<select id='project'></select>
				<input id='query' onclick="change()" type="button" value="查询"/>
			</shiro:hasPermission>
		</span>
        <div id="divTable" style="height: 90%;">
        	<table class="display" id="DataTable" >
            	<thead>
                	<tr>
                    	<th width="5%">序号</th>
                        <th width="15%">日期</th>
                        <th width="17.5%">负责人</th>
                        <th width="12.5%">出勤人数</th>
                        <th width="12.5%">工作安排</th>
                        <th width="12.5%">日人均消缺数</th>
                        <th width="12.5%">日总工时</th>
            			<th width="12.5%">日人均工时</th>
                   </tr>
              	</thead>
         	</table>
       	</div>
	</div>
</body>
</html>