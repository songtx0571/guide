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
    <%@ include file="searchWorkPerator.jsp"%>
</head>
<style type="text/css">
    .searchSys{
        width: 100px;
        float: left;
        height: 100px;
        display: inline-block;
        border-radius: 50%;
    }
    .createSys{
        width: 70%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        float: right;
        background-color: #00bbee;
        border-radius: 8px;
        display: inline-block;
        margin-right: 10%;
        margin-top: 25px;
    }
    .createSys a strong{
        color: #fff;
    }
</style>
<script type="text/javascript">
    function openSystem(){
        $("#name").textbox('setValue','');
        $('#SystemId').val('');
        //获取部门信息
        $.ajax({
            type:"post",
            url:"/guide/template/getDepartmentList",
            dataType:"json",
            success:function(json){
                $('#departName').combobox({
                    valueField: "id", //Value字段
                    textField: "text", //Text字段
                    panelHeight:"300",
                    data:json,
                });
            }
        });
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
        var depart=$("#departName").textbox('getValue');
        if(name==''){
            $.messager.alert("提示","名称为必填！");
            return;
        }
        if(depart==''){
            $.messager.alert("提示","部门为必选！");
            return;
        }
        $.ajax({
            url: '/guide/equipment/addEquipment',
            type: 'GET',
            dataType: 'json',
            async: false,
            data:{'name':name,'type':'1','id':_id,'depart':depart},
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
    //打开搜索框
    function searchSys() {
        //获取部门信息
        $.ajax({
            type:"post",
            url:"/guide/template/getDepartmentList",
            dataType:"json",
            success:function(json){
                $("#depart").combobox({//往下拉框塞值
                    data:json,
                    valueField:"id",//value值
                    textField:"text",//文本值
                    panelHeight:"auto"
                });
            }
        });

        search=$('#search').window({
            title:'模板查询',
            height: 300,
            width: 450,
            closed: true,
            minimizable:false,
            maximizable:false,
            collapsible:false,
            cache:false,
            shadow:true
        });
        search.window('open');
    }
    function searchWork() {
        var department=$("#depart").combotree('getValue');
        var dep=department+"";
        $('#sys').datagrid('load',{
            department:dep,
            type:'1'
        });
    }
    function closeSearch() {
        search.window('close');
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
    <div id="sysBar" style="height: 100px;text-align: center;line-height: 100px;">
        <div onclick="javascript:searchSys()" class="searchSys">
            <img src="../../img/sousuo.png" style="width: 100px;height: 100px;"/>
        </div>
        <div onclick="javascript:openSystem()" class="createSys">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openSystem()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
            </span>
        </div>
    </div>
</body>
</html>