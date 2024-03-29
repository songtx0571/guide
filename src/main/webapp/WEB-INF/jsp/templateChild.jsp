<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/templateChild.js"></script>
    <%@ include file="updTemplateChild.jsp"%>
</head>
<style type="text/css">

</style>
<script type="text/javascript">
    function openWorkPeratorChild(){
        $('#temChildId').val('');//设置路线为空
        addTempChildWin=$('#updtempChild').window({
            title:'新建路线',
            height: 400,
            width: 550,
            closed: true,
            minimizable:false,
            maximizable:false,
            collapsible:false,
            cache:false,
            shadow:false
        });
        addTempChildWin.window('open');
    }
    function closeWin(addTempChildWin){
        addTempChildWin.window('close');
    }
    function saveAddData() {
        var sysName= $('#sysName').combobox('getText');
        var equName= $('#equName').combobox('getText');
        var sightType= $('#sightType').combobox('getText');
        var unitType= $('#unitType').combobox('getText');
        var workId=$("#workId").val();
        var temChildId=$("#temChildId").val();
        if(sysName.trim()==''){
            $.messager.alert("提示","系统号为必填！");
        }else if(equName.trim()==''){
            $.messager.alert("提示","设备名称为必填！");
        }else if(sightType.trim()==''){
            $.messager.alert("提示","测点类型为必填！");
        }else if(unitType.trim()==''){
            $.messager.alert("提示","单位为必填！");
        }else{
            $.ajax({
                url: '/guide/template/addWorkPeratorChild',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'sysName':sysName,'equName':equName,'sightType':sightType,'unitType':unitType,'workId':workId,'temChildId':temChildId},
                beforeSend:function(){
                    $("#save").hidden;//隐藏提交按钮
                },
                success: function (data) {
                    if (data.code == 0 || data.code == 200){
                        data = data.data;
                        $.messager.alert("提示","添加成功！");
                        $("#save").show();
                        addTempChildWin.window('close');
                        $('#tempChild').datagrid('reload');
                    } else {
                        layer.alert(data.msg)
                    }

                },
            });
        }
    }
</script>
<body class="easyui-layout">
    <input type="text" id="workId" value="${temid}" hidden />
    <table id="tempChild" class="easyui-datagrid" title="路线列表"
           fitColumns="true" pagination="true" rownumbers="true"
           fit="true" toolbar="#temchlBar">
        <thead>
        <tr>
            <th field="id" resizable='false'>编号</th>
            <th field="equipment" resizable='false' >设备名称</th>
            <th field="measuringType" resizable='false' >测点类型</th>
            <th field="unit" resizable='false' >单位</th>
            <th field="edit" resizable='false' >操作</th>
        </tr>
        </thead>
    </table>
    <div id="temchlBar" style="width: 100%;height: 100px;text-align: center;padding: 25px 0px; box-sizing: border-box;">
        <div style="width: 70%;height: 50px;background-color: #00bbee;border-radius: 8px;line-height: 50px;margin-left: 15%;" onclick="openWorkPeratorChild()">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openWorkPeratorChild()" style="text-decoration: none;color: #fff"><strong>创建</strong></a>
            </span>
        </div>
    </div>
</body>
</html>