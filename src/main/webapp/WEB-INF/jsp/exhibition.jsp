<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/exhibition.js?version=1.04"></script>
    <%@ include file="updWorkPerator.jsp"%>
    <%@ include file="searchWorkPerator.jsp"%>
</head>
<style type="text/css">
    .createWorkPerator{
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
    .createWorkPerator a strong{
        color: #fff;
    }
    .searchWorkPerator{
        width: 100px;
        float: left;
        height: 100px;
        display: inline-block;
        border-radius: 50%;
    }
</style>
<script type="text/javascript">
    function openWorkPerator(){
        $('#patrolTask').textbox("setValue",'');
        $('#planTime').textbox("setValue",'');
        var _data = $('#cycle').combobox('getData');
        $('#cycle').combobox("select",_data[0].value);
        $("#workId").val('');
        addDataWin=$('#workPerator').window({
            title:'新建模板',
            height: 480,
            width: 850,
            closed: true,
            minimizable:false,
            maximizable:false,
            collapsible:false,
            cache:false,
            shadow:false
        });
        addDataWin.window('open');
    }
    function closeWin(addDataWin){
        addDataWin.window('close');
    }
    function saveAddData() {
        var workId=$("#workId").val();
        var planTime=$("#planTime").textbox('getValue');
        var patrolTask=$("#patrolTask").textbox('getValue');
        var cycle= $('#cycle').combobox('getValue');
        var department=$("#department").combotree('getValues');
        var dep=department+"";
        if(cycle=='0'){
            $.messager.alert("提示","周期为必填！");
            return;
        }if(department==''){
            $.messager.alert("提示","部门为必选！");
            return;
        }
        $.ajax({
            url: '/guide/template/addWorkPerator',
            type: 'GET',
            dataType: 'json',
            async: false,
            data:{'workId':workId,'planTime':planTime,
                'patrolTask':patrolTask,'cycle':cycle,
                'department':dep,},
            beforeSend:function(){
                $("#save").hidden;//隐藏提交按钮
            },
            success: function (data) {
                if(data[0]=='success'){
                    $.messager.alert("提示","操作成功！");
                    $("#save").show();
                    addDataWin.window('close');
                    $('#bg').datagrid('reload');
                }else if(data[0]=='error'){
                    $.messager.alert("提示","操作失败！请联系技术人员！");
                    $("#save").show();
                    addDataWin.window('close');
                }else if(data[0]=='patrolTaskError'){
                    $.messager.alert("提示","此部门下已存在同名模板!");
                    addDataWin.window('close');
                    $('#bg').datagrid('reload');
                }
            },
        });
    }
    //打开搜索框
    function searchWorkPerator() {
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
        $('#bg').datagrid('load',{
            department:dep
        });
    }
    function closeSearch() {
        search.window('close');
    }
</script>
<body class="easyui-layout">
    <table id="bg" class="easyui-datagrid" title="模板列表"
           fitColumns="true" pagination="true" rownumbers="true"
           fit="true" toolbar="#bar">
        <thead>
        <tr>
            <th field="id" width='80px' resizable='false'>编号</th>
            <th field="patrolTask" width='50px' resizable='false' >巡检任务</th>
            <th field="artificialNumber" width='40px' resizable='false' >人工巡检数</th>
            <th field="aiNumber" width='40px' resizable='false' >ai巡检数量</th>
            <th field="planTime" width='80px' resizable='false' >计划时间</th>
            <th field="cycle" width='40px' resizable='false' >周期</th>
            <th field="edit" width='40px' resizable='false' >状态</th>
            <th field="open" width='40px' resizable='false' >编辑</th>
        </tr>
        </thead>
    </table>
    <div id="bar" style="height: 100px;text-align: center;line-height: 100px;">
        <div onclick="javascript:searchWorkPerator()" class="searchWorkPerator">
            <img src="../../img/sousuo.png" style="width: 100px;height: 100px;"/>
        </div>
        <div onclick="javascript:openWorkPerator()" class="createWorkPerator">
            <span style="font-size: 20px;text-align: center;">
                <a href="javascript:openWorkPerator()" style="text-decoration: none;color: #222222"><strong>创建</strong></a>
            </span>
        </div>
    </div>
</body>
</html>