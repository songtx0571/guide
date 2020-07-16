<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<head>
    <meta name="viewport" content="width=1200,height=1660,maximum-scale=1,user-scalable=no">
    <script type="text/javascript" src="../guide/js/jquery.min.js"></script>
    <%--easyui--%>
    <script type="text/javascript" src="../guide/js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../guide/js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../guide/js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../guide/js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../guide/js/easyui/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="../guide/js/icon/iconfont.css">
    <%--bootstrap--%>
    <script src="../guide/js/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../guide/js/bootstrap/css/bootstrap.min.css">
    <%--js--%>
    <script type="text/javascript" src="../guide/js/week/staffhome.js?vresion=1.02"></script>
    <%--jsp--%>
    <%@ include file="keyboard.jsp"%>
</head>
<style>
    body {
        margin: 0;
        width: 1200px;
        height: 1920px;
    }
    .headerDiv{
        width: 1200px;
        height: 200px;
        line-height: 200px;
        padding: 10px;
    }
    .bodyDiv{
        width: 1200px;
        height: 1270px;
        padding: 10px 10px 10px 10px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .bodyDiv1{
        width: 1200px;
        height: 1423px;
        padding: 10px 10px 10px 10px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .headerBody{
        height: 190px;
        display: inline-block;
        font-size: 50px;
        line-height: 190px;
        text-align: center;
    }
    .bodyDiv::-webkit-scrollbar {
        display: none;
    }

    .bodyDiv1::-webkit-scrollbar {
        display: none;
    }

    .foodDiv{
        width: 1200px;
        height: 170px;
        padding: 10px;
    }

    .foodBody{
        text-align: center;
        display: inline-block;
        width: 700px;
        height: 140px;
        line-height: 140px;
        font-size: 30px;
    }

    div,span{
        font-size: 40px;
    }

    .Task{
        width: 1100px;
        height: 150px;
        line-height: 150px;
        background-color: #00bbee;
        border-radius: 10px;
        margin: 40px;
    }

    .TaskBody{
        width: 350px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        display: inline-block;
        font-size: 30px;
    }

    .bodyHead{
        text-align: center;
        line-height: 130px;
        width: 390px;
        height: 130px;
        display: inline-block;
        margin: 0px;
    }

    tr{
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    tr td{
        height: 100px;
        width: 300px;
        text-align: center;
        line-height: 100px;
    }
    .green{
        color: #00ee00;
    }
    .red{
        color: #c62828;
    }
</style>
<script type="text/javascript">

</script>
<body>
    <%--头部--%>
    <div class="headerDiv">
        <div style="width: 100px;height: 100px;display: inline-block;margin-left: 35px" onclick="init()"><img src="img/h6.png" alt=""></div>
        <div class="headerBody" style="width: 400px;font-size: 40px" id="patrolTask">请选择任务</div>
        <div class="headerBody" style="width: 250px;font-size: 40px" id="userName"></div>
        <div class="headerBody" style="width: 300px;font-size: 30px" id="dateTime"></div>
        <div id="postId" style="display: none"></div>
    </div>
    <hr>
    <%--内容头部--%>
    <div style="width: 1200px;height: 130px;" id="bodyHeader">
        <div class="bodyHead">巡检任务</div>
        <div class="bodyHead">周期</div>
        <div class="bodyHead">倒计时</div>
    </div>
    <hr>
    <%--内容首页--%>
    <div class="bodyDiv" id="bodyDiv">

    </div>
    <div class="bodyDiv1 table-responsive" id="bodyDiv2">
        <table class="table " style="font-size: 30px">
            <thead>
                <tr style="background-color: #C4C4C4">
                    <td colspan="2">名称</td>
                    <td colspan="2">数据</td>
                </tr>
            </thead>
            <tbody id="tbody">

            </tbody>
        </table>
    </div>
    <hr>
    <%--尾部--%>
    <div class="foodDiv">
        <div style="width: 200px;height: 140px;display: inline-block;float: left;" onclick="Back();">
            <img src="img/zuo.png" alt="">
        </div>
        <div class="foodBody" id="foodBody"></div>
        <div style="width: 200px;height: 140px;display: inline-block;float: right" onclick="Forward()">
            <img src="img/you.png" alt="">
        </div>
    </div>
</body>
</html>