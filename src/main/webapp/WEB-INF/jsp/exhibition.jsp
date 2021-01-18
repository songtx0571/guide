<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css" />
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <script type="text/javascript" src="../js/week/exhibition.js?version=1.04"></script>
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
    .layui-table-body::-webkit-scrollbar {
        display:none
    }
    body::-webkit-scrollbar {
        display:none
    }
    .taskAddDiv,.taskUpdDiv{
        width: 400px;
        padding-left: 25px;
        box-sizing: border-box;
        display: none;
    }
    .taskAddDiv .layui-anim,.taskUpdDiv .layui-anim{
        height: 120px;
    }
    .temBarDiv .layui-anim{
        height: 200px;
    }
    .taskAddDiv table,.taskUpdDiv table{
        width: 100%;
    }
    .taskAddDiv table tr,.taskUpdDiv table tr{
        line-height: 58px;
    }
    .taskAddDiv table tr td:first-of-type,.taskUpdDiv table tr td:first-of-type{
        text-align: right;
    }
    .temBarDiv{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        display: none;
    }
    .addTemBarDiv,.updTemBarDiv{
        width: 530px;
        margin: 20px auto;
        display: none;
    }
    .addTemBarDiv span,.updTemBarDiv span{
        float: left;
        margin-top: 10px;
        margin-right: 10px;
        width: 60px;
        text-align: right;
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
        <%--<form class="layui-form" action="" style="display: inline-block;">
            <div class="layui-form-item">
                <div class="layui-input-block" style="margin-left: 50px;margin-right: 50px;">
                    <button type="button" class="layui-btn" onclick="selShowExhibitionList()">查询</button>
                </div>
            </div>
        </form>--%>
        <form class="layui-form" action="" style="display: inline-block;">
            <div class="layui-form-item" style="width: 300px;">
                <div class="">
                    <button type="button" class="layui-btn layui-btn-fluid  layui-btn-normal" onclick="openExhibition()">创建</button>
                </div>
            </div>
        </form>
        </form>

    </div>
    <div class="center">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="barDemo1">
            <input type="hidden" id="statusHiddenOut">
            <a class="layui-btn layui-btn-xs openStatusOut{{d.id}}" lay-event="statusOpenOut">启用</a>
            <a class="layui-btn layui-btn-xs closeStatusOut{{d.id}}" lay-event="statusCloseOut">禁用</a>
        </script>
        <script type="text/html" id="barDemo2">
            <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        </script>
    </div>
    <%--创建巡检任务--%>
    <div class="taskAddDiv">
        <table>
            <tr>
                <td>巡检任务：</td>
                <td><input type="text" id="addTask" style="height: 38px;width: 240px;border: 1px solid #e6e6e6;"></td>
            </tr>
            <tr>
                <td style="float: right;margin-top: 8px;">部门：</td>
                <td style="padding-top: 10px;box-sizing: border-box;">
                    <input type="hidden" id="addDepartNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline" style="width: 240px;">
                                <div class="layui-input-inline" style="width: 240px;">
                                    <select name="modules" lay-verify="required" lay-filter="addDepartName" lay-search="" id="addDepartName">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td style="float: right;margin-top: 8px;">周期：</td>
                <td style="padding-top: 10px;box-sizing: border-box;">
                    <input type="hidden" id="addCycleHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline" style="width: 240px;">
                                <div class="layui-input-inline" style="width: 240px;">
                                    <select name="modules" lay-verify="required" lay-filter="addCycle" lay-search="addCycle" id="addCycle">
                                        <option value="0" selected>请选择</option>
                                        <option value="1">1小时</option>
                                        <option value="2">2小时</option>
                                        <option value="4">4小时</option>
                                        <option value="8">8小时</option>
                                        <option value="12">12小时</option>
                                        <option value="24">24小时</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>计划时间：</td>
                <td><input type="text" id="addPlanTime" style="height: 38px;width: 240px;border: 1px solid #e6e6e6;"></td>
            </tr>
            <tr class="addExhibitionSpan">
               <td colspan="2" style="text-align: center;color: red;">
                   请将消息填写完整！
               </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center">
                    <button type="button" class="layui-btn layui-btn-normal" id="addSave" onclick="addExhibition()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" class="layui-btn layui-btn-normal" onclick="cancel1()">取消</button>
                </td>
            </tr>
        </table>
    </div>
    <%--修改巡检任务--%>
    <div class="taskUpdDiv">
        <input type="hidden" id="updId">
        <table>
            <tr>
                <td>巡检任务：</td>
                <td><input type="text" id="updTask" style="height: 38px;width: 240px;border: 1px solid #e6e6e6;" readonly></td>
            </tr>
            <tr>
                <td style="float: right;margin-top: 8px;">部门：</td>
                <td style="padding-top: 10px;box-sizing: border-box;">
                    <input type="hidden" id="updDepartNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline" style="width: 240px;">
                                <div class="layui-input-inline" style="width: 240px;">
                                    <select name="modules" lay-verify="required" lay-filter="updDepartName" lay-search="updDepartName" id="updDepartName">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td style="float: right;margin-top: 8px;">周期：</td>
                <td style="padding-top: 10px;box-sizing: border-box;">
                    <input type="hidden" id="updCycleHidden">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline" style="width: 240px;">
                                <div class="layui-input-inline" style="width: 240px;">
                                    <select name="modules" lay-verify="required" lay-filter="updCycle" lay-search="updCycle" id="updCycle">
                                        <option value="0" selected>请选择</option>
                                        <option value="1">1小时</option>
                                        <option value="2">2小时</option>
                                        <option value="4">4小时</option>
                                        <option value="8">8小时</option>
                                        <option value="12">12小时</option>
                                        <option value="24">24小时</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>计划时间：</td>
                <td><input type="text" id="updPlanTime" style="height: 38px;width: 240px;border: 1px solid #e6e6e6;"></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button type="button" class="layui-btn layui-btn-normal" onclick="updExhibition()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" class="layui-btn layui-btn-normal" onclick="cancel1()">取消</button>
                </td>
            </tr>
        </table>
    </div>
    <%--编辑路线规划列表--%>
    <div class="temBarDiv">
        <%--创建--%>
        <div class="temBarDivTable">
            <div style="width: 100%; height: 50px;">
                <button type="button" class="layui-btn layui-btn-fluid  layui-btn-normal" onclick="openTemBar()">创建</button>
            </div>
            <table id="demoTB" lay-filter="testTB"></table>
            <script type="text/html" id="barDemo3">
                <input type="hidden" id="statusHidden">
                <a class="layui-btn layui-btn-xs openStatus{{d.id}}" lay-event="statusOpen">启用</a>
                <a class="layui-btn layui-btn-xs closeStatus{{d.id}}" lay-event="statusClose">禁用</a>
            </script>
            <script type="text/html" id="barDemo4">
                <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="editTB">编辑</a>
                <a class="layui-btn layui-btn-xs" lay-event="delTB">删除</a>
                <a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="upTB">上移</a>
            </script>
            <script type="text/html" id="barDemo5">
                {{#  if(d.dataType== "1"){ }}
                <span style="color: #0c7cd5">人工</span>
                {{#  } else { }}
                <span style="color: red;">AI</span>
                {{#  } }}

            </script>
        </div>
        <%--添加--%>
        <div class="addTemBarDiv">
            <div>
                <span>设备名称</span>
                <input type="hidden" id="addTemBarSysHidden">
                <input type="hidden" id="addTemBarEquNameHidden">
                <form class="layui-form" action="" style="float: left;">
                    <div class="layui-form-item">
                        <div class="layui-inline" style="width: 440px;">
                            <div class="layui-input-inline" style="width: 210px;float: left; margin-right: 0px;">
                                <select name="modules" lay-verify="required" lay-filter="addTemBarSysName" lay-search="" id="addTemBarSysName">
                                </select>
                            </div>
                            <div class="layui-input-inline" style="width: 210px;float:left;">
                                <select name="modules" lay-verify="required" lay-filter="addTemBarEquName" lay-search="" id="addTemBarEquName">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div style="clear: both;"></div>
            <div>
                <span>测点类型</span>
                <input type="hidden" id="addTemBarSightTypeHidden">
                <input type="hidden" id="addTemBarTypeHidden">
                <form class="layui-form" action="" style="float: left;">
                    <div class="layui-form-item">
                        <div class="layui-inline" style="width: 440px;">
                            <div class="layui-input-inline" style="width: 100px;margin-right: 0px;">
                                <select name="modules" lay-verify="required" lay-filter="addTemBarType" lay-search="" id="addTemBarType">
                                    <option value="0">请选择</option>
                                    <option value="1">人工</option>
                                    <option value="2">AI</option>
                                </select>
                            </div>
                            <div class="layui-input-inline" style="width: 322px;">
                                <select name="modules" lay-verify="required" lay-filter="addTemBarSightType" lay-search="" id="addTemBarSightType">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div style="clear: both;"></div>
            <div>
                <span>单位</span>
                <input type="hidden" id="addTemBarUnitHidden">
                <form class="layui-form" action="" style="float: left;">
                    <div class="layui-form-item">
                        <div class="layui-inline" style="width: 440px;">
                            <div class="layui-input-inline" style="width: 422px;">
                                <select name="modules" lay-verify="required" lay-filter="addTemBarUnit" lay-search="" id="addTemBarUnit">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div style="clear: both;"></div>
            <div style="text-align: center;color: red;" class="addTemBarSpan">请将消息填写完整！</div>
            <div style="text-align: center;">
                <button type="button" class="layui-btn layui-btn-normal" onclick="addTemBar()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="layui-btn layui-btn-normal" onclick="cancel2()">取消</button>
            </div>
        </div>
        <%--修改--%>
        <div class="updTemBarDiv">
            <div>
                <span>设备名称</span>
                <input type="hidden" id="updTemBarSysHidden">
                <input type="hidden" id="updTemBarEquNameHidden">
                <form class="layui-form" action="" style="float: left;">
                    <div class="layui-form-item">
                        <div class="layui-inline" style="width: 440px;">
                            <div class="layui-input-inline" style="width: 210px;float: left; margin-right: 0px;">
                                <select name="modules" lay-verify="required" lay-filter="updTemBarSysName" lay-search="" id="updTemBarSysName">
                                </select>
                            </div>
                            <div class="layui-input-inline" style="width: 210px;float:left;">
                                <select name="modules" lay-verify="required" lay-filter="updTemBarEquName" lay-search="" id="updTemBarEquName">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div style="clear: both;"></div>
            <div>
                <span>测点类型</span>
                <input type="hidden" id="updTemBarSightTypeHidden">
                <input type="hidden" id="updTemBarTypeHidden">
                <form class="layui-form" action="" style="float: left;">
                    <div class="layui-form-item">
                        <div class="layui-inline" style="width: 440px;">
                            <div class="layui-input-inline" style="width: 100px;margin-right: 0px;">
                                <select name="modules" lay-verify="required" lay-filter="updTemBarType" lay-search="" id="updTemBarType">
                                    <option value="0">请选择</option>
                                    <option value="1">人工</option>
                                    <option value="2">AI</option>
                                </select>
                            </div>
                            <div class="layui-input-inline" style="width: 322px;">
                                <select name="modules" lay-verify="required" lay-filter="updTemBarSightType1" lay-search="" id="updTemBarSightType1">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div style="clear: both;"></div>
            <div>
                <span>单位</span>
                <input type="hidden" id="updTemBarUnitHidden">
                <form class="layui-form" action="" style="float: left;">
                    <div class="layui-form-item">
                        <div class="layui-inline" style="width: 440px;">
                            <div class="layui-input-inline" style="width: 422px;">
                                <select name="modules" lay-verify="required" lay-filter="updTemBarUnit" lay-search="" id="updTemBarUnit">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div style="clear: both;"></div>
            <div style="text-align: center;">
                <button type="button" class="layui-btn layui-btn-normal" onclick="updTemBar()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="layui-btn layui-btn-normal" onclick="cancel2()">取消</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
