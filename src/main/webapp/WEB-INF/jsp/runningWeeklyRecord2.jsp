<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/runningWeeklyRecord2.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../js/week/jQuery.print.min.js"></script>
<script type="text/javascript"  src="../word/FileSaver.js"></script>
<script type="text/javascript"  src="../word/jquery.wordexport.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>

<link rel="stylesheet" href="../css/print.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css"  media="screen"/>

<link rel="stylesheet" href="../css/print1.css" media="print"/>
<link rel="stylesheet" href="../css/iframeprint.css" media="print"/>
	<!--easyui-->
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
<title>运行周报</title>
<style type="text/css" media="screen">
table{width: 95%;margin-top: 50px;}
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
		<input type="text" id='id' th:value="${id}" style="display: none;"/>
		
		<div id='myElementId'>
		<h2 id='h'></h2>
		<span id="people" ></span>
		<span id="time" ></span>
		<table >
			<thead>
				<tr>
					<th>填写人</th>
					<td colspan="3" id='fillIn'></td>
					<th>批准人</th>
					<td colspan="3" id='auditor'></td>
				</tr>
				<tr>
					<th colspan="8">运行指标情况</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
				<!-- <tr>
					<th>参数</th>
					<th>单位</th>
					<th>1#</th>
					<th>2#</th>
					<th>3#</th>
					<th>4#</th>
					<th>5#</th>
					<th>6#</th>
				</tr> -->
			</thead>
			<tbody id='tbody1'></tbody>
			<!-- 
			<tbody id='tbody2'></tbody>
			<tbody id='tbody3'></tbody>
			<tbody id='tbody4'></tbody>
			<tbody id='tbody5'></tbody>
			<tbody id='tbody6'></tbody>
			<tbody id='tbody7'></tbody>
			 -->
			<thead>
				<tr>
					<th colspan="8">本周缺陷统计</th>
				</tr>
				<tr>
					<th colspan="2">机务专业总数</th>
					<th colspan="2">完成数</th>
					<th colspan="2">未完成数</th>
					<th colspan="2">完成率</th>
				</tr>
			</thead>
			<tbody id='tbody8'></tbody>
			<thead>
				<tr>
					<th colspan="8">本周未完成机务专业缺陷</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody9'></tbody>
			<thead>
				<tr>
					<th colspan="2">电仪专业总数</th>
					<th colspan="2">完成数</th>
					<th colspan="2">未完成数</th>
					<th colspan="2">完成率</th>
				</tr>
			</thead>
			<tbody id='tbody10'></tbody>
			<thead>
				<tr>
					<th colspan="8">本周未完成电仪专业缺陷</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody11'></tbody>
			<thead>
				<tr>
					<th colspan="8">存在问题</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody12'></tbody>
			<thead>
				<tr>
					<th colspan="8">需要调节事项</th>
				</tr>
				<tr>
					<th colspan="8">一、采购方面</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody13'></tbody>
			<thead>
				<tr>
					<th colspan="8">二、技改方面</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody14'></tbody>
			<thead>
				<tr>
					<th colspan="8">三、其他方面</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody15'></tbody>
			<thead>
				<tr>
					<th colspan="8">下周计划</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
				</tr>
			</thead>
			<tbody id='tbody16'></tbody>
			<thead>
				<tr>
					<th colspan="8">安健管理指标</th>
				</tr>
				<tr>
					<th colspan="2">习惯性违章</th>
					<th colspan="2">安装性违章</th>
					<th colspan="2">人员习惯违章</th>
					<th colspan="2">考核</th>
				</tr>
			</thead>
			<tbody id='tbody17'></tbody>
		</table>
		</div>
	</div>
</body>
</html>