<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>缺陷详情</title>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" href="../js/layui/css/layui.css">
    <script src="../js/layui/layui.js" type="text/javascript" charset="utf-8"></script>
    <style>
        .detailedInfoDiv table{
            width: 830px;
            margin: 0 auto;
        }
         .detailedInfoDiv table tr{
            line-height: 50px;
        }
        .detailedInfoDiv table tr th{
            text-align: right;
        }
        .detailedInfoDiv table tr td span{
            display: inline-block;
            line-height: 30px;
            padding: 0 5px;
        }
        .detailedInfoDiv table tr td textarea{
            border-radius: 5px;
            text-indent: 10px;
            margin-bottom: 10px;
        }
        .img-change{
            width: 100px;
            display: none;
            margin: 0 0 0 10px;
            float: left;
        }
        .img-change:hover{
            transform: scale(5);
        }
    </style>
</head>
<body>
<!-- 详细信息 -->
<div class="detailedInfoDiv">
    <input type="hidden" id="detailedInfoId" value="${param.id}">
    <input type="hidden" id="detailedInfoCreatedById">
    <input type="hidden" id="userId">
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
            <td colspan="2" id="detailedInfoCreateTime"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">创建人</th>
            <td id="detailedInfoCreateName"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">开始时间</th>
            <td id="detailedInfoRealSTime"></td>
        </tr>
        <tr>
            <th style="padding-right: 8px;box-sizing: border-box;">状态</th>
            <td colspan="2" id="detailedInfoStatus"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">延期时间</th>
            <td id="detailedInfoBelayTime"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">延期原由</th>
            <td id="detailedInfoBelay"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">来源</th>
            <td id="detailedInfoSourceType"></td>
        </tr>
        <tr>
            <th style="padding-right: 8px;box-sizing: border-box;">消缺人</th>
            <td colspan="2" id="detailedInfoStaff"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">实际完成时间</th>
            <td id="detailedInfoRealETime"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">计划工时</th>
            <td id="detailedInfoPlannedWork"></td>
            <th style="padding-right: 8px;box-sizing: border-box;">实际工时</th>
            <td  id="detailedInfoRealExecuteTime"></td>

        </tr>
        <tr>
            <th style="padding-right: 8px;box-sizing: border-box;">缺陷描述</th>
            <td colspan="9"><textarea id='detailedInfoAbs' rows="5" cols="80" maxlength="80"></textarea></td>
        </tr>
        <tr>
            <th style="padding-right: 8px;box-sizing: border-box;">处理措施</th>
            <td colspan="9"><textarea id='detailedInfoMethod' readonly rows="5" cols="80" maxlength="80"></textarea></td>
        </tr>
        <tr>
            <th style="padding-right: 8px;box-sizing: border-box;">遗留问题</th>
            <td colspan="9"><textarea id='detailedInfoProblem' readonly rows="5" cols="80" maxlength="80"></textarea></td>
        </tr>
        <tr>
            <th style="padding-right: 8px;box-sizing: border-box;">备注</th>
            <td colspan="9"><textarea id='detailedInfoRemark' readonly rows="5" cols="80" maxlength="80"></textarea></td>
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
        <thead>
        <tr>
            <td colspan="10" align="center">
                <button type="button" class="layui-btn" style="display: none;" id="detailedInfoBtn" onclick="detailedInfoUpd()">修改</button>
                <button type="button" class="layui-btn" onclick="cancel()">取消</button>
            </td>
        </tr>
        </thead>
    </table>
