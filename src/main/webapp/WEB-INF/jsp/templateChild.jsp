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
                    if(data[0]=='success'){
                        $.messager.alert("提示","添加成功！");
                    }else if(data[0]=='updsuccess'){
                        $.messager.alert("提示","修改成功！");
                    }else{
                        $.messager.alert("提示","操作失败,请联系技术人员");
                    }
                    $("#save").show();
                    addTempChildWin.window('close');
                    $('#tempChild').datagrid('reload');
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
    <div id="temchlBar" style="height: 100px;text-align: center;line-height: 100px;background-color: #00ee00;border-radius: 8px;" onclick="openWorkPeratorChild()">
        <span style="font-size: 20px;text-align: center;">
            <a href="javascript:openWorkPeratorChild()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
        </span>
    </div>
</body>
</html>