var path = "";
var saveId;
var timer = [];
var departmentId = "";
$(function () {
    showDepartName();
    showMaintainWork("", "");
    showFormSelects();
    showSystemNameAndEquipmentName("");
});

//查询按钮
function search() {
    var searchWord = $("#searchWord").val();
    var departmentId = $("#addDepartNameHidden").val()
    showMaintainWork(departmentId, searchWord);
}


//查询部门
function showDepartName() {

    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getDepartmentList",
            dataType: "json",
            success: function (data) {
                $("#selDepartName").empty();
                $("#addDepartName").empty();
                var option = "<option value='0' >请选择部门</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#selDepartName').html(option);
                $('#addDepartName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(addDepartName)', function (data) {
            $("#addDepartNameHidden").val(data.value);
            showSystemNameAndEquipmentName(data.value)
        });

        form.on('select(selDepartName)', function (data) {
            $("#selDepartNameHidden").val(data.value);
            showMaintainWork($("#selDepartNameHidden").val(), $("#searchWord").val());

        });


    });
}
//查询设备名称和系统名称
function showSystemNameAndEquipmentName(department) {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: "/guide/maintain/getEquipments?type=1&department="+department,
            dataType: "json",
            success: function (data) {

                if(data.code==0){
                    $("#selSysName").empty();
                    var option = "<option value='0' >请选择系统</option>";
                    for (var i = 0; i < data.data.length; i++) {
                        option += "<option value='" + data.data[i].id + "'>" + data.data[i].text + "</option>"
                    }
                    $('#selSysName').html(option);
                    form.render();//菜单渲染 把内容加载进去
                }

            }
        });
        form.on('select(selSysName)', function (data) {
            $("#selSysNameHidden").val(data.value);
        });
        $.ajax({
            type: "GET",
            url: "/guide/maintain/getEquipments?type=2&department="+department,
            dataType: "json",
            success: function (data) {
                if(data.code==0){
                    $("#selEquipmentName").empty();
                    var option = "<option value='0' >请选择设备</option>";
                    for (var i = 0; i < data.data.length; i++) {
                        option += "<option value='" + data.data[i].id + "'>" +  data.data[i].text + "</option>"
                    }
                    $('#selEquipmentName').html(option);
                    form.render();//菜单渲染 把内容加载进去
                }

            }
        });
        form.on('select(selEquipmentName)', function (data) {
            $("#selEquipmentNameHidden").val(data.value);
        });
        $.ajax({
            type: "GET",
            url: path + "/guide/unit/getUnitList?mold=2&bothType=3&department="+department,
            dataType: "json",
            success: function (data) {
                data = data.data;
                $("#selMaintainPointName").empty();
                var option = "<option value='0' >请选择测点</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].nuit + "</option>"
                }
                $('#selMaintainPointName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(selMaintainPointName)', function (data) {
            $("#selMaintainPointNameHidden").val(data.value);
        });
        form.on('select(selPlanedWorkingHour)', function (data) {
            $("#selPlanedWorkingHourHidden").val(data.value);
        });
    });

}


//查询数据
function showMaintainWork(departmentId, searchWord) {
    for (let i = 0; i < timer.length; i++) {
        clearInterval(timer[i]);
    }
    if (departmentId == "0") {
        departmentId = "";
    }
    $.ajax({
        type: "GET",
        url: path + '/guide/maintain/getMaintains?departmentId=' + departmentId + "&searchWord=" + searchWord,//数据接口
        dataType: "json",
        success: function (data) {
            data = data.data;
            var li = "<table class='maintainConfigUl layui-table'>" +
                "<colgroup><col width='150'><col width='130'><col width='130'><col></colgroup>" +
                "<thead><th><span class='ulSystemName'>系统</span></th>" +
                "<th><span class='ulEquipmentName'>设备</span></th>" +
                "<th><span class='ulMaintainPointName'>维护点</span></th>" +
                "<th><span class='ulPlanedWorkingHour'>工作内容</span></th>" +
                "<th style='width: 77px;'><span class='ulPlanedWorkingHour'>计划工时/时</span></th>" +
                "<th style='width: 55px;'><span class='ulCycle'>周期/天</span></th>" +
                "<th style='width: 95px;'><span class='ulCountDown' class='ulCountDown'>倒计时</span></th>" +
                "<th style='width: 160px;'><span class='ulOperation'>操作</span></th></thead>";
            for (var i = 0; i < data.length; i++) {
                li += "<tr class='ulLi'><td><span class='ulSystemName'>" + data[i].systemName + "</span></td>" +
                    "<td><span class='ulEquipmentName'>" + data[i].equipmentName + "</span></td>" +
                    "<td><span class='ulMaintainPointName'>" + data[i].unitName + "</span></td>" +
                    "<td><span class='ulWorkContent'>" + data[i].workContent + "</span></td>" +
                    "<td><span class='ulPlanedWorkingHour'>" + data[i].planedWorkingHour + "</span></td>" +
                    "<td><span class='ulCycle cycle" + i + "'>" + data[i].cycle + "</span></td>" +
                    "<td><span class='ulCountDown ulCountDown1' id='ulCountDown" + i + "'></span><span style='display: none;' class='inspectionEndTime" + i + "'>" + data[i].startTime + "</span></td>" +
                    "<td><span class='ulOperation'>" + getPermission(data[i].id,data[i].assignmentStatus) + "</span></td></tr>";
                var h = data[i].cycle;//周期
                var startTime = data[i].startTime;//开始时间
                if (data[i].startTime != "" || data[i].startTime != null) {
                    a(startTime, h, i, data[i].assignmentStatus)
                } else {
                    $("#ulCountDown" + i).html("无");
                }
            }
            li += "</table>";
            $(".content").html(li);
        }
    });
}


