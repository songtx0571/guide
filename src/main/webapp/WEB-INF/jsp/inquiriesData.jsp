<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css"/>
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/inquiriesData.js?version=1.0"></script>
    <script type="text/javascript" src="../js/layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="../js/layui/formSelects-v4.css">
</head>
<style type="text/css">
    body::-webkit-scrollbar {
        display: none;
    }

    .clear {
        clear: both;
    }

    .top {
        width: 100%;
        padding-top: 10px;
        box-sizing: border-box;
    }

    .center {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
    }

    .tableDiv {
        display: none;
    }

    #showMeasuringType {
        display: none;
    }

    .xm-form-select .xm-select {
        height: 35px;
    }
    .icon-close {
        display: none;
    }
</style>
<body>
<div class="warp">
    <div class="top">
        <input type="hidden" id="selDepartNameHidden">
        <input type="hidden" id="selSysNameHidden">
        <input type="hidden" id="selEquNameHidden">
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
        </div>
        <form class="layui-form" action="" id="showMeasuringType"
              style="float: left;margin-left: 10px;width: 500px;">
            <select name="tags" id="tags" lay-verify="tags" xm-select="tags">
                <option value="0">请选择测点类型</option>
            </select>
        </form>
        <button type="button" style="float: left;margin-left: 10px;" class="layui-btn layui-btn-normal"
                onclick="selShowInquiriesDataList()">查询
        </button>
    </div>

    <div class="clear"></div>
    <%--内容主体--%>
    <div class="center">
        <div id="tableDivPeo" class="tableDiv">
            <h2 style="text-align: center;">人工</h2>
            <table id="demoPeo" lay-filter="testPeo"></table>
        </div>
        <div id="tableDivAI" class="tableDiv">
            <h2 style="text-align: center;">AI</h2>
            <table id="demoAI" lay-filter="testAI"></table>
        </div>
        <div id="tableDivMain" class="tableDiv">
            <h2 style="text-align: center;">维护</h2>
            <table id="demoMain" lay-filter="testMain"></table>
        </div>
        <div id="tableDivDefect" class="tableDiv">
            <h2 style="text-align: center;">缺陷</h2>
            <table id="demoDefect" lay-filter="testDefect"></table>
        </div>
    </div>
</div>
</body>
</html>