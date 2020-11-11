<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/weeklyAdd.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
<style type="text/css">

input[type='text']{border: none;padding: 0px;padding-left:2%;margin: 0px;width: 98%;height: 30px;line-height: 100%;background-color: #FFF;}
</style>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'type' th:value="${type}" style="display: none;"/>
		<input type="text" id = 'weekId' th:value="${weekId}" style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1'>备件名称</th>
				<th>
					<input type="text" id='content1'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>数量</th>
				<th>
					<input type="text" id='content2'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>规格、型号(量程)</th>
				<th>
					<input type="text" id='content3'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>用途</th>
				<th>
					<input type="text" id='content4'/>
				</th>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="insert2()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>