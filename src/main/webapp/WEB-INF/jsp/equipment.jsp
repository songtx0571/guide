<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/equipment.js?version=1.03"></script>
    <%@ include file="updEquipment.jsp"%>
</head>
<style type="text/css">

</style>
<script type="text/javascript">
    function openEquipment(){
        $("#name").textbox('setValue','');
        //$("#type").combobox({disabled: false});
        //$('#type').combobox('setValue','0');
        $('#EquipId').val('');
        addEquipment=$('#equipment').window({
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
        addEquipment.window('open');
    }
    function closeWin(addEquipment){
        addEquipment.window('close');
    }
    function saveAddData() {
        var name=$("#name").textbox('getValue');
        var type= '2';//1：系统；2：设备
        var _id=$('#EquipId').val();
        if(name==''){
            $.messager.alert("提示","名称为必填！");
        }else{
            $.ajax({
                url: '/guide/equipment/addEquipment',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'name':name,'type':type,'id':_id},
                beforeSend:function(){
                    $("#save").hidden;//隐藏提交按钮
                },
                success: function (data) {
                    $.messager.alert("提示",data[0]);
                    $("#save").show();//提交按钮
                    addEquipment.window('close');
                    $('#equip').datagrid('reload');//刷新页面数据
                },
            });
        }
    }
</script>
<body class="easyui-layout">
    <table id="equip" class="easyui-datagrid" title="设备列表"
           fitColumns="true" pagination="true" rownumbers="true"
           fit="true" toolbar="#equiBar">
        <thead>
        <tr>
            <th field="id" width='80px' resizable='false'>编号</th>
            <th field="type" width='80px' resizable='false' >类型</th>
            <th field="name" width='50px' resizable='false' >设备名称</th>
        </tr>
        </thead>
    </table>
    <div id="equiBar" style="height: 100px;text-align: center;line-height: 100px;background-color: #00bbee;border-radius: 8px;" onclick="openEquipment()">
        <span style="font-size: 20px;text-align: center;">
            <a href="javascript:openEquipment()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
        </span>
    </div>
</body>
</html>