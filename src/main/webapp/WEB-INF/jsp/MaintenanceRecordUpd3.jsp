<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/maintenanceChange.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
	<script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'id' value="${param.maintenanceRecord.id}" style="display: none;"/>
		<input type="text" id = 'maintenanceId' value="${param.maintenanceRecord.maintenanceId}" style="display: none;"/>
		<input type="text" id = 'type' value="${param.maintenanceRecord.type}" style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th>时长</th>
				<th>
					<select id='workingHours'>
						<option value='0' if="${param.maintenanceRecord.workingHours} == 0" selected="selected">0h</option>
						<option value='0' if="${param.maintenanceRecord.workingHours} != 0">0h</option>
						<option value='0.5' if="${param.maintenanceRecord.workingHours} == 0.5" selected="selected">0.5h</option>
						<option value='0.5' if="${param.maintenanceRecord.workingHours} != 0.5">0.5h</option>
						<option value='1' if="${param.maintenanceRecord.workingHours} == 1" selected="selected">1h</option>
						<option value='1' if="${param.maintenanceRecord.workingHours} != 1" >1h</option>
						<option value='1.5' if="${param.maintenanceRecord.workingHours} == 1.5" selected="selected">1.5h</option>
						<option value='1.5' if="${param.maintenanceRecord.workingHours} != 1.5" >1.5h</option>
						<option value='2' if="${param.maintenanceRecord.workingHours} == 2" selected="selected">2h</option>
						<option value='2' if="${param.maintenanceRecord.workingHours} != 2" >2h</option>
						<option value='2.5' if="${param.maintenanceRecord.workingHours} == 2.5" selected="selected">2.5h</option>
						<option value='2.5' if="${param.maintenanceRecord.workingHours} != 2.5"  >2.5h</option>
						<option value='3' if="${param.maintenanceRecord.workingHours} == 3" selected="selected">3h</option>
						<option value='3' if="${param.maintenanceRecord.workingHours} != 3" >3h</option>
						<option value='3.5' if="${param.maintenanceRecord.workingHours} == 3.5" selected="selected">3.5h</option>
						<option value='3.5' if="${param.maintenanceRecord.workingHours} != 3.5" >3.5h</option>
						<option value='4' if="${param.maintenanceRecord.workingHours} == 4" selected="selected">4h</option>
						<option value='4' if="${param.maintenanceRecord.workingHours} != 4" >4h</option>
						<option value='4.5' if="${param.maintenanceRecord.workingHours} == 4.5" selected="selected">4.5h</option>
						<option value='4.5' if="${param.maintenanceRecord.workingHours} != 4.5" >4.5h</option>
						<option value='5'  if="${param.maintenanceRecord.workingHours} == 5" selected="selected">5h</option>
						<option value='5' if="${param.maintenanceRecord.workingHours} != 5" >5h</option>
						<option value='5.5' if="${param.maintenanceRecord.workingHours} == 5.5" selected="selected">5.5h</option>
						<option value='5.5' if="${param.maintenanceRecord.workingHours} != 5.5" >5.5h</option>
						<option value='6' if="${param.maintenanceRecord.workingHours} == 6" selected="selected">6h</option>
						<option value='6' if="${param.maintenanceRecord.workingHours} != 6" >6h</option>
						<option value='6.5' if="${param.maintenanceRecord.workingHours} == 6.5" selected="selected">6.5h</option>
						<option value='6.5' if="${param.maintenanceRecord.workingHours} != 6.5"  >6.5h</option>
						<option value='7' if="${param.maintenanceRecord.workingHours} == 7" selected="selected">7h</option>
						<option value='7' if="${param.maintenanceRecord.workingHours} != 7"  >7h</option>
					</select>
				</th>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="upd3()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>