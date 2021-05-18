var path = "";
var saveId;
var userName = "";
$(function () {
    showDepartName();
    showMaintainWork("",'1');
    $.ajax({
        type: 'GET',
        url: path + "/guide/defect/getLoginUserInfo",
        success: function (data) {
            userName = data.userName;
        }
    })
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
            showMaintainWork($("#selDepartNameHidden").val(),'1');
        });
    });
}
//
function showMaintainWorkBtn (status) {
    if (status == '1') {
        showMaintainWork($("#selDepartNameHidden").val(),'1');
    } else {
        showMaintainWork($("#selDepartNameHidden").val(),'2');
    }
}
//查询数据
function showMaintainWork(departmentId,status) {
    if (departmentId == "0") {
        departmentId = "";
    }
    var win = $(window).height();
    var height = win - 120;

    layui.use(['table', 'form'], function () {
        var table = layui.table, form = layui.form;
        if(status=="1"){
            table.render({
                elem: '#demo'
                , height: height
                , toolbar: true
                , url: path + '/guide/maintain/getMaintainRecords?departmentId=' + departmentId+'&status='+status//数据接口
                , page: true //开启分页
                , limit: 50
                , limits: [50, 100, 150]
                , cols: [[ //表头
                    {field: 'id', title: '编号', align: 'center', hide: true}
                    , {field: 'maintainRecordNo', title: '维护编号', sort: true, align: 'center'}
                    , {field: 'systemName', title: '系统', sort: true, align: 'center'}
                    , {field: 'equipmentName', title: '设备', sort: true, align: 'center'}
                    , {field: 'unitName', title: '维护点', sort: true, align: 'center'}
                    , {field: 'workContent', title: '工作内容', sort: true, align: 'center',width:400}
                    , {field: 'employeeName', title: '执行人', sort: true, align: 'center'}
                    , {fixed: '', title: '操作', toolbar: '#tbDemoBar', width: 150, align: 'center'}
                ]]
                , done: function (res, curr, count) {
                }
            });
        }else{
            table.render({
                elem: '#demo'
                , height: height
                , toolbar: true
                , url: path + '/guide/maintain/getMaintainRecords?departmentId=' + departmentId+'&status='+status//数据接口
                , page: true //开启分页
                , limit: 50
                , limits: [50, 100, 150]
                , cols: [[ //表头
                    {field: 'id', title: '编号', align: 'center', hide: true}
                    , {field: 'maintainRecordNo', title: '维护编号', sort: true, align: 'center'}
                    , {field: 'systemName', title: '系统', sort: true, align: 'center'}
                    , {field: 'equipmentName', title: '设备', sort: true, align: 'center'}
                    , {field: 'unitName', title: '维护点', sort: true, align: 'center'}
                    , {field: 'endTime', title: '结束时间', sort: true, align: 'center'}
                    , {field: 'workingHour', title: '工作时间', sort: true, align: 'center'}
                    , {field: 'workFeedback', title: '工作反馈', sort: true, align: 'center',width:400}
                    , {field: 'employeeName', title: '执行人', sort: true, align: 'center'}
                ]]
                , done: function (res, curr, count) {
                }
            });
        }

        table.on('tool(test)', function (obj) {
            var data = obj.data; //获得当前行数据
            $("#selIdTd").val(data.id);
            $(".selSysNameTd").text(data.systemName);
            $(".selEquipmentNameTd").text(data.equipmentName);
            $(".selMaintainPointNameTd").text(data.maintainPointName);

            $(".selStatusTd").text(data.status);
            $(".selWorkingHourTd").text(data.workingHour);
            $(".selEndTimeTd").text(data.endTime);
            $(".selStartTimeTd").text(data.startTime);
            $("#selFeedback").val(data.workFeedback);
            if (obj.event === 'feedback') { //反馈
                if (data.employeeName.indexOf(userName) == -1) {
                    layer.alert("无反馈权限");
                    return false;
                }
                layui.use('layer', function () { //独立版的layer无需执行这一句
                    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
                    layer.open({
                        type: 1
                        , id: 'handleMaintainWork' //防止重复弹出
                        , content: $(".handleMaintainWork")
                        , btnAlign: 'c' //按钮居中
                        , shade: 0.4 //不显示遮罩
                        , area: ['100%', '100%']
                        , yes: function () {
                        }
                    });
                })
            } else if (obj.event === 'start') {
                var maintainRecord = {};
                maintainRecord.id = data.id;

                maintainRecord.status = '1'

                if (data.employeeName.indexOf(userName) == -1) {
                    layer.alert("无开始权限");
                    return false;
                }

                $.ajax({
                    type: "POST",
                    url: path + "/guide/maintain/updateMaintainRecord",
                    data: JSON.stringify(maintainRecord),
                    dataType: "text",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        showMaintainWork($("#selDepartNameHidden").val(),'1');
                    }
                });
            }
        });
    })
}

//保存反馈
function feedbackMaintainWork () {
    var maintainRecord = {};
    maintainRecord.id = $("#selIdTd").val();
    maintainRecord.workFeedback = $("#selFeedback").val();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+ 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var time = year+"-"+month+"-"+day+" "+ hour + ":" + minute + ":" + second;
    maintainRecord.endTime = time;
    maintainRecord.status = '2';
    // 0 认领中/待执行   1执行中   2已完成
    $.ajax({
        type: "POST",
        url: path + "/guide/maintain/updateMaintainRecord",
        data: JSON.stringify(maintainRecord),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            showMaintainWork($("#selDepartNameHidden").val(),'1');
            layer.closeAll();
        }
    });
}

// 取消
function cancel() {
    layer.closeAll();
}