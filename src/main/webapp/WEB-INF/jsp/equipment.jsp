<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css" />
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/equipment.js?version=1.03"></script>
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
    }
    .addEquipment,.updEquipment{
        display: none;
        padding-top: 38px;
        box-sizing: border-box;
    }
    .addEquipment,.addEquipment table,.updEquipment,.updEquipment table{
        width: 400px;
    }
    .addEquipment tr,.updEquipment tr{
        line-height: 50px;
    }
    .addEquipment tr td:first-of-type, .updEquipment tr td:first-of-type{
        text-align: right;
        width: 128px;
    }
    .addEquipment tr td input, .updEquipment tr td input{
        width: 237px;
        height: 38px;
        border: 1px solid #e6e6e6;
    }
    .addEquipment .layui-anim,.updEquipment .layui-anim{
        height: 120px;
    }
    .layui-table-body::-webkit-scrollbar {
        display:none
    }
</style>
<body>
<div class="warp">
    <div class="top">
        <input type="hidden" id="selDepartNameHidden">
        <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">部门</label>
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search="" id="selDepartName">
                        </select>
                    </div>
                </div>
            </div>
        </form>
        <form class="layui-form" action="" style="display: inline-block;">
            <div class="layui-form-item">
                <div class="layui-input-block" style="margin-left: 50px;margin-right: 50px;">
                    <button type="button" class="layui-btn" onclick="selShowEquipmentList()">查询</button>
                </div>
            </div>
        </form>
        <form class="layui-form" action="" style="display: inline-block;">
            <div class="layui-form-item" style="width: 300px;">
                <div class="">
                    <button type="button" class="layui-btn layui-btn-fluid  layui-btn-normal" onclick="openEquipment()">创建</button>
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
    <div class="addEquipment">
        <table cellspacing="0">
            <tr>
                <td>名称：</td>
                <td><input type="text" id="addEquipmentName"></td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>
                    <input type="hidden" id="addDepartNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <select name="modules" lay-verify="required" lay-filter="addDepartName" lay-search="" id="addDepartName">
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="saveAddData()" id="save">确定</button>&nbsp;<button class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
        </table>
    </div>
    <div class="updEquipment">
        <table cellspacing="0">
            <tr>
                <td>名称：</td>
                <td><input type="text" id="updEquipmentName"></td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>
                    <input type="hidden" id="updDepartNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <select name="modules" lay-verify="required" lay-filter="updDepartName" lay-search="" id="updDepartName">
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="saveUpdData()" id="saveUpd">确定</button>&nbsp;<button class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
