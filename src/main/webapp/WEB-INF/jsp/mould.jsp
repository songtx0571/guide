<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css" />
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/mould.js?version=1.02"></script>
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
        display: none;
    }
    .layui-table-body::-webkit-scrollbar {
        display:none
    }
</style>
<script type="text/javascript">

</script>
<body>
<div class="warp">
    <div class="top">
        <input type="hidden" id="selDepartNameHidden">
        <input type="hidden" id="selTemplateHidden">
        <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">部门</label>
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search="" id="selDepartName">
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">巡检模板</label>
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="selTemplate" lay-search="" id="selTemplate">
                        </select>
                    </div>
                </div>
            </div>
        </form>
        <form class="layui-form" action="" style="display: inline-block;">
            <div class="layui-form-item">
                <div class="layui-input-block" style="margin-left: 50px;margin-right: 50px;">
                    <button type="button" class="layui-btn" onclick="selShowMouldList()">查询</button>
                </div>
            </div>
        </form>
    </div>
    <%--内容主体--%>
    <div class="center">
        <table id="demo" lay-filter="test"></table>
    </div>
    <%--员工数据弹窗--%>
    <div class="postPerData" style="padding: 30px 30px 30px 30px;display: none;">
        <table id="demoP" lay-filter="testP"></table>
    </div>
</div>
</body>
</html>
