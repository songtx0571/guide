var departmentName = "";//部门
var addEquipment = "";//系统设备
var workPerators;//任务分类
var index = 0;//正在显示的系统设备的索引
$(function () {
    showDepartment();
    //加载用户数据/任务数据
    showInit("");
    //新增缺陷的添加图片按钮
    $('#addImg1').click(function () {
        $('#file').click();
    });
});

// 显示部门
function showDepartment() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: "/guide/staff/getDepMap",
            dataType: "json",
            success: function (data) {
                if (data.code == 0 || data.code == 200) {
                    data = data.data;
                    $("#departmentList").empty();
                    var option = "<option value='' >请选择部门名称</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>";
                    }

                    $('#departmentList').append(option);
                    form.render();//菜单渲染 把内容加载进去
                } else {
                    layer.alert(data.msg);
                }
            }
        });
        form.on('select(departmentList)', function (data) {
            $("#departmentIdHidden").val(data.value)
            showInit(data.value);
            departmentName = data.elem[data.elem.selectedIndex].text;
        });
        form.on('select(level)', function (data) {
            $("#levelHidden").val(data.value);
        })
        form.on('select(maintenanceCategory)', function (data) {
            $("#maintenanceCategoryHidden").val(data.value);
        });
    });
}

//加载任务内容
function showInit(departmentId) {
    //隐藏首页及标签
    $("#bodyDiv").show();//打开页面显示的列表
    $("#bodyHeader").show();//页面显示列表的表头
    $("#bodyDiv2").hide();//点击列表显示的输入框列表
    $("#jianpan").css("display", "none");//键盘隐藏
    $.ajax({
        type: "GET",
        url: "/guide/staff/init",
        data: {departmentId: departmentId},
        dataType: "json",
        async: true,
        success: function (res) {
            if (res.code == 0 || res.code == 200) {
                $("#userName").html(res.data.userName);//登陆人
                $("#dateTime").html(res.data.dateTime);//时间
                var html = '';
                var workPeratorList = res.data.workPeratorList;
                for (var i = 0; i < workPeratorList.length; i++) {
                    var patrolTask = workPeratorList[i].patrolTask;//任务
                    html += '<div id="' + workPeratorList[i].id + '" class="Task" onclick="crePost(' + workPeratorList[i].id + ',\'' + patrolTask + '\')">' +
                        '<div class="TaskBody">' + patrolTask + '</div>' +
                        '<div class="TaskBody" id="cycle' + i + '">' + workPeratorList[i].cycle + '</div>' +
                        '<div class="TaskBody green" id="nextTime' + i + '">可执行</div>' +
                        '<div id="inspectionEndTime' + i + '" style="display: none">' + workPeratorList[i].inspectionEndTime + '</div></div>';
                }
                $('#bodyDiv').html(html);
                //倒计时
                getDate();
                setInterval(getDate, 1000);
            } else {
                layer.alert(res.msg)
            }
        }
    });
}

//倒计时
function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}

function getDate() {
    var endTimeList = $('div[id^="inspectionEndTime"]');//巡检结束时间
    for (var i = 0; i < endTimeList.length; i++) {
        var inspectionEndTime = endTimeList[i].innerHTML;
        inspectionEndTime = inspectionEndTime.replace(/\-/g, '/');//兼容ios系统
        var cycle = $("#cycle" + i).html();//周期小时
        if (inspectionEndTime == null || inspectionEndTime == "") {

        } else {
            var t = new Date(inspectionEndTime).getTime() + cycle * 60 * 60 * 1000;//巡检结束时间加周期毫秒数
            var oldTime = new Date().getTime();//当前时间的毫秒数
            var newTime = new Date(t).getTime();//下一周期的毫秒数
            if (oldTime > newTime) {
                $("#nextTime" + i).addClass("green");
                $("#nextTime" + i).html("可执行");
            } else {
                var second = Math.floor((newTime - oldTime) / 1000);//未来时间距离现在的秒数
                var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
                second = second % 86400;//余数代表剩下的秒数；
                var hour = Math.floor(second / 3600);//整数部分代表小时；
                second %= 3600; //余数代表剩下的秒数；
                var minute = Math.floor(second / 60);
                second %= 60;
                var str = tow(day) + "天" + tow(hour) + "时" + tow(minute) + "分" + tow(second) + "秒";
                $("#nextTime" + i).addClass("red");
                $("#nextTime" + i).html(str);
            }
        }
    }
}


