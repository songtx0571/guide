<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <script type="text/javascript" src="../js/week/mould.js?version=1.0"></script>
</head>
<style type="text/css">
    /*.bodyHeader{*/
        /*width: 100%;*/
        /*height: 10%;*/
        /*background-color: #F0F8FF;*/
    /*}*/
    /*.bodyContent{*/
        /*width: 100%;*/
        /*height: 90%;*/
        /*overflow-x: auto;*/
        /*overflow-y: scroll;*/
    /*}*/
    /*.bodyContent::-webkit-scrollbar {*/
        /*display: none;*/
    /*}*/
    /*.bodyContentHead{*/
        /*margin: 10px;*/
        /*text-align: center;*/
    /*}*/
    /*.postPerData{*/
        /*overflow-x: auto;*/
        /*overflow-y: scroll;*/
    /*}*/
    /*.postPerData::-webkit-scrollbar {*/
        /*display: none;*/
    /*}*/
    /*ul{*/
        /*margin: 0px 0px 0px 0px;*/
        /*padding: 20px 0px 0px 0px;*/
        /*width: 100%;*/
        /*height: 80%;*/
        /*background-color: #F0F8FF;*/
        /*list-style-type: none;*/
    /*}*/
    /*li{*/
        /*height: 100%;*/
        /*float: left;*/
        /*margin-left: 40px;*/
    /*}*/
    /*.mouldTable{*/
        /*margin:auto;*/
        /*border: 1px solid #00bbee;*/
        /*border-collapse:collapse*/
    /*}*/
    /*tr,td{*/
        /*height: 40px;*/
        /*width: 120px;*/
        /*border: 1px solid #00bbee;*/
        /*text-align: center;*/
    /*}*/
    /*.a{*/
        /*text-decoration:none;*/
    /*}*/
    /*.postPerDataTable{*/
        /*margin:auto;*/
        /*border: 1px solid #00bbee;*/
        /*border-collapse:collapse*/
    /*}*/
    /*.background_color{*/
        /*background-color: #F2F2F2;*/
    /*}*/

    .bodyHeader{
        width: 100%;
        height: 150px;
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
    .postPerData{
        overflow-x: auto;
        overflow-y: scroll;
    }
    .postPerData::-webkit-scrollbar {
        display: none;
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
        height: 50%;
        float: left;
        margin-right: 4%;
        /*display: flex;*/
        /*justify-content: space-between;*/
    }
    li div{
        width: 100%;
        height: 100%;
    }
    li div .liTxt{
        float: left;
        margin-top: 10px;
    }
    .mouldTable{
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
    .a{
        text-decoration:none;
    }
    .postPerDataTable{
        margin:auto;
        border: 1px solid #00bbee;
        border-collapse:collapse
    }
    .background_color{
        background-color: #F2F2F2;
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
                    <span class="liTxt">部门</span>
                    <span style="display: inline-block;width: 10px;float: left;height: 10px;"></span>
                    <select id="depart" class="easyui-combobox" data-options="prompt:'请选择部门',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li>
                <div>
                    <span class="liTxt">巡检模板</span>
                    <span style="display: inline-block;width: 10px;float: left;height: 10px;"></span>
                    <select id="Template" class="easyui-combobox" data-options="prompt:'请选择模板',required:true" style="width:250px;height: 40px;line-height: 40px"></select>
                </div>
            </li>
            <li style="width: 100%;text-align: center;">
                <div id="search" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;line-height: 40px;" onclick="javascript:searchByWorkPer()" class="easyui-linkbutton" plain="true">
                    <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">确定</a>
                </div>
            </li>
        </ul>
    </div>
    <%--内容主体--%>
    <div class="bodyContent">
        <div id="bodyContentHead" class="bodyContentHead">
            <table id="mouldTable" class="mouldTable">

            </table>
        </div>
    </div>
    <%--员工数据弹窗--%>
    <div id="postPerData" class="postPerData" style="padding: 30px 30px 30px 30px;" hidden>
        <table class="postPerDataTable" id="postPerDataTable">

        </table>
    </div>
</body>
</html>