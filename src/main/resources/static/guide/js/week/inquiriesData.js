var path = "";
var measuringType = "";
var newArr = [];
$(function () {
    showDepartName();
    showTime();
});

//显示时间
function showTime() {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#test1'
            , format: 'yyyy-MM-dd'
            , type: 'date'
            , trigger: 'click'//呼出事件改成click
            , done: function (value) {}
        });
        laydate.render({
            elem: '#test2'
            , format: 'yyyy-MM-dd'
            , type: 'date'
            , trigger: 'click'//呼出事件改成click
            , done: function (value) {}
        });
    })
}

//显示部门
function showDepartName() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getDepartmentList",
            dataType: "json",
            success: function (data) {
                if (data.code == 0 || data.code == 200) {
                    data = data.data;
                    $("#selDepartName").empty();
                    var option = "<option value='-1' >请选择部门</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                    }
                    $('#selDepartName').html(option);
                    form.render();//菜单渲染 把内容加载进去
                } else {
                    layer.alert(data.msg)
                }

            }
        });
        form.on('select(selDepartName)', function (data) {
            $("#selDepartNameHidden").val(data.value);
            selSysName(data.value);
            getMeasuringType(data.value)
        });
        form.on('checkbox(switchTest)', function (data) {
            // var value = data.value; //获取value值
            var arr = new Array();
            $("input:checkbox[name='like']:checked").each(function (i) {
                arr[i] = $(this).val();
                if ($(this).val() == 1) {
                    $("#showMeasuringType").css('display', "revert");
                    getMeasuringType($("#selDepartNameHidden").val())
                }
            });
            newArr = arr;
        });
    });
}

