var path = "/guide";
// var path = "http://192.168.1.186:8082/guide";
var index = 0;
var addSystemName = "";
var addEquipmentName = "";
var maintenanceCategoryName = "";
// 该map可以定义在最上面
var tasks = new Map();
$(function () {
    showSelect();
    showTable("", "", "", "");
    showTime();
    showFormSelects();
    $('#addImg1').click(function () {
        $('#file').click();
    });
    $('#addImg2').click(function () {
        $('#file2').click();
    });
    $.ajax({
        type: 'GET',
        url: path + "/defect/getLoginUserInfo",
        success: function (data) {
            $("#addCreaterName").text(data.userName);
            $("#feedbackCompleterName").text(data.userName);
            $('#addUserId').val(data.id);
            $('#feedbackCompleterId').val(data.id);
        }
    })
});

//显示下拉框信息 部门
function showSelect() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: 'GET',
            url: path + "/defect/getEquMap",
            data: {type: 1},
            success: function (data) {
                $("#system").empty();
                $("#addSystem").empty();
                var option = "<option value='-1' >请选择系统</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#system').html(option);
                $('#addSystem').html(option);
                form.render();//菜单渲染 把内容加载进去
                form.render('select');
            }
        });
        form.on('select(system)', function (data) {
            $("#systemHidden").val(data.value);
            showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
        });
        form.on('select(addSystem)', function (data) {
            $("#addSystemHidden").val(data.value);
            addSystemName = data.elem[data.elem.selectedIndex].text;
            var sysId = Number($("#addSystemHidden").val());
            var euqipmentId = Number($("#addEquipmentHidden").val());
            getHis(sysId, euqipmentId);
            $(".addHistoryTitle").html("历史记录<span onclick='hideHis()' style='display: inline-block;font-weight: bold;float: right;margin-right: 10px;cursor: pointer;'>×</span>");
        });
        $.ajax({
            type: 'GET',
            url: path + "/defect/getEquMap",
            data: {type: 2},
            success: function (data) {
                $("#equipment").empty();
                $("#addEquipment").empty();
                var option = "<option value='-1' >请选择设备</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#equipment').html(option);
                $('#addEquipment').html(option);
                form.render();//菜单渲染 把内容加载进去
                form.render('select');
            }
        });
        form.on('select(equipment)', function (data) {
            $("#equipmentHidden").val(data.value);
            showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
        });
        form.on('select(addEquipment)', function (data) {
            $("#addEquipmentHidden").val(data.value);
            addEquipmentName = data.elem[data.elem.selectedIndex].text;
            var sysId = Number($("#addSystemHidden").val());
            var euqipmentId = Number($("#addEquipmentHidden").val());
            getHis(sysId, euqipmentId);
            $(".addHistoryTitle").html("历史记录<span onclick='hideHis()' style='display: inline-block;font-weight: bold;float: right;margin-right: 10px;cursor: pointer;'>×</span>");
        });
        form.on('select(level)', function (data) {
            $("#levelHidden").val(data.value);
        })
        form.on('select(maintenanceCategory)', function (data) {
            $("#maintenanceCategoryHidden").val(data.value);
            maintenanceCategoryName = data.elem[data.elem.selectedIndex].text;
        });
        $.ajax({
            type: 'GET',
            url: path + "/defect/getDepMap",
            success: function (data) {
                $("#department").empty();
                var option = "<option value='-1' >请选择部门</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#department').html(option);
                form.render();//菜单渲染 把内容加载进去
                form.render('select');
            }
        });
        form.on('select(department)', function (data) {
            $("#departmentHidden").val(data.value);
            showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
        });
        form.on('select(claimInfoBelay1)', function (data) {
            $("#claimInfoBelayHidden1").val(data.value);
        });
        form.on('select(claimInfoBelay2)', function (data) {
            $("#claimInfoBelayHidden2").val(data.value);
        });
        //计划时长
        form.on('select(plannedWork)', function (data) {
            $("#claimInfoPlannedWork").val(data.value);
        });
    });
}

//隐藏历史记录
function hideHis() {
    $(".addHistory").css("display", "none");
}

