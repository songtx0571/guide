<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/wfgdDailyRecord.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../js/week/jQuery.print.min.js"></script>
<script type="text/javascript"  src="../word/FileSaver.js"></script>
<script type="text/javascript"  src="../word/jquery.wordexport.js"></script>

<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css" media="screen"/>
<link rel="stylesheet" href="../css/print.css" media="screen"/>
<link rel="stylesheet" href="../css/print1.css" media="print"/>
<link rel="stylesheet" href="../css/iframeprint.css" media="print"/>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
<title>scr运行日志</title>
</head>
<body>
	<div>
		
		<input type="text" id='id' value="${param.id}" style="display: none;"/>
		<span>
			<input type="button" value="上一篇" onclick='last()'/>
			<input type="button" value="下一篇" onclick='next()'/>
			<input id='print1' onclick="aa()" type="button" value="打印"/>
		<input id='print1' onclick="exportWord()" type="button" value="导出"/>
		
		</span>
		<div id='myElementId'>
		<h2 id='h2'>运行日志</h2>
		<p style="height: 30px;">
			<span id='group' style="float: left;margin-left: 10%" ></span>
			<span id='datetime' style="float: right;margin-right: 10%"></span>
		</p>
		<table  style="width: 95%;margin-top: 5px;">
			<thead >
				<tr>
					<td>交接时间</td>
					<td colspan="2" id='type'></td>
					<td >接班人</td>
					<td id='successor' colspan="2"></td>
					<td >交班人</td>
					<td colspan="2" id='traders'></td>
				</tr>
				<tr>
					<td>纪录人</td>
					<td colspan="8" id='recorder'></td>
				</tr>
				<tr>
					<td>序号</td>
					<td colspan="8">交班情况</td>
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
				</tr>
				<tr>
					<td>PH计(台)</td><td id='2-1'>0</td>
					<td>量筒(只)</td><td id='2-2'>0</td>
					<td>取样杯(只)</td><td id='2-3'>0</td>
					<td>其他</td><td id='2-4'>0</td>
				</tr>
			</tbody>
			<thead>
				<tr><td colspan="9">班组运行情况</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="3">时间</td>
					<td colspan="5">内容</td>
				</tr>
			</thead>
			<tbody id='tbody3'>
				
			</tbody>
			<thead>
				<tr><td colspan="9">异常参数记录</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="3">时间</td>
					<td colspan="5">内容</td>
				</tr>
			</thead>
			<tbody id='tbody4'>
				
			</tbody>
		</table>
		</div>
	</div>
</body>
</html>