var path = "";
var id = "";
$(function(){
    showDepartName();
    showEquipment();
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
                    $("#addDepartName").empty();
                    $("#updDepartName").empty();
                    var option = "<option value='0' >请选择部门</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                    }
                    $('#selDepartName').html(option);
                    $('#addDepartName').html(option);
                    $('#updDepartName').html(option);
                    form.render();//菜单渲染 把内容加载进去
                } else {
                    layer.alert(data.msg)
                }
            }
        });
        form.on('select(selDepartName)', function (data) {
            $("#selDepartNameHidden").val(data.value);
        });
        form.on('select(addDepartName)', function (data) {
            $("#addDepartNameHidden").val(data.value);
        });
        form.on('select(updDepartName)', function (data) {
            $("#updDepartNameHidden").val(data.value);
        });
    });
}
//按照条件查询
function selShowEquipmentList() {
    var department = $("#selDepartNameHidden").val();
    if (department == "" || department == "0"){
        alert("请选择部门");
        return;
    }
    // 显示查询的模板
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demo'
            ,height: 'full-200'
            ,toolbar: true
            ,url: path + '/guide/equipment/getEquipmentList?type=2&department='+department//数据接口
            ,page: true //开启分页
            ,limit: 50
            ,limits: [50, 100, 150]
            ,cols: [[ //表头
                {field: 'id', title: '编号', align: 'center', hide: true}
                ,{field: 'name', title: '名称', sort: true,  align: 'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemo1', width:270, align:'center'}
            ]]
            ,done: function(res, curr, count){

            }
        });
        //监听工具条
        table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'del'){ //删除
                $.ajax({
                    url: path + '/guide/equipment/delEquipment',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id},
                    success: function (data) {
                        if(data!=null&&data[0]=='error'){
                            alert("操作失败,请联系技术人员");
                        }
                        showEquipment("");
                    }
                });

            } else if (obj.event === 'edit') {
                id = data.id;
                $("#updEquipmentName").val(data.name);
                $("#updDepartNameHidden").val(data.departmentName);
                layui.use('form', function(){
                    var form = layui.form;
                    $("#updDepartName").val(data.department);
                    form.render('select');
                    form.render(); //更新全部
                });
                layer.open({
                    type: 1
                    ,id: 'updEquipment' //防止重复弹出
                    ,content: $(".updEquipment")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0.5 //不显示遮罩
                    ,area: ['420px', '330px']
                    ,success: function () {
                    }
                    ,yes: function(){
                    }
                });
            }
        });
    });
}
//显示模板
function showEquipment() {
    // 显示查询的模板
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demo'
            ,height: 'full-200'
            ,toolbar: true
            ,url: path + '/guide/equipment/getEquipmentList?type=2'//数据接口
            ,page: true //开启分页
            ,limit: 50
            ,limits: [50, 100, 150]
            ,cols: [[ //表头
                {field: 'id', title: '编号', align: 'center', hide: true}
                ,{field: 'name', title: '名称', sort: true,  align: 'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemo1', width:270, align:'center'}
            ]]
            ,done: function(res, curr, count){

            }
        });
        //监听工具条
        table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'del'){ //删除
                $.ajax({
                    url: path + '/guide/equipment/delEquipment',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id},
                    success: function (data) {
                        if(data!=null&&data[0]=='error'){
                            alert("操作失败,请联系技术人员");
                        }
                        showEquipment("");
                    }
                });

            } else if (obj.event === 'edit') {
                id = data.id;
                $("#updEquipmentName").val(data.name);
                $("#updDepartNameHidden").val(data.departmentName);
                layui.use('form', function(){
                    var form = layui.form;
                    $("#updDepartName").val(data.department);
                    form.render('select');
                    form.render(); //更新全部
                });
                layer.open({
                    type: 1
                    ,id: 'updEquipment' //防止重复弹出
                    ,content: $(".updEquipment")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0.5 //不显示遮罩
                    ,area: ['420px', '330px']
                    ,success: function () {
                    }
                    ,yes: function(){
                    }
                });
            }
        });
    });
}
//打开添加页面
function openEquipment() {
    id = "";
    $("#addEquipmentName").val("");
    layui.use('form', function(){
        var form = layui.form;
        $("#addDepartName").val("0");
        form.render('select');
        form.render(); //更新全部
    });
    layer.open({
        type: 1
        ,id: 'addEquipment' //防止重复弹出
        ,content: $(".addEquipment")
        ,btnAlign: 'c' //按钮居中
        ,shade: 0.5 //不显示遮罩
        ,area: ['420px', '330px']
        ,success: function () {
        }
        ,yes: function(){
        }
    });
}
//添加
function saveAddData() {
    var name=$("#addEquipmentName").val();
    var type= '2';//1：系统；2：设备
    var depart=$("#addDepartNameHidden").val();
    if(name==''){
        return;
    }
    if(depart == '' || depart == "0"){
        return;
    }
    $.ajax({
        url: '/guide/equipment/addEquipment',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'name':name,'type':type,'depart':depart, 'id':""},
        beforeSend:function(){
            $("#save").hidden;//隐藏提交按钮
        },
        success: function (data) {
            layer.closeAll();
            showEquipment("");
        }
    });
}
//修改
function saveUpdData() {
    var name=$("#updEquipmentName").val();
    var type= '2';//1：系统；2：设备
    var _id=id;
    var depart=$("#updDepartNameHidden").val();
    if(name==''){
        return;
    }
    if(depart == '' || depart == "0"){
        return;
    }
    $.ajax({
        url: '/guide/equipment/addEquipment',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'name':name,'type':type,'depart':depart,id : _id},
        beforeSend:function(){
            $("#saveUpd").hidden;//隐藏提交按钮
        },
        success: function (data) {
            layer.closeAll();
            showEquipment("");
        }
    });
}
//取消
function cancel() {
    layer.closeAll();
}