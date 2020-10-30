<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/inquiriesData.js?version=1.0"></script>
</head>
<style type="text/css">
    .bodyHeader{
        width: 100%;
        height: 150px;
        background: linear-gradient(#E0ECFF, #fff);
    }
    .bodyContent{
        width: 100%;
        height: 100%;
        overflow-x: auto;
        overflow-y: scroll;
    }
    .bodyContent::-webkit-scrollbar {
        display: none;
    }
    .bodyContentHead{
        width: 95%;
        height: 60%;
        text-align: center;
    }
    ul{
        margin: 0px 0px 0px 0px;
        padding: 20px 20px;
        box-sizing: border-box;
        width: 100%;
        list-style-type: none;
        height: 150px;
    }
    li{
        width: 46%;
        height: 45%;
        float: left;
        margin-right: 4%;
    }
    li .liTxt{
        float: left;
        margin-top: 10px;
    }
    li div{
        width: 100%;
        height: 100%;
    }
    .inquiresTable{
        margin:0 auto;
        border: 1px solid #00bbee;
        border-collapse:collapse;
        outline: none;
    }
    .panel-body{
        height: 60%;
    }
    .datagrid-view{
        height: 60%;
    }
</style>
<script type="text/javascript">

</script>
<body class="easyui-layout">
    <%--查询首部--%>
    <div class="bodyHeader">
        <ul>
            <li>
                <div>
                    <span class="liTxt">部&nbsp;&nbsp;&nbsp;门</span>
                    <span style="display: inline-block;width: 10px;float: left;height: 10px;"></span>
                    <select id="departName" class="easyui-combobox" data-options="prompt:'请选择部门',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div>
                    <span class="liTxt">系统号</span>
                    <span style="display: inline-block;width: 27px;float: left;height: 10px;"></span>
                    <select id="sysName" class="easyui-combobox" data-options="prompt:'请选择系统号',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div>
                    <span class="liTxt">设备号</span>
                    <span style="display: inline-block;width: 10px;float: left;height: 10px;"></span>
                    <select id="equName" class="easyui-combobox" data-options="prompt:'请选择设备号',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div>
                    <span class="liTxt">测点类型</span>
                    <span style="display: inline-block;width: 10px;float: left;height: 10px;"></span>
                    <select id="measuringType" class="easyui-combobox" data-options="prompt:'请选择测点类型',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li style="width: 92%;text-align: center;">
                <div id="search" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;line-height: 40px;" onclick="javascript:searchByEqu()" class="easyui-linkbutton" plain="true">
                    <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">确定</a>
                </div>
            </li>
        </ul>
    </div>
    <%--内容主体--%>
    <div class="bodyContent">
        <div id="bodyContentHead" class="bodyContentHead">
            <div style="margin: 5px;color: #c62828"><span>测点数据列表</span></div>

            <table id="inquiresTable" class="easyui-datagrid inquiresTable" title="数据列表"
                   fitColumns="true" pagination="true" rownumbers="true"
                   fit="true" >
            </table>
        </div>
    </div>
</body>
</html>