<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/weeklyRecord2.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../js/week/jQuery.print.min.js"></script>
<script type="text/javascript"  src="../word/FileSaver.js"></script>
<script type="text/javascript"  src="../word/jquery.wordexport.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css" media="screen"/>
<link rel="stylesheet" href="../css/print.css" media="screen"/>
<link rel="stylesheet" href="../css/print1.css" media="print"/>
<link rel="stylesheet" href="../css/iframeprint.css" media="print"/>
<title>周报历史记录</title>
<style type="text/css" media="screen">
table {width: 95%;margin-top: 50px;}
input {height: 24px;}
#h,#time,#people{display: none;}
</style>

</head>
<body>
	<div>
		<span>
			<input type="button" value="上一周" onclick='last()'/>
			<span id='year'></span>
			<input type="button" value="下一周" onclick='next()'/>
			
		<input id='print1' onclick="aa()" type="button" value="打印"/>
		<input id='print1' onclick="exportWord()" type="button" value="导出"/>
		</span>
		<%--<input type="text" id='id' th:value="${id}" style="display: none;"/>--%>
		<input type="hidden" id='id' value="${id}" />
		<div id='myElementId'>
		<h2 id='h'></h2>
		<span id="people" ></span>
		<span id="time" ></span>
		<table id='table'>
			<thead>
				<tr>
					<th width="15%">填写人</th>
					<td colspan="2" width="35%" id='fillIn'></td>
					<th width="15%">批准人</th>
					<td colspan="2" width="35%" id='auditor'></td>
				</tr>
			</thead>
			<thead>
				<tr>
					<th colspan="6">本周生产情况</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="5">内容</th>
				</tr>
			</thead>
			<tbody id='tbody1'></tbody>
			<thead>
				<tr>
					<th  colspan="6">主要备件消耗情况</th>
				</tr>
				<tr>
					<th>序号</th>
					<th>备件名称</th>
					<th>数量</th>
					<th>规格、型号(量程)</th>
					<th colspan="2">用途</th>
				</tr>
			</thead>
			<tbody id='tbody2'></tbody>
			<thead>
				<tr>
					<th colspan="6">本周巡检情况及缺陷处理统计:(项目重点设备与问题设备的工作状况)</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="2">设备名称</th>
					<th>主要问题</th>
					<th colspan="2">处理对策</th>
				</tr>
			</thead>
			<tbody id='tbody3'></tbody>
			<thead>
				<tr>
					<th colspan="6">缺陷统计情况</th>
				</tr>
				<tr>
					<th colspan="2">本周缺陷总数</th>
					<th colspan="2">已完成</th>
					<th>未完成</th>
					<th>完成率</th>
				</tr>
			</thead>
			<tbody id='tbody4'></tbody>
			<thead>
				<tr>
					<th colspan="6">未完成工作及设备存在问题的原因说明</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="2">项目名称</th>
					<th colspan="2">原因</th>
					<th>计划</th>
				</tr>
			</thead>
			<tbody id='tbody5'></tbody>
			<thead>
				<tr>
					<th colspan="6">备件计划</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="2">名称/型号</th>
					<th>数量</th>
					<th colspan='2'>用途</th>
				</tr>
			</thead>
			<tbody id='tbody6'></tbody>
			<thead>
				<tr>
					<th colspan="6">下周工作计划</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="5">内容</th>
				</tr>
			</thead>
			<tbody id='tbody7'></tbody>
			<thead>
				<tr>
					<th colspan="6">技改项目</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="5">内容</th>
				</tr>
			</thead>
			<tbody id='tbody8'></tbody>
		</table>
		</div>
	</div>
</body>
</html>