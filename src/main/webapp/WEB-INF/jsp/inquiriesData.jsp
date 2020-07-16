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
        height: 10%;
        background-color: #F0F8FF;
    }
    .bodyContent{
        width: 100%;
        height: 90%;
        overflow-x: auto;
        overflow-y: scroll;
    }
    .bodyContent::-webkit-scrollbar {
        display: none;
    }
    .bodyContentHead{
        margin: 10px;
        text-align: center;
    }
    ul{
        margin: 0px 0px 0px 0px;
        padding: 20px 0px 0px 0px;
        width: 100%;
        height: 80%;
        background-color: #F0F8FF;
        list-style-type: none;
    }
    li{
        height: 100%;
        float: left;
        margin-left: 40px;
    }
    .inquiresTable{
        margin:auto;
        border: 1px solid #00bbee;
        border-collapse:collapse
    }
    tr,td{
        height: 40px;
        width: 120px;
        border: 1px solid #00bbee;
        text-align: center;
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
                    <span>部门</span>&nbsp;&nbsp;
                    <select id="departName" class="easyui-combobox" data-options="prompt:'请选择部门',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div>
                    <span>系统号</span>&nbsp;&nbsp;
                    <select id="sysName" class="easyui-combobox" data-options="prompt:'请选择系统号',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div>
                    <span>设备号</span>&nbsp;&nbsp;
                    <select id="equName" class="easyui-combobox" data-options="prompt:'请选择设备号',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div id="search" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;line-height: 40px;" onclick="javascript:searchByEqu()" class="easyui-linkbutton" plain="true">
                    <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">确定</a>
                </div>
            </li>
        </ul>
    </div>
    <%--内容主体--%>
    <div class="bodyContent">
        <div id="bodyContentHead" class="bodyContentHead">
            <div style="margin: 10px;color: #c62828"><span>测点数据列表</span></div>
            <table id="inquiresTable" class="inquiresTable">

            </table>
        </div>
    </div>
</body>
</html>