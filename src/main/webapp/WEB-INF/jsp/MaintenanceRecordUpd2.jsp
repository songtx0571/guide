<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/maintenanceUpd.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'id' value="${requestScope.maintenanceRecord.id}" style="display: none;"/>
		<input type="text" id = 'maintenanceId' value="${requestScope.maintenanceRecord.maintenanceId}" style="display: none;"/>
		<input type="text" id = 'type' value="${requestScope.maintenanceRecord.type}" style="display: none;"/>
		<input type="hidden" id='people'  value="${requestScope.maintenanceRecord.people}"/>
		<input type="hidden" id='peopleName'  value="${requestScope.maintenanceRecord.peopleName}"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1'>内容</th>
				<th>
					<textarea id='content' rows="5" cols="50">${requestScope.maintenanceRecord.content}</textarea>
				</th>
			</tr>
			<tr>
				<th>缺陷号</th>
				<th><input type="text" id='defectNumber' value="${requestScope.maintenanceRecord.defectNumber}"/></th>
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