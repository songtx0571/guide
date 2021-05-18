<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>维护配置</title>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css"/>
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <link rel="stylesheet" href="../css/maintainCss.css">
    <link rel="stylesheet" href="../js/layui/formSelects-v4.css">
    <script src="../js/layui/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="../js/week/maintainConfig.js"></script>
</head>
<body>
<div class="warp maintainConfig">
    <div class="top">
        <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;float: left;">
            <input type="hidden" id="selDepartNameHidden">
            <div class="layui-form-item">

                <shiro:hasPermission name="查询所有部门维护引导">
                    <div class="layui-inline" style="margin: 0;float:left;">
                        <div class="layui-input-inline" style="margin: 0;width: 220px;">
                            <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search=""
                                    id="selDepartName">
                            </select>
                        </div>
                    </div>
                </shiro:hasPermission>

                <div class="layui-inline" style="margin: 0px;float:left;">
                    <input class="layui-input" id="searchWord" name="searchWord" placeholder="请输入关键字">
                </div>
            </div>
        </form>
        <div class="layui-inline" style="margin: 0px;float:left;">
            <button class="layui-btn " onclick="search()">查询</button>
        </div>
        <shiro:hasPermission name="创建维护配置">
            <div class="layui-inline" style="float:left;">
                <button type="button" class="layui-btn layui-btn-normal"
                        onclick="openMaintainConfig('')">创建
                </button>
            </div>
        </shiro:hasPermission>
    </div>
    <div class="content">

    </div>
    <%--保存--%>
    <div class="saveMaintainConfig">
        <table>
            <shiro:hasPermission name="查询所有部门维护引导">

                <tr>
                    <td>部门</td>
                    <td>
                        <input type="hidden" id="addDepartNameHidden">
                        <form class="layui-form" action="">
                            <div style="margin: 0;width: 400px;">
                                <select name="modules" lay-verify="required" lay-filter="addDepartName" lay-search=""
                                        id="addDepartName">
                                </select>
                            </div>
                        </form>

                    </td>
                </tr>
            </shiro:hasPermission>


            <tr>
                <td>系统</td>
                <td>
                    <input type="hidden" id="selSysNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-input-inline" style="margin: 0;width: 400px;">
                            <select name="modules" lay-verify="required" lay-filter="selSysName" lay-search=""
                                    id="selSysName">
                            </select>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>设备</td>
                <td>
                    <input type="hidden" id="selEquipmentNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-input-inline" style="margin: 0;width: 400px;">
                            <select name="modules" lay-verify="required" lay-filter="selEquipmentName" lay-search=""
                                    id="selEquipmentName">
                            </select>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>维护点</td>
                <td>
                    <input type="hidden" id="selMaintainPointNameHidden">
                    <form class="layui-form" action="">
                        <div class="layui-input-inline" style="margin: 0;width: 400px;">
                            <select name="modules" lay-verify="required" lay-filter="selMaintainPointName" lay-search=""
                                    id="selMaintainPointName">
                            </select>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>周期/天</td>
                <td>
                    <input type="text" id="selCycleHidden" class="layui-input" style="margin: 0;width: 400px;">
                </td>
            </tr>
            <tr>
                <td>预估工时</td>
                <td>
                    <input type="hidden" id="selPlanedWorkingHourHidden">
                    <form class="layui-form" action="">
                        <div class="layui-input-inline" style="margin: 0;width: 400px;">
                            <select name="modules" lay-verify="required" lay-filter="selPlanedWorkingHour" lay-search=""
                                    id="selPlanedWorkingHour">
                                <option value="0.5">0.5小时</option>
                                <option value="1">1小时</option>
                                <option value="1.5">1.5小时</option>
                                <option value="2">2小时</option>
                                <option value="2.5">2.5小时</option>
                                <option value="3">3小时</option>
                                <option value="3.5">3.5小时</option>
                                <option value="4">4小时</option>
                            </select>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>工作内容描述</td>
                <td>
                    <textarea style="margin: 0;width: 400px;" class="layui-textarea" id="selWorkContent"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="saveMaintainConfig()">确定</button>
                    <button class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
        </table>
    </div>
    <!-- 分配 -->
    <div class="maintainConfigDiv">
        <input type="hidden" id="maintainConfigId">
        <input type="hidden" id="maintainConfigDepartmentId">
        <table>
            <thead>
            <tr>
                <td colspan="10" style="text-align: center;font-weight: bold;font-size: 18px;">
                    分配维护任务
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>维护编号</th>
                <td>
                    <span id="maintainConfigNumber" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>所属系统</th>
                <td colspan="2">
                    <span id="maintainConfigSys" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>所属设备</th>
                <td colspan="3">
                    <span id="maintainConfigEquipment" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
            </tr>
            <tr>
                <th>周期</th>
                <td>
                    <span id="maintainConfigCycle" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>创建时间</th>
                <td colspan="2">
                    <span id="maintainConfigCreateTime" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>预估工时</th>
                <td colspan="3">
                    <span id="maintainConfigPlanedWorkingHour" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
            </tr>
            <tr>
                <th>工作内容</th>
                <td colspan="8" id="maintainConfigMaintainPointName"
                    style="padding-left: 10px;box-sizing: border-box;"></td>
            </tr>
            <tr>
                <th>执行人</th>
                <td colspan="8" style="padding-left: 8px;box-sizing: border-box;">
                    <div class="layui-input-inline" style="width: 615px;">
                        <select name="tags" id="tags" lay-verify="required" xm-select="tags">
                        </select>
                    </div>
                    <input type="hidden" id="maintainConfigExecutorId">
                </td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <td colspan="9" align="center">
                    <button type="button" class="layui-btn layui-btn-normal" id="maintainConfigOkBtn"
                            onclick="maintainConfigOk()">确定
                    </button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>

<script type="text/javascript">
    //操作按钮权限控制
    function getPermission(id, status) {
        var str = '';
        <shiro:hasPermission name="修改维护配置">
        str += "<button class='layui-btn layui-btn-sm' onclick='openMaintainConfig(" + id + ")'>修改</button>";
        </shiro:hasPermission>
        <shiro:hasPermission name="重置维护配置">
        if (status == "2") {
            str += "<button class='layui-btn layui-btn-sm layui-btn-normal' onclick='resetMaintainConfig(" + id + ")'>开始</button>";
        } else {
            str += "<button class='layui-btn layui-btn-sm layui-btn-warm' onclick='stopMaintainConfig(" + id + ")'>暂停</button>";
        }
        </shiro:hasPermission>
        <shiro:hasPermission name="分配维护配置">
        str += "<button class='layui-btn layui-btn-sm' onclick='distributionMaintainConfig(" + id + ")'>分配</button>";
        </shiro:hasPermission>
        return str;
    }
</script>
</html>
