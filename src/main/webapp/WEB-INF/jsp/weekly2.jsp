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
			年份选择:<input type="text" id="year" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy年',maxDate:'%y'})" class="Wdate"/>
			周选择:
			<input type="text" id="datetime"  onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})" class="Wdate"/>
			类别选择:<select id='type'>
				<option value="1">电仪</option>
				<option value="2">机务</option>
			</select>
			<shiro:hasPermission name='项目部选择'>
				项目组选择:<select id='project'></select>
				<input id='query' onclick="change()" type="button" value="查询"/>
			</shiro:hasPermission>
		</span>
		<!-- 详细信息 -->
		<div class="detailedInfoDiv">
			<input type="hidden" id="detailedInfoId">
			<table>
				<thead>
				<tr><td colspan="10" style="text-align: center;font-weight: bold;font-size: 18px;">缺陷详单</td></tr>
				</thead>
				<tbody>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">缺陷编号</th>
					<td id="detailedInfoNumber"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">所属系统</th>
					<td colspan="4" id="detailedInfoSys"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">级别</th>
					<td colspan="2" id="detailedInfoLevel"></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">处理类别</th>
					<td id="detailedInfoMan"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">创建时间</th>
					<td colspan="4" id="detailedInfoCreateTime"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">创建人</th>
					<td colspan="2" id="detailedInfoCreateName"></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">状态</th>
					<td id="detailedInfoStatus"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">延期时间</th>
					<td colspan="3" id="detailedInfoBelayTime"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">延期原由</th>
					<td colspan="2" id="detailedInfoBelay"></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">消缺人</th>
					<td colspan="2" id="detailedInfoStaff"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">计划工时</th>
					<td id="detailedInfoPlannedWork"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">实际工时</th>
					<td  id="detailedInfoRealExecuteTime"></td>
					<th style="padding-right: 8px;box-sizing: border-box;">实际完成时间</th>
					<td id="detailedInfoRealETime"></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">缺陷描述</th>
					<td colspan="9"><textarea id='detailedInfoAbs' rows="5" cols="80" maxlength="80"></textarea></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">处理措施</th>
					<td colspan="9"><textarea id='detailedInfoMethod' rows="5" cols="80" maxlength="80"></textarea></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">遗留问题</th>
					<td colspan="9"><textarea id='detailedInfoProblem' rows="5" cols="80" maxlength="80"></textarea></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">备注</th>
					<td colspan="9"><textarea id='detailedInfoRemark' rows="5" cols="80" maxlength="80"></textarea></td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">消缺前图片</th>
					<td colspan="9" style="padding: 8px;box-sizing: border-box;">
						<img src="" id="detailedInfoBImg" class="img-change" alt="无图片">
					</td>
				</tr>
				<tr>
					<th style="padding-right: 8px;box-sizing: border-box;">消缺后图片</th>
					<td colspan="9" style="padding-left: 8px;box-sizing: border-box;">
						<img src="" id="detailedInfoAImg" class="img-change" alt="无图片">
					</td>
				</tr>
				<tr>
					<td colspan="10">
						<button onclick="cancel()">取消</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
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