<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/wfgdDaily2.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css"/>
<title>运行日志</title>
</head>
<body>
	<div>
		<span class='span'>
		日期选择<input type="text" id="datetime" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-M-d',maxDate:'%y-%M-{%d+1}'})" class="Wdate"/>
		班次<select id="type">
			<option value="3">夜班</option>
			<option value="1" selected="selected">白班</option>
			<option value="2">中班</option>
		</select>
		<shiro:hasPermission name='项目部选择'>
			项目组选择:<select id='project'></select>
		</shiro:hasPermission>
			<input id='query' onclick="change()" type="button" value="查询"/>
		</span>

		<table  style="width: 96%;margin-top: 50px;">
			<thead >
				<tr>
					<!-- <td>班组</td>
					<td id='group' ></td> -->
					<td>接班人</td>
					<td id='successor' colspan="2"></td>
					<td >交班人</td>
					<td colspan="2" id='traders'></td>
					<td>纪录人</td>
					<td colspan="3" id='recorder'></td>
					<!-- <td><img src='img/week/update.png' onclick = 'updScrDaily()'/></td> -->
				</tr>
				<tr>
					<td>序号</td>
					<td colspan="8">交班情况</td>
					<td>操作</td>
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
					<td width="10%" id='1-5'><img src='../img/week/update.png' onclick = 'add1(1)'/></td>
				</tr>
				<tr>
					<td>PH计(台)</td><td id='2-1'>0</td>
					<td>量筒(只)</td><td id='2-2'>0</td>
					<td>取样杯(只)</td><td id='2-3'>0</td>
					<td>其他</td><td id='2-4'>0</td>
					<td width="10%" id='2-5'><img src='../img/week/update.png' onclick = 'add1(2)'/></td>
				</tr>
			</tbody>
			<thead>
			<tr><td colspan="10">班组运行情况A</td></tr>
			<tr>
				<td>序号</td>
				<td colspan="2">编号</td>
				<td colspan="3">详情</td>
				<td colspan="2">创建人</td>
				<td colspan="2">创建时间</td>
			</tr>
			</thead>
			<tbody id='tbody0'>

			</tbody>
			<thead>
				<tr><td colspan="10">班组运行情况</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="3">时间</td>
					<td colspan="5">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody3'>

			</tbody>
			<thead>
				<tr><td colspan="10">异常参数记录</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="3">时间</td>
					<td colspan="5">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody4'>

			</tbody>
		</table>
	</div>
</body>
</html>