<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/runningWeeklyUpd.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>

<style type="text/css">

input[type='text']{border: none;padding: 0px;padding-left:2%;margin: 0px;width: 98%;height: 30px;line-height: 100%;background-color: #FFF;}
</style>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'id' value="${param.weekly.id}" style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:50%; rules:'all';border-collapse:collapse;">
			<tr> 
				<th colspan="2" if="${param.weekly.type} == 1">入口SO2浓度(mg/Nm3)</th>
				<th colspan="2" if="${param.weekly.type} == 2">入口NOX浓度(mg/Nm3)</th>
				<th colspan="2" if="${param.weekly.type} == 3">出口SO2浓度(mg/Nm3)</th>
				<th colspan="2" if="${param.weekly.type} == 4">出口NOX浓度(mg/Nm3)</th>
				<th colspan="2" if="${param.weekly.type} == 5">出口粉尘浓度(mg/Nm3)</th>
				<th colspan="2" if="${param.weekly.type} == 6">石灰石耗量(T)</th>
				<th colspan="2" if="${param.weekly.type} == 7">氨水耗量(T)</th>
			</tr>
			<tr>
				<th id='th1'>1#</th>
				<th>
					<input value="${param.weekly.content1}" type="text" id='content1'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>2#</th>
				<th>
					<input value="${param.weekly.content2}" type="text" id='content2'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>3#</th>
				<th>
					<input value="${param.weekly.content3}" type="text" id='content3'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>4#</th>
				<th>
					<input value="${param.weekly.content4}" type="text" id='content4'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>5#</th>
				<th>
					<input value="${param.weekly.content5}" type="text" id='content5'/>
				</th>
			</tr>
			<tr>
				<th id='th1'>6#</th>
				<th>
					<input value="${param.weekly.content6}" type="text" id='content6'/>
				</th>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="insert1()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>