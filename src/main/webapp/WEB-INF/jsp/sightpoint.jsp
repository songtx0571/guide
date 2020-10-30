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
    <%@ include file="searchWorkPerator.jsp"%>
</head>
<style type="text/css">
    .searchPoint{
        width: 100px;
        float: left;
        height: 100px;
        display: inline-block;
        border-radius: 50%;
    }
    .createPoint{
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
    .createPoint a strong{
        color: #fff;
    }
</style>
<script type="text/javascript">
    function openSightPoint(){
        $("#nuit").textbox('setValue','');
        $('#pointId').val('');
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
        var depart=$("#departName").textbox('getValue');
        var _id=$('#pointId').val();
        var mold='2';
        if(nuit==''){
            $.messager.alert("提示","名称为必填！");
            return;
        }
        if(depart==''){
            $.messager.alert("提示","部门为必填！");
            return;
        }
        $.ajax({
            url: '/guide/unit/addUnit',
            type: 'GET',
            dataType: 'json',
            async: false,
            data:{'nuit':nuit,'type':'测点','id':_id,'mold':mold,'depart':depart},
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

    //打开搜索框
    function searchPoint() {
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
        $('#sightpoint').datagrid('load',{
            department:dep,
            mold:'2'
        });
    }
    function closeSearch() {
        search.window('close');
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
    <div id="pointBar" style="height: 100px;text-align: center;line-height: 100px;">
        <div onclick="javascript:searchPoint()" class="searchPoint">
            <img src="../../img/sousuo.png" style="width: 100px;height: 100px;"/>
        </div>
        <div onclick="javascript:openSightPoint()" class="createPoint">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openSightPoint()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
            </span>
        </div>
    </div>
    <%--<div id="pointBar" style="width: 100%;height: 100px;text-align: center;padding: 25px 0px; box-sizing: border-box;">
        <div style="width: 70%;height: 50px;background-color: #00bbee;border-radius: 8px;line-height: 50px;margin-left: 15%;" onclick="openSightPoint()">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openSightPoint()" style="text-decoration: none;color: #fff"><strong>创建</strong></a>
            </span>
        </div>
    </div>--%>
</body>
</html>