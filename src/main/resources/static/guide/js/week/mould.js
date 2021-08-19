var path = "";
var id = "";
$(function(){
    showDepartName();
});
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
                    var option = "<option value='0' >请选择部门</option>";
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
            selTemplate();
        });
    });
}
//显示模板
function selTemplate() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getTemplateMap",
            dataType: "json",
            success: function (data) {
                if (data.code == 0 || data.code == 200) {
                    data = data.data;
                    $("#selTemplate").empty();
                    var option = "<option value='0' >请选择模板</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                    }
                    $('#selTemplate').html(option);
                    form.render();//菜单渲染 把内容加载进去
                } else {
                    layer.alert(data.msg)
                }
            }
        });
        form.on('select(selTemplate)', function (data) {
            $("#selTemplateHidden").val(data.value);
        });
    });
}
//根据条件查询
function selShowMouldList() {
    var department = $("#selDepartNameHidden").val();
    var template = $("#selTemplateHidden").val();
    if (department == "" || department == "0"){
        alert("请选择部门");
        return;
    }
    if (template == "" || template == "0"){
        alert("请选择模板");
        return;
    }
    $(".center").css("display","block");
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demo'
            ,height: "full-200"
            ,toolbar: true
            ,url: path + "/guide/mould/getMouldList?depart="+department+"&Template="+template //数据接口
            ,page: true //开启分页
            ,limit: 50
            ,limits: [50, 100, 150]
            ,cols: [[ //表头
                {field: 'id', title: '编号', align: 'center', sort: true, hide:true}
                ,{field: 'status', title: '状态', align: 'center', event: 'selStatus', style:'cursor: pointer;color:red;'}
                ,{field: 'startTime', title: '开始时间', sort: true,  align: 'center'}
                ,{field: 'endTime', title: '结束时间', sort: true,  align: 'center'}
                ,{field: 'diachronic', title: '历时', sort: true,  align: 'center'}
                ,{field: 'userName', title: '巡检人',  align: 'center'}
                ,{field: 'count', title: '人工巡检数', sort: true,  align: 'center'}
                ,{field: 'aicount', title: 'AI巡检数', sort: true,  align: 'center'}
            ]]
            ,done: function(res, curr, count){

            }
        });
        table.on('tool(test)', function(obj) {
            var data = obj.data;
            if(obj.event == 'selStatus'){
                showPostPerData(data.id);
                layer.open({
                    type: 1
                    ,id: 'postPerData' //防止重复弹出
                    ,content: $(".postPerData")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0.5 //不显示遮罩
                    ,area: ['100%', '100%']
                    ,success: function () {
                    }
                    ,yes: function(){
                    }
                });
            }
        });
    });
}
//显示状态数据
function showPostPerData(id) {
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demoP'
            ,height: "full-200"
            ,toolbar: true
            ,url: path + "/guide/mould/getPostPerData?id="+id //数据接口
            ,cols: [[ //表头
                {field: 'equipment', title: '设备', sort: true,  align: 'center'}
                ,{field: 'measuringType', title: '测点类型', sort: true,  align: 'center'}
                ,{field: 'measuringTypeData', title: '数据', sort: true,  align: 'center'}
                ,{field: 'unit', title: '单位', sort: true,  align: 'center'}
                ,{field: 'created', title: '时间', sort: true,  align: 'center'}
            ]]
            ,done: function(res, curr, count){}
        });
    });
}