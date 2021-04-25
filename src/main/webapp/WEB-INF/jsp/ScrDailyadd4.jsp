<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8"/>
<title></title>
<script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"  src="../layer/layer.js"></script>
<script type="text/javascript"  src="../js/week/ScrDailyAdd.js"></script>
<link rel="stylesheet" href="../css/iframe.css"/>
<link rel="stylesheet" href="../css/tr2.css"/>
<style type="text/css">

input[type='text']{border: none;padding: 0px;padding-left:2%;margin: 0px;width: 98%;height: 30px;line-height: 100%;background-color: #FFF;}
</style>
</head>
<body>
	<div style="margin: auto;">
		<input type="text" id = 'type' value="${type}" style="display: none;"/>
		<input type="text" id = 'scrDailyId' value="${scrDailyId}" style="display: none;"/>
		<table id='table' border="1" style="margin:auto;width:90%; rules:'all';border-collapse:collapse;">
			<tr>
				<th id='th1' colspan="2">氨水耗量统计</th>
			</tr>
			<tr>
				<th id='th1'>1#(t)</th>
				<th>
					<input type="text" id="content1" />
				</th>
			</tr>
			<tr>
				<th id='th1'>2#(t)</th>
				<th>
					<input type="text" id="content2" />
				</th>
			</tr>
			<tr>
				<th id='th1'>3#(t)</th>
				<th>
					<input type="text" id="content3" />
				</th>
			</tr>
			<tr>
				<th id='th1'>4#(t)</th>
				<th>
					<input type="text" id="content4" />
				</th>
			</tr>
			<tr>
				<th id='th1'>5#(t)</th>
				<th>
					<input type="text" id="content5" />
				</th>
			</tr>
			<tr>
				<th id='th1'>6#(t)</th>
				<th>
					<input type="text" id="content6" />
				</th>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input type="button" id="submitbt" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="insert4()"/>
					<input type="button" id="submitbt" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>