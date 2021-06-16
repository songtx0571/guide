var path = "";
var name = "";
var measuringType = "";
var newArr = [];
$(function () {
    showDepartName();
    showTime();
});

//导出
function productqueryOutXls() {
    var $trs = $(".item").find("tr");
    var str = "";
    for (var i = 0; i < $trs.length; i++) {
        var $tds = $trs.eq(i).find("td,th");
        for (var j = 0; j < $tds.length; j++) {
            str += $tds.eq(j).text() + ",";
        }
        str += "\n";
    }

    var aaaa = "data:text/csv;charset=utf-8,\ufeff" + str;
    var link = document.createElement("a");
    link.setAttribute("href", aaaa);
    var date = new Date().getTime();
    var filename = new Date(date).toLocaleDateString();
    link.setAttribute("download", filename + ".csv");
    link.click();
}

//显示时间
function showTime() {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#test1'
            , format: 'yyyy-MM-dd'
            , type: 'date'
            , trigger: 'click'//呼出事件改成click
            , done: function (value) {
                $("#selStartTimeHidden").val(value);
            }
        });
        laydate.render({
            elem: '#test2'
            , format: 'yyyy-MM-dd'
            , type: 'date'
            , trigger: 'click'//呼出事件改成click
            , done: function (value) {
                $("#selEndTimeHidden").val(value);
            }
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
            selSysName(data.value);
        });
        form.on('checkbox(switchTest)', function (data) {
            // var value = data.value; //获取value值
            var arr = new Array();
            $("input:checkbox[name='like']:checked").each(function(i) {
                arr[i] = $(this).val();
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
            var sysName = data.elem[data.elem.selectedIndex].text;
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
                var equName = data.elem[data.elem.selectedIndex].text;
                name = sysName + "," + equName;
            });
            /*form.on('select(selType)', function (data) {
                $("#selTypeNameHidden").val(data.value);
            });*/
        });
    });
}

//查询
function selShowInquiriesDataList() {
    var departName = $("#selDepartNameHidden").val();
    var type = newArr.toString();
    var selSysNameHidden = $("#selSysNameHidden").val();
    var selEquNameHidden = $("#selEquNameHidden").val();
    var selStartTimeHidden = $("#selStartTimeHidden").val();
    var selEndTimeHidden = $("#selEndTimeHidden").val();
    if (departName == "0" || departName == "") {
        layer.alert("请选择部门");
        return;
    }
    if ($("#selSysNameHidden").val() == "-1" || $("#selSysNameHidden").val() == "") {
        layer.alert("请选择系统号");
        return;
    }
    if ($("#selEquNameHidden").val() == "-1" || $("#selEquNameHidden").val() == "") {
        layer.alert("请选择设备号");
        return;
    }
    if (type.length <= 0) {
        layer.alert("请选择测点类型");
        return;
    }
    $(".center").css("display", "block");
    $("#daochuBtn").css("display","block");
    $.ajax({
        url: path + "/guide/inquiries/getInquiriesData",	    //请求数据路径
        type: 'get',										//请求数据最好用get，上传数据用post
        data: {
            page: 1,
            limit: 100,
            departName: departName,
            name: name,
            systemId: selSysNameHidden,
            equipmentId: selEquNameHidden,
            measuringType: measuringType,
            type: type,
            startTime: selStartTimeHidden,
            endTime: selEndTimeHidden
        },   //传参
        dataType: 'json',
        success: function (res) {
            var tableDivPeo = $("#tableDivPeo");
            var tableDivAI = $("#tableDivAI");
            var tableDivMain = $("#tableDivMain");
            tableDivPeo.html("");
            var tablePeo = "";

            tableDivPeo.html("");
            var tableAI = "";

            tableDivMain.html("");
            var tableMain = "";
            //人工
            if (res.data.RGData) {
                tablePeo = "<table class='item' id='LAY_demo1' cellpadding='0'><thead id=\"itemHead\"><th>测点类型</th><th>数据</th><th>单位</th><th>巡检人</th><th>时间</th></thead>";
                layui.each(res.data.RGData, function (index, item) {
                    tablePeo += "<tr><td>" + res.data.RGData[index].measuringType + "</td><td>" + res.data.RGData[index].measuringTypeData + "</td><td>" + res.data.RGData[index].unit + "</td><td>" + res.data.RGData[index].createdByName + "</td><td>" + res.data.RGData[index].created + "</td></tr>"
                });
                tablePeo += "</table>";
                tableDivPeo.append(tablePeo)
            }

            //AI
            if (res.data.AIData) {
                tableAI = "<table class='item' id='LAY_demo1' cellpadding='0'><thead id=\"itemHead\"><th>测点类型</th><th>数据</th><th>单位</th><th>巡检人</th><th>时间</th></thead>";
                layui.each(res.data.AIData, function (index, item) {
                    tableAI += "<tr><td>" + res.data.AIData[index].measuringType + "</td><td>" + res.data.AIData[index].measuringTypeData + "</td><td>" + res.data.AIData[index].unit + "</td><td>" + res.data.AIData[index].createdByName + "</td><td>" + res.data.AIData[index].created + "</td></tr>"
                });
                tableAI += "</table>";
                tableDivAI.append(tableAI)
            }

            //维护
            if (res.data.WHData){
                tableMain = "<table class='item' id='LAY_demo1' cellpadding='0'><thead id=\"itemHead\"><th>维护编号</th><th>维护点</th><th>工作内容</th><th>工作反馈</th><th>维护人</th><th>时间</th></thead>";
                layui.each(res.data.WHData, function (index, item) {
                    tableMain += "<tr><td>" + res.data.WHData[index].maintainRecordNo + "</td><td>" + res.data.WHData[index].unitName + "</td><td>" + res.data.WHData[index].workContent + "</td><td>" + res.data.WHData[index].workFeedback + "</td><td>" + res.data.WHData[index].employeeName + "</td><td>" + res.data.WHData[index].endTime + "</td></tr>"
                });
                tableMain += "</table>";
                tableDivMain.append(tableMain)
            }



        }
    });


}