//倒计时
function a(startTime, d, i, assignmentStatus) {
    timer[i] = setInterval(function () {
        var sDate = new Date(startTime);//开始时间
        var sTime = sDate.getTime();//开始时间的毫秒数
        sTime = sTime + (d * 24 * 60 * 60 * 1000)//开始时间的毫秒数+周期的毫秒数
        var nDate = new Date();//当前时间
        var nTime = nDate.getTime();//当前时间毫秒数
        var time = sTime - nTime;//两者毫秒相差
        time = time / 1000;//将相差值换为秒数
        var day = parseInt(time / (60 * 60 * 24))
        var shi = parseInt(time / (60 * 60) % 24);//小时
        var fen = parseInt((time / 60) % 60);//分钟
        var miao = parseInt(time % 60);//秒
        if (assignmentStatus == '2') {
            $("#ulCountDown" + i).html("<samp style='color:red;'>已暂停</samp>");
            $(".resetBtn" + i).css("display", "revert");
            $(".distribution" + i).css("display", "revert");
            $(".edit" + i).css("width", "44px");
            clearInterval(timer[i]);
        } else if (assignmentStatus == '1') {
            $("#ulCountDown" + i).html("<samp style='color: blue;'>已分配</samp>");
            $(".resetBtn" + i).css("display", "none");
            $(".distribution" + i).css("display", "none");
            $(".edit" + i).css("width", "152px");
            clearInterval(timer[i]);
        } else {
            if (day > 0) {
                $("#ulCountDown" + i).html('<samp style="color: orange;">' + day + "天" + '</samp>');
            } else if (shi > 0) {
                $("#ulCountDown" + i).html('<samp style="color: orange;">' + shi + "时" + fen + "分" + miao + '秒</samp>');
            } else if (fen > 0) {
                $("#ulCountDown" + i).html('<samp style="color: orange;">' + fen + "分" + miao + '秒</samp>');
            } else if (miao > 0) {
                $("#ulCountDown" + i).html('<samp style="color: orange;">' + miao + '秒</samp>');
            } else {
                $("#ulCountDown" + i).html("<samp style='color: green;'>待分配</samp>");
                $(".resetBtn" + i).css("display", "revert");
                $(".distribution" + i).css("display", "revert");
                $(".edit" + i).css("width", "44px");
                clearInterval(timer[i]);
            }


        }


    }, 1000);
}

//打开添加
function openMaintainConfig(id) {
    layui.use(['table', 'form'], function () {
        var form = layui.form;
        if (id == "") {
            $("#selSysName").val('0');
            $("#selEquipmentName").val('0');
            $("#selMaintainPointName").val('0');
            $("#selPlanedWorkingHour").val('0.5');
            $("#selWorkContent").val('');

            $("#selSysNameHidden").val('0');
            $("#selEquipmentNameHidden").val('0');
            $("#selMaintainPointNameHidden").val('0');
            $("#selCycleHidden").val('1');
            $("#selPlanedWorkingHourHidden").val('0.5');

            form.render();

        } else {
            $.ajax({
                type: "GET",
                url: path + '/guide/maintain/getMaintains?id=' + id,//数据接口
                dataType: "json",
                success: function (data) {
                    data = data.data[0];
                    saveId = data.id;
                    $("#selSysName").val(data.systemId);
                    $("#selEquipmentName").val(data.equipmentId);
                    $("#selMaintainPointName").val(data.unitId);
                    $("#selCycle").val(data.cycle);
                    $("#selPlanedWorkingHour").val(data.planedWorkingHour);
                    $("#selWorkContent").val(data.workContent);
                    $("#selSysNameHidden").val(data.systemId);
                    $("#selEquipmentNameHidden").val(data.equipmentId);
                    $("#selMaintainPointNameHidden").val(data.unitId);
                    $("#selCycleHidden").val(data.cycle);
                    $("#selPlanedWorkingHourHidden").val(data.planedWorkingHour);
                    form.render();
                }
            });
        }
    });
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'saveMaintainConfig' //防止重复弹出
            , content: $(".saveMaintainConfig")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    })
}

