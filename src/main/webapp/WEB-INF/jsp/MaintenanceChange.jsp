<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/maintenanceChange.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
<style type="text/css">
input[type='text']{border: none;padding: 0px;padding-left:2%;margin: 0px;width: 98%;height: 30px;line-height: 100%;background-color: #FFF;}
</style>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'id' value="${Maintenance.id}" style="display: none;"/>
		<input type="text" id = 'datetime' value="${Maintenance.datetime}" style="display: none;"/>
		<input type="text" id = 'projectId' value="${Maintenance.projectId}" style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1'>当班负责人</th>
				<th>
					<input type="text" id='leader' value="${Maintenance.leader}"/>
				</th>
			</tr>
			<tr>
				<th id='th1'>出勤人数</th>
				<th>
					<input type="text" id='attendance' value="${Maintenance.attendance}"/>
				</th>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="change()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>