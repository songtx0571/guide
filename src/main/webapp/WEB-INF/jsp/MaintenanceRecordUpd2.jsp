<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/maintenanceUpd.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'id' th:value="${maintenanceRecord.id}" style="display: none;"/>
		<input type="text" id = 'maintenanceId' th:value="${maintenanceRecord.maintenanceId}" style="display: none;"/>
		<input type="text" id = 'type' th:value="${maintenanceRecord.type}" style="display: none;"/>
		<input type="hidden" id='people'  th:value="${maintenanceRecord.people}"/>
		<input type="hidden" id='peopleName'  th:value="${maintenanceRecord.peopleName}"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1'>内容</th>
				<th>
					<textarea id='content' rows="5" cols="50" maxlength="100" th:text="${maintenanceRecord.content}"></textarea>
				</th>
			</tr>
			<tr>
				<th>缺陷号</th>
				<th><input type="text" id='defectNumber' th:value="${maintenanceRecord.defectNumber}"/></th>
			</tr>
			<tr>
				<th>人员(人员之间请用.号隔开)</th>
				<td id='peopleNameTd'></td>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="upd2()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>