//显示系统和设备号
function selSysName(departName) {
    layui.use(['form'], function () {
        var form = layui.form;
        //显示系统号
        $.ajax({
            type: "GET",
            url: path + "/guide/equipment/getEquMap",
            data: {'type': '1', 'departName': departName},
            dataType: "json",
            success: function (data) {
                $("#selSysName").empty();
                var option = "<option value='-1' >请选择系统号</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#selSysName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(selSysName)', function (data) {
            $("#selSysNameHidden").val(data.value);
            //显示设备号
            $.ajax({
                type: "GET",
                url: path + "/guide/equipment/getEquMap",
                data: {'type': '2', 'departName': departName},
                dataType: "json",
                success: function (data) {
                    $("#selEquName").empty();
                    var option = "<option value='-1' >请选择设备号</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                    }
                    $('#selEquName').html(option);
                    form.render();//菜单渲染 把内容加载进去
                }
            });
            form.on('select(selEquName)', function (data) {
                $("#selEquNameHidden").val(data.value);
            });
        });
    });
}

//显示测点类型
function getMeasuringType(departName) {
    layui.use(['jquery', 'formSelects'], function () {
        var formSelects = layui.formSelects;
        formSelects.config('tags', {
            keyName: 'nuit',
            keyVal: 'id',
        }).data('tags', 'server', {
            url: "/guide/unit/getUnitList?department=" + departName + "&mold=2",
        });
        formSelects.closed('tags', function (id) {
            measuringType = layui.formSelects.value('tags', 'val');
        });
    });
}


//查询
function selShowInquiriesDataList() {
    var departName = $("#selDepartNameHidden").val()
    var systemId = $("#selSysNameHidden").val()
    var equipmentId = $("#selEquNameHidden").val()
    var startTime = $("#test1").val();
    var endTime = $("#test2").val();
    var type = newArr;
    if (measuringType.length > 0 ) {
        measuringType = measuringType
    } else {
        measuringType = "";
    }
    if (departName == "" || departName == "-1"){
        layer.alert("请选择部门");
        return;
    }
    if (systemId == "" || systemId == "-1"){
        layer.alert("请选择系统");
        return;
    }
    if (equipmentId == "" || equipmentId == "-1"){
        layer.alert("请选择设备");
        return;
    }
    if (type.length <= 0){
        layer.alert("请选择测点类型");
        return;
    }

    layui.use(['table', 'form'], function () {
        var table = layui.table, form = layui.form;
        $("#tableDivPeo").css("display", "none");
        $("#tableDivAI").css("display", "none");
        $("#tableDivMain").css("display", "none");
        $("#tableDivDefect").css("display", "none");
        if (type.indexOf('1') != -1) {
            table.render({
                elem: '#demoPeo',
                height: 300,
                toolbar: true,
                url: path + '/guide/inquiries/getInquiriesData?departName=' + departName + '&systemId=' + systemId + '&equipmentId=' + equipmentId + '&measuringType=' + measuringType + '&type=1&startTime=' + startTime + '&endTime' + endTime,
                page: true,
                limit: 10,
                limits: [10, 50, 150],
                cols: [[ //表头
                    {field: 'id', title: '编号', align: 'center', hide: true}
                    , {field: 'measuringType', title: '测点类型', sort: true, align: 'center'}
                    , {field: 'measuringTypeData', title: '数据', sort: true, align: 'center'}
                    , {field: 'unit', title: '单位', sort: true, align: 'center'}
                    , {field: 'createdByName', title: '巡检人', sort: true, align: 'center'}
                    , {field: 'created', title: '时间', sort: true, align: 'center'}
                ]]
                ,
                done: function (res, curr, count) {
                }
            });
            $("#tableDivPeo").css("display", "revert");
        }
        if (type.indexOf('2') != -1) {
            table.render({
                elem: '#demoAI',
                height: 300,
                toolbar: true,
                url: path + '/guide/inquiries/getInquiriesData?departName=' + departName + '&systemId=' + systemId + '&equipmentId=' + equipmentId + '&measuringType=&type=2&startTime=' + startTime + '&endTime' + endTime,
                page: true,
                limit: 10,
                limits: [10, 50, 150],
                cols: [[ //表头
                    {field: 'id', title: '编号', align: 'center', hide: true}
                    , {field: 'measuringType', title: '测点类型', sort: true, align: 'center'}
                    , {field: 'measuringTypeData', title: '数据', sort: true, align: 'center'}
                    , {field: 'unit', title: '单位', sort: true, align: 'center'}
                    , {field: 'createdByName', title: '巡检人', sort: true, align: 'center'}
                    , {field: 'created', title: '时间', sort: true, align: 'center'}
                ]]
                ,
                done: function (res, curr, count) {
                }
            });
            $("#tableDivAI").css("display", "revert");
        }
        if (type.indexOf('3') != -1) {
            table.render({
                elem: '#demoMain',
                height: 300,
                toolbar: true,
                url: path + '/guide/inquiries/getInquiriesData?departName=' + departName + '&systemId=' + systemId + '&equipmentId=' + equipmentId + '&measuringType=&type=3&startTime=' + startTime + '&endTime' + endTime,
                page: true,
                limit: 10,
                limits: [10, 50, 150],
                cols: [[ //表头
                    {field: 'id', title: '编号', align: 'center', hide: true}
                    , {field: 'maintainRecordNo', title: '维护编号', sort: true, align: 'center'}
                    , {field: 'unitName', title: '维护点', sort: true, align: 'center'}
                    , {field: 'workContent', title: '工作内容', sort: true, align: 'center'}
                    , {field: 'workFeedback', title: '工作反馈', sort: true, align: 'center'}
                    , {field: 'employeeName', title: '维护人', sort: true, align: 'center'}
                    , {field: 'endTime', title: '时间', sort: true, align: 'center'}
                ]]
                ,
                done: function (res, curr, count) {
                }
            });
            $("#tableDivMain").css("display", "revert");
        }
        if (type.indexOf('4') != -1) {
            table.render({
                elem: '#demoDefect',
                height: 300,
                toolbar: true,
                url: path + '/guide/inquiries/getInquiriesData?departName=' + departName + '&systemId=' + systemId + '&equipmentId=' + equipmentId + '&measuringType=&type=4&startTime=' + startTime + '&endTime' + endTime,
                page: true,
                limit: 10,
                limits: [10, 50, 150],
                cols: [[ //表头
                    {field: 'id', title: '编号', align: 'center', hide: true}
                    , {field: 'number', title: '缺陷编号', sort: true, align: 'center'}
                    , {field: 'abs', title: '缺陷内容', sort: true, align: 'center'}
                    , {field: 'empIdsName', title: '执行人', sort: true, align: 'center'}
                    , {field: 'realSTime', title: '完成时间', sort: true, align: 'center'}
                ]]
                ,
                done: function (res, curr, count) {
                }
            });
            $("#tableDivDefect").css("display", "revert");
        }
    })
}
