<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/maintenance.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css"/>
<title>检修日志</title>
</head>
<body>
	<div style="height: 100%">
		<span class='span'>
		日期选择<input type="text" id="datetime"  onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})" class="Wdate"/>
		<shiro:hasPermission name='项目部选择'>
			项目组选择:<select id='project'></select>
			<input id='query' onclick="change()" type="button" value="查询"/>
		</shiro:hasPermission>
		</span>
		
		<table  style="width: 80%;margin-top: 50px;">
			<thead >
				<tr>
					<td width='8%'>负责人</td>
					<td colspan="3" width='27%' id='leader'></td>
					<td width='10%'>工作安排</td>
					<td colspan="2" width='20%' id='num'></td>
					<td width='10%'>出勤人数</td>
					<td colspan="2" width='25%' id='attendance'></td>
				</tr>
				<tr>
					<td colspan="10">工作安排A</td>
				</tr>
				<tr>
					<td width='8%'>序号</td>
					<td width='12%'>缺陷号</td>
					<td width='42%' colspan="4">缺陷名称和处理方法</td>
					<td width='18%'>人员</td>
					<td width="5">工时</td>
					<td width='15%' colspan="2">完成时间</td>
				</tr>
			</thead>
			<tbody id='tbody0'></tbody>
			<thead>
				<tr>
					<td colspan="10">工作安排</td>
				</tr>
				<tr>
					<td width='8%'>序号</td>
					<td width='8%'>缺陷号</td>
					<td width='44%' colspan="4">缺陷名称和处理方法</td>
					<td width='10%'>人员</td>
					<td width='5%'>工时</td>
					<td width='15%'>创建时间</td>
					<td width='10%'>操作</td>
				</tr>
			</thead>
			<tbody id='tbody1'></tbody>
			<thead>
				<tr><td colspan="10">技术交流</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="8">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody2'></tbody>
			<thead>
				<tr><td colspan="10">安全交流</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="8">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody3'>
				
			</tbody>
			<thead>
				<tr><td colspan="10">巡检情况</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="8">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody4'>
				
			</tbody>
			<thead>
				<tr><td colspan="10">检修情况</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="8">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody5'>
				
			</tbody>
			<thead>
				<tr><td colspan="10">班后总结</td></tr>
				<tr>
					<td>序号</td>
					<td colspan="8">内容</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody id='tbody6'>
				
			</tbody>
		</table>
	</div>
</body>
</html>