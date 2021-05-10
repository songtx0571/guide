var departmentName = "";//部门
var addEquipment = "";//系统设备
var userName = "";//姓名
$(function(){
    //初始化表格:隐藏
    $("#bodyDiv2").hide();
    showDepartment();
    //加载用户数据/任务数据
    showInit("");
    getDate();
    setInterval(getDate, 1000);
    $('#addImg1').click(function(){
        $('#file').click();
    });
});
// 显示部门
function showDepartment() {
    layui.use(['form'], function(){
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: "/guide/staff/getDepMap",
            dataType: "json",
            success: function(data){
                $("#departmentList").empty();
                var option="<option value='' >请选择部门名称</option>";
                for (var i = 0; i < data.length; i ++) {
                    option += "<option value='"+data[i].id+"'>"+data[i].text+"</option>";
                }

                $('#departmentList').append(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(departmentList)', function(data){
            $("#departmentIdHidden").val(data.value)
            showInit(data.value);
            departmentName = data.elem[data.elem.selectedIndex].text;
        });
    });
}
//加载任务内容
function showInit(departmentId) {
    $.ajax({
        type: "GET",
        url: "/guide/staff/init",
        data: {departmentId:departmentId},
        dataType: "json",
        async: true,
        success: function(data){
            var html='';
            for(var i=0;i<data.length;i++){
                var result=data[i];
                userName=result.userName;
                var dateTime=result.dateTime;
                var patrolTask=result.patrolTask;//任务
                if(userName!=null&&userName!=''){
                    $("#userName").html(userName);
                    $("#dateTime").html(dateTime);
                }
                if((userName==null||userName=='')&&(dateTime==null||dateTime=='')){
                    html=html+'<div id="'+result.id+'" class="Task" onclick="crePost('+result.id+',\'\+'+patrolTask+'\'\)">'+
                        '<div class="TaskBody">'+patrolTask+'</div>' +
                        '<div class="TaskBody" id="cycle'+i+'">'+result.cycle+'</div>' +
                        '<div class="TaskBody green" id="nextTime'+i+'">可执行</div>' +
                        '<div id="inspectionEndTime'+i+'" style="display: none">'+result.inspectionEndTime+'</div>'+
                        '</div>';
                }
            }
            $('#bodyDiv').html(html);
        }
    });
}
//倒计时
function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}
function getDate() {
    var endTimeList=$('div[id^="inspectionEndTime"]');
    for(var i=0;i<endTimeList.length;i++){
        var inspectionEndTime=endTimeList[i].innerHTML;
        inspectionEndTime=inspectionEndTime.replace(/\-/g, '/');//兼容ios系统
        var cycle=$("#cycle"+i).html();
        if(inspectionEndTime== null||inspectionEndTime==""){

        }else {
            var oDate = new Date(inspectionEndTime);//获取日期对象
            var oldTime = oDate.getTime();//现在距离实际完成的毫秒数
            var t=oldTime+cycle*60*60*1000;
            var newDate = new Date(t);//理论开始时间
            oDate=new Date();//当前时间
            oldTime = oDate.getTime();
            var newTime = newDate.getTime();//下一周期的毫秒数
            if(oldTime>newTime){
                $("#nextTime"+i).addClass("green");
                $("#nextTime"+i).html("可执行");
            }else{
                var second = Math.floor((newTime - oldTime) / 1000);//未来时间距离现在的秒数
                var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
                second = second % 86400;//余数代表剩下的秒数；
                var hour = Math.floor(second / 3600);//整数部分代表小时；
                second %= 3600; //余数代表剩下的秒数；
                var minute = Math.floor(second / 60);
                second %= 60;
                var str=tow(day)+"天"+tow(hour)+"时"+tow(minute)+"分"+tow(second)+"秒";
                $("#nextTime"+i).addClass("red");
                $("#nextTime"+i).html(str);
            }
        }
    }
}

