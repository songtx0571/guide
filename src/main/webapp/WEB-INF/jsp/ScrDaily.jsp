<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/scrDaily.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css"/>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
<title>scr运行日志</title>
</head>
<body>
	<div>
		<span class='span'>
		日期选择<input type="text" id="datetime" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-M-d',maxDate:'%y-%M-%d'})" class="Wdate"/>
		班次<select id="type">
			<option value="3" selected="selected">夜班</option>
			<option value="1">白班</option>
			<option value="2">中班</option>
		</select>
		<shiro:hasPermission name='项目部选择'>
			项目组选择:<select id='project'></select>
			<input id='query' onclick="change()" type="button" value="查询"/>
		</shiro:hasPermission>
		</span>
		
		<table  style="width: 60%;margin-top: 50px;">
			<thead >
				<tr>
					<td>班组</td>
					<td id='group'></td>
					<td>接班人</td>
					<td id='successor'></td>
					<td>交班人</td>
					<td id='traders'></td>
					<td><img src='img/week/update.png' onclick = 'updScrDaily()'/></td>
				</tr>
				<tr>
					<td>序号</td>
					<td>时间</td>
					<td colspan="4">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody1'>
				
			</tbody>
			<thead>
				<tr><td colspan="7">主要运行参数</td></tr>
				<tr>
					<td colspan="2">机组</td>
					<td>喷氨量(t/h)</td>
					<td>氨逃逸(ppm)</td>
					<td>出口NOx浓度(mg/Nm³)</td>
					<td>反应器压差(KPa)</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="2">1#</td><td id='1-1'>0</td><td id='1-2'>0</td><td id='1-3'>0</td><td id='1-4'>0</td>
					<td id='1-5'><img src='img/week/update.png' onclick='add1(1)'/></td>
				</tr>
				<tr>
					<td colspan="2">2#</td><td id='2-1'>0</td><td id='2-2'>0</td><td id='2-3'>0</td><td id='2-4'>0</td>
					<td id='2-5'><img src='img/week/update.png' onclick='add1(2)'/></td>
				</tr>
				<tr>
					<td colspan="2">3#</td><td id='3-1'>0</td><td id='3-2'>0</td><td id='3-3'>0</td><td id='3-4'>0</td>
					<td id='3-5'><img src='img/week/update.png' onclick='add1(3)'/></td>
				</tr>
				<tr>
					<td colspan="2">4#</td><td id='4-1'>0</td><td id='4-2'>0</td><td id='4-3'>0</td><td id='4-4'>0</td>
					<td id='4-5'><img src='img/week/update.png' onclick='add1(4)'/></td>
				</tr>
				<tr>
					<td colspan="2">5#</td><td id='5-1'>0</td><td id='5-2'>0</td><td id='5-3'>0</td><td id='5-4'>0</td>
					<td id='5-5'><img src='img/week/update.png' onclick='add1(5)'/></td>
				</tr>
				
				<tr>
					<td colspan="2">6#</td><td id='6-1'>0</td><td id='6-2'>0</td><td id='6-3'>0</td><td id='6-4'>0</td>
					<td id='6-5'><img src='img/week/update.png' onclick='add1(6)'/></td>
				</tr>
			</tbody>
			<thead>
				<tr><td colspan="7">设备缺陷</td></tr>
				<tr><td colspan="7">本班发现消缺先情况及设备、数据异常情况</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="5">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody3'>
				
			</tbody>
			<thead>
				<tr><td colspan="7">本班氨水耗量统计</td></tr>
				<tr>
					<td width="15%">1#</td>
					<td width="15%">2#</td>
					<td width="15%">3#</td>
					<td width="15%">4#</td>
					<td width="15%">5#</td>
					<td width="15%">6#</td>
					<td width="10%">操作</td>
				</tr>
			</thead>
			<tbody id='tbody4'>
				
			</tbody>
		</table>
	</div>
</body>
</html>