</div>
<script>
    var path = "/guide";
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    //取消
    function cancel() {
        parent.layer.close(index); //再执行关闭
    }
    $.ajax({
        type:'GET',
        url:path + "/defect/getLoginUserInfo",
        success:function(data){
            $('#userId').val(data.id);
        }
    })
    $.ajax({
        type: 'GET',
        url: path + "/defect/getDefectById",
        data: {id: $("#detailedInfoId").val()},
        success: function (data) {
            $("#detailedInfoId").val(data.id);//id
            $("#detailedInfoNumber").text(data.number);//编号
            $("#detailedInfoSys").text(data.sysName + "," + data.equipmentName);//系统 设备
            $("#detailedInfoLevel").text(data.level + "类");//级别
            if (data.maintenanceCategory == 1) {//类别
                $("#detailedInfoMan").text("机务");
            } else {
                $("#detailedInfoMan").text("电仪");
            }
            if (data.type == 1) {//状态
                $("#detailedInfoStatus").text("未认领");
            } else if (data.type == 2) {
                $("#detailedInfoStatus").text("消缺中");
            } else if (data.type == 3) {
                $("#detailedInfoStatus").text("已消缺");
            } else if (data.type == 4) {
                $("#detailedInfoStatus").text("已完成");
            } else if (data.type == 5) {
                $("#detailedInfoStatus").text("已认领");
            } else if (data.type == 6) {
                $("#detailedInfoStatus").text("延期中");
            }
            $("#detailedInfoCreatedById").val(data.createdBy);//创建ID
            $("#detailedInfoCreateName").text(data.createdByName);//创建人
            $("#detailedInfoCreateTime").text(data.created);//创建时间
            $("#detailedInfoPlannedWork").text(data.plannedWork);//计划工时
            $("#detailedInfoRealExecuteTime").text(data.realExecuteTime);//实际工时
            $("#detailedInfoRealSTime").text(data.realSTime);//开始时间
            if (data.delayReason == 1) {
                $("#detailedInfoBelay").text('等待备件');//延期原由
            } else if (data.delayReason == 2) {
                $("#detailedInfoBelay").text('无法安措');//延期原由
            } else if (data.delayReason == 3) {
                $("#detailedInfoBelay").text('停炉处理');//延期原由
            } else if (data.delayReason == 4) {
                $("#detailedInfoBelay").text('继续观察');//延期原由
            } else {
                $("#detailedInfoBelay").text('无');//延期原由
            }
            $("#detailedInfoBelayTime").text(data.delayETime);//延期时间
            $("#detailedInfoStaff").text(data.empIdsName);//消缺人
            $("#detailedInfoPlanedTime").text(data.planedTime);//计划完成时间
            $("#detailedInfoRealETime").text(data.realETime);//实际完成时间
            $("#detailedInfoAbs").val(data.abs);//缺陷描述
            $("#detailedInfoMethod").val(data.method);//处理措施
            $("#detailedInfoProblem").val(data.problem);//遗留问题
            $("#detailedInfoRemark").val(data.remark);//备注
            $("#detailedInfoBImg").css("display", "block");
            $("#detailedInfoAImg").css("display", "block");
            $("#detailedInfoBImg").attr("src", "data:img/jpeg;base64," + data.bPlc64);//消缺前图片
            $("#detailedInfoAImg").attr("src", "data:img/jpeg;base64," + data.aPlc64);//消缺后图片
            if (data.bPlc64 == null) {
                $("#detailedInfoBImg").css("display", "none");
            } else if (data.bPlc64 == "") {
                $("#detailedInfoBImg").attr("src", "../img/noImg.png");
            }
            if (data.aPlc64 == null) {
                $("#detailedInfoAImg").css("display", "none");
            } else if (data.aPlc64 == "") {
                $("#detailedInfoAImg").attr("src", "../img/noImg.png");
            }
            //来源
            if (data.sourceType == 1) {
                $("#detailedInfoSourceType").text("巡检")
            } else {
                $("#detailedInfoSourceType").text("缺陷")
            }
            //根据type和当前登陆人是否为创建人控制按钮显示隐藏
            if (data.type == 1 && $('#userId').val() == data.createdBy) {
                $("#detailedInfoBtn").css("display", "revert");
            } else {
                $("#detailedInfoBtn").css("display", "none");
            }
        }
    });
    //修改
    function detailedInfoUpd () {
        var defect = {};
        defect.id =  Number($("#detailedInfoId").val());//id
        defect.abs = $("#detailedInfoAbs").val();//缺陷描述
        defect.createdBy = Number($("#detailedInfoCreatedById").val());//创建人ID
        defect.type = 1;
        $.ajax({
            "type" : 'put',
            "url": path + "/defect/updDefect",
            data: JSON.stringify(defect),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            "success":function(data){
                parent.layer.close(index); //再执行关闭
            }
        });
    }
</script>
</body>
</html>
