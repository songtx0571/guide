<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css"/>
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/inquiriesData.js?version=1.0"></script>
</head>
<style type="text/css">
    body::-webkit-scrollbar {
        display: none;
    }

    .top {
        width: 100%;
        padding-top: 20px;
        box-sizing: border-box;
    }

    .center {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
    }

    .item {
        width: 100%;
        text-align: center;
    }

    .item th {
        border: 1px solid #e6e6e6;
        background: #f2f2f2;
    }

    .item tr {
        line-height: 50px;
    }

    .item td {
        border: 1px solid #e6e6e6;
    }

    #daochuBtn {
        display: none;
    }

    .tableDiv {
        height: auto;
        overflow: scroll;
        overflow-x: hidden;
        margin-bottom: 20px;
    }
</style>
<body>
<div class="warp">
    <div class="top">
        <input type="hidden" id="selDepartNameHidden">
        <input type="hidden" id="selSysNameHidden">
        <input type="hidden" id="selEquNameHidden">
        <input type="hidden" id="selStartTimeHidden">
        <input type="hidden" id="selEndTimeHidden">

        <div style="margin: 10px auto 0;">
            <form class="layui-form" action="" style="margin-bottom: 10px;">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">部门</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search=""
                                    id="selDepartName">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">系统号</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selSysName" lay-search=""
                                    id="selSysName">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">设备号</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selEquName" lay-search=""
                                    id="selEquName">
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;line-height: 55px;">测点类型</label>
                        <div class="layui-input-inline" style="width: 190px;">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="1" title="人工">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="2" title="AI">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="3" title="维护">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="4" title="缺陷">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">开始时间</label>
                        <div class="layui-input-inline">
                            <input type="text" class="layui-input" id="test1" placeholder="yyyy-MM-dd">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">结束时间</label>
                        <div class="layui-input-inline">
                            <input type="text" class="layui-input" id="test2" placeholder="yyyy-MM-dd">
                        </div>
                    </div>
                </div>
            </form>
            <button type="button" class="layui-btn" onclick="selShowInquiriesDataList()">查询</button>
        </div>
    </div>
    <div style="padding: 10px;box-sizing: border-box;" id="daochuBtn">
        <button type="button" class="layui-btn" onclick="productqueryOutXls()">导出</button>
    </div>
    <%--内容主体--%>
    <div class="center">
        <div id="tableDivPeo" class="tableDiv">

        </div>
        <div id="tableDivAI" class="tableDiv">

        </div>
        <div id="tableDivMain" class="tableDiv">

        </div>
        <div id="tableDivDefect" class="tableDiv">

        </div>
    </div>
</div>
</body>
</html>