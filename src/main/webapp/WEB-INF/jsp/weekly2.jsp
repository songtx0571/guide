<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="UTF-8"/>
	<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
	<script type="text/javascript"  src="../layer/layer.js"></script>
	<script type="text/javascript"  src="../js/week/weekly2.js"></script>
	<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
	<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
	<link rel="stylesheet" href="../css/tr.css"/>
	<link rel="stylesheet" href="../js/layui/css/layui.css">
	<script src="../js/layui/layui.js" type="text/javascript" charset="utf-8"></script>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
	<style>
		.detailedInfoDiv{
			display: none;
			background: #fff;
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
		}
		.img-change:hover{
			transform: scale(5);
		}
		body::-webkit-scrollbar{
			display: none;
		}
	</style>
	<title>周报</title>
</head>
<body>
<div>
		<span>
			年份选择:
			<div class="layui-inline">
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" name="entryDate" id="year" style="width: 200px;" readonly=""
						   placeholder="年">
                </div>
			</div>
			周选择:
			<input type="text" id="datetime"  onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})" class="Wdate"/>
			类别选择:<select id='type'>
				<option value="1">电仪</option>
				<option value="2">机务</option>
			</select>
			<shiro:hasPermission name='项目部选择'>
				项目组选择:<select id='project'></select>
			</shiro:hasPermission>
				<input id='query' onclick="change()" type="button" value="查询"/>
		</span>
	<table id='table' style="width: 60%;margin-top: 50px;">
		<thead>
		<tr>
			<!-- <th width="10%">项目名称</th>
            <td id='name'></td> -->
			<th>填写人</th>
			<td id='fillIn' colspan="3"></td>
			<th>批准人</th>
			<td  colspan="2"  id='auditor'></td>
		</tr>
		<tr>
			<th colspan="7">本周生产情况A</th>
		</tr>
		<tr>
			<th width='8%'>序号</th>
			<th width='12%'>缺陷号</th>
			<th width='32%' colspan="2">缺陷名称和处理方法</th>
			<th width='18%'>人员</th>
			<th width='10%'>工时</th>
			<th width='15%'>完成时间</th>
		</tr>
		</thead>
		<tbody id='tbody0'></tbody>
		<thead>
		<tr>
			<th colspan="7">本周生产情况</th>
		</tr>
		<tr>
			<th>序号</th>
			<th colspan="6">内容</th>
		</tr>
		</thead>
		<tbody id='tbody1'></tbody>
		<thead>
		<tr>
			<th  colspan="7">主要备件消耗情况</th>
		</tr>
		<tr>
			<th>序号</th>
			<th>备件名称</th>
			<th>数量</th>
			<th>规格、型号(量程)</th>
			<th colspan="2">用途</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody2'></tbody>
		<thead>
		<tr>
			<th colspan="7">本周巡检情况及缺陷处理统计:(项目重点设备与问题设备的工作状况)</th>
		</tr>
		<tr>
			<th>序号</th>
			<th colspan="2">设备名称</th>
			<th>主要问题</th>
			<th colspan="2">处理对策</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody3'></tbody>
		<thead>
		<tr>
			<th colspan="7">缺陷统计情况</th>
		</tr>
		<tr>
			<th colspan="2">本周缺陷总数</th>
			<th colspan="2">已完成</th>
			<th>未完成</th>
			<th>完成率</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody4'></tbody>
		<thead>
		<tr>
			<th colspan="7">未完成工作及设备存在问题的原因说明</th>
		</tr>
		<tr>
			<th>序号</th>
			<th colspan="2">设备名称</th>
			<th colspan="2">原因</th>
			<th>计划</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody5'></tbody>
		<thead>
		<tr>
			<th colspan="7">备件计划</th>
		</tr>
		<tr>
			<th>序号</th>
			<th colspan="2">名称/型号</th>
			<th>数量</th>
			<th colspan='2'>用途</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody6'></tbody>
		<thead>
		<tr>
			<th colspan="7">下周工作计划</th>
		</tr>
		<tr>
			<th>序号</th>
			<th colspan="5">内容</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody7'></tbody>
		<thead>
		<tr>
			<th colspan="7">技改项目</th>
		</tr>
		<tr>
			<th>序号</th>
			<th colspan="5">内容</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody id='tbody8'></tbody>
	</table>
</div>
</body>
</html>