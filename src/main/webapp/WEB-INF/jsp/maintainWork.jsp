<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>维护工作</title>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/layui/css/layui.css"/>
    <script type="text/javascript" src="../js/layui/layui.js"></script>
    <link rel="stylesheet" href="../css/maintainCss.css">
    <script type="text/javascript" src="../js/week/maintainWork.js"></script>
</head>
<body>
<div class="warp maintainWork">
    <div class="top">
        <shiro:hasPermission name="查询所有部门维护引导">
            <form class="layui-form" action="" style="display: inline-block;margin-bottom: 10px;float: left;">
                <input type="hidden" id="selDepartNameHidden">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <div class="layui-input-inline" style="margin: 0;">
                            <select name="modules" lay-verify="required" lay-filter="selDepartName" lay-search=""
                                    id="selDepartName">
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </shiro:hasPermission>
        <div class="layui-inline" style="margin: 0 0 0 20px;float:left;">
            <button class="layui-btn" onclick="showMaintainWorkBtn('2')">已完成</button>
        </div>
        <div class="layui-inline" style="margin: 0 0 0 20px;float:left;">
            <button class="layui-btn" onclick="showMaintainWorkBtn('1')">未完成</button>
        </div>

    </div>
    <div class="content">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="tbDemoStatusBar">
            {{#  if(d.status == 0){ }}
            <span style="color: red;">待执行</span>
            {{#  } else if(d.status == 1) { }}
            <span style="color: blue;">执行中</span>
            {{#  } else if(d.status == 2) { }}
            <span style="color: green;">已完成</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbDemoBar">
            {{#  if(d.status == 0){ }}
            <a class="layui-btn  layui-btn-normal editBtn" style="line-height:31px;"   lay-event="start">开始</a>
            {{#  } else if(d.status == 1) { }}
            <a class="layui-btn  layui-btn-normal editBtn" style="line-height:31px;"   lay-event="feedback">完成</a>
            {{#  } else if(d.status == 2) { }}
            <span style="color: green;">已完成</span>
            {{#  } }}

        </script>
    </div>
    <%--处理反馈--%>
    <div class="handleMaintainWork">
        <input type="hidden" id="selIdTd">
        <table>
            <tr>
                <td>系统</td>
                <td class="selSysNameTd"></td>
                <td>设备</td>
                <td class="selEquipmentNameTd"></td>
            </tr>
            <tr>
                <td>维护点</td>
                <td class="selMaintainPointNameTd"></td>
                <td>状态</td>
                <td class="selStatusTd"></td>
            </tr>
            <tr>
                <td>开始时间</td>
                <td class="selStartTimeTd"></td>
                <td>结束时间</td>
                <td class="selEndTimeTd"></td>
            </tr>
            <tr>
                <td>工作时间</td>
                <td colspan="3" class="selWorkingHourTd"></td>
            </tr>
            <tr>
                <td>工作反馈描述</td>
                <td colspan="3">
                    <textarea style="margin: 0;width: 400px;" class="layui-textarea" id="selFeedback"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center;">
                    <button class="layui-btn" onclick="feedbackMaintainWork()">确定</button>
                    <button class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
