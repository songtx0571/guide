var path = "/guide"
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
if (month < 10) {
    month = "0" + month;
}
$(function () {
    showTime();
    $("#test1").val(year + "-" + month)
    showTable("", year + "-" + month);
    showDeparment();
})

//部门
function showDeparment() {
    layui.use(['form'], function () {
        var form = layui.form;
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
            showTable($("#departmentHidden").val(), $("#test1").val());
        })
    });
}

//时间
function showTime() {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //年月选择器
        laydate.render({
            elem: '#test1'
            , type: 'month'
            , trigger: 'click'
            , done: function (value, date) {
                showTable($("#departmentHidden").val(), value);
            }
        });
    })
}

//显示表格
function showTable(departmentId, month) {
    var win = $(window).height();
    var height = win - 100;
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#demo'
            , height: height
            , toolbar: true
            , url: path + '/defect/getDefectDataList?departmentId=' + departmentId + '&month=' + month//数据接口
            , page: true //开启分页
            , limit: 50
            , limits: [50, 100, 150]
            , id: 'demoInfo'
            , cols: [[ //表头
                {field: 'number',title: '缺陷号',toolbar: '#tbNumberBar',align: 'center',sort: true, event: 'detailed',style: 'cursor: pointer;',width: 85}
                , {field: 'sourceType', title: '来源', width: 70, toolbar: '#tbSourceTypeBar'}
                , {field: 'type', title: '状态', toolbar: '#tbTypeBar', align: 'center', width: 100, sort: true}
                , {field: 'sysName', title: '系统', sort: true}
                , {field: 'equipmentName', title: '设备', sort: true}
                , {field: 'level', title: '级别', toolbar: "#tbLevelBar", sort: true, width: 75}
                , {field: 'maintenanceCategory', title: '类别', toolbar: "#tbCategoryBar", sort: true, width: 75}
                , {field: 'created', title: '创建时间'}
                , {field: 'createdByName', title: '创建人'}
                , {field: 'plannedWork', title: '计划工时'}
                , {field: 'realExecuteTime', title: '实际工时'}
                , {field: 'empIdsName', title: '消缺人', width: 150}
                , {field: 'orderReceivingTime', title: '接单开始时间'}
                , {field: 'planedTime', title: '预估完成时间'}
                , {field: 'realSTime', title: '实际检修开启日期'}
                , {field: 'realETime', title: '实际检修结束日期'}
                , {field: 'confirmer1Time', title: '值班确认时间'}
                , {field: '', title: '超时', templet(a){
                    var timeoutTypeName="";
                    //A认领超时,  B开工超时, C反馈超时,D验收超时, E结束超时, Z缺陷处理超时
                    if(a.timeoutType!=null&&a.timeoutType.indexOf("A")>-1){
                        timeoutTypeName+="认领超时,"
                    }
                    if(a.timeoutType!=null&&a.timeoutType.indexOf("B")>-1){
                        timeoutTypeName+="开工超时,"
                    }
                    if(a.timeoutType!=null&&a.timeoutType.indexOf("C")>-1){
                        timeoutTypeName+="反馈超时,"
                    }
                    if(a.timeoutType!=null&&a.timeoutType.indexOf("D")>-1){
                        timeoutTypeName+="验收超时,"
                    }
                    if(a.timeoutType!=null&&a.timeoutType.indexOf("E")>-1){
                        timeoutTypeName+="结束超时,"
                    }
                    if(a.timeoutType!=null&&a.timeoutType.indexOf("Z")>-1){
                        timeoutTypeName+="缺陷处理超时,"
                    }
                    if(timeoutTypeName.length>0){
                        timeoutTypeName=timeoutTypeName.substring(0,timeoutTypeName.length-1)
                    }
                     return timeoutTypeName;

                    }


            }]]
            , parseData: function (res) {
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
            if (obj.event === 'detailed') { //缺陷详情
                getDetailedInfo(data.id, 'detailed');
            }
        });
    });
}

//根据id查询缺陷详单
function getDetailedInfo(id, type) {
    $.ajax({
        type: 'GET',
        url: path + "/defect/getDefectById",
        data: {id: id},
        success: function (data) {
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
                }
            })
        }
    })
}