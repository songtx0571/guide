<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/unit.js?version=1.02"></script>
    <%@ include file="updUnit.jsp"%>
</head>
<style type="text/css">

</style>
<script type="text/javascript">
    function openUnit(){
        /*$.ajax({
            type:"post",
            url:"/guide/unit/getUnitMap",//请求后台数据
            dataType:"json",
            success:function(json){
                $("#type").combobox({//往下拉框塞值
                    data:json,
                    valueField:"id",//value值
                    textField:"type",//文本值
                    panelHeight:"auto"
                });
                var data = $('#type').combobox('getData');
                $('#type').combobox('select',data[0].id);
            }
        });*/
        $("#nuit").textbox('setValue','');
        //$("#type").combobox({disabled: false});
        $('#unitId').val('');
        addunitWin=$('#unitWin').window({
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
        addunitWin.window('open');
    }
    function closeWin(addunitWin){
        addunitWin.window('close');
    }
    function saveAddData() {
        var nuit=$("#nuit").textbox('getValue');
        var mold='1';//标识为单位
        var _id=$('#unitId').val();
        if(nuit==''){
            $.messager.alert("提示","名称为必填！");
        }else{
            $.ajax({
                url: '/guide/unit/addUnit',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'nuit':nuit,'type':'单位','id':_id,'mold':mold},
                beforeSend:function(){
                    $("#save").hidden;//隐藏提交按钮
                },
                success: function (data) {
                    $.messager.alert("提示",data[0]);
                    $("#save").show();//提交按钮
                    addunitWin.window('close');
                    $('#unit').datagrid('reload');//刷新页面数据
                },
                error: function (data) {
                    $.messager.alert("提示","请求失败,请联系技术人员");
                }
            });
        }
    }

</script>
<body class="easyui-layout">
    <table id="unit" class="easyui-datagrid" title="属性列表"
           fitColumns="true" pagination="true" rownumbers="true"
           fit="true" toolbar="#unitBar">
        <thead>
        <tr>
            <th field="id" width='80px' resizable='false'>编号</th>
            <th field="type" width='80px' resizable='false' >类型</th>
            <th field="nuit" width='50px' resizable='false' >设备名称</th>
        </tr>
        </thead>
    </table>
    <div id="unitBar" style="height: 100px;text-align: center;line-height: 100px;background-color: #00bbee;border-radius: 8px;" onclick="openUnit()">
        <span style="font-size: 20px;text-align: center;">
            <a href="javascript:openUnit()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
        </span>
    </div>
</body>
</html>