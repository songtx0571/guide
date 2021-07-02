var path = "";
var id = "";
var id1 = "";
var index1 = 1;
var index2 = 2;
var temChildId = "";
var roadName = "";
var addSystemName = "";//系统
var addEquipName = "";//设备
var updSystemName = "";//系统
var updEquipName = "";//设备
$(function(){
    showDepartName();
    showExhibitionList();
    showCycle();
});
//显示部门
function showDepartName() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getDepartmentList",
            dataType: "json",
            success: function (data) {
                $("#selDepartName").empty();
                $("#addDepartName").empty();
                $("#updDepartName").empty();
                var option = "<option value='0' >请选择部门</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].text + "</option>"
                }
                $('#selDepartName').html(option);
                $('#addDepartName').html(option);
                $('#updDepartName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(selDepartName)', function (data) {
            $("#selDepartNameHidden").val(data.value);
            showExhibitionList();
        });
        form.on('select(addDepartName)', function (data) {
            $("#addDepartNameHidden").val(data.value);
        });
        form.on('select(updDepartName)', function (data) {
            $("#updDepartNameHidden").val(data.value);
        });
    });
}
//周期下拉框
function showCycle() {
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('select(addCycle)', function (data) {
            $("#addCycleHidden").val(data.value);
        });
        form.on('select(updCycle)', function (data) {
            $("#updCycleHidden").val(data.value);
        });
    });
}
//显示模板
function showExhibitionList() {
    var top = $(".top").css("height");
    var win = $(window).height();
    var tp = top.indexOf("p");
    var topHeight = top.substring(0,tp);
    var height = win-topHeight-20;
    var department = $("#selDepartNameHidden").val();
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demo'
            ,height: height
            ,toolbar: true
            ,url: path + "/guide/template/getTemplate?department="+department //数据接口
            ,page: true //开启分页
            ,limit: 50
            ,limits: [50, 100, 150]
            ,cols: [[ //表头
                {field: 'patrolTask', title: '巡检任务', align: 'center', event: 'task', style:'cursor: pointer;color:blue;'}
                ,{field: 'departmentName', title: '项目部', align: 'center'}
                ,{field: 'artificialNumber', title: '人工巡检数', sort: true,  align: 'center'}
                ,{field: 'aiNumber', title: 'AI巡检数', sort: true,  align: 'center'}
                ,{field: 'planTime', title: '计划时间/分钟', sort: true,  align: 'center'}
                ,{field: 'cycle', title: '周期/小时', sort: true,  align: 'center'}
                ,{fixed: '', title:'状态', toolbar: '#barDemo1',align:'center '}
                ,{fixed: '', title: '操作', toolbar: '#barDemo2', align: 'center'}
            ]]
            ,done: function(res, curr, count){
                for (var i = 0; i < res.data.length; i ++){
                    var status = res.data[i].status;
                    if (status == "0"){
                        $("#statusHiddenOut").val("0");
                        $(".closeStatusOut"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatusOut"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatusOut"+res.data[i].id).css("cursor","pointer");
                        $(".closeStatusOut"+res.data[i].id).removeAttr("disabled");
                        $(".openStatusOut"+res.data[i].id).removeAttr("disabled");
                        $(".closeStatusOut"+res.data[i].id).css("cursor","pointer");
                    }else if (status == "1") {
                        $("#statusHiddenOut").val("1");
                        $(".closeStatusOut"+res.data[i].id).css("background", "#ccc");
                        $(".openStatusOut"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatusOut"+res.data[i].id).attr({"disabled":"disabled"});
                        $(".openStatusOut"+res.data[i].id).css("cursor","no-drop");
                        $(".closeStatusOut"+res.data[i].id).removeAttr("disabled");
                        $(".closeStatusOut"+res.data[i].id).css("cursor","pointer");
                    } else{
                        $("#statusHiddenOut").val("2");
                        $(".closeStatusOut"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatusOut"+res.data[i].id).css("background", "#ccc");
                        $(".closeStatusOut"+res.data[i].id).attr({"disabled":"disabled"});
                        $(".closeStatusOut"+res.data[i].id).css("cursor","no-drop");
                        $(".openStatusOut"+res.data[i].id).removeAttr("disabled");
                        $(".openStatusOut"+res.data[i].id).css("cursor","pointer");
                    }
                }
            }
        });
        table.on('tool(test)', function(obj) {
            var data = obj.data;
            if(obj.event == 'task') {
                $("#updId").val(data.id);
                $("#updTask").val(data.patrolTask);
                $("#updPlanTime").val(data.planTime);
                $("#updCycleHidden").val(data.cycle);
                $("#updDepartNameHidden").val(data.projectDepartment);
                data.cycle = Number(data.cycle);
                layui.use('form', function () {
                    var form = layui.form;
                    $("#updCycle").val(data.cycle);
                    $("#updDepartName").val(data.projectDepartment);
                    form.render('select');
                    form.render(); //更新全部
                });
                index1 = layer.open({
                    type: 1
                    , id: 'taskUpdDiv' //防止重复弹出
                    , content: $(".taskUpdDiv")
                    , btnAlign: 'c' //按钮居中
                    , shade: 0.5 //不显示遮罩
                    , area: ['450px%', '400px']
                    , success: function () {
                    }
                    , yes: function () {
                    }
                });
            }else if(obj.event == 'edit'){
                $(".temBarDivTable").css("display","block");
                $(".addTemBarDiv").css("display","none");
                $(".updTemBarDiv").css("display","none");
                showTemBar(data.id);
                index1 = layer.open({
                    type: 1
                    // ,id: 'temBarDiv' //防止重复弹出
                    ,content: $(".temBarDiv")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0.5 //不显示遮罩
                    ,area: ['100%', '100%']
                    ,success: function () {
                    }
                    ,yes: function(){
                    }
                });
            } else if (obj.event == 'statusOpenOut') {//启用
                $("#statusHiddenOut").val("0");
                $(".closeStatusOut"+data.id).css("background", "#ccc");
                $(".openStatusOut"+data.id).css("background", "#1E9FFF");
                $(".openStatusOut"+data.id).attr({"disabled":"disabled"});
                $(".openStatusOut"+data.id).css("cursor","no-drop");
                $(".closeStatusOut"+data.id).removeAttr("disabled");
                $(".closeStatusOut"+data.id).css("cursor","pointer");
                $.ajax({
                    url: path + '/guide/template/updStatus',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'status':1},
                    success: function (data) {
                        showExhibitionList();
                    }
                });
            } else if (obj.event == 'statusCloseOut'){//禁用
                $("#statusHiddenOut").val("1");
                $(".closeStatusOut"+data.id).css("background", "#1E9FFF");
                $(".openStatusOut"+data.id).css("background", "#ccc");
                $(".closeStatusOut"+data.id).attr({"disabled":"disabled"});
                $(".closeStatusOut"+data.id).css("cursor","no-drop");
                $(".openStatusOut"+data.id).removeAttr("disabled");
                $(".openStatusOut"+data.id).css("cursor","pointer");
                $.ajax({
                    url: path +'/guide/template/updStatus',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'status':2},
                    success: function (data) {
                        showExhibitionList();
                    }
                });
            }
        });
    });
}
//打开创建巡检任务
function openExhibition() {
    $(".addExhibitionSpan").css("display","none");
    index1 = layer.open({
        type: 1
        ,id: 'taskAddDiv' //防止重复弹出
        ,content: $(".taskAddDiv")
        ,btnAlign: 'c' //按钮居中
        ,shade: 0.5 //不显示遮罩
        ,area: ['424px', '450px']
        ,success: function () {
        }
        ,yes: function(){
        }
    });
}
//添加巡检任务
function addExhibition() {
    var addTask = $("#addTask").val();
    var addPlanTime = $("#addPlanTime").val();
    var addCycleHidden = $("#addCycleHidden").val();
    var addDepartNameHidden = $("#addDepartNameHidden").val();
    if (addTask.trim() == "" || addPlanTime.trim() == "" || addCycleHidden.trim() == "" || addDepartNameHidden.trim() == ""){
        $(".addExhibitionSpan").css("display","contents");
        return;
    }
    $.ajax({
        url: '/guide/template/addWorkPerator',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'workId':"",'planTime':addPlanTime, 'patrolTask':addTask,'cycle':addCycleHidden, 'department':addDepartNameHidden},
        success: function (data) {
            layer.closeAll();
            showExhibitionList();
        },
    });
}
//修改巡检任务
function updExhibition() {
    var updId = $("#updId").val();
    var updTask = $("#updTask").val();
    var updPlanTime = $("#updPlanTime").val();
    var updCycleHidden = $("#updCycleHidden").val();
    var updDepartNameHidden = $("#updDepartNameHidden").val();
    $.ajax({
        url: '/guide/template/addWorkPerator',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'workId':updId,'planTime':updPlanTime, 'patrolTask':updTask,'cycle':updCycleHidden, 'department':updDepartNameHidden},
        success: function (data) {
            layer.closeAll();
            showExhibitionList();
        }
    });
}
/*************************路线**************************************/
//获取系统号，设备名称,单位
function getSysEquName(id) {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getSysNameList?id="+id,
            dataType: "json",
            success: function (data) {
                $("#addTemBarSysName").empty();
                $("#updTemBarSysName").empty();
                var option = "<option value='0' >请选择系统号</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#addTemBarSysName').html(option);
                $('#updTemBarSysName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(addTemBarSysName)', function (data) {
            addSystemName = data.elem[data.elem.selectedIndex].text;//系统
            $("#addTemBarSysHidden").val(data.value);
            roadName = addSystemName+","+addEquipName;
        });
        form.on('select(updTemBarSysName)', function (data) {
            $("#updTemBarSysHidden").val(data.value);
            updSystemName = data.elem[data.elem.selectedIndex].text;//系统
            roadName = updSystemName+","+updEquipName;
        });
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getEquNameList?id="+id,
            dataType: "json",
            success: function (data) {
                $("#addTemBarEquName").empty();
                $("#updTemBarEquName").empty();
                var option = "<option value='0' >请选择设备名称</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#addTemBarEquName').html(option);
                $('#updTemBarEquName').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(addTemBarEquName)', function (data) {
            $("#addTemBarEquNameHidden").val(data.value);
            addEquipName = data.elem[data.elem.selectedIndex].text;//设备
            roadName = addSystemName+","+addEquipName;
            getSightTypeUnit(id)
        });
        form.on('select(updTemBarEquName)', function (data) {
            $("#updTemBarEquNameHidden").val(data.value);
            updEquipName = data.elem[data.elem.selectedIndex].text;//设备
            roadName = updSystemName+","+updEquipName;
            getSightTypeUnit(id)
        });
        //单位
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getSightType?type=1&dataType=1&id="+id,
            dataType: "json",
            success: function (data) {
                $("#addTemBarUnit").empty();
                $("#updTemBarUnit").empty();
                var option = "<option value='-1' >请选择单位</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#addTemBarUnit').html(option);
                $('#updTemBarUnit').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(addTemBarUnit)', function (data) {
            $("#addTemBarUnitHidden").val(data.elem[data.elem.selectedIndex].text);
        });
        form.on('select(updTemBarUnit)', function (data) {
            $("#updTemBarUnitHidden").val(data.elem[data.elem.selectedIndex].text);
        });
    })
}
//获取添加测点类型
function getSightTypeUnit(id) {
    layui.use(['form'], function () {
        var form = layui.form;
        //人工还是AI
        form.on('select(addTemBarType)', function (data) {
            $("#addTemBarTypeHidden").val(data.value);
            //测点类型
            $.ajax({
                type: "GET",
                url: path + "/guide/template/getSightType",
                data:{type: '2',id:id,dataType:$("#addTemBarTypeHidden").val(),name:roadName},
                dataType: "json",
                success: function (data) {
                    $("#addTemBarSightType").empty();
                    var option = "<option value='-1' >请选择测点类型</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                    }
                    $('#addTemBarSightType').html(option);
                    form.render();//菜单渲染 把内容加载进去
                }
            });
            form.on('select(addTemBarSightType)', function (data) {
                $("#addTemBarSightTypeHidden").val(data.elem[data.elem.selectedIndex].text);
            });
        });
        form.on('select(updTemBarType)', function (data) {
            $("#updTemBarTypeHidden").val(data.value);
            //测点类型
            $.ajax({
                type: "GET",
                url: path + "/guide/template/getSightType",
                data:{type: '2',id:id,dataType:$("#updTemBarTypeHidden").val(),name:roadName},
                dataType: "json",
                success: function (data) {
                    $("#updTemBarSightType1").empty();
                    var option = "<option value='-1' >请选择测点类型</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                    }
                    $('#updTemBarSightType1').html(option);
                    form.render();//菜单渲染 把内容加载进去
                }
            });
            form.on('select(updTemBarSightType1)', function (data) {
                $("#updTemBarSightTypeHidden").val(data.elem[data.elem.selectedIndex].text);
            });
        });
    })
}
//显示信息
function showTemBar(id) {
    id1 = id;
    getSysEquName(id1);
    getSightTypeUnit(id1);
    var win = $(window).height();
    var height = win -100-20;
    layui.use(['table'], function() {
        var table = layui.table;
        table.render({
            elem: '#demoTB'
            , height: height
            , toolbar: true
            , url: path + "/guide/template/getTemplateChildList?temid="+id //数据接口
            , page: false //开启分页
            , cols: [[ //表头
                {field: 'equipment', title: '设备名称', align: 'center'}
                , {field: 'measuringType', title: '测点类型', align: 'center'}
                , {field: 'unit', title: '单位', sort: true, align: 'center'}
                , {field: 'dataType', title: '路线类型',  align: 'center', toolbar: '#barDemo5'}
                , {fixed: '', title: '状态', toolbar: '#barDemo3', align: 'center '}
                , {fixed: '', title: '操作', toolbar: '#barDemo4', align: 'center'}
            ]]
            , done: function (res, curr, count) {
                for (var i = 0; i < res.data.length; i ++){
                    var status = res.data[i].status;
                    if (status == "0"){
                        $("#statusHidden").val("0");
                        $(".closeStatus"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatus"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatus"+res.data[i].id).css("cursor","pointer");
                        $(".closeStatus"+res.data[i].id).removeAttr("disabled");
                        $(".openStatus"+res.data[i].id).removeAttr("disabled");
                        $(".closeStatus"+res.data[i].id).css("cursor","pointer");
                    }else if (status == "1") {
                        $("#statusHidden").val("1");
                        $(".closeStatus"+res.data[i].id).css("background", "#ccc");
                        $(".openStatus"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatus"+res.data[i].id).attr({"disabled":"disabled"});
                        $(".openStatus"+res.data[i].id).css("cursor","no-drop");
                        $(".closeStatus"+res.data[i].id).removeAttr("disabled");
                        $(".closeStatus"+res.data[i].id).css("cursor","pointer");
                    } else{
                        $("#statusHidden").val("2");
                        $(".closeStatus"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatus"+res.data[i].id).css("background", "#ccc");
                        $(".closeStatus"+res.data[i].id).attr({"disabled":"disabled"});
                        $(".closeStatus"+res.data[i].id).css("cursor","no-drop");
                        $(".openStatus"+res.data[i].id).removeAttr("disabled");
                        $(".openStatus"+res.data[i].id).css("cursor","pointer");
                    }
                }
            }
        });
        table.on('tool(testTB)', function(obj) {
            var data = obj.data;
            if (obj.event == "statusOpen"){//启用
                $("#statusHidden").val("0");
                $(".closeStatus"+data.id).css("background", "#ccc");
                $(".openStatus"+data.id).css("background", "#1E9FFF");
                $(".openStatus"+data.id).attr({"disabled":"disabled"});
                $(".openStatus"+data.id).css("cursor","no-drop");
                $(".closeStatus"+data.id).removeAttr("disabled");
                $(".closeStatus"+data.id).css("cursor","pointer");
                $.ajax({
                    url: path + '/guide/template/updStatus',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'status':1},
                    success: function (data) {
                        showTemBar(id1);
                    }
                });
            } else if (obj.event == "statusClose"){//暂停
                $("#statusHidden").val("1");
                $(".closeStatus"+data.id).css("background", "#1E9FFF");
                $(".openStatus"+data.id).css("background", "#ccc");
                $(".closeStatus"+data.id).attr({"disabled":"disabled"});
                $(".closeStatus"+data.id).css("cursor","no-drop");
                $(".openStatus"+data.id).removeAttr("disabled");
                $(".openStatus"+data.id).css("cursor","pointer");
                $.ajax({
                    url: path +'/guide/template/updStatus',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'status':2},
                    success: function (data) {
                        showTemBar(id1);
                    }
                });
            } else if(obj.event == 'editTB'){
                getSelect(id1,data);
            } else if (obj.event == "upTB"){//上移
                $.ajax({
                    url: path + '/guide/template/updPriority',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'workId':id},
                    success: function (data) {
                        showTemBar(id1);
                    }
                });
            } else if (obj.event == "delTB"){//删除
                $.ajax({
                    url: path + '/guide/template/delWorkChild',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id},
                    success: function (data) {
                        showTemBar(id1);
                    }
                });
            }
        });
    });
}
//路线编辑
function getSelect (id1,data) {
    layui.use('form', function(){
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/guide/template/getSightType",
            data:{type: '2',id:id1,dataType:data.dataType,name:data.equipment},
            dataType: "json",
            sync:false,
            success: function (Tdata) {
                var option = "<option value='-1' >请选择测点类型</option>";
                for (var i = 0; i < Tdata.length; i++) {
                    option += "<option value='" + Tdata[i].id + "'>" + Tdata[i].name + "</option>"
                }
                $('#updTemBarSightType1').html(option);
                $("#updTemBarSightType1").val(data.measuringTypeId);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(updTemBarSightType1)', function (data) {
            $("#updTemBarSightTypeHidden").val(data.elem[data.elem.selectedIndex].text);
        });
        temChildId = data.id;
        data.measuringTypeId = Number(data.measuringTypeId);
        data.unitId = Number(data.unitId);
        $(".temBarDivTable").css("display","none");
        $(".updTemBarDiv").css("display","block");
        var dou = (data.equipment).indexOf(",");
        $('#updTemBarSysHidden').val(data.sysId);
        $('#updTemBarEquNameHidden').val(data.equipmentId);
        updSystemName = data.equipment.substr(0,dou);
        updEquipName = data.equipment.substr((dou+1));
        $('#updTemBarUnitHidden').val(data.unit);
        $("#updTemBarTypeHidden").val(data.dataType);
        $('#updTemBarSightTypeHidden').val(data.measuringType);
        $("#updTemBarType").val(data.dataType);
        console.log(data)
        $("#updTemBarSysName").val(data.sysId);
        $("#updTemBarEquName").val(data.equipmentId);
        $("#updTemBarUnit").val(data.unitId);
        form.render(); //更新全部
    });
}
//打开创建窗口
function openTemBar() {
    layui.use('form', function() {
        var form = layui.form;
        $("#addTemBarType").val("0");
        $("#addTemBarSightType").val("-1");
        $("#addTemBarSysName").val("0");
        $("#addTemBarEquName").val("0");
        $("#addTemBarUnit").val("-1");
        $('#addTemBarSysHidden').val("");
        $('#addTemBarEquNameHidden').val("");
        $('#addTemBarSightTypeHidden').val("");
        $('#addTemBarUnitHidden').val("");
        form.render('select');
        form.render(); //更新全部
    });
    $(".temBarDivTable").css("display","none");
    $(".addTemBarDiv").css("display","block");
    $(".addTemBarSpan").css("display","none");
}
//创建路线
function addTemBar() {
    var workId=id1;
    var systemId= Number($('#addTemBarSysHidden').val());
    var equipId= Number($('#addTemBarEquNameHidden').val());
    var sightType= $('#addTemBarSightTypeHidden').val();
    var unitType= $('#addTemBarUnitHidden').val();
    var dataType = $("#addTemBarTypeHidden").val();
    temChildId="";
    if (systemId == "" || equipId == "" || sightType.trim() == "" || unitType.trim() == ""){
        $(".addTemBarSpan").css("display","block");
        return;
    }

    var data={'systemId':systemId,'equipId':equipId,'sightType':sightType,'unitType':unitType,'workId':workId,'temChildId':temChildId,'dataType':dataType,'sysName':addSystemName,'equName':addEquipName};
    console.log(data)
    $.ajax({
        url: '/guide/template/addWorkPeratorChild',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'systemId':systemId,'equipId':equipId,'sightType':sightType,'unitType':unitType,'workId':workId,'temChildId':temChildId,'dataType':dataType,'sysName':addSystemName,'equName':addEquipName},
        success: function (data) {
            showTemBar(id1);
            $(".addTemBarDiv").css("display","none");
            $(".temBarDivTable").css("display","block");
        }
    });
}
//修改路线
function updTemBar() {
    var workId=id1;
    var systemId= Number($('#updTemBarSysHidden').val());
    var equipId= Number($('#updTemBarEquNameHidden').val());
    var sightType= $('#updTemBarSightTypeHidden').val();
    var unitType= $('#updTemBarUnitHidden').val();
    var data={'systemId':systemId,'equipId':equipId,'sightType':sightType,'unitType':unitType,'workId':workId,'temChildId':temChildId,'sysName':updSystemName,'equName':updEquipName};
    console.log(data)
    $.ajax({
        url: '/guide/template/addWorkPeratorChild',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'systemId':systemId,'equipId':equipId,'sightType':sightType,'unitType':unitType,'workId':workId,'temChildId':temChildId,'sysName':updSystemName,'equName':updEquipName},
        success: function (data) {
            showTemBar(id1);
            $(".updTemBarDiv").css("display","none");
            $(".temBarDivTable").css("display","block");
        }
    });
}
//取消
function cancel1() {
    layer.close(index1);
}
function cancel2() {
    $(".temBarDivTable").css("display","block");
    $(".addTemBarDiv").css("display","none");
    $(".updTemBarDiv").css("display","none");
    $('#addTemBarSysHidden').val("");
    $('#addTemBarEquNameHidden').val("");
    $('#addTemBarSightTypeHidden').val("");
    $('#addTemBarUnitHidden').val("");
}