var record='equipment0';
/**
 * 创建员工执行任务
 */
var patrolTask1 = "";
function crePost(id,patrolTask){
    patrolTask1 = patrolTask.substring(1,patrolTask.length);
    $("#patrolTask").css("display","revert");
    $("#department").css("display","none");
    //创建员工空数据
    $.ajax({
        type: "POST",
        url: "/guide/staff/crePost",
        data: {'id':id},
        dataType: "json",
        async: true,
        success: function(data){
            var info=data[0].result;
            //判断是否打开最近的任务
            if(info=='open'){
                $.ajax({
                    type: "POST",
                    url: "/guide/staff/selPost",
                    data: {'id': id},
                    dataType: "json",
                    async: true,
                    success: function (data1) {
                        record='equipment0';
                        crePostData(data1);
                    }
                });
            }else if(info=='console'){
                layui.use('layer', function() {
                    var layer = layui.layer;
                    layer.alert("请等候下一周期到来");
                });
                return;
            }else{
                if(data!=''&&data!=null){
                    crePostData(data);
                }
            }
        }
    });
    $.ajax({
        url:"/guide/operation/send",
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: {employeeId:"",verb:"开始巡检路线",content:departmentName+" "+patrolTask1,type:"guide",remark:"",createTime:"",url:"/guide/home/toStaffhome"},
        success:function(data){}
    });
}

function crePostData(data) {
    //隐藏首页及标签
    $("#bodyDiv2").show();
    $("#bodyDiv").hide();
    $("#bodyHeader").hide();
    $("#tbody").html('');
    var html='';
    var equipmento='';
    var postId='';//员工模板id
    //尾部设备名称
    for(var i=0;i<data.length;i++){
        var info=data[i];
        var equipment=info.equipment;
        var patrolTask=info.patrolTask;//任务，名称
        if(info.id!=''&&info.id!=null){
            postId=info.id;
            $("#postId").html(postId);
        }
        if(patrolTask!=null&&patrolTask!=''){
            $("#patrolTask").html(patrolTask);
        }
        if(equipment!=''&&equipment!=null){
            if(i==0){
                equipmento=equipment;
                html+='<div id="equipment'+i+'" style="font-size: 30px;display: inline-block;">'+equipment+'</div>';
            }else{
                html+='<div id="equipment'+i+'" style="font-size: 30px;display: none">'+equipment+'</div>';
            }
        }
        addEquipment = equipmento;
    }

    $("#foodBody").html(html);
    //打开
    var text='';
    if(postId!=''&&equipmento!=''){
        $.get("/guide/staff/getPostChildList",
            {"postId":postId,'equipmento':equipmento},
            function (data) {
                for(var i=0;i<data.length;i++){
                    var info=data[i];
                    var unit=info.unit;
                    var measuringType=info.measuringType+"/"+info.unit;
                    var postDataId=info.id;
                    var value=info.measuringTypeData;
                    if(value==null||value==''){
                        value="";
                    }
                    text+='<tr><td colspan="2"><span>'+measuringType+'</span></td>\
                                <td colspan="2"><input type="text" id="post'+postDataId+'" name="'+unit+'" readonly onclick="xfjianpan(this.id,this.name)" value="'+value+'" class="div1TableInp" placeholder="请输入...">\
                                </td></tr>';
                }
                $("#tbody").html(text);
            }, "json");
    }
}

/**
 * 提交当前页面数据
 * @constructor
 */