//保存按钮
function saveMaintainConfig() {
    var maintainWork = {};
    maintainWork.id = saveId;
    maintainWork.systemId = Number($("#selSysNameHidden").val());
    maintainWork.equipmentId = Number($("#selEquipmentNameHidden").val());
    maintainWork.unitId = Number($("#selMaintainPointNameHidden").val());
    maintainWork.cycle = $("#selCycleHidden").val();
    maintainWork.planedWorkingHour = $("#selPlanedWorkingHourHidden").val();
    maintainWork.workContent = $("#selWorkContent").val();
    maintainWork.departmentId = $("#addDepartNameHidden").val();
    if (maintainWork.systemId == "0"){
        layer.alert("请选择系统");
        return false;
    } else if (maintainWork.equipmentId == "0"){
        layer.alert("请选择设备");
        return false;
    } else if (maintainWork.unitId == "0"){
        layer.alert("请选择维护点");
        return false;
    }
    $.ajax({
        "type": 'post',
        "url": path + "/guide/maintain/saveMaintain",
        data: JSON.stringify(maintainWork),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        "success": function (data) {
            if (data == "SUCCESS") {
                layer.alert("保存成功");
                layer.closeAll();
                showMaintainWork($("#selDepartNameHidden").val(), $("#searchWord").val());
                location.href = "/guide/maintain/toMaintainConfig";
            }
        }
    });
}

//重置时间
function resetMaintainConfig(id) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    var maintainWork = {};
    maintainWork.id = id;
    maintainWork.startTime = time;

    maintainWork.assignmentStatus = "0";
    $.ajax({
        "type": 'post',
        "url": path + "/guide/maintain/saveMaintain",
        data: JSON.stringify(maintainWork),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        "success": function (data) {
            if (data == "SUCCESS") {
                showMaintainWork($("#selDepartNameHidden").val(), $("#searchWord").val());
                location.href = "/guide/maintain/toMaintainConfig";
            }
        }
    });
}


//暂停
function stopMaintainConfig(id) {
    maintain = {};
    maintain.id = id;
    maintain.assignmentStatus = "2";
    $.ajax({
        "type": 'post',
        "url": path + "/guide/maintain/saveMaintain",
        data: JSON.stringify(maintain),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        "success": function (data) {
            if (data == "SUCCESS") {
                showMaintainWork($("#selDepartNameHidden").val(), $("#searchWord").val());
                location.href = "/guide/maintain/toMaintainConfig";
            }
        }
    });
}


//分配维护
function distributionMaintainConfig(id) {
    $.ajax({
        type: "GET",
        url: path + '/guide/maintain/getMaintains?id=' + id,//数据接口
        dataType: "json",
        success: function (data) {
            data = data.data[0];
            $("#maintainConfigNumber").text(data.id);//编号
            $("#maintainConfigSys").text(data.systemName);//系统
            $("#maintainConfigEquipment").text(data.equipmentName);//设备
            $("#maintainConfigCycle").text(data.cycle);//周期
            $("#maintainConfigCreateTime").text(data.createTime);//创建时间
            $("#maintainConfigPlanedWorkingHour").text(data.planedWorkingHour);//预估工时
            $("#maintainConfigMaintainPointName").text(data.workContent);//工作内容
            $("#maintainConfigExecutorId").val("");
            $("#maintainConfigDepartmentId").val(data.departmentId)
            layui.use(['jquery', 'formSelects'], function () {
                var formSelects = layui.formSelects;
                formSelects.config('tags', {
                    keyName: 'text',
                    keyVal: 'id',
                }).data('tags', 'server', {
                    url: '/guide/defect/getEmpMap'
                });
            });
        }
    });
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'maintainConfigDiv' //防止重复弹出
            , content: $(".maintainConfigDiv")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    })
}

//执行人
function showFormSelects() {
    layui.use(['jquery', 'formSelects'], function () {
        var formSelects = layui.formSelects;
        formSelects.config('tags', {
            keyName: 'text',
            keyVal: 'id',
        }).data('tags', 'server', {
            url: '/guide/defect/getEmpMap'
        });
        formSelects.closed('tags', function (id) {
            $("#maintainConfigExecutorId").val(layui.formSelects.value('tags', 'val'));
        });
    });
}

//确定分配
function maintainConfigOk() {
    var maintainRecord = {};
    maintainRecord.maintainId = $("#maintainConfigNumber").text();
    maintainRecord.employeeId = $("#maintainConfigExecutorId").val();
    maintainRecord.departmentId = $("#maintainConfigDepartmentId").val();
    maintainRecord.status = "1";
    // assignment_status 分配状态 0未分配  1已分配  2执行中  3已完成
    $.ajax({
        type: 'post',
        url: path + "/guide/maintain/insertMaintainRecord",
        data: JSON.stringify(maintainRecord),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data == "SUCCESS") {
                layer.alert("分配成功");
                layer.closeAll();
                showMaintainWork($("#selDepartNameHidden").val(), $("#searchWord").val());
            } else if (data == "DISTRIBUTED") {
                layer.alert("该任务已分配")
            } else if (data == "STOPED") {
                layer.alert("该任务已暂停")
            }
        }
    });
}

// 取消
function cancel() {
    layer.closeAll();
}