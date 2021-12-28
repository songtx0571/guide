<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/maintenanceRecord.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../js/week/jQuery.print.min.js"></script>
<script type="text/javascript"  src="../word/FileSaver.js"></script>
<script type="text/javascript"  src="../word/jquery.wordexport.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css" media="screen"/>
<link rel="stylesheet" href="../css/print.css" media="screen"/>
<link rel="stylesheet" href="../css/print1.css" media="print"/>
<link rel="stylesheet" href="../css/iframeprint.css" media="print"/>

<title>检修日志详情</title>
</head>
<body>
	<div>
		<input type="text" id='id' value="${id}" style="display: none;"/>
		<span>
			<input type="button" value="上一篇" onclick='last()'/>
			<input type="button" value="下一篇" onclick='next()'/>
			<input id='print1' onclick="aa()" type="button" value="打印"/>
			<input id='print2' onclick="exportWord()" type="button" value="导出"/>
		</span>
		<div id='myElementId'>
			<h2 id='h2'>检修日志</h2>
		<table style="width: 96%;margin-top: 50px; text-align: center;">
			<thead >
				<tr>
					<td width='10%'>当班负责人</td>
					<td colspan="5" id='leader' width='60%'></td>
					<td colspan="2" width='10%'>值班日期</td>
					<td id='datetime' width='20%'></td>
				</tr>
				<tr>
					<td >当天缺陷量</td>
					<td colspan="5" id='num'></td>
					<td colspan="2">出勤人数</td>
					<td id='attendance'></td>
				</tr>
			</thead>
			<tbody id="tbody0"></tbody>
			<tbody id='tbody'>
			
			</tbody>
		</table>
		</div>
	</div>
</body>
</html>