//历史记录查看
function getHis(sysId, euqipmentId) {
    var ul = $(".addHistoryUl");
    var w = window.innerWidth;
    if (w < 1000) {
        $("#addDefectDiv table").css("margin-left", "10px");
        var width = ((w - 450 - 15) - 10) + "px";
    } else {
        $("#addDefectDiv table").css("margin-left", "10px");
        var width = ((w - 560) - 20) + "px";
    }
    $(".addHistory").css("display", "block");
    $(".addHistory").css("width", width);
    $(".addHistory").css("height", "98%");
    $.ajax({
        type: 'GET',
        url: path + "/defect/getDefectHistiryByEqu",
        data: {sysId: sysId, euqipmentId: euqipmentId},
        success: function (json) {
            ul.html("");
            var li = "";
            var detailed = '"detailed"';//刚给路径加上双引号，存放到点击事件里
            for (var i = 0; i < json.length; i++) {
                if (json[i].type == 1) {
                    json[i].type = "未认领";
                    li += "<li style='color: red;cursor: pointer;' onclick='getDetailedInfo(" + json[i].id + ")'><span>" + json[i].created + "</span>   <span>" + json[i].type + "</span>   <span style='margin-left: 20px;'>" + json[i].abs + "</span></listy>";
                } else if (json[i].type == 2) {
                    json[i].type = "消缺中";
                    li += "<li style='color: #ff8100;cursor: pointer;' onclick='getDetailedInfo(" + json[i].id + ")'><span>" + json[i].created + "</span>   <span>" + json[i].type + "</span>   <span style='margin-left: 20px;'>" + json[i].abs + "</span></listy>";
                } else if (json[i].type == 3) {
                    json[i].type = "已消缺";
                    li += "<li style='color: #8fc323;cursor: pointer;' onclick='getDetailedInfo(" + json[i].id + ")'><<span>" + json[i].created + "</span>   <span>" + json[i].type + "</span>   <span style='margin-left: 20px;'>" + json[i].abs + "</span></listy>";
                } else if (json[i].type == 4) {
                    json[i].type = "已完成";
                    li += "<li style='color: green;cursor: pointer;' onclick='getDetailedInfo(" + json[i].id + ")'><span>" + json[i].created + "</span>   <span>" + json[i].type + "</span>   <span style='margin-left: 20px;'>" + json[i].abs + "</span></listy>";
                } else if (json[i].type == 5) {
                    json[i].type = "已认领";
                    li += "<li style='color: #dcb422;cursor: pointer;' onclick='getDetailedInfo(" + json[i].id + ")'><span>" + json[i].created + "</span>   <span>" + json[i].type + "</span>   <span style='margin-left: 20px;'>" + json[i].abs + "</span></listy>";
                }
            }
            ul.html(li)
        }
    });
}

//显示日期
function showTime() {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //点我触发
        /* laydate.render({
             elem: '#test1'
             , trigger: 'click'
             ,done: function(value){
             }
         });
         laydate.render({
             elem: '#test2'
             , type: 'time'
             , trigger: 'click'
             ,done: function(value){
             }
         });*/
        laydate.render({
            elem: '#test3'
            , trigger: 'click'
            , done: function (value) {
            }
        });
        laydate.render({
            elem: '#test4'
            , type: 'time'
            , format: 'HH'
            , trigger: 'click'
            , done: function (value) {
            }
        });
        laydate.render({
            elem: '#test5'
            , trigger: 'click'
            , done: function (value) {
            }
        });
        laydate.render({
            elem: '#test6'
            , type: 'time'
            , format: 'HH'
            , trigger: 'click'
            , done: function (value) {
            }
        });
    });
}