/**
 * 创建员工执行任务
 */

function crePost(id, patrolTask) {
    $("#patrolTask").css("display", "revert");
    $("#department").css("display", "none");
    //创建员工空数据
    $.ajax({
        type: "POST",
        url: "/guide/staff/crePost",
        data: {'id': id},
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.code == 220) {//判断是否打开最近的任务
                $.ajax({
                    type: "POST",
                    url: "/guide/staff/selPost",
                    data: {'id': id},
                    dataType: "json",
                    async: true,
                    success: function (data1) {
                        if (data1.code == 0 || data1.code == 200) {
                            crePostData(data1.data);
                        } else {
                            layer.alert(data1.msg)
                        }
                    }
                });
            } else if (data.code == 221) {
                layer.alert(data.msg);
            } else if (data.code == 200 || data.code == 0) {
                crePostData(data.data);
            } else {
                layer.alert(data.msg);
            }
        }
    });
    $.ajax({
        url: "/guide/operation/send",
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: {
            employeeId: "",
            verb: "开始巡检路线",
            content: departmentName + " " + patrolTask,
            type: "guide",
            remark: "",
            createTime: "",
            url: "/guide/home/toStaffhome"
        },
        success: function (data) {
        }
    });
}

function crePostData(data) {
    //隐藏首页及标签
    $("#bodyDiv2").show();
    $("#bodyDiv").hide();
    $("#bodyHeader").hide();
    $("#tbody").html('');
    var html = '';
    var patrolTask = data.patrolTask;//任务名称
    $("#postId").val(data.id);
    $("#patrolTask").html(patrolTask);
    var systemId, equipId, equipment;
    workPerators = data.workPerators;
    systemId = workPerators[0].systemId;//系统Id
    equipId = workPerators[0].equipId;//设备Id
    equipment = workPerators[0].equipment;//系统设备名
    html += '<div id="equipment0" label="'+systemId+','+equipId+'" style="font-size: 30px;display: inline-block;">第1页/总'+workPerators.length+'页--' + equipment + '</div>';
    $("#foodBody").html(html);
    //打开
    showPatrolTask($("#postId").val(), systemId, equipId)
}

/*
渲染当前任务输入列表
* */
function showPatrolTask(postPeratorId, systemId, equipId) {
    $.ajax({
        url: "/guide/staff/getPostChildList",
        dataType: "json",//数据格式
        type: "get",//请求方式
        data: {"postId": postPeratorId, 'systemId': systemId, 'equipId': equipId},
        success: function (data) {
            var text = '';
            if (data.code == 0 || data.code == 200) {
                data = data.data;
                for (var i = 0; i < data.length; i++) {
                    var unit = data[i].unit;
                    var measuringType = data[i].measuringType + "/" + data[i].unit;
                    var postDataId = data[i].id;
                    var value = data[i].measuringTypeData;
                    if (value == null || value == '') {
                        value = "";
                    }
                    text += '<tr><td colspan="2"><span>' + measuringType + '</span></td>\
                                <td colspan="2"><input type="text" id="' + postDataId + '" name="' + unit + '" readonly onclick="xfjianpan(this.id,this.name)" value="' + value + '" class="div1TableInp" placeholder="请输入...">\
                                </td></tr>';
                }
                $("#tbody").html(text);
            } else {
                layer.alert(data.msg)
            }
        }
    });
}