function Forward(){
    var list=document.getElementsByClassName("div1TableInp");
    var strData= new Array(list.length);
    var postId=$("#postId").html();//员工模板id
    //对表单中所有的input进行遍历
    for(var i=0;i<list.length && list[i];i++)
    {
        if(list[i].type=="text")
        {
            if(list[i].value.trim()==''){
                layui.use('layer', function() {
                    var layer = layui.layer;
                    layer.alert("请确认填写完整!");
                });
                return;
            }
            strData[i]=list[i].id+":"+list[i].value;
        }
    }
    var str=strData.join(",");
    //提交数据
    $.ajax({
        type: "POST",
        url: "/guide/staff/updPost",
        data: {'strData':str},
        dataType: "json",
        async: true,
        success: function (data) {
            if(data[0]=='success'){

            }else{
                layui.use('layer', function() {
                    var layer = layui.layer;
                    layer.alert("操作失败!请联系技术人员");
                })
                return;
            }
            //判断提交次数，展示设备数据
            var eqList=$('div[id^="equipment"]');
            var data="";
            var equipmento='';
            //最后一项无法继续执行:修改完成时间
            if(eqList[eqList.length-1].id==record){
                $.get("/guide/staff/updPost",
                    {"postId":postId},
                    function (data) {
                        record='equipment0';
                        layui.use('layer', function() {
                            var layer = layui.layer;
                            layer.alert("任务完成");
                        })
                        init();
                        $.ajax({
                            url:"/guide/operation/send",
                            dataType: "json",//数据格式
                            type: "post",//请求方式
                            data: {employeeId:"",verb:"结束巡检路线",content:departmentName+" "+patrolTask1,type:"guide",remark:"",createTime:"",id:"",url:"/guide/home/toStaffhome"},
                            success:function(data){}
                        });
                    }
                );
            }else{
                for(var i=0;i<eqList.length;i++ ){
                    if((i+1)==eqList.length){

                    }else if(record==eqList[i].id){
                        data=$("#equipment"+i).html();
                        equipmento=$("#equipment"+(i+1)).html();
                        $("#equipment"+(i)).css("display","none");
                        $("#equipment"+(i+1)).css("display","inline-block");
                        record=eqList[i+1].id;//刷新标识
                        break;
                    }
                }
                var text='';
                $.ajax({
                    type: "POST",
                    url: "/guide/staff/getPostChildList",
                    data: {"postId":postId,'equipmento':equipmento},
                    dataType: "json",
                    async: true,
                    success: function (data) {
                        $("#tbody").html();
                        for(var i=0;i<data.length;i++){
                            var info=data[i];
                            var unit=info.unit;
                            var measuringType=info.measuringType+"/"+info.unit;
                            var postDataId=info.id;
                            var value=info.measuringTypeData;
                            if(value==null||value==''){
                                value="";
                            }
                            text+='<tr><td colspan="2"><span>'+measuringType+'</span></td>\
                                <td colspan="2"><input type="text" id="post'+postDataId+'" name="'+unit+'" readonly onclick="xfjianpan(this.id,this.name)"  value="'+value+'" class="div1TableInp" placeholder="请输入...">\
                                </td></tr>';
                        }
                        $("#tbody").html(text);
                    }
                });
            }
        }
    });
}

