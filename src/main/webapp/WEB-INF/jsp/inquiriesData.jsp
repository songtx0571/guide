<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css" />
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/inquiriesData.js?version=1.0"></script>
</head>
<style type="text/css">
    .top{
        width: 100%;
        padding-top: 20px;
        box-sizing: border-box;
    }
    .center{
        width: 99%;
        margin: 0 auto;
        height: 900px;
        overflow: scroll;
        padding: 10px 10px 0;
        box-sizing: border-box;
        overflow-x: hidden;
        display: none;
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
</style>
<body>
<div class="warp">
    <div class="top">
        <input type="hidden" id="selDepartNameHidden">
        <input type="hidden" id="selSysNameHidden">
        <input type="hidden" id="selEquNameHidden">
        <input type="hidden" id="selTypeNameHidden">
        <input type="hidden" id="selStartTimeHidden">
        <input type="hidden" id="selEndTimeHidden">

        <div style="width: 765px;margin: 10px auto;">
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
                <div class="layui-form-item" style="width: 765px;">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">部门</label>
                        <div class="layui-input-inline" style="width: 275px;">
                            <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search="" id="selDepartName">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">系统号</label>
                        <div class="layui-input-inline" style="width: 275px;">
                            <select name="modules" lay-verify="required" lay-filter="selSysName" lay-search="" id="selSysName">
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
                <div class="layui-form-item" style="width: 765px;">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">设备号</label>
                        <div class="layui-input-inline" style="width: 275px;">
                            <select name="modules" lay-verify="required" lay-filter="selEquName" lay-search="" id="selEquName">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="padding: 9px 5px 0px 0px;">测点类型</label>
                        <div class="layui-input-inline" style="width: 85px;margin-right: 0px; float: left">
                            <select name="modules" lay-verify="required" lay-filter="selType" lay-search="" id="selType">
                                <option value="0">请选择</option>
                                <option value="1">人工</option>
                                <option value="2">AI</option>
                                <option value="3">维护</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
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
            </form>
        </div>
        <form class="layui-form" action="" style="width: 765px;text-align: center;margin: 0 auto;">
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button type="button" class="layui-btn" onclick="selShowInquiriesDataList()">查询</button>
                </div>
            </div>
        </form>
    </div>
    <%--内容主体--%>
    <div class="center">
        <div style="padding: 10px;box-sizing: border-box;" id="daochuBtn">
            <button type="button" class="layui-btn" onclick="productqueryOutXls()">导出</button>
        </div>
        <div id="tableDiv">

        </div>
    </div>
</div>
</body>
</html>