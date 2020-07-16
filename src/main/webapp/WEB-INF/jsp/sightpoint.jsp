<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/sightpoint.js?version=1.01"></script>
    <%@ include file="updSightPoint.jsp"%>
</head>
<style type="text/css">

</style>
<script type="text/javascript">
    function openSightPoint(){
        $("#nuit").textbox('setValue','');
        //$("#type").combobox({disabled: false});
        $('#pointId').val('');
        addPointWin=$('#pointWin').window({
            title:'新建',
            height: 300,
            width: 400,
            closed: true,
            minimizable:false,
            maximizable:false,
            collapsible:false,
            cache:false,
            shadow:false
        });
        addPointWin.window('open');
    }
    function closeWin(addPointWin){
        addPointWin.window('close');
    }
    function saveAddData() {
        var nuit=$("#nuit").textbox('getValue');
        var _id=$('#pointId').val();
        var mold='2';
        if(nuit==''){
            $.messager.alert("提示","名称为必填！");
        }else{
            $.ajax({
                url: '/guide/unit/addUnit',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'nuit':nuit,'type':'测点','id':_id,'mold':mold},
                beforeSend:function(){
                    $("#save").hidden;//隐藏提交按钮
                },
                success: function (data) {
                    $.messager.alert("提示",data[0]);
                    $("#save").show();//提交按钮
                    addPointWin.window('close');
                    $('#sightpoint').datagrid('reload');//刷新页面数据
                },
                error: function (data) {
                    $.messager.alert("提示","请求失败,请联系技术人员");
                }
            });
        }
    }

</script>
<body class="easyui-layout">
    <table id="sightpoint" class="easyui-datagrid" title="属性列表"
           fitColumns="true" pagination="true" rownumbers="true"
           fit="true" toolbar="#pointBar">
        <thead>
        <tr>
            <th field="id" width='80px' resizable='false'>编号</th>
            <th field="type" width='80px' resizable='false' >类型</th>
            <th field="nuit" width='50px' resizable='false' >设备名称</th>
        </tr>
        </thead>
    </table>
    <div id="pointBar" style="height: 100px;text-align: center;line-height: 100px;background-color: #00bbee;border-radius: 8px;" onclick="openSightPoint()">
        <span style="font-size: 20px;text-align: center;">
            <a href="javascript:openSightPoint()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
        </span>
    </div>
</body>
</html>