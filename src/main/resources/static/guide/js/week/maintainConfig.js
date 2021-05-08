var path = "";
var saveId;
$(function () {
    showDepartName();
    showMaintainWork("");
    showFormSelects();
});

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
                var option = "<option value='0' >请选择部门</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#selDepartName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(selDepartName)', function (data) {
            $("#selDepartNameHidden").val(data.value);
            showMaintainWork($("#selDepartNameHidden").val());
        });

        $.ajax({
            type: "GET",
            url: "/guide/defect/getEquMap?type=1",
            dataType: "json",
            success: function (data) {
                $("#selSysName").empty();
                var option = "<option value='0' >请选择系统</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#selSysName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(selSysName)', function (data) {
            $("#selSysNameHidden").val(data.value);
        });
        $.ajax({
            type: "GET",
            url: "/guide/defect/getEquMap?type=2",
            dataType: "json",
            success: function (data) {
                $("#selEquipmentName").empty();
                var option = "<option value='0' >请选择设备</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#selEquipmentName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(selEquipmentName)', function (data) {
            $("#selEquipmentNameHidden").val(data.value);
        });
        $.ajax({
            type: "GET",
            url: path + "/guide/unit/getUnitList?mold=2&bothType=3&department=",
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
        form.on('select(selCycle)', function (data) {
            $("#selCycleHidden").val(data.value);
        });
        form.on('select(selPlanedWorkingHour)', function (data) {
            $("#selPlanedWorkingHourHidden").val(data.value);
        });
    });
}

//查询数据
function showMaintainWork(departmentId) {
    if (departmentId == "0") {
        departmentId = "";
    }
    $.ajax({
        type: "GET",
        url: path + '/guide/maintain/getMaintains?departmentId=' + departmentId,//数据接口
        dataType: "json",
        success: function (data) {
            data = data.data;
            var li = "<table class='maintainConfigUl layui-table'>" +
                "<thead><th><span class='ulSystemName'>系统</span></th>" +
                "<th><span class='ulEquipmentName'>设备</span></th>" +
                "<th><span class='ulMaintainPointName'>维护点</span></th>" +
                "<th><span class='ulPlanedWorkingHour'>工作内容</span></th>" +
                "<th><span class='ulPlanedWorkingHour'>计划时间/时</span></th>" +
                "<th><span class='ulCycle'>周期/时</span></th>" +
                "<th><span class='ulCountDown' class='ulCountDown'>倒计时</span></th>" +
                "<th><span class='ulOperation'>操作</span></th></thead>";
            for (var i = 0; i < data.length; i++) {
                var color = "";
                li += "<tr class='ulLi'><td><span class='ulSystemName'>" + data[i].systemName + "</span></td>" +
                    "<td><span class='ulEquipmentName'>" + data[i].equipmentName + "</span></td>" +
                    "<td><span class='ulMaintainPointName'>" + data[i].unitName + "</span></td>" +
                    "<td><span class='ulWorkContent'>" + data[i].workContent + "</span></td>" +
                    "<td><span class='ulPlanedWorkingHour'>" + data[i].planedWorkingHour + "</span></td>" +
                    "<td><span class='ulCycle cycle" + i + "'>" + data[i].cycle + "</span></td>" +
                    "<td><span class='ulCountDown ulCountDown1' id='ulCountDown" + i + "'></span><span style='display: none;' class='inspectionEndTime" + i + "'>" + data[i].startTime + "</span></td>" +
                    "<td><span class='ulOperation'>" +
                    "<button class='layui-btn layui-btn-sm' onclick='openMaintainConfig(" + data[i].id + ")'>修改</button>" +
                    "<button class='layui-btn layui-btn-sm' onclick='resetMaintainConfig(" + data[i].id + ")'>重置</button>" +
                    "<button class='layui-btn layui-btn-sm' onclick='distributionMaintainConfig(" + data[i].id + ")'>分配</button></span></td></tr>";
                var h = data[i].cycle;//周期
                var startTime = data[i].startTime;//开始时间
                if (data[i].startTime != "" || data[i].startTime != null) {
                    a(startTime,h,i,data[i].assignmentStatus)
                } else {
                    $("#ulCountDown" + i ).html("无");
                }
            }
            li += "</table>";
            $(".content").html(li);
        }
    });
}
//倒计时
function a (startTime,h,i,assignmentStatus) {
   var timer= setInterval(function () {
        var sDate = new Date(startTime);//开始时间
        var sTime = sDate.getTime();//开始时间的毫秒数
        sTime = sTime + (h * 60 * 60 * 1000)//开始时间的毫秒数+周期的毫秒数
        var nDate = new Date();//当前时间
        var nTime = nDate.getTime();//当前时间毫秒数
        var time = sTime - nTime;//两者毫秒相差
        time = time / 1000;//将相差值换为秒数
        var shi = parseInt(time / (60 * 60));//小时
        var fen = parseInt((time / 60) % 60);//分钟
        var miao = parseInt(time % 60);//秒
        if (time <= 0) {
            if (assignmentStatus == '0') {
                $("#ulCountDown" + i ).html("<samp style='color: green;'>待分配</samp>");
                $(".resetBtn"+i).css("display","revert");
                $(".distribution"+i).css("display","revert");
                $(".edit"+i).css("width","44px");
            } else {
                $("#ulCountDown" + i ).html("<samp style='color: blue;'>已分配</samp>");
                $(".resetBtn"+i).css("display","none");
                $(".distribution"+i).css("display","none");
                $(".edit"+i).css("width","152px");
            }
            clearInterval(timer);
        } else {
            $("#ulCountDown" + i ).html('<samp style="color: red;">' + shi + ":" + fen + ":" + miao + '</samp>');
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
            $("#selCycle").val('0.5');
            $("#selPlanedWorkingHour").val('0.5');
            $("#selWorkContent").val('');

            $("#selSysNameHidden").val('0');
            $("#selEquipmentNameHidden").val('0');
            $("#selMaintainPointNameHidden").val('0');
            $("#selCycleHidden").val('0.5');
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
                    $("#selMaintainPointName").val(data.maintainPointId);
                    $("#selCycle").val(data.cycle);
                    $("#selPlanedWorkingHour").val(data.planedWorkingHour);
                    $("#selWorkContent").val(data.workContent);
                    $("#selSysNameHidden").val(data.systemId);
                    $("#selEquipmentNameHidden").val(data.equipmentId);
                    $("#selMaintainPointNameHidden").val(data.maintainPointId);
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
    maintainWork.maintainPointId = Number($("#selMaintainPointNameHidden").val());
    maintainWork.cycle = $("#selCycleHidden").val();
    maintainWork.planedWorkingHour = $("#selPlanedWorkingHourHidden").val();
    maintainWork.workContent = $("#selWorkContent").val();
    maintainWork.departmentId = 17;
    console.log(maintainWork)
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
                showMaintainWork($("#selDepartNameHidden").val());
                location.href = "/guide/maintain/toMaintainConfig";
            }
        }
    });
}

//重置时间
function resetMaintainConfig(id) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+ 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var time = year+"-"+month+"-"+day+" "+ hour + ":" + minute + ":" + second;
    var maintainWork = {};
    maintainWork.id = id;
    maintainWork.startTime = time;
    $.ajax({
        "type": 'post',
        "url": path + "/guide/maintain/saveMaintain",
        data: JSON.stringify(maintainWork),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        "success": function (data) {
            if (data == "SUCCESS") {
                showMaintainWork($("#selDepartNameHidden").val());
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
        "type": 'post',
        "url": path + "/guide/maintain/insertMaintainRecord",
        data: JSON.stringify(maintainRecord),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        "success": function (data) {
            if (data == "SUCCESS") {
                layer.alert("分配成功");
                layer.closeAll();
                showMaintainWork($("#selDepartNameHidden").val());
            }
        }
    });
}

// 取消
function cancel() {
    layer.closeAll();
}