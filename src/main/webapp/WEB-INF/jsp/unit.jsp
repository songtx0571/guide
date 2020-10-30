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
    <%@ include file="searchWorkPerator.jsp"%>
</head>
<style type="text/css">
    .searchUnit{
        width: 100px;
        float: left;
        height: 100px;
        display: inline-block;
        border-radius: 50%;
    }
    .createUnit{
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
    .createUnit a strong{
        color: #fff;
    }
</style>
<script type="text/javascript">
    function openUnit(){
        $("#nuit").textbox('setValue','');
        $('#unitId').val('');
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
        var depart=$("#departName").textbox('getValue');
        if(nuit==''){
            $.messager.alert("提示","名称为必填！");
            return;
        }
        if(depart==''){
            $.messager.alert("提示","部门为必选！");
            return;
        }
        $.ajax({
            url: '/guide/unit/addUnit',
            type: 'GET',
            dataType: 'json',
            async: false,
            data:{'nuit':nuit,'type':'单位','id':_id,'mold':mold,'depart':depart},
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

    //打开搜索框
    function searchUnit() {
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
        $('#unit').datagrid('load',{
            department:dep,
            mold:'1'
        });
    }
    function closeSearch() {
        search.window('close');
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
    <div id="unitBar" style="height: 100px;text-align: center;line-height: 100px;">
        <div onclick="javascript:searchUnit()" class="searchUnit">
            <img src="../../img/sousuo.png" style="width: 100px;height: 100px;"/>
        </div>
        <div onclick="javascript:openUnit()" class="createUnit">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openUnit()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
            </span>
        </div>
    </div>
    <%--<div id="unitBar" style="width: 100%;height: 100px;text-align: center;padding: 25px 0px; box-sizing: border-box;">
        <div style="width: 70%;height: 50px;background-color: #00bbee;border-radius: 8px;line-height: 50px;margin-left: 15%;" onclick="openUnit()">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openUnit()" style="text-decoration: none;color: #fff"><strong>创建</strong></a>
            </span>
        </div>
    </div>--%>
</body>
</html>