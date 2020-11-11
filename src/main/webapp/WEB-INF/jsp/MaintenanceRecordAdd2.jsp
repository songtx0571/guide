<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="layer/layer.js"></script>
<script type="text/javascript"  src="js/week/maintenanceAdd.js"></script>
<link rel="stylesheet" href="css/iframe.css"/>
<link rel="stylesheet" href="css/tr2.css"/>
	<link rel="stylesheet" type="text/css" href="js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="js/easyui/themes/icon.css">
	<script type="text/javascript" src="js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="js/easyui/jquery.easyui.min.js"></script>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'type' th:value="${type}" style="display: none;"/>
		<input type="text" id = 'maintenanceId' th:value="${maintenanceId}" style="display: none;"/>
		<input type="text" id = 'people'  style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1' width='20%'>内容</th>
				<th  width='80%'>
					<textarea id='content' rows="5" cols="50" maxlength="100"></textarea>
				</th>
			</tr>
			<tr>
				<th>缺陷号</th>
				<th ><input type="text" id='defectNumber'/></th>
			</tr>
			<tr>
				<th>人员(人员之间请用.号隔开)</th>
				<td id='peopleName'><img src="img/and.png" onclick="addPeople()"></td>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="insert()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>