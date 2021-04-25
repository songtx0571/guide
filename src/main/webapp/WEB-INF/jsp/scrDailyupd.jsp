<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/scrDailyUpd.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
<style type="text/css">
input[type='text']{border: none;padding: 0px;padding-left:2%;margin: 0px;width: 98%;height: 30px;line-height: 100%;background-color: #FFF;}
</style>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'id' value="${scrDaily.id}" style="display: none;"/>
		<input type="text" id = 'datetime' value="${scrDaily.datetime}" style="display: none;"/>
		<input type="text" id = 'type' value="${scrDaily.type}" style="display: none;"/>
		<input type="text" id = 'projectId' value="${scrDaily.projectId}" style="display: none;"/>
		<input type="text" id = 'other' value="${scrDaily.other}" style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1'>班组</th>
				<th>
					<select id="group">
						<option value="1" if='${scrDaily.group}!=1'>甲</option>
						<option value="1" if='${scrDaily.group}==1' selected="selected">甲</option>
						<option value="2" if='${scrDaily.group}!=2'>乙</option>
						<option value="2" if='${scrDaily.group}==2' selected="selected">乙</option>
						<option value="3" if='${scrDaily.group}!=3'>丙</option>
						<option value="3" if='${scrDaily.group}==3' selected="selected">丙</option>
						<option value="4" if='${scrDaily.group}!=4'>丁</option>
						<option value="4" if='${scrDaily.group}==4' selected="selected">丁</option>
					</select>
				</th>
			</tr>
			<tr>
				<th id='th1'>交班人</th>
				<th>
					<input type="text" id='traders' value="${scrDaily.traders}"/>
				</th>
			</tr>
			<tr>
				<th id='th1'>接班人</th>
				<th>
					<input type="text" id='successor' value="${scrDaily.successor}"/>
				</th>
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