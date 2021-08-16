var path = "";
var saveId;
// 该map可以定义在最上面
var tasks = new Map();
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
    if (departmentId == "" || departmentId == undefined) {
        departmentId = "";
    }
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
    if (department == "" || department == "undefined") {
        department = "";
    }
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: "/guide/maintain/getEquipments?type=1&department=" + department,
            dataType: "json",
            success: function (data) {

                if (data.code == 0) {
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
            url: "/guide/maintain/getEquipments?type=2&department=" + department,
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    $("#selEquipmentName").empty();
                    var option = "<option value='0' >请选择设备</option>";
                    for (var i = 0; i < data.data.length; i++) {
                        option += "<option value='" + data.data[i].id + "'>" + data.data[i].text + "</option>"
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
            url: path + "/guide/unit/getUnitList?mold=2&bothType=3&department=" + department,
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



function showMaintainWork(departmentId, searchWord) {
    if (departmentId == "0") {
        departmentId = "";
    }
    var win = $(window).height();
    var height = win - 100;
    layui.use(['table'], function () {
        var table = layui.table;
        table.render({
            elem: '#demo'
            , toolbar: true
            , url: path + '/guide/maintain/getMaintains?departmentId=' + departmentId + '&searchWord=' + searchWord
            , page: true //开启分页
            , height: height
            , limit: 50
            , autoSort: false
            , limits: [50, 100, 150]
            , cols: [[ //表头
                {field: 'id', title: '编号', align: 'center', hide: true}
                , {field: 'systemName', title: '系统', sort: true, align: 'center'}
                , {field: 'equipmentName', title: '设备', sort: true, align: 'center'}
                , {field: 'unitName', title: '维护点', sort: true, align: 'center'}
                , {field: 'workContent', title: '工作内容',  align: 'center', width: 400}
                , {field: 'planedWorkingHour', title: '计划工时/时', sort: true, align: 'center'}
                , {field: 'cycle', title: '周期/天', sort: true, align: 'center'}
                , {
                    field: 'startTime', title: '倒计时', sort: true, align: 'center',
                    templet: function (a) {

                        // 根据后端返回的时间在延长 周期时间,计算出还剩下多少秒
                        var t = parseInt((new Date(a.startTime).getTime() + parseInt(a.cycle) * 24 * 60 * 60 * 1000) / 1000) - Math.floor(new Date().getTime() / 1000);
                        // 设置每一条数据唯一的key
                        var key = 'key_' + a.id;

                        var day1 = parseInt(t / (60 * 60 * 24));//天
                        var shi1 = parseInt(t / (60 * 60) % 24);//小时
                        var fen1 = parseInt((t / 60) % 60);//分钟
                        var miao1 = parseInt(t % 60);//秒

                        var time2 =  day1 + "天";

                        if (day1 > 0) {
                            time2 = day1 + "天";
                        } else if (shi1 > 0) {
                            time2 = shi1 + "时" + fen1 + "分" + miao1 + "秒";
                        } else if (fen1 > 0) {
                            time2 = fen1 + "分" + miao1 + "秒";
                        } else if (miao1 > 0) {
                            time2 = miao1 + "秒";
                        }

                        // 这里初始值计算显示的倒计时只是为了 如页面有刷新操作，只是把这个初始值也显示为倒计时
                        var html = `<label id=${key} style="color: orange;">${time2}</label>`;
                        if (a.assignmentStatus == '2') {
                            return `<label  id=${key} style='color:red;'>已暂停</label>`;
                        } else if (a.assignmentStatus == '1') {
                            return `<label  id=${key} style='color:blue;'>已分配</label>`;
                        } else if (t <= 0) {
                            return `<label  id=${key} style='color:green;'>待分配</label>`;
                        }
                        addTask(key, function () {
                            t--;
                            var day = parseInt(t / (60 * 60 * 24));//天
                            var shi = parseInt(t / (60 * 60) % 24);//小时
                            var fen = parseInt((t / 60) % 60);//分钟
                            var miao = parseInt(t % 60);//秒

                            if (t <= 0) {
                                $('#' + key).html("<label style='color:green;'>待分配</label>");
                                delTask(key);
                            } else {
                                $('#' + key).text(day + "天");
                            }
                            // } else if (day > 0) {
                            //     $('#' + key).text(day + "天");
                            // } else if (shi > 0) {
                            //     $('#' + key).text(shi + "时" + fen + "分" + miao + "秒");
                            // } else if (fen > 0) {
                            //     $('#' + key).text(fen + "分" + miao + "秒");
                            // } else {
                            //     $('#' + key).text(miao + "秒");
                            // }

                        });
                        return html;
                    }

                }
                , {fixed: '', title: '操作', toolbar: '#tbDemoBar', width: 200, align: 'center'}
            ]]
            , done: function (res, curr, count) {
            }
        });
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            if (obj.event === 'edit') {
                openMaintainConfig(data.id)
            } else if (obj.event === 'start') {
                resetMaintainConfig(data.id)
            } else if (obj.event === 'stop') {
                stopMaintainConfig(data.id)
            } else if (obj.event === 'distribution') {
                distributionMaintainConfig(data.id)
            }
        });

        table.on('sort(test)', function (obj) { //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            //尽管我们的 table 自带排序功能，但并没有请求服务端。
            //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
            table.reload('demo', {
                initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
                , where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                    field: obj.field //排序字段
                    , order: obj.type //排序方式
                }
            });

        });
    });

}

// 定时计时任务，这里是1秒执行一次
setInterval(function () {
    for (var key in tasks) {
        tasks[key]();
    }
}, 1000)

// 添加定时任务
function addTask(key, value) {
    if (typeof value === "function") {
        tasks[key] = value;
    }
}

// 删除定时任务
function delTask(task) {
    delete tasks[task];
}


//打开添加
function openMaintainConfig(id) {
    layui.use(['table', 'form'], function () {
        var form = layui.form;
        if (id == "") {
            $(".departSelectTr").css("display", "revert");
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
            $(".departSelectTr").css("display", "none");
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
    if (maintainWork.systemId == "0") {
        layer.alert("请选择系统");
        return false;
    } else if (maintainWork.equipmentId == "0") {
        layer.alert("请选择设备");
        return false;
    } else if (maintainWork.unitId == "0") {
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
            $("#maintainConfigCreateTime").text(data.startTime);//创建时间
            $("#maintainConfigPlanedWorkingHour").text(data.planedWorkingHour);//预估工时
            $("#maintainConfigMaintainPointName").text(data.workContent);//工作内容
            $("#maintainConfigExecutorId").val("");
            $("#maintainConfigDepartmentId").val(data.departmentId);
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
    if (maintainRecord.employeeId == "") {
        layer.alert("请选择执行人");
        return false;
    }
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