<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<head>

    <%--jsp--%>
    <%@ include file="keyboard.jsp"%>
    <meta name="viewport" content="width=1200,height=1660,maximum-scale=1,user-scalable=no">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/week/staffhome.js?vresion=1.02"></script>
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/font/css/font-awesome.css">
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css">
    <script type="text/javascript"  src="../js/week/ajaxfileupload.js"></script>
    <style>
        body {
            margin: 0;
            width: 100%;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .headerDiv, .bodyHeader{
            width: 100%;
            height: 80px;
            line-height: 80px;
            display: flex;
            justify-content: space-around;
            font-size: 25px;
            text-align: center;
        }
        .headerDiv{
            position: relative;
        }
        .headerDiv div, .bodyHeader div{
            width: 300px;
            text-align: center;
        }
        .bodyDiv{
            width: 100%;
            height: calc(100% - 185px);
            padding: 0px 10px 0px 10px;
            overflow-x: hidden;
            overflow-y: scroll;
        }
        .bodyDiv1{
            width: 100%;
            padding: 10px 10px 10px 10px;
        }
        .bodyDiv1 .div1Table {
            width: 100%;
            font-size: 25px;
            text-align: center;
        }
        .bodyDiv1 .div1Table tr{
            line-height: 80px;
        }
        .bodyDiv1 .div1Table td span{
            width: 100%;
            display: inline-block;
        }
        .bodyDiv1 .div1Table td .div1TableInp{
            border: none;
            outline: none;
            width: 100%;
            text-indent: 15px;
            border-bottom: 1px solid #ccc;
            height: 80px;
        }
        .bodyDiv::-webkit-scrollbar {
            display: none;
        }
        .bodyDiv1::-webkit-scrollbar {
            display: none;
        }
        .foodDiv{
            width: 100%;
            height: 50px;
            margin: 10px 0px 10px;
        }
        .foodDiv .foodBody{
            float: left;
            text-align: center;
            width: calc(100% - 210px);
            line-height: 50px;
            font-size: 28px;
        }
        .foodDiv .footArrow{
            width: 50px;
            text-align: center;
            line-height: 50px;
            height: 50px;
        }
        .Task{
            width: 93%;
            height: 80px;
            line-height: 80px;
            background-color: #e0ecff;
            border-radius: 10px;
            margin: 20px 40px;
            border: 1px solid #95B8E7;
            display: flex;
            justify-content: space-evenly;
        }
        .TaskBody{
            width: 33%;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 20px;
            float: left;
        }
        .green{
            color: #30a881db;
        }
        .red{
            color: #c62828;
        }
        .addDefectDiv {
            width: 100%;
            height: 100%;
            display: none;
        }
        .addDefectDiv table{
            width: 550px;
            margin: 0 auto;
        }
        .addDefectDiv table tr{
            line-height: 50px;
        }
        .addDefectDiv table tr th{
            width: 200px;
            text-align: right;
            padding-right: 15px;
            box-sizing: border-box;
        }
        .img-change{
            width: 100px;
            display: none;
            margin: 0 0 0 10px;
            float: left;
        }
    </style>
</head>
<body>
    <%--头部--%>
    <div class="headerDiv">
        <div style="position: absolute;top: 27px;left: 5px;width: 40px;" onclick="init()"><i class="fa fa-bars" style="font-size: 35px;"></i></div>
        <div class="headerBody" id="department" style="padding-top: 20px;box-sizing: border-box">
            <shiro:hasPermission name='运行专工'>
                <input type="hidden" id="departmentIdHidden">
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="departmentList" lay-search="" id="departmentList">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </shiro:hasPermission>
        </div>
        <div class="headerBody" id="patrolTask" style="display: none;">请选择任务</div>
        <div class="headerBody" id="userName"></div>
        <div class="headerBody" id="dateTime"></div>
    </div>
    <div id="postId" style="display: none"></div>
    <%--内容头部--%>
    <div id="bodyHeader" class="bodyHeader">
        <div class="bodyHead">巡检任务</div>
        <div class="bodyHead">周期</div>
        <div class="bodyHead">倒计时</div>
    </div>
    <%--内容首页--%>
    <div class="bodyDiv" id="bodyDiv"></div>
    <div class="bodyDiv1" id="bodyDiv2">
        <button class="layui-btn layui-btn-lg" style="margin: 10px 0;" onclick="addDefect()">新增缺陷</button>
        <table class="div1Table" cellpadding="0">
            <thead>
            <tr style="background-color: #f2f2f2;font-size: 30px;">
                <td colspan="2">名称</td>
                <td colspan="2" style="text-align: left;margin-left: 10px;text-indent: 15px;">数据</td>
            </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
        <%--左右箭头--%>
        <div class="foodDiv">
            <p class="footArrow" style="float: left;margin-left: 50px;" onclick="Back()">
                <i class="fa fa-arrow-circle-left" style="font-size: 45px;"></i>
            </p>
            <div class="foodBody" id="foodBody"></div>
            <p class="footArrow" style="float: right;margin-right: 50px;" onclick="Forward()">
                <i class="fa fa-arrow-circle-right" style="font-size: 45px;"></i>
            </p>
        </div>
    </div>
    <!-- 新增 -->
    <div class="addDefectDiv">
        <table>
            <thead>
            <tr><td colspan="4" style="text-align: center;font-weight: bold;font-size: 18px;">新增缺陷</td></tr>
            </thead>
            <tbody>
            <tr>
                <th>重大级别</th>
                <td>
                    <form class="layui-form" action="" style="float: left;">
                        <input type="hidden" id="levelHidden">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="level" lay-search="" id="level">
                                    <option value="0">0类</option>
                                    <option value="1">1类</option>
                                    <option value="2">2类</option>
                                    <option value="3">3类</option>
                                    <option value="4">4类</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
                <th>检修类别</th>
                <td>
                    <form class="layui-form" action="" style="float: left;">
                        <input type="hidden" id="maintenanceCategoryHidden">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="maintenanceCategory" lay-search="" id="maintenanceCategory">
                                    <option value='1'>机务</option>
                                    <option value='2'>电仪</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <th>缺陷位置</th>
                <td colspan="3" id='defectLocation' style="padding-bottom: 10px;box-sizing: border-box;">
                    <span id="addSys"></span>,<span id="addEmp"></span>
                </td>
            </tr>
            <tr>
                <th>缺陷描述</th>
                <td colspan="3"><textarea id='addAbs' rows="5" cols="50" maxlength="100" style="margin-bottom: 10px;text-indent: 10px;"></textarea></td>
            </tr>
            <tr>
                <th>缺陷图片</th>
                <td colspan="3">
                    <img src="../img/week/defectAdd.png" style="float: left;margin-top: 10px;"  id="addImg1">
                    <input type="file" id='file' name='file' style="display: none;" accept="image/gif,image/jpeg,image/jpg,image/png" onchange="fileChange(event,'file')">
                    <img src="" id="img-change1" class="img-change">
                    <img src="../img/week/defectReduce.png" style="float: left;margin-top: 10px;margin-left: 10px;" id="reduceImgAdd" onclick="reduceImg('reduceImgAdd')">
                </td>
            </tr>
            <tr>
                <th>申请人员<input type="hidden" id='addUserId'></th>
                <td colspan="3" id='addCreaterName'></td>
            </tr>
            <tr>
                <th>申请日期</th>
                <td colspan="3" id='createTime'></td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <td colspan="4" align="center">
                    <button type="button" class="layui-btn layui-btn-normal"  onclick="insert()">确定</button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </thead>
        </table>
        <!--新增历史记录-->
        <div class="addHistory">
            <h2 class="addHistoryTitle"></h2>
            <ul class="addHistoryUl">

            </ul>
        </div>
    </div>
</body>
</html>