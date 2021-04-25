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
	<style>
		.detailedInfoDiv{
			display: none;
		}
		.img-change:hover{
			 transform: scale(5);
		 }

	</style>
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
		<!-- 详细信息 -->
		<div class="detailedInfoDiv">
			<input type="hidden" id="detailedInfoId">
			<table>
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
				</tbody>
			</table>
		</div>
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