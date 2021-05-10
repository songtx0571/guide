<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/scrDailyRecord.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../js/week/jQuery.print.min.js"></script>
<script type="text/javascript"  src="../word/FileSaver.js"></script>
<script type="text/javascript"  src="../word/jquery.wordexport.js"></script>

<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css" media="screen"/>
<link rel="stylesheet" href="../css/print.css" media="screen"/>
<link rel="stylesheet" href="../css/print1.css" media="print"/>
<link rel="stylesheet" href="../css/iframeprint.css" media="print"/>
<title>scr运行日志</title>
</head>
<body>
	<div>
		
		<input type="text" id='id' value="${id}" style="display: none;"/>
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
					<td id='type'></td>
					<td>接班人</td>
					<td id='successor'></td>
					<td>交班人</td>
					<td id='traders'></td>
				</tr>
				<tr>
					<td>序号</td>
					<td>时间</td>
					<td colspan="4">内容</td>
				</tr>
			</thead>
			<tbody id='tbody1'>
				
			</tbody>
			<thead>
				<tr><td colspan="6">主要运行参数</td></tr>
				<tr>
					<td colspan="2">机组</td>
					<td>喷氨量(t/h)</td>
					<td>氨逃逸(ppm)</td>
					<td>出口NOx浓度(mg/Nm³)</td>
					<td>反应器压差(KPa)</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="2">1#</td><td id='1-1'>0</td><td id='1-2'>0</td><td id='1-3'>0</td><td id='1-4'>0</td>
				</tr>
				<tr>
					<td colspan="2">2#</td><td id='2-1'>0</td><td id='2-2'>0</td><td id='2-3'>0</td><td id='2-4'>0</td>
				</tr>
				<tr>
					<td colspan="2">3#</td><td id='3-1'>0</td><td id='3-2'>0</td><td id='3-3'>0</td><td id='3-4'>0</td>
				</tr>
				<tr>
					<td colspan="2">4#</td><td id='4-1'>0</td><td id='4-2'>0</td><td id='4-3'>0</td><td id='4-4'>0</td>
				</tr>
				<tr>
					<td colspan="2">5#</td><td id='5-1'>0</td><td id='5-2'>0</td><td id='5-3'>0</td><td id='5-4'>0</td>
				</tr>
				
				<tr>
					<td colspan="2">6#</td><td id='6-1'>0</td><td id='6-2'>0</td><td id='6-3'>0</td><td id='6-4'>0</td>
				</tr>
			</tbody>
			<thead>
				<tr><td colspan="6">设备缺陷</td></tr>
				<tr><td colspan="6">本班发现消缺先情况及设备、数据异常情况</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="5">内容</td>
				</tr>
			</thead>
			<tbody id='tbody3'>
				
			</tbody>
			<thead>
				<tr><td colspan="6">本班氨水耗量统计</td></tr>
				<tr>
					<td width="15%">1#</td>
					<td width="15%">2#</td>
					<td width="15%">3#</td>
					<td width="15%">4#</td>
					<td width="15%">5#</td>
					<td width="15%">6#</td>
				</tr>
			</thead>
			<tbody id='tbody4'>
				
			</tbody>
		</table>
		</div>
	</div>
</body>
</html>