var index=0;
function init() {
    //表格:隐藏
    $("#bodyDiv2").hide();
    $("#patrolTask").css("display","none");
    //主页面显示
    $('#department').css("display","revert");
    $('#bodyDiv').show();
    $("#bodyHeader").show();
    $("#jianpan").css("display","none");
    //加载用户数据/任务数据
    $.ajax({
        type: "GET",
        url: "/guide/staff/init",
        dataType: "json",
        async: true,
        success: function(data){
            var html='';
            for(var i=0;i<data.length;i++){
                var result=data[i];
                var userName=result.userName;
                var dateTime=result.dateTime;
                var patrolTask=result.patrolTask;//任务
                if(userName!=null&&userName!=''){
                    $("#userName").html(userName);
                    $("#dateTime").html(dateTime);
                }
                if((userName==null||userName=='')&&(dateTime==null||dateTime=='')){
                    html=html+'<div id="'+result.id+'" class="Task" onclick="crePost('+result.id+',\'\+'+patrolTask+'\'\)">'+
                        '<div class="TaskBody">'+patrolTask+'</div>' +
                        '<div class="TaskBody" id="cycle'+i+'">'+result.cycle+'</div>' +
                        '<div class="TaskBody green" id="nextTime'+i+'">可执行</div>' +
                        '<div id="inspectionEndTime'+i+'" style="display: none">'+result.inspectionEndTime+'</div>'+
                        '</div>';
                }
            }
            $('#bodyDiv').html(html);
        }
    });
    $("#foodBody").html("");
    $("#patrolTask").html("请选择任务");
    index=1;
    getDate();
    setInterval(getDate, 1000);
    showInit($("#departmentIdHidden").val());
}
//显示新增页面
function addDefect () {
    $("#addEquipment").text(addEquipment);
    $("#addCreaterName").text(userName);
    var str = addEquipment
    var arr = str.split(",");
    $("#addSys").text(arr[0]);
    $("#addEmp").text(arr[1]);
    layui.use('layer', function() { //独立版的layer无需执行这一句
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
    var year =  myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var date = myDate.getDate();
    if (month < 10) {
        month = "0"+month;
    }
    if (date < 10) {
        date = "0"+date;
    }
    $("#createTime").html(year+"-"+month+"-"+date);
    $("#img-change1").attr("src","");
    $("#img-change1").css("display","none");
}
//确定添加
function insert () {
    $.ajaxFileUpload({
        url: '/guide/defect/imgUpload',
        fileElementId: 'file',
        dataType: 'json',
        secureuri : false,
        success: function (Json){
            var defect = {};

            defect.level = Number($('#levelHidden').val());//重大级别
            defect.maintenanceCategory = Number($('#maintenanceCategoryHidden').val());//检修类别
            defect.equipmentName =$("#addEmp").text();//设备id
            defect.sysName =  $("#addSys").text();//系统id
            defect.abs = $('#addAbs').val();//缺陷描述
            defect.bPlc = Json.message;//图片
            defect.sourceType = 2;//来源类型  1：defect   2:guide
            if(!defect.abs){
                layer.alert("缺陷描述不可以为空!");
                return;
            }
            if ($("#img-change1").attr("src") == "") {
                defect.bPlc = null;
            }
            $.ajax({
                "type" : 'post',
                "url": "/guide/defect/addDefect",
                data: JSON.stringify(defect),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                "success":function(data){
                    ajaxFun(data,"缺陷添加成功!");
                }
            });

        }
    });
}
//上传图片
function fileChange(event,id,num){
    var files = event.target.files, file;
    if (files && files.length > 0) {
        // 获取目前上传的文件
        file = files[0];// 文件大小校验的动作
        if(file.size > 1024 * 1024 * 2) {
            files = null;
            $("#"+id).val("");
            layer.alert("图片大小不能超过 2MB!!");
            return false;
        }
        // 获取 window 的 URL 工具
        var URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        var imgURL = URL.createObjectURL(file);
        //用attr将img的src属性改成获得的url
        $("#img-change1").attr("src",imgURL);
        $("#img-change1").css("display","block");
        // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
        // URL.revokeObjectURL(imgURL);
    }
};
//删除图片
function reduceImg(id) {
    var id = $("#"+id);
    var img = id.prev();
    img.attr("src","");
    img.css("display","none");
}

//执行函数
function ajaxFun(data,tips) {
    if (data == "SUCCESS"){
        layer.alert(tips);
        layer.closeAll();
        return true;
    } else if (data == "NOUSER"){
        layer.alert("用户验证信息过期!");
    } else if (data == "REJECT"){
        layer.alert("记录已经被修改!");
    } else if (data == "FORMAT") {
        layer.alert("格式错误!");
    } else if (data == "HAVE") {
        layer.alert("存在同名!");
    } else if (data == "NOPERMISSION") {
        layer.alert("无权限!");
    } else if (data == "NoDepNumber") {
        layer.alert("部门无编号!");
    }  else {
        layer.alert("后台错误!");
    }
}
//取消
function cancel () {
    layer.closeAll();
}
