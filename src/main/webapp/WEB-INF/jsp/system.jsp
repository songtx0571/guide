<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/system.js?version=1.05"></script>
    <%@ include file="updSystem.jsp"%>
</head>
<style type="text/css">

</style>
<script type="text/javascript">
    function openSystem(){
        $("#name").textbox('setValue','');
        //$("#type").combobox({disabled: false});
        //$('#type').combobox('setValue','0');
        $('#SystemId').val('');
        addSystem=$('#system').window({
            title:'新建',
            height: 300,
            width: 850,
            closed: true,
            minimizable:false,
            maximizable:false,
            collapsible:false,
            cache:false,
            shadow:false
        });
        addSystem.window('open');
    }
    function closeWin(addSystem){
        addSystem.window('close');
    }
    function saveAddData() {
        var name=$("#name").textbox('getValue');
        var type= '1';//1：系统；2：设备
        var _id=$('#SystemId').val();
        if(name==''){
            $.messager.alert("提示","名称为必填！");
        }else{
            $.ajax({
                url: '/guide/equipment/addEquipment',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'name':name,'type':'1','id':_id},
                beforeSend:function(){
                    $("#save").hidden;//隐藏提交按钮
                },
                success: function (data) {
                    $.messager.alert("提示",data[0]);
                    $("#save").show();//提交按钮
                    addSystem.window('close');
                    $('#sys').datagrid('reload');//刷新页面数据
                },
            });
        }
    }
</script>
<body class="easyui-layout">
    <table id="sys" class="easyui-datagrid" title="系统列表"
           fitColumns="true" pagination="true" rownumbers="true"
           fit="true" toolbar="#sysBar">
        <thead>
        <tr>
            <th field="id" width='80px' resizable='false'>编号</th>
            <th field="type" width='80px' resizable='false' >类型</th>
            <th field="name" width='50px' resizable='false' >设备名称</th>
        </tr>
        </thead>
    </table>
    <div id="sysBar" style="height: 100px;text-align: center;line-height: 100px;background-color: #00bbee;border-radius: 8px;" onclick="openSystem()">
        <span style="font-size: 20px;text-align: center;">
            <a href="javascript:openSystem()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
        </span>
    </div>
</body>
</html>