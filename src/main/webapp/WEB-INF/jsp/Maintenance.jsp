<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8"/>
    <script type="text/javascript" src="../js/week/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="../layer/layer.js"></script>
    <script type="text/javascript" src="../js/week/maintenance.js"></script>
    <script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
    <link rel="stylesheet" href="../css/iframe.css" media="screen"/>
    <link rel="stylesheet" href="../css/tr.css"/>
    <style>
        .detailedInfoDiv {
            display: none;
        }

        .img-change:hover {
            transform: scale(5);
        }

        .updOvertimeDiv {
            display: none;
        }
        #overTimeInp{
            width: 300px;
            height: 50px;
            line-height: 50px;
            outline: none;
        }
        .maintainDiv{
            display: none;
            padding: 10px;
            box-sizing: border-box;
        }
        .maintainDiv .backBtn {
            padding: 5px 10px;
            background: dodgerblue;
            color: #fff;
            border: 0px;
            font-size: 18px;
            margin: 5px 0;
        }
    </style>
    <title>检修日志</title>
</head>
<body>
<div style="height: 100%">
		<span class='span'>
		日期选择<input type="text" id="datetime"
                   onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})" class="Wdate"/>
		<shiro:hasPermission name='项目部选择'>
            项目组选择:<select id='project'></select>
        </shiro:hasPermission>
		<input id='query' onclick="change()" type="button" value="查询"/>
		</span>
    <table style="width: 96%;margin-top: 50px;">
        <thead>
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
            <td width='12%'>编号</td>
            <td width='42%' colspan="4">内容</td>
            <td width='18%'>人员</td>
            <td width="5">工时</td>
            <td width="2">加班工时</td>
            <td width='15%'>完成时间</td>
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
            <td width='44%' colspan="3">缺陷名称和处理方法</td>
            <td width='10%'>人员</td>
            <td width='5%'>工时</td>
            <td width='5%'>加班工时</td>
            <td width='15%'>创建时间</td>
            <td width='10%'>操作</td>
        </tr>
        </thead>
        <tbody id='tbody1'></tbody>
        <thead>
        <tr>
            <td colspan="10">技术交流</td>
        </tr>
        <tr>
            <td>序号</td>
            <td colspan="8">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody2'></tbody>
        <thead>
        <tr>
            <td colspan="10">安全交流</td>
        </tr>
        <tr>
            <td>序号</td>
            <td colspan="8">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody3'>

        </tbody>
        <thead>
        <tr>
            <td colspan="10">巡检情况</td>
        </tr>
        <tr>
            <td>序号</td>
            <td colspan="8">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody4'>

        </tbody>
        <thead>
        <tr>
            <td colspan="10">检修情况</td>
        </tr>
        <tr>
            <td>序号</td>
            <td colspan="8">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody5'>

        </tbody>
        <thead>
        <tr>
            <td colspan="10">班后总结</td>
        </tr>
        <tr>
            <td>序号</td>
            <td colspan="8">内容</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody id='tbody6'>

        </tbody>
    </table>
    <div class="updOvertimeDiv">
        <div style="text-align: center;padding: 10px 0;box-sizing: border-box;">
            <span>加班工时</span>
            <input type="text" id="overTimeInp" placeholder="输入数字..." onkeyup="value=value.replace(/[^\d.]/g,'')">
        </div>
        <div style="text-align: center">
            <input type="button" value="&nbsp;提&nbsp;&nbsp;交&nbsp;" onclick="updOvertimeFun()"/>
            <input type="button" value="&nbsp;取&nbsp;&nbsp;消&nbsp;" onclick="back()"/>
        </div>
    </div>
    <div class="maintainDiv">
        <table>
            <tr>
                <td width="110px">创建时间</td>
                <td id="selCreateTime"></td>
            </tr>
            <tr>
                <td>开始时间</td>
                <td id="selStartTime"></td>
            </tr>
            <tr>
                <td>结束时间</td>
                <td id="selEndTime"></td>
            </tr>
            <tr>
                <td>维护编号</td>
                <td id="selMaintainRecordNo"></td>
            </tr>
            <tr>
                <td>执行人</td>
                <td id="selEmployeeName">
                </td>
            </tr>
            <tr>
                <td>系统</td>
                <td id="selSysName">
                </td>
            </tr>
            <tr>
                <td>设备</td>
                <td id="selEquipmentName">
                </td>
            </tr>
            <tr>
                <td>维护点</td>
                <td id="selUnitName">
                </td>
            </tr>
            <tr>
                <td>预估工时</td>
                <td id="selPlanedWorkingHour">
                </td>
            </tr>
            <tr>
                <td>工作内容描述</td>
                <td id="selWorkContent">
                </td>
            </tr>
            <tr>
                <td>工作反馈</td>
                <td id="selWorkFeedback"></td>
            </tr>
            <tr>
                <td style="text-align: center" colspan="2">
                    <button class="backBtn" onclick="back()">取消</button>
                </td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>