//点击按钮
function getChecked(type) {
    if (type == '0') { //全部缺陷
        showTable('0', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    } else if (type == '1') { //未认领
        showTable('1', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    } else if (type == '2') { //消缺中
        showTable('2', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    } else if (type == '3') { //已消缺
        showTable('3', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    } else if (type == '4') { //已完成
        showTable('4', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    } else if (type == '5') { //已认领
        showTable('5', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    } else if (type == '6') { //延期中
        showTable('6', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
    }
}

//显示表格
function showTable(type, sysId, equipmentId, departmentId) {
    var win = $(window).height();
    var height = win - 160;
    layui.use(['table', 'form'], function () {
        var table = layui.table;
        var form = layui.form;
        table.render({
            elem: '#demo'
            ,height: height
            , toolbar: true
            ,url: path + '/defect/getDefectList?type=' + type + '&sysId=' + sysId + '&equipmentId=' + equipmentId + '&departmentId=' + departmentId//数据接口
            ,id: 'demoInfo'
            ,cols: [[ //表头
                {field: 'number',title: '缺陷号',toolbar: '#tbNumberBar',align: 'center',sort: true,event: 'detailed',style: 'cursor: pointer;',width: 85}
                , {field: 'sourceType', title: '来源', width: 70, toolbar: '#tbSourceTypeBar'}
                , {field: 'type', title: '状态', toolbar: '#tbTypeBar', align: 'center', width: 100, sort: true}
                , {field: 'abs', title: '缺陷描述'}
                , {field: 'empIdsName', title: '消缺人', width: 150}
                , {
                    field: 'totalTime', title: '总倒计时', sort: true, align: 'center', hide:true,
                    templet: function (a) {
                        if(a.type==4){
                            return "已完成"
                        }
                        if(a.timeoutType!=null&&a.timeoutType!=""&&a.timeoutType.indexOf("Z")!=-1){
                            return "Z:缺陷处理超时";
                        }
                        if(a.type==6){
                            return "已延期"
                        }
                        var tmiao = a.plannedHours
                        // 根据后端返回的时间在延长 周期时间,计算出还剩下多少秒
                        var t = parseInt((new Date(a.created).getTime() + tmiao * 60 * 60 * 1000) / 1000) - Math.floor(new Date().getTime() / 1000);
                        // 设置每一条数据唯一的key
                        var key = 'key_' + a.id;

                        var day1 = parseInt(t / (60 * 60 * 24));//天
                        var shi1 = parseInt(t / (60 * 60) % 24);//小时
                        var fen1 = parseInt((t / 60) % 60);//分钟
                        var miao1 = parseInt(t % 60);//秒

                        var time1 = day1 + "天" + shi1 + "时" + fen1 + "分" + miao1 + "秒";

                        // 这里初始值计算显示的倒计时只是为了 如页面有刷新操作，只是把这个初始值也显示为倒计时
                        var html = `<label id=${key} >${time1}</label>`;
                        if (t <= 0) {
                            $('#' + key).html("<label >缺陷处理超时</label>");
                            updateDefectTimeoutType(a.id,"Z");
                            delTask(key);
                        } else {
                            $('#' + key).text(html);
                        }

                        addTask(key, function () {
                            var nowHour=new Date().getHours();

                            if(nowHour>=9 &&nowHour<17){
                                t--;
                            }

                            var day = parseInt(t / (60 * 60 * 24));//天
                            var shi = parseInt(t / (60 * 60) % 24);//小时
                            var fen = parseInt((t / 60) % 60);//分钟
                            var miao = parseInt(t % 60);//秒
                            if (t <= 0) {
                                $('#' + key).html("<label >缺陷处理超时</label>");
                                updateDefectTimeoutType(a.id,"Z");
                                delTask(key);
                            } else {
                                $('#' + key).text(day + "天" + shi + "时" + fen + "分" + miao + "秒");
                            }

                        });
                        return html;
                    }

                }
                , {
                    field: 'partTime', title: '分倒计时', sort: true, align: 'center',hide:true,
                    templet: function (a) {
                        if(a.type==4){
                            return "已完成"
                        }
                        if(a.type==6){
                            return "已延期"
                        }
                        var tmiao = 0;
                        var timeoutType = "";
                        var timeoutTypeName = "";
                        var startTime = "";
                        if (a.type == "1") {
                            tmiao = 2;
                            timeoutType = "A"
                            timeoutTypeName = "认领超时";
                            startTime = a.created;
                        } else if (a.type == "5") {//开始执行
                            tmiao = 4;
                            timeoutType = "B";
                            timeoutTypeName = "开工超时";
                            startTime = a.orderReceivingTime;
                        }  else if (a.type == "2") {//验收超时
                            tmiao = 4;
                            timeoutType = "C";
                            timeoutTypeName = "反馈超时";
                            startTime = a.realSTime;
                        } else if (a.type == "7") {//验收超时
                            tmiao = 4;
                            timeoutType = "D";
                            timeoutTypeName = "验收超时";
                            startTime = a.realETime;
                        } else if (a.type == "3") {//结束超时
                            tmiao = 2;
                            timeoutType = "E";
                            timeoutTypeName = "结束超时";
                            startTime = a.workTimeConfirmTime;
                        }
                        if(a.timeoutType!=null&&a.timeoutType!=""&&a.timeoutType.indexOf(timeoutType)!=-1){
                            return timeoutTypeName;
                        }

                        // 根据后端返回的时间在延长 周期时间,计算出还剩下多少秒
                        if (startTime == undefined || startTime == "") {
                            return "<label>未记录时间"+timeoutType+"</label>"
                        }
                        var t = parseInt((new Date(startTime).getTime() + tmiao * 60 * 60 * 1000) / 1000) - Math.floor(new Date().getTime() / 1000);
                        // 设置每一条数据唯一的key
                        var key = 'key_part_' + a.id;

                        var day1 = parseInt(t / (60 * 60 * 24));//天
                        var shi1 = parseInt(t / (60 * 60) % 24);//小时
                        var fen1 = parseInt((t / 60) % 60);//分钟
                        var miao1 = parseInt(t % 60);//秒

                        var time1 = day1 + "d" + shi1 + "h" + fen1 + "m" + miao1 + "s";
                        var html ="";
                        if (t <= 0) {
                            time1 = timeoutType + ":" + timeoutTypeName
                            html = `<label id=${key} >${time1}</label>`;
                            updateDefectTimeoutType(a.id,timeoutType);
                            delTask(key);
                        } else {
                            time1 = day1 + "天" + shi1 + "时" + fen1 + "分" + miao1 + "秒";
                            html = `<label id=${key}>${time1}</label>`;
                        }
                        console.log(time1);
                        addTask(key, function () {
                            var nowHour=new Date().getHours();

                            if(nowHour>=9 &&nowHour<17){
                                t--;
                            }
                            var day = parseInt(t / (60 * 60 * 24));//天
                            var shi = parseInt(t / (60 * 60) % 24);//小时
                            var fen = parseInt((t / 60) % 60);//分钟
                            var miao = parseInt(t % 60);//秒

                            if (t <= 0) {
                                $('#' + key).html("<label >" + timeoutType + ":" + timeoutTypeName + "</label>");
                                updateDefectTimeoutType(a.id,timeoutType);
                                delTask(key);
                            } else {
                                $('#' + key).text(day + "天" + shi + "时" + fen + "分" + miao + "秒");
                            }

                        });
                        return html;
                    }

                }
                , {fixed: 'right', title: '状态', toolbar: '#tbStatusBar', align: 'center', width: 180}

                , {field: 'created', title: '申请时间', align: 'center', minWidth: 120, sort: true}
                , {fixed: 'right', title: '操作', toolbar: '#tbOperationBar', align: 'center', width: 200}
            ]]
            ,
            parseData: function (res) {
                if (res.msg == "NoUser") {
                    layer.alert("当前用户过期");
                }
            }
            ,
            done: function (res, curr, count) {
            }
        });
        table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var jStr = JSON.stringify(data);
            if (obj.event === 'beOnDuty') {// 值班确认
                if (data.type != "3") {
                    layer.alert("请先完成任务！");
                    return;
                }
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定', '取消']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px 10px 50px 17px; box-sizing: border-box; line-height: 22px; background-color: #95b3ca; color: #000; font-weight: 500;font-size: 18px;">确认已完成本次消缺吗？</div>'
                    ,success: function (layero) {
                        var btn = layero.find('.layui-layer-btn');
                        btn.find('.layui-layer-btn0').click(function () {
                            $.ajax({
                                "type": 'put',
                                "url": path + "/defect/dutyConfirmation",
                                data: {id: data.id, result:1},
                                dataType: "json",
                                "success": function (data) {
                                    ajaxFun(data, "值班确认成功!");
                                }
                            });
                        });
                        btn.find('.layui-layer-btn1').click(function () {
                            $.ajax({
                                "type": 'put',
                                "url": path + "/defect/dutyConfirmation",
                                data: {id: data.id, result: 2},
                                dataType: "json",
                                "success": function (data) {
                                    ajaxFun(data, "值班确认已驳回!");
                                }
                            });
                        });
                    }
                });
            } else if (obj.event === 'claim') { //认领
                $(".loading").css("display", "block");
                getDetailedInfo(data.id, 'claim');
            } else if (obj.event === 'handle') { //消缺反馈
                $(".loading").css("display", "block");
                getDetailedInfo(data.id, 'handle');
            } else if (obj.event === 'detailed') { //缺陷详情
                getDetailedInfo(data.id, 'detailed');
            } else if (obj.event === 'implement') { //开始执行
                $(".loading").css("display", "block");
                getDetailedInfo(data.id, 'implement');
            } else if (obj.event === 'del') { //删除
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定', '取消']
                    ,btnAlign: 'c'
                    , moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px 10px 50px 17px; box-sizing: border-box; line-height: 22px; background-color: #a1aec7; color: #000; font-weight: 500;font-size: 18px;">确认删除本次消缺吗？</div>'
                    ,success: function (layero) {
                        var btn = layero.find('.layui-layer-btn');
                        btn.find('.layui-layer-btn0').click(function () {
                            $.ajax({
                                type: 'GET',
                                url: path + "/defect/delete?id=" + data.id,
                                success: function (data) {
                                    layer.alert("删除成功！");
                                    showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
                                }
                            })
                        });
                    }
                });
            } else if (obj.event === 'workHours') { //工时确认
                $(".loading").css("display", "block");
                getDetailedInfo(data.id, 'workHours');
            }else if (obj.event === "updateStartedOrDelay") {//开启暂停
                $("#statusBtn"+data.id).text("开启")
            } else if (obj.event === "delay") { //延期

            }

        });
    });
}

// 定时计时任务，这里是1秒执行一次
setInterval(function () {
    for (var key in tasks) {
        tasks[key]();
    }
}, 1000)

// 添加定时任务
function addTask(key, value) {
    if (typeof value === "function") {
        tasks[key] = value;
    }
}

// 删除定时任务
function delTask(task) {
    delete tasks[task];
}

//显示新增页面
function addDefect() {
    $(".addHistory").css("display", "none");
    $.ajax({
        "type": 'post',
        "url": path + "/defect/getPermission",
        dataType: "json",
        data: {permissionName: "缺陷运行岗位"},
        "success": function (data) {
            if (data == "false") {
                layer.alert("无添加权限！");
                return;
            } else {
                layui.use('layer', function () { //独立版的layer无需执行这一句
                    var $ = layui.jquery, layer = layui.layer, form = layui.form; //独立版的layer无需执行这一句
                    layer.open({
                        type: 1
                        , id: 'addDefectDiv' //防止重复弹出
                        , content: $(".addDefectDiv")
                        , btnAlign: 'c' //按钮居中
                        , shade: 0.4 //不显示遮罩
                        , area: ['100%', '100%']
                        , yes: function () {
                        }
                    });
                    $('#levelHidden').val(0);
                    $('#level').val(0);
                    $('#maintenanceCategoryHidden').val(1);
                    $('#maintenanceCategory').val(1);
                    $('#addAbs').val("");
                    $('#addSystemHidden').val('-1');
                    $('#addSystem').val('-1');
                    $('#addEquipment').val('-1');
                    $('#addEquipmentHidden').val('-1');
                    form.render();//菜单渲染 把内容加载进去
                    form.render('select');
                });
                var myDate = new Date();
                var year = myDate.getFullYear();
                var month = myDate.getMonth() + 1;
                var date = myDate.getDate();
                if (month < 10) {
                    month = "0" + month;
                }
                if (date < 10) {
                    date = "0" + date;
                }
                $("#createTime").html(year + "-" + month + "-" + date);
                $("#img-change1").attr("src", "");
                $("#img-change1").css("display", "none");
            }
        }
    });
}

//确定添加
function insert() {
    $.ajaxFileUpload({
        url: path + '/defect/imgUpload',
        fileElementId: 'file',
        dataType: 'json',
        secureuri: false,
        success: function (Json) {
            var defect = {};
            defect.level = Number($('#levelHidden').val());//重大级别
            defect.maintenanceCategory = Number($('#maintenanceCategoryHidden').val());//检修类别
            defect.equipmentId = Number($('#addEquipmentHidden').val());//设备id
            defect.sysId = Number($('#addSystemHidden').val());//系统id
            defect.abs = $('#addAbs').val();//缺陷描述
            defect.bPlc = Json.message;//图片
            defect.createBy = Number($('#addUserId').val());//申请人员ID
            defect.sourceType = 1;//来源类型  1：defect   2:guide
            if (defect.sysId == -1) {
                layer.alert("请选择系统!");
                return;
            }
            if (defect.equipmentId == -1) {
                layer.alert("请选择设备!");
                return;
            }
            if (!defect.abs) {
                layer.alert("缺陷描述不可以为空!");
                return;
            }
            if ($("#img-change1").attr("src") == "") {
                defect.bPlc = null;
            }
            $(".loading").css("display", 'block');
            $.ajax({
                "type": 'post',
                "url": path + "/defect/addDefect",
                data: JSON.stringify(defect),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                "success": function (data) {
                    ajaxFun(data, "缺陷添加成功!", '新增');
                }
            });

        }
    });
}

//上传图片
function fileChange(event, id, num) {
    var files = event.target.files, file;
    if (files && files.length > 0) {
        // 获取目前上传的文件
        file = files[0];// 文件大小校验的动作
        if (file.size > 1024 * 1024 * 2) {
            files = null;
            $("#" + id).val("");
            layer.alert("图片大小不能超过 2MB!!");
            return false;
        }
        // 获取 window 的 URL 工具
        var URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        var imgURL = URL.createObjectURL(file);
        //用attr将img的src属性改成获得的url
        if (num == "one") {
            $("#img-change1").attr("src", imgURL);
            $("#img-change1").css("display", "block");
        } else if (num == "two") {
            $("#img-change2").attr("src", imgURL);
            $("#img-change2").css("display", "block");
        }
        // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
        // URL.revokeObjectURL(imgURL);
    }
};

//删除图片
function reduceImg(id) {
    var id = $("#" + id);
    var img = id.prev();
    img.attr("src", "");
    img.css("display", "none");
}

//根据id查询缺陷详单
function getDetailedInfo(id, type) {
    $.ajax({
        type: 'GET',
        url: path + "/defect/getDefectById",
        data: {id: id},
        success: function (data) {
            $(".loading").css("display", "none");
            layui.use('layer', function () { //独立版的layer无需执行这一句
                var $ = layui.jquery, layer = layui.layer, form = layui.form; //独立版的layer无需执行这一句
                if (type == "detailed") {
                    layer.open({
                        type: 2,
                        title: ["缺陷详情页面", 'font-size:20px;font-weight:bold;text-align:center;'],
                        area: ['100%', '100%'],
                        fixed: false, //不固定
                        maxmin: true,
                        content: '../defect/toDefectDetailed?id=' + data.id
                    });
                } else if (type == "implement") { //开始执行
                    if (data.type == '1') {
                        layer.alert("请先认领！");
                        return;
                    }
                    $("#claimBelayBtn2").css("display", "revert");
                    $("#implementId").val(data.id);//id
                    $("#implementType").val(data.type);//type
                    $("#implementLevel").text(data.level + "类");//级别
                    if (data.maintenanceCategory == 1) {//类别
                        $("#implementDepartment").text("机务");
                    } else {
                        $("#implementDepartment").text("电仪");
                    }
                    $("#implementSys").text(data.sysName);//系统
                    $("#implementEquipment").text(data.equipmentName);//设备
                    $("#implementAbs").text(data.abs);//缺陷描述
                    $("#implementImg").attr("src", "data:img/jpeg;base64," + data.bPlc64);//消缺前图片
                    $("#implementImg").css("display", "block");
                    if (data.bPlc64 == "") {
                        $("#implementImg").attr("src", "../img/noImg.png");
                    }
                    if (data.bPlc64 == null) {
                        $("#implementImg").css("display", "none");
                    }
                    layer.open({
                        type: 1
                        , id: 'implementInfoDiv' //防止重复弹出
                        , content: $(".implementInfoDiv")
                        , btnAlign: 'c' //按钮居中
                        , shade: 0.4 //不显示遮罩
                        , area: ['100%', '100%']
                        , yes: function () {
                        }
                    });
                    $("#startFeedbackBtn").css("display", "revert");
                    $("#startFeedbackBtn").text("开始执行");
                    $(".claimInfoBelayTr2").css("display", "none");
                    $("#test5").val("");
                    $("#test6").val("");
                    $("#claimInfoBelay2").val("0");
                    $("#claimInfoBelayHidden2").val("0");
                    form.render(); //更新全部
                    $(".loading").css("display", "none");
                    $("#startFeedbackBtn").css("display", "revert");
                    $(".claimInfoBelayTr2").css("display","none");
                } else if (type == "handle") { //消缺反馈
                    $("#feedbackId").val(data.id);//id
                    $("#feedbackType").val(data.type);//type
                    $("#feedbackLevel").val(data.level + "类");//级别
                    if (data.maintenanceCategory == 1) {//类别
                        $("#feedbackDepartment").val("机务");
                    } else {
                        $("#feedbackDepartment").val("电仪");
                    }
                    $("#feedbackTime").text(data.year);//创建时间
                    $("#feedbackRealSTime").text(data.realSTime);//开始执行时间
                    $("#feedbackPlanedTime").val(data.planedTime);//计划完成时间
                    $("#feedbackPlannedWork").val(data.plannedWork);//计划工时
                    $("#feedbackSys").val(data.sysName);//系统
                    $("#feedbackEquipment").val(data.equipmentName);//设备
                    $("#feedbackAbs").val(data.abs);//缺陷描述
                    $("#feedbackRealSTime").val(data.realSTime);//实际开始时间
                    $("#feedbackMethod").val(data.method);//处理措施
                    $("#feedbackProblem").val(data.problem);//遗留问题
                    $("#feedbackRemark").val(data.remark);//备注
                    $("#feedbackEmpIdsName").val(data.empIdsName);//执行人
                    $("#feedbackImg").attr("src", "data:img/jpeg;base64," + data.bPlc64);//消缺前图片
                    $("#feedbackImg").css("display", "block");
                    if (data.bPlc64 == "") {
                        $("#feedbackImg").attr("src", "../img/noImg.png");
                    }
                    if (data.bPlc64 == null) {
                        $("#feedbackImg").css("display", "none");
                    }
                    if (data.realSTime == null || data.realSTime == "") {
                        $("#startFeedbackBtn").css("display", "revert");
                        $("#feedbackAbs").attr({"disabled": "disabled"});
                        $("#feedbackMethod").attr({"disabled": "disabled"});
                        $("#feedbackProblem").attr({"disabled": "disabled"});
                        $("#feedbackRemark").attr({"disabled": "disabled"});
                    } else {
                        $("#startFeedbackBtn").css("display", "none");
                        $("#feedbackAbs").removeAttr("disabled");
                        $("#feedbackMethod").removeAttr("disabled");
                        $("#feedbackProblem").removeAttr("disabled");
                        $("#feedbackRemark").removeAttr("disabled");
                    }
                    /*if (data.realETime == null || data.realETime == "") {
                        $("#insertFeedbackBtn").css("display", "revert");
                    } else {
                        $("#insertFeedbackBtn").css("display", "none");
                    }*/
                    if ($("#feedbackRealSTime").val() == null || $("#feedbackRealSTime").val() == "") {
                        layer.alert("请点击开始执行");
                        return;
                    }
                    layer.open({
                        type: 1
                        , id: 'handleInfoDiv' //防止重复弹出
                        , content: $(".handleInfoDiv")
                        , btnAlign: 'c' //按钮居中
                        , shade: 0.4 //不显示遮罩
                        , area: ['100%', '100%']
                        , yes: function () {
                        }
                    });
                } else if (type == "claim") { //认领
                    $("#test3").val("");
                    $("#test4").val("");
                    $("#claimInfoBelay1").val("0");
                    $("#claimInfoBelayHidden1").val("");
                    $(".claimInfoBelayTr1").css("display", "none");
                    form.render(); //更新全部
                    $.ajax({
                        "type": 'post',
                        "url": path + "/defect/claim",
                        dataType: "json",
                        data: {},
                        "success": function (jsr) {
                            if (jsr == "NOPERMISSION") {
                                layer.alert("无权限！");
                                return;
                            } else {
                                $("#claimInfoDescribeId").val("");
                                $("#claimInfoPlannedWork").val('0.5');
                                $("#plannedWork").val('0.5');
                                form.render('select');
                                form.render();
                                layui.use(['jquery', 'formSelects'], function () {
                                    var formSelects = layui.formSelects;
                                    formSelects.config('tags', {
                                        keyName: 'text',
                                        keyVal: 'id',
                                    }).data('tags', 'server', {
                                        url: path + '/defect/getEmpMap'
                                    });
                                });
                                $("#claimId").val(data.id);//编号
                                if (data.maintenanceCategory == "1") {
                                    data.maintenanceCategory = "机务";
                                } else {
                                    data.maintenanceCategory = "电仪";
                                }
                                $("#claimMaintenanceCategory").val(data.maintenanceCategory);//编号
                                $("#claimInfoId").text(data.number);//编号
                                $("#claimInfoSys").text(data.sysName);//系统
                                $("#claimInfoLevel").text(data.level + "类");//级别
                                $("#claimantName").text($("#feedbackCompleterName").text());//认领人
                                $("#claimInfoCreateName").text(data.createdByName);//创建人
                                $("#claimInfoCreateTime").text(data.created);//创建时间
                                $("#claimInfoAbs").val(data.abs);//缺陷描述
                                $("#claimInfoImg").css("display", "block");
                                $("#claimInfoImg").attr("src", "data:img/jpeg;base64," + data.bPlc64);//消缺前图片
                                if (data.bPlc64 == "") {
                                    $("#claimInfoImg").attr("src", "../img/noImg.png");
                                    $("#claimInfoImg").css("display", "block");
                                }
                                if (data.bPlc64 == null) {
                                    $("#claimInfoImg").css("display", "none");
                                }
                                layer.open({
                                    type: 1
                                    , id: 'claimInfoDiv' //防止重复弹出
                                    , content: $(".claimInfoDiv")
                                    , btnAlign: 'c' //按钮居中
                                    , shade: 0.4 //不显示遮罩
                                    , area: ['100%', '100%']
                                    , yes: function () {
                                    }
                                });
                            }
                        }
                    });
                    $(".loading").css("display", "none");
                } else if (type == "workHours") {
                    $("#workHoursId").val(id);
                    $("#workHoursSys").text(data.sysName);
                    $("#workHoursEquipment").text(data.equipmentName);
                    $("#workHoursAbs").val(data.abs);
                    $("#workHoursRealSTime").text(data.realSTime);
                    $("#workHoursRealETime").text(data.realETime);
                    $("#workHoursPlannedWork").text(data.plannedWork);
                    $("#workHoursRealExecuteTime").val(data.realExecuteTime);
                    $("#workHoursOvertime").val(data.overtime);
                    layer.open({
                        type: 1
                        , id: 'workHoursDiv' //防止重复弹出
                        , content: $(".workHoursDiv")
                        , btnAlign: 'c' //按钮居中
                        , shade: 0.4 //不显示遮罩
                        , area: ['100%', '100%']
                        , yes: function () {
                        }
                    });
                    $(".loading").css("display", "none");
                }
            })
        }
    })
}

//认领下拉多选框
function showFormSelects() {
    layui.use(['jquery', 'formSelects'], function () {
        var formSelects = layui.formSelects;
        formSelects.config('tags', {
            keyName: 'text',
            keyVal: 'id',
        }).data('tags', 'server', {
            url: path + '/defect/getEmpMap'
        });
        formSelects.closed('tags', function (id) {
            $("#claimInfoDescribeId").val(layui.formSelects.value('tags', 'val'));
        });
    });
}

//认领缺陷
function claimOk() {
    var type = "";
    var empIds = $("#claimInfoDescribeId").val();
    var id = $("#claimId").val();
    // var planedTime = $("#test1").val()+" "+$("#test2").val();
    var claimInfoBelayTime = $("#test3").val() + " " + $("#test4").val();
    var claimInfoBelay = Number($("#claimInfoBelayHidden1").val());
    var plannedWork = parseFloat($("#claimInfoPlannedWork").val())
    if (claimInfoBelay == 0 && claimInfoBelayTime.trim() == "") {
        /*if (empIds == "" || empIds == null || $("#test1").val() == "" || $("#test2").val() == ""){
            layer.alert("请选择执行人或时间");
            return;
        }*/
        if (empIds == "" || empIds == null) {
            layer.alert("请选择执行人");
            return;
        }
        type = "2";
    } else {
        if (claimInfoBelay == 0 || claimInfoBelayTime.trim() == "") {
            layer.alert("请选择延期时间和原由");
            return;
        }
        empIds = "";
        // planedTime = "";
        type = "6";
    }
    var data = {
        empIds: empIds,
        id: id,
        plannedWork: plannedWork,
        delayETime: claimInfoBelayTime,
        delayReason: claimInfoBelay,
        type: type
    }
    $.ajax({
        "type": 'post',
        "url": path + "/defect/claim",
        dataType: "json",
        // data: {empIds:empIds,id:id,planedTime:planedTime,delayETime:claimInfoBelayTime,delayReason:claimInfoBelay,type: type},
        data: {
            empIds: empIds,
            id: id,
            plannedWork: plannedWork,
            delayETime: claimInfoBelayTime,
            delayReason: claimInfoBelay,
            type: type
        },
        "success": function (data) {
            ajaxFun(data, "缺陷认领成功!", '认领');
        }
    });
}

//开始执行
function startFeedback() {
    $("#startFeedbackBtn").css("display", "revert");
    var id = Number($("#implementId").val());
    var claimInfoBelayTime = $("#test5").val() + " " + $("#test6").val();
    var claimInfoBelay = Number($("#claimInfoBelayHidden2").val());
    var type = "";

    if (claimInfoBelayTime.trim() == "" && claimInfoBelay == 0) {
        type = "5";
    } else {
        if (claimInfoBelay == 0 || claimInfoBelayTime.trim() == "") {
            layer.alert("请选择延期时间和原由");
            return;
        }
        type = "6";
    }
    $.ajax({
        "type": 'put',
        "url": path + "/defect/startExecution",
        data: {id: id, type: type, delayETime: claimInfoBelayTime, delayReason: claimInfoBelay},
        dataType: "json",
        "success": function (data) {
            if (data.msg == "success") {
                var content = $("#implementSys").text() + " " + $("#implementEquipment").text() + " " + $("#implementLevel").text();
                operationSend('开始消缺', content, "");
                layer.alert("已开始");
                layer.closeAll();
                showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
                $("#startFeedbackBtn").css("display", "none");
                $("#feedbackAbs").removeAttr("disabled");
                $("#feedbackMethod").removeAttr("disabled");
                $("#feedbackProblem").removeAttr("disabled");
                $("#feedbackRemark").removeAttr("disabled");
            } else if (data.msg == "noUser") {
                layer.alert("用户信息消失，请重新登录！")
            } else if (data.msg == "noPermission") {
                layer.alert("无权限!");
            } else if (data.msg == "error") {
                layer.alert("执行操作失败！")
            }
        }
    });
}

//延期
function claimBelay1() {
    $(".claimInfoBelayTr1").css("display", "revert");
    var id = $("#claimId").val();
    $("#claimBelayBtn1").css("display", "none");
    $("#claimOkBtn").text("确定延期");

}

function claimBelay2() {
    $(".claimInfoBelayTr2").css("display", "revert");
    var id = $("#claimId").val();
    $("#claimBelayBtn2").css("display", "none");
    $("#startFeedbackBtn").text("确定延期");

}

//处理反馈
function insertFeedback() {
    $.ajaxFileUpload({
        url: path + '/defect/imgUpload',
        fileElementId: 'file2',
        dataType: 'json',
        secureuri: false,
        success: function (Json) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var defect = {};
            defect.type = Number($('#feedbackType').val());
            if (defect.type == 4) {
                layer.alert("缺陷已完成不可更改反馈单!");
                return;
            }
            defect.id = Number($('#feedbackId').val());
            defect.abs = $('#feedbackAbs').val();
            if (!defect.abs) {
                layer.alert("缺陷描述不可为空!");
                return;
            }
            defect.method = $('#feedbackMethod').val();
            if (!defect.method) {
                layer.alert("处理措施不可为空!");
                return;
            }
            defect.problem = $('#feedbackProblem').val();
            defect.remark = $('#feedbackRemark').val();
            defect.completer = Number($('#feedbackCompleterId').val());
            defect.aPlc = Json.message;//图片
            defect.realSTime = $("#feedbackRealSTime").val();
            // defect.planedTime = $("#feedbackPlanedTime").val();
            defect.plannedWork = $("#feedbackPlannedWork").val();
            if ($("#img-change2").attr("src") == "") {
                defect.aPlc = null;
            }
            $.ajax({
                "type": 'put',
                "url": path + "/defect/updDefect",
                data: JSON.stringify(defect),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                "success": function (data) {
                    ajaxFun(data, "处理反馈单完成!", '完成');
                }
            });
        }
    });
}

