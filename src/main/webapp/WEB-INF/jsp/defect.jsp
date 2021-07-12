<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="referrer" content="origin">
    <title></title>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script src="../js/week/defect.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="../css/defect.css">
    <link rel="stylesheet" href="../js/layui/css/layui.css">
    <script src="../js/layui/layui.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="../js/layui/formSelects-v4.css">
    <script src="../js/layui/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="../js/week/ajaxfileupload.js"></script>
</head>
<body>
<div class="warp">
    <!-- 头部 -->
    <div class="top">
        <div style="width: 100%;height: 50px;">
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('0')">全部缺陷</button>
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('1')">未认领</button>
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('5')">已认领</button>
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('2')">消缺中</button>
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('3')">已消缺</button>
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('4')">已完成</button>
        </div>
        <div style="width: 100%;height: 50px;">
            <form class="layui-form" action="" style="float: left;margin-right: 20px;">
                <input type="hidden" id="systemHidden">
                <input type="hidden" id="equipmentHidden">
                <input type="hidden" id="departmentHidden">
                <div class="layui-inline" style="width: 150px;">
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="system" lay-search=""
                                id="system"></select>
                    </div>
                </div>
                <div class="layui-inline" style="width: 150px;">
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="equipment" lay-search=""
                                id="equipment"></select>
                    </div>
                </div>
                <shiro:hasPermission name="缺陷管理员">
                    <div class="layui-inline" style="width: 150px;">
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="department" lay-search=""
                                    id="department"></select>
                        </div>
                    </div>
                </shiro:hasPermission>
            </form>
            <button type="button" class="layui-btn floatBtn" onclick="getChecked('6')">延期</button>
            <shiro:hasPermission name="缺陷运行岗位">
                <button type="button" style="margin-right: 0px;" class="layui-btn layui-btn-normal floatBtn"
                        onclick="addDefect()">新增&nbsp;&nbsp;+
                </button>
            </shiro:hasPermission>
        </div>
    </div>
    <!-- 表格内容 -->
    <div class="content">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="tbNumberBar">
            {{#  if(d.level == 0){ }}
            <span style="color: red;">{{d.number}}</span>
            {{#  } else if(d.level == 1) { }}
            <span style="color: orange;">{{d.number}}</span>
            {{#  } else if(d.level == 2) { }}
            <span style="color: mediumpurple;">{{d.number}}</span>
            {{#  } else if(d.level == 3) { }}
            <span style="color: #007DDB;">{{d.number}}</span>
            {{#  } else if(d.level == 4) { }}
            <span style="color: green;">{{d.number}}</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbSourceTypeBar">
            {{#  if(d.sourceType == 1){ }}
            <span>缺陷</span>
            {{#  } else if(d.sourceType == 2) { }}
            <span>巡检</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbTypeBar">
            {{#  if(d.type == 1){ }}
            <span style="color: red;">未认领</span>
            {{#  } else if(d.type == 5) { }}
            <span style="color: #dcb422;">已认领</span>
            {{#  } else if(d.type == 2) { }}
            <span style="color: #ff8100;">消缺中</span>
            {{#  } else if(d.type == 3) { }}
            <span style="color: #8fc323;">已消缺</span>
            {{#  } else if(d.type == 4) { }}
            <span style="color: green;">已完成</span>
            {{#  } else if(d.type == 6) { }}
            {{#  if(d.delayReason == 1){ }}
            <span style="color: #001580;">等待备件</span>
            {{#  } else if(d.delayReason == 2) { }}
            <span style="color: #001580;">无法安措</span>
            {{#  } else if(d.delayReason == 3) { }}
            <span style="color: #001580;">停炉处理</span>
            {{#  } else if(d.delayReason == 4) { }}
            <span style="color: #001580;">继续观察</span>
            {{#  } else if(d.delayReason == 5) { }}
            <span style="color: #001580;">极端天气</span>
            {{#  } }}
            {{#  } else if(d.type == 7) { }}
            <span style="color: burlywood;">待确认</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbOperationBar">
            {{#  if(d.type == 1){ }}
            <shiro:hasPermission name="缺陷检修班长">
                <a class="layui-btn layui-btn-danger" style="line-height: 30px;" lay-event="claim">认领</a>
                <a class="layui-btn" style="line-height: 30px;background: #a1aec7;" lay-event="del">删除</a>
            </shiro:hasPermission>
            {{#  } else if(d.type == 5) { }}
            <a class="layui-btn layui-btn-fluid layui-btn-warm" lay-event="implement">开始执行</a>
            {{#  } else if(d.type == 2) { }}
            <shiro:hasPermission name="缺陷检修岗位">
                <a class="layui-btn layui-btn-fluid layui-btn-normal" lay-event="handle">消缺反馈</a>
            </shiro:hasPermission>
            {{#  } else if(d.type == 3) { }}
            <shiro:hasPermission name="缺陷运行岗位">
                <a class="layui-btn layui-btn-fluid" lay-event="beOnDuty">值班确认</a>
            </shiro:hasPermission>
            {{#  } else if(d.type == 4) { }}
            <span style="color: green;">已完成</span>
            {{#  } else if(d.type == 6) { }}
            <shiro:hasPermission name="缺陷检修班长">
                <a class="layui-btn layui-btn-danger" style="line-height: 30px;" lay-event="claim">认领</a>
                <a class="layui-btn" style="line-height: 30px;background: #a1aec7;" lay-event="del">删除</a>
            </shiro:hasPermission>
            {{#  } else if(d.type == 7) { }}
            <shiro:hasPermission name="缺陷检修班长">
                <a class="layui-btn layui-btn-fluid" style="background: burlywood;" lay-event="workHours">工时确认</a>
            </shiro:hasPermission>
            {{#  } }}
        </script>
        <script type="text/html" id="tbStatusBar">
            <shiro:hasPermission name="缺陷运行岗位">
                {{# if(d.type != 6){ }}
                <a class="layui-btn layui-btn-normal" style="line-height: 30px;" lay-event="updateStartedOrDelay"
                   id="statusBtn{{d.id}}">暂停</a>
                <a class="layui-btn" style="line-height: 30px;" lay-event="delay">加时</a>
                {{# } }}
            </shiro:hasPermission>
        </script>
    </div>
    <!-- 新增 -->
    <div class="addDefectDiv">
        <table>
            <thead>
            <tr>
                <td colspan="4" style="text-align: center;font-weight: bold;font-size: 18px;">新增缺陷</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>重大级别</th>
                <td>
                    <form class="layui-form" action="" style="float: left;">
                        <input type="hidden" id="levelHidden">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="level" lay-search=""
                                        id="level">
                                    <option value="0">0类</option>
                                    <option value="1">1类</option>
                                    <option value="2">2类</option>
                                    <option value="3">3类</option>
                                    <option value="4">4类</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
                <th>检修类别</th>
                <td>
                    <form class="layui-form" action="" style="float: left;">
                        <input type="hidden" id="maintenanceCategoryHidden">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="maintenanceCategory"
                                        lay-search="" id="maintenanceCategory">
                                    <option value='1'>机务</option>
                                    <option value='2'>电仪</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <th>缺陷位置</th>
                <td colspan="3" id='defectLocation' style="padding-bottom: 10px;box-sizing: border-box;">
                    <form class="layui-form" action="" style="float: left;">
                        <input type="hidden" id="addSystemHidden">
                        <input type="hidden" id="addEquipmentHidden">
                        <div class="layui-inline">
                            <div class="layui-input-inline" style="width: 183px;">
                                <select name="modules" lay-verify="required" lay-filter="addSystem" lay-search=""
                                        id="addSystem"></select>
                            </div>
                        </div>
                        <div class="layui-inline">
                            <div class="layui-input-inline" style="width: 182px;">
                                <select name="modules" lay-verify="required" lay-filter="addEquipment" lay-search=""
                                        id="addEquipment"></select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <th>缺陷描述</th>
                <td colspan="3"><textarea id='addAbs' rows="5" cols="50" maxlength="100"
                                          style="text-indent: 10px;"></textarea></td>
            </tr>
            <tr>
                <th>缺陷图片</th>
                <td colspan="3">
                    <img src="../img/week/defectAdd.png" style="float: left;margin-top: 10px;" id="addImg1">
                    <input type="file" id='file' name='file' style="display: none;"
                           accept="image/gif,image/jpeg,image/jpg,image/png" onchange="fileChange(event,'file','one')">
                    <img src="" id="img-change1" class="img-change">
                    <img src="../img/week/defectReduce.png" style="float: left;margin-top: 10px;margin-left: 10px;"
                         id="reduceImgAdd" onclick="reduceImg('reduceImgAdd')">
                </td>
            </tr>
            <tr>
                <th>申请人员<input type="hidden" id='addUserId'></th>
                <td colspan="3" id='addCreaterName'></td>
            </tr>
            <tr>
                <th>申请日期</th>
                <td colspan="3" id='createTime'></td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <td colspan="4" align="center">
                    <button type="button" class="layui-btn layui-btn-normal" onclick="insert()">确定</button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </thead>
        </table>
        <!--新增历史记录-->
        <div class="addHistory">
            <h2 class="addHistoryTitle"></h2>
            <ul class="addHistoryUl">

            </ul>
        </div>
    </div>
    <!-- 认领 -->
    <div class="claimInfoDiv">
        <input type="hidden" id="claimMaintenanceCategory">
        <table>
            <thead>
            <tr>
                <td colspan="10" style="text-align: center;font-weight: bold;font-size: 18px;">
                    认领缺陷 <input type="hidden" id="claimId">
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>缺陷编号</th>
                <td>
                    <span id="claimInfoId" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>所属系统</th>
                <td>
                    <span id="claimInfoSys" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>级别</th>
                <td>
                    <span id="claimInfoLevel" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
            </tr>
            <tr>
                <th>创建人</th>
                <td>
                    <span id="claimInfoCreateName" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
                <th>创建时间</th>
                <td colspan="3">
                    <span id="claimInfoCreateTime" style="padding: 0 5px;box-sizing: border-box;"></span>
                </td>
            </tr>
            <tr>
                <th>缺陷描述</th>
                <td colspan="5" style="padding-left: 8px;box-sizing: border-box;"><textarea id='claimInfoAbs' rows="5"
                                                                                            cols="75"
                                                                                            maxlength="100"></textarea>
                </td>
            </tr>
            <tr>
                <th>认领人</th>
                <td id="claimantName"></td>
            </tr>
            <tr>
                <th>执行人</th>
                <td colspan="5" style="padding-left: 8px;box-sizing: border-box;">
                    <div class="layui-input-inline" style="width: 615px;">
                        <select name="tags" id="tags" lay-verify="required" xm-select="tags">
                        </select>
                    </div>
                    <input type="hidden" id="claimInfoDescribeId">
                </td>
            </tr>
            <tr>
                <th>计划工时</th>
                <td colspan="5" style="padding-left: 8px;box-sizing: border-box;">
                    <form class="layui-form" action="">
                        <div class="layui-input-inline" style="width: 615px;">
                            <select name="modules" lay-verify="required" lay-filter="plannedWork" lay-search=""
                                    id="plannedWork">
                                <option value="0.5">30分钟</option>
                                <option value="1">1小时</option>
                                <option value="1.5">1.5小时</option>
                                <option value="2">2小时</option>
                                <option value="2.5">2.5小时</option>
                                <option value="3">3小时</option>
                                <option value="3.5">3.5小时</option>
                                <option value="4">4小时</option>
                                <option value="4.5">4.5小时</option>
                                <option value="5">5小时</option>
                                <option value="5.5">5.5小时</option>
                                <option value="6">6小时</option>
                                <option value="6.5">6.5小时</option>
                                <option value="7">7小时</option>
                                <option value="7.5">7.5小时</option>
                                <option value="8">8小时</option>
                            </select>
                        </div>
                    </form>
                    <input type="hidden" id="claimInfoPlannedWork">
                </td>
            </tr>
            <tr>
                <th>消缺前图片</th>
                <td colspan="5" id='tdImg' style="padding-left: 8px;box-sizing: border-box;">
                    <img src="" id="claimInfoImg" class="img-change" alt="无图片">
                </td>
            </tr>
            <tr class="claimInfoBelayTr1">
                <th>延期完成时间</th>
                <td colspan="5" style="padding-left: 8px;box-sizing: border-box;">
                    <div class="layui-inline">
                        <div class="layui-input-inline" style="width: 275px;">
                            <input type="text" class="layui-input" name="entryDate" id="test3" readonly=""
                                   placeholder="年月日">
                        </div>
                        <div class="layui-input-inline" style="width: 275px;">
                            <input type="text" class="layui-input" name="entryDate" id="test4" readonly=""
                                   placeholder="小时">
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="claimInfoBelayTr1">
                <th>延期原由</th>
                <td colspan="5">
                    <form class="layui-form" action="">
                        <input type="hidden" id="claimInfoBelayHidden1">
                        <div class="layui-inline" style="padding-left: 8px;box-sizing: border-box;">
                            <div class="layui-input-inline" style="width:553px;">
                                <select name="modules" lay-verify="required" lay-filter="claimInfoBelay1" lay-search=""
                                        id="claimInfoBelay1">
                                    <option value="0">请选择</option>
                                    <option value="1">等待备件</option>
                                    <option value="2">无法安措</option>
                                    <option value="3">停炉处理</option>
                                    <option value="4">继续观察</option>
                                    <option value="5">极端天气</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <td colspan="10" align="center">
                    <button type="button" class="layui-btn layui-btn-normal" onclick="claimOk()" id="claimOkBtn">确定
                    </button>
                    <button type="button" class="layui-btn layui-btn-warm" onclick="claimBelay1()" id="claimBelayBtn1">
                        延期
                    </button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </thead>
        </table>
    </div>
    <!--开始执行-->
    <div class="implementInfoDiv">
        <p id="implementInfoP" style="display: none;"></p>
        <table>
            <thead>
            <tr>
                <td colspan="5" style="text-align: center;font-weight: bold;font-size: 18px;">执行任务
                    <input id='implementId' type="hidden"/>
                    <input id='implementType' type="hidden"/>
                    <input id='implementCompleterId' type="hidden"/>
                    <input id='implementRealSTime' type="hidden"/>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>重大级别</th>
                <td><span id='implementLevel'></span></td>
                <th>检修类别</th>
                <td><span id='implementDepartment'></span></td>
            </tr>
            <tr>
                <th>缺陷位置</th>
                <td colspan="3">
                    <span id='implementSys'></span>
                    <span id='implementEquipment'></span>
                </td>
            </tr>
            <tr>
                <th>缺陷描述</th>
                <td colspan="3" id="implementAbs"></td>
            </tr>
            <tr>
                <th>缺陷前图片</th>
                <td colspan="3" style="padding: 8px;box-sizing: border-box;">
                    <img src="" id="implementImg" class="img-change" alt="无图片">
                </td>
            </tr>
            <tr class="claimInfoBelayTr2">
                <th>延期完成时间</th>
                <td colspan="3" style="padding-left: 8px;box-sizing: border-box;">
                    <div class="layui-inline">
                        <div class="layui-input-inline" style="width: 275px;">
                            <input type="text" class="layui-input" name="entryDate" id="test5" readonly=""
                                   placeholder="年月日">
                        </div>
                        <div class="layui-input-inline" style="width: 275px;">
                            <input type="text" class="layui-input" name="entryDate" id="test6" readonly=""
                                   placeholder="小时">
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="claimInfoBelayTr2">
                <th>延期原由</th>
                <td colspan="3">
                    <form class="layui-form" action="">
                        <input type="hidden" id="claimInfoBelayHidden2">
                        <div class="layui-inline" style="padding-left: 8px;box-sizing: border-box;">
                            <div class="layui-input-inline" style="width: 275px;">
                                <select name="modules" lay-verify="required" lay-filter="claimInfoBelay2" lay-search=""
                                        id="claimInfoBelay2">
                                    <option value="0">请选择</option>
                                    <option value="1">等待备件</option>
                                    <option value="2">无法安措</option>
                                    <option value="3">停炉处理</option>
                                    <option value="4">继续观察</option>
                                    <option value="5">极端天气</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center;">
                    <button type="button" class="layui-btn layui-btn-normal" onclick="startFeedback()"
                            id="startFeedbackBtn">开始执行
                    </button>
                    <button type="button" class="layui-btn layui-btn-warm" onclick="claimBelay2()" id="claimBelayBtn2">
                        延期
                    </button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!-- 消缺反馈 -->
    <div class="handleInfoDiv">
        <input type="hidden" id="feedbackLevel">
        <input type="hidden" id="feedbackSys">
        <input type="hidden" id="feedbackEquipment">
        <input type="hidden" id="feedbackDepartment">
        <input type="hidden" id="feedbackPlanedTime">
        <input type="hidden" id="feedbackPlannedWork">
        <table>
            <thead>
            <tr>
                <td colspan="5" style="text-align: center;font-weight: bold;font-size: 18px;">处理反馈单
                    <input id='feedbackId' type="hidden"/>
                    <input id='feedbackType' type="hidden"/>
                    <input id='feedbackCompleterId' type="hidden"/>
                    <input id='feedbackRealSTime' type="hidden"/>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>缺陷描述</th>
                <td colspan="4">
                    <textarea id='feedbackAbs' rows="5" cols="50" maxlength="100"></textarea>
                </td>
            </tr>
            <tr>
                <th>缺陷图片</th>
                <td colspan="4" style="padding: 8px;box-sizing: border-box;">
                    <img src="../img/week/defectAdd.png" style="float: left;margin-top: 10px;" id="addImg2">
                    <input type="file" id='file2' name='file' style="display: none;"
                           accept="image/gif,image/jpeg,image/jpg,image/png" onchange="fileChange(event,'file2','two')">
                    <img src="" id="img-change2" class="img-change">
                    <img src="../img/week/defectReduce.png" style="float: left;margin-top: 10px;margin-left: 10px;"
                         id="reduceImgFeed" onclick="reduceImg('reduceImgFeed')">
                </td>
            </tr>
            <tr>
                <th>处理措施</th>
                <td colspan="4">
                    <textarea id='feedbackMethod' rows="5" cols="50" maxlength="100"></textarea>
                </td>
            </tr>
            <tr>
                <th>遗留问题</th>
                <td colspan="4">
                    <textarea id='feedbackProblem' rows="5" cols="50" maxlength="100"></textarea>
                </td>
            </tr>
            <tr>
                <th>备注</th>
                <td colspan="4">
                    <textarea id='feedbackRemark' rows="5" cols="50" maxlength="100"></textarea>
                </td>
            </tr>
            <tr>
                <th>填写人员</th>
                <td colspan="4" id='feedbackCompleterName'></td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <td colspan="5" style="text-align: center;">
                    <!--<button type="button" class="layui-btn layui-btn-warm"  onclick="startFeedback()" id="startFeedbackBtn">开始执行</button>-->
                    <button type="button" class="layui-btn layui-btn-normal" onclick="insertFeedback()"
                            id="insertFeedbackBtn">确定
                    </button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </thead>
        </table>
    </div>
    <%--工时确认--%>
    <div class="workHoursDiv">
        <table>
            <thead>
            <tr>
                <td colspan="5" style="text-align: center;font-weight: bold;font-size: 18px;">工时确认<input
                        id="workHoursId" type="hidden"/></td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>缺陷位置</th>
                <td colspan="5">
                    <span id='workHoursSys'></span>
                    <span id='workHoursEquipment'></span>
                </td>
            </tr>
            <tr>
                <th>缺陷描述</th>
                <td colspan="5">
                    <textarea id='workHoursAbs' rows="5" cols="50" maxlength="100"></textarea>
                </td>
            </tr>
            <tr>
                <th>开始时间</th>
                <td colspan="2">
                    <span id='workHoursRealSTime' style="width: 150px;display: inline-block;"></span>
                </td>
                <th>结束时间</th>
                <td colspan="2">
                    <span id='workHoursRealETime' style="width: 150px;display: inline-block;"></span>
                </td>
            </tr>
            <tr>
                <th>预计工时</th>
                <td>
                    <span id='workHoursPlannedWork'></span>
                </td>
                <th>实际工时</th>
                <td>
                    <input type="text" id="workHoursRealExecuteTime" placeholder="数字"
                           onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                </td>
                <th>加班工时</th>
                <td>
                    <input type="text" id="workHoursOvertime" placeholder="数字"
                           onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                </td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <td colspan="6" style="text-align: center;">
                    <button type="button" class="layui-btn layui-btn-normal" onclick="workHoursOk()">确认</button>
                    <button type="button" class="layui-btn layui-btn-danger" onclick="workHoursNo()">驳回</button>
                    <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<div class="loading">
    <div style="width: 50px;margin: 0 auto;">
        <i class="layui-icon layui-icon-loading" style="font-size: 60px; color: #fff;"></i>
    </div>
</div>
</body>
</html>
