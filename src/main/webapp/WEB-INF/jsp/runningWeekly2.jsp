<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/runningWeekly2.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="../css/iframe.css" media="screen"/>
<link rel="stylesheet" href="../css/tr.css"/>
<title>运行周报</title>
</head>
<body>
	<div>
		<span>
			年份选择:<input type="text" id="year" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy年',maxDate:'%y'})" class="Wdate"/>
			周选择:<input id="week" class="Wdate" type="text" onfocus="WdatePicker({isShowWeek:true,onpicked:funccc,errDealMode:3,maxDate:'%y-%M-%d'})"/>
			<shiro:hasPermission name='项目部选择'>
				项目组选择:<select id='project'></select>
			</shiro:hasPermission>
			<input id='query' onclick="change()" type="button" value="查询"/>
		</span>
		<table style="width: 80%;margin-top: 50px;">
			<thead>
				<tr>
					<th>填写人</th>
					<td colspan="4" id='fillIn'></td>
					<th>批准人</th>
					<td colspan="3" id='auditor'></td>
				</tr>
				<tr>
					<th colspan="9">运行指标情况</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
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
					<th>操作</th>
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
					<th colspan="9">本周缺陷统计</th>
				</tr>
				<tr>
					<th colspan="2">机务专业总数</th>
					<th colspan="2">完成数</th>
					<th colspan="2">未完成数</th>
					<th colspan="2">完成率</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody8'></tbody>
			<thead>
				<tr>
					<th colspan="9">本周未完成机务专业缺陷</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody9'></tbody>
			<thead>
				<tr>
					<th colspan="2">电仪专业总数</th>
					<th colspan="2">完成数</th>
					<th colspan="2">未完成数</th>
					<th colspan="2">完成率</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody10'></tbody>
			<thead>
				<tr>
					<th colspan="9">本周未完成电仪专业缺陷</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody11'></tbody>
			<thead>
				<tr>
					<th colspan="9">存在问题</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody12'></tbody>
			<thead>
				<tr>
					<th colspan="9">需要调节事项</th>
				</tr>
				<tr>
					<th colspan="9">一、采购方面</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody13'></tbody>
			<thead>
				<tr>
					<th colspan="9">二、技改方面</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody14'></tbody>
			<thead>
				<tr>
					<th colspan="9">三、其他方面</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody15'></tbody>
			<thead>
				<tr>
					<th colspan="9">下周计划</th>
				</tr>
				<tr>
					<th>序号</th>
					<th colspan="7">内容</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody16'></tbody>
			<thead>
				<tr>
					<th colspan="9">安健管理指标</th>
				</tr>
				<tr>
					<th colspan="2">习惯性违章</th>
					<th colspan="2">安装性违章</th>
					<th colspan="2">人员习惯违章</th>
					<th colspan="2">考核</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id='tbody17'></tbody>
		</table>
	</div>
</body>
</html>