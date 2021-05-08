<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css"/>
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/sightpoint.js?version=1.01"></script>
</head>
<style type="text/css">
    .top {
        width: 100%;
        padding-top: 20px;
        box-sizing: border-box;
    }

    .center {
        width: 99%;
        margin: 0 auto;
    }

    .addPoint, .updPoint {
        display: none;
        padding-top: 34px;
        box-sizing: border-box;
    }

    .addPoint {
        padding-top: 15px;
    }

    .addPoint, .addPoint table, .updPoint, .updPoint table {
        width: 400px;
    }

    .addPoint tr, .updPoint tr {
        line-height: 60px;
    }

    .addPoint tr td:first-of-type, .updPoint tr td:first-of-type {
        text-align: right;
        width: 128px;
    }

    .addPoint tr td input, .updPoint tr td input {
        width: 237px;
        height: 38px;
        border: 1px solid #e6e6e6;
    }

    .addPoint .layui-anim, .updPoint .layui-anim {
        height: 120px;
    }

    .layui-table-body::-webkit-scrollbar {
        display: none
    }
</style>
<div class="warp">
    <div class="top">
        <input type="hidden" id="selDepartNameHidden">
        <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">部门</label>
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search=""
                                id="selDepartName">
                        </select>
                    </div>
                </div>
            </div>
        </form>

        <input type="hidden" id="selTypeNameHidden">

        <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">类型</label>
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="selTypeName" lay-search=""
                                id="selTypeName">
                            <option value="0">请选择</option>
                            <option value="1">人工</option>
                            <option value="2">AI</option>
                            <option value="3">维护</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>


        <form class="layui-form" action="" style="display: inline-block;">
            <div class="layui-form-item" style="width: 60px;">
                <div class="">
                    <button type="button" class="layui-btn layui-btn-fluid  layui-btn-normal" onclick="openPoint()">创建
                    </button>
                </div>
            </div>
        </form>
    </div>
    <%--表格--%>
    <div class="center">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="barDemo1">
            <a class="layui-btn layui-btn-xs" lay-event="edit" id="edit">修改</a>
            <a class="layui-btn layui-btn-xs" lay-event="del" id="del">删除</a>
        </script>
    </div>
    <div class="addPoint">
        <table cellspacing="0">
            <tr>
                <td>名称：</td>
                <td><input type="text" id="addPointName"></td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>
                    <input type="hidden" id="addDepartNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item" style="margin-bottom: 0px;">
                            <div class="layui-inline">
                                <select name="modules" lay-verify="required" lay-filter="addDepartName" lay-search=""
                                        id="addDepartName">
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>类型：</td>
                <td style="padding-top: 12px;box-sizing: border-box;">
                    <input type="hidden" id="addTypeNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <select name="modules" lay-verify="required" lay-filter="addTypeName" lay-search=""
                                        id="addTypeName">
                                    <option value="0">请选择</option>
                                    <option value="1">人工</option>
                                    <option value="2">AI</option>
                                    <option value="3">维护</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="saveAddData()" id="save">确定</button>&nbsp;<button
                        class="layui-btn" onclick="cancel()">取消
                </button>
                </td>
            </tr>
        </table>
    </div>
    <div class="updPoint">
        <table cellspacing="0">
            <tr>
                <td>名称：</td>
                <td><input type="text" id="updPointName"></td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>
                    <input type="hidden" id="updDepartNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <select name="modules" lay-verify="required" lay-filter="updDepartName" lay-search=""
                                        id="updDepartName">
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>

            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="saveUpdData()" id="saveUpd">确定</button>&nbsp;<button
                        class="layui-btn" onclick="cancel()">取消
                </button>
                </td>
            </tr>
        </table>
    </div>
</div>
</html>