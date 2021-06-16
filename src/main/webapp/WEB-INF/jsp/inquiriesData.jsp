<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css" />
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/inquiriesData.js?version=1.0"></script>
</head>
<style type="text/css">
    .warp{
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .top{
        width: 100%;
        padding-top: 20px;
        box-sizing: border-box;
    }
    .center{
        /*width: 99%;
        margin: 0 auto;
        height: 900px;
        overflow: scroll;
        padding: 10px 10px 0;
        box-sizing: border-box;
        overflow-x: hidden;
        display: none;*/

        width: 100%;
        height: calc(100% - 235px);
        overflow: scroll;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: hidden;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .item{
        width: 100%;
        text-align: center;
    }
    .item th{
        border: 1px solid #e6e6e6;
        background: #f2f2f2;
    }
    .item tr{
        line-height: 50px;
    }
    .item td{
        border: 1px solid #e6e6e6;
    }
    #daochuBtn{
        display: none;
    }
    .tableDiv{
        height: 360px;
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
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">部门</label>
                        <div class="layui-input-inline" style="width: 265px;">
                            <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search="" id="selDepartName">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">系统号</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selSysName" lay-search="" id="selSysName">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">设备号</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selEquName" lay-search="" id="selEquName">
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">测点类型</label>
                        <div class="layui-input-inline" style="width: 265px;">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="1" title="人工">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="2" title="AI">
                            <input lay-filter="switchTest" type="checkbox" name="like" value="3" title="维护">
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
<%--            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
                <div class="layui-form-item" style="width: 765px;">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">开始时间</label>
                        <div class="layui-input-inline" style="width: 275px;">
                            <input type="text" class="layui-input" id="test1" placeholder="yyyy-MM-dd">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <div class="layui-inline">
                            <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">结束时间</label>
                            <div class="layui-input-inline" style="width: 275px;margin-right: 0px;">
                                <input type="text" class="layui-input" id="test2" placeholder="yyyy-MM-dd">
                            </div>
                        </div>
                    </div>
                </div>
            </form>--%>
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
    </div>
</div>
</body>
</html>