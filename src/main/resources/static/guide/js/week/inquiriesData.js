var path = "";
var name = "";
var measuringType = "";
$(function(){
    showDepartName();
    showTime();
});
//导出
function productqueryOutXls() {
    var $trs = $("#LAY_demo1").find("tr");
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
    var date=new Date().getTime();
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
            ,type: 'date'
            ,trigger: 'click'//呼出事件改成click
            , done: function (value) {
                $("#selStartTimeHidden").val(value);
            }
        });
        laydate.render({
            elem: '#test2'
            , format: 'yyyy-MM-dd'
            ,type: 'date'
            ,trigger: 'click'//呼出事件改成click
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
            data: {'type':'1','departName':departName},
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
                data: {'type':'2','departName':departName},
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
                name = sysName +","+equName;
            });
            form.on('select(selType)', function (data) {
                $("#selTypeNameHidden").val(data.value);
            });
        });
    });
}
//查询
function selShowInquiriesDataList() {
    /*$("#LAY_demo1").remove();
    $(document).unbind();
    $('#daochuBtn').after('<table class="flow-default item" id="LAY_demo1" cellpadding=\'0\'><thead id="itemHead"><th>测点类型</th><th>数据</th><th>单位</th><th>巡检人</th><th>时间</th></thead></table>');*/
    var departName =  $("#selDepartNameHidden").val();
    var type = $("#selTypeNameHidden").val();
    var selSysNameHidden=$("#selSysNameHidden").val();
    var selEquNameHidden=$("#selEquNameHidden").val();
    var selStartTimeHidden = $("#selStartTimeHidden").val();
    var selEndTimeHidden = $("#selEndTimeHidden").val();
    if (departName == "0" || departName == ""){
        layer.alert("请选择部门");
        return;
    }
    if ($("#selSysNameHidden").val() == "-1" || $("#selSysNameHidden").val() == ""){
        layer.alert("请选择系统号");
        return;
    }
    if ($("#selEquNameHidden").val() == "-1" || $("#selEquNameHidden").val() == ""){
        layer.alert("请选择设备号");
        return;
    }
    $(".center").css("display","block");
        $.ajax({
            url: path + "/guide/inquiries/getInquiriesData",	    //请求数据路径
            type: 'get',										//请求数据最好用get，上传数据用post
            data: {
                page:1,
                limit:100,
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
                var tableDiv = $("#tableDiv");
                tableDiv.html("");
                var table ="";
                if(type==3){
                    table = "<table class='flow-default item' id='LAY_demo1' cellpadding='0'><thead id=\"itemHead\"><th>维护编号</th><th>维护点</th><th>工作内容</th><th>维护人</th><th>时间</th></thead>";
                    layui.each(res.data, function (index, item) {
                        table  += "<tr><td>" + res.data[index].maintainRecordNo + "</td><td>" + res.data[index].unitName + "</td><td>" + res.data[index].workContent + "</td><td>" + res.data[index].employeeName + "</td><td>" + res.data[index].endTime + "</td></tr>"
                    });
                }else{
                     table = "<table class='flow-default item' id='LAY_demo1' cellpadding='0'><thead id=\"itemHead\"><th>测点类型</th><th>数据</th><th>单位</th><th>巡检人</th><th>时间</th></thead>";
                    layui.each(res.data, function (index, item) {
                        table  += "<tr><td>" + res.data[index].measuringType + "</td><td>" + res.data[index].measuringTypeData + "</td><td>" + res.data[index].unit + "</td><td>" + res.data[index].createdByName + "</td><td>" + res.data[index].created + "</td></tr>"
                    });
                }

                table += "</table>"
                tableDiv.append(table)
            }
        });



}