//工时确认
function workHoursOk() {
    var id = Number($("#workHoursId").val());
    var realExecuteTime = parseFloat($("#workHoursRealExecuteTime").val());
    var overtime = parseFloat($("#workHoursOvertime").val());
    $.ajax({
        "type": 'post',
        "url": path + "/defect/postWorkTimeConfirm",
        data: {id: id, confirmResult: 0,realExecuteTime:realExecuteTime,overtime:overtime},
        dataType: "json",
        "success": function (data) {
            layer.closeAll();
            layer.alert("确认" + data.msg);
            showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
        }
    });
}

//工时驳回
function workHoursNo() {
    var id = Number($("#workHoursId").val());
    $.ajax({
        "type": 'post',
        "url": path + "/defect/postWorkTimeConfirm",
        data: {id: id, confirmResult: 1},
        dataType: "json",
        "success": function (data) {
            layer.closeAll();
            layer.alert("驳回" + data.msg);
            showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
        }
    });
}

//动态区域
function operationSend(verb, content, remark) {
    $.ajax({
        "type": 'post',
        "url": path + "/operation/send",
        data: {verb: verb, content: content, type: 'defect', remark: remark, url: "/defect/defect/toDefect"},
        dataType: "json",
        "success": function (data) {
        }
    });
}