//提交当前页面数据 左右箭头
function backForward(count) {
    var list = document.getElementsByClassName("div1TableInp");
    var strData = new Array(list.length);
    var postId = $("#postId").val();//员工模板id

    if (count == -1) {//后退
        if (index == 0) {
            index = 0;
        } else {
            index = index - 1;
        }
    } else {//前进
        //对表单中所有的input进行遍历
         for (var i = 0; i < list.length && list[i]; i++) {
             if (list[i].type == "text") {
                 if (list[i].value.trim() == '') {
                     layer.alert("请确认填写完整!");
                     return;
                 }
                 strData[i] = list[i].id + ":" + list[i].value;
             }
         }
        // JSON.stringify(jsObj);
        strData = strData.join(",");
        if (index == workPerators.length - 1) {
            index = workPerators.length - 1;
            $.ajax({
                type: "POST",
                url: "/guide/staff/updPost",
                data: {"strData": strData, "postId": postId},//模板id
                dataType: "json",
                async: true,
                success: function (data1) {
                    if (data1.code == 0 || data1.code == 200) {
                        layer.alert("任务已完成");
                        showInit($("#departmentIdHidden").val());
                        index = 0;
                        $.ajax({
                            url: "/guide/operation/send",
                            dataType: "json",//数据格式
                            type: "post",//请求方式
                            data: {
                                employeeId: "",
                                verb: "结束巡检路线",
                                content: departmentName + " " + $("#patrolTask").html(),
                                type: "guide",
                                remark: "",
                                createTime: "",
                                id: "",
                                url: "/guide/home/toStaffhome"
                            },
                            success: function (data) {
                            }
                        });
                    } else {
                        layer.alert(data1.msg);
                    }
                }
            });
        } else {
            index = index + 1;
            $.ajax({
                type: "POST",
                url: "/guide/staff/updPost",
                data: {"strData": strData},//模板id
                dataType: "json",
                async: true,
                success: function (data2) {
                    if (data2.code == 0 || data2.code == 200) {
                    } else {
                        layer.alert(data2.msg)
                    }
                }
            });
        }
    }
    var equipId = workPerators[index].equipId;
    var equipment = workPerators[index].equipment;
    var systemId = workPerators[index].systemId;
    //显示系统和设备
    $('#foodBody').html('<div id="equipment' + index + '" label="'+systemId+','+equipId+'" style="font-size: 30px;display: inline-block;">第'+(index+1)+'页/总'+workPerators.length+'页--' + equipment + '</div>');
    // 渲染当前任务输入列表
    showPatrolTask($("#postId").val(), systemId, equipId);
}

//显示缺陷新增页面
function addDefect() {
    $("#addEquipment").text($("#equipment" + index).text());
    $("#addCreaterName").text($("#userName").text());
    var str = $("#equipment" + index).attr('label');
    var arr = str.split(",");
    $("#addSys").val(arr[0]);
    $("#addEmp").val(arr[1]);
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

//确定添加缺陷
function insert() {
    $.ajaxFileUpload({
        url: '/guide/defect/imgUpload',
        fileElementId: 'file',
        dataType: 'json',
        secureuri: false,
        success: function (Json) {
            var defect = {};
            defect.level = Number($('#levelHidden').val());//重大级别
            defect.maintenanceCategory = Number($('#maintenanceCategoryHidden').val());//检修类别
            defect.equipmentId = Number($("#addEmp").val());//设备id
            defect.sysId = Number($("#addSys").val());//系统id
            defect.abs = $('#addAbs').val();//缺陷描述
            defect.bPlc = Json.message;//图片
            defect.sourceType = 2;//来源类型  1：defect   2:guide
            if (!defect.abs) {
                layer.alert("缺陷描述不可以为空!");
                return;
            }
            if ($("#img-change1").attr("src") == "") {
                defect.bPlc = null;
            }
            $.ajax({
                "type": 'post',
                "url": "/guide/defect/addDefect",
                data: JSON.stringify(defect),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                "success": function (data) {
                    layer.closeAll();
                    if (data.code == 0 || data.code == 200) {
                        layer.alert("缺陷添加成功!");
                    } else {
                        layer.alert(data.msg)
                    }
                }
            });
        }
    });
}

//上传缺陷图片
function fileChange(event, id) {
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
        $("#img-change1").attr("src", imgURL);
        $("#img-change1").css("display", "block");
        // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
        // URL.revokeObjectURL(imgURL);
    }
};

//删除缺陷图片
function reduceImg(id) {
    var id = $("#" + id);
    var img = id.prev();
    img.attr("src", "");
    img.css("display", "none");
}

//取消
function cancel() {
    layer.closeAll();
}