//执行函数
function ajaxFun(data, tips, operation) {
    var content = "";
    if (data == "SUCCESS") {
        if (operation == "新增") {
            $(".loading").css("display",'none');
            if (maintenanceCategoryName == "") {
                maintenanceCategoryName = "机务";
            }
            content = addSystemName + " " + addEquipmentName + " " + $('#levelHidden').val() + "类" + " " + maintenanceCategoryName;
            operationSend('新增缺陷', content, "");
        } else if (operation == "认领") {
            content = $("#claimantName").text() + "" + $("#claimInfoSys").text() + " " + $("#claimInfoLevel").text() + " " + $("#claimMaintenanceCategory").val();
            operationSend('认领缺陷', content, "认领人:" + $("#claimantName").text());
        } else if (operation == "完成") {
            content = $("#feedbackSys").val() + " " + $("#feedbackEquipment").val() + " " + $("#feedbackLevel").val() + " " + $("#feedbackDepartment").val();
            operationSend('完成消缺', content, "");
        }
        layer.alert(tips);
        showTable('', $("#systemHidden").val(), $("#equipmentHidden").val(), $("#departmentHidden").val());
        layer.closeAll();
        return true;
    } else if (data == "NOUSER") {
        layer.alert("用户验证信息过期!");
    } else if (data == "REJECT") {
        layer.alert("记录已经被修改!");
    } else if (data == "FORMAT") {
        layer.alert("格式错误!");
    } else if (data == "HAVE") {
        layer.alert("存在同名!");
    } else if (data == "NOPERMISSION") {
        layer.alert("无权限!");
    } else if (data == "NoDepNumber") {
        layer.alert("部门无编号!");
    } else {
        layer.alert("后台错误!");
    }
}

//取消
function cancel() {
    layer.closeAll();
}

function cancel1() {
    layer.close(index)
}

function  updateDefectTimeoutType(id,timeoutType){
    $.ajax({
        url:path+"/defect/updateTimeoutType",
        method:"get",
        data:{
            id:id,
            type:timeoutType
        },
        success:function(res){
            console.log(res)
        }
    });
}