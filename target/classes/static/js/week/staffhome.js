$(function(){
    //初始化表格:隐藏
    $("#bodyDiv2").hide();
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
                    html=html+'<div id="'+result.id+'" class="Task" onclick="crePost('+result.id+')">'+
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
    getDate();
    setInterval(getDate, 1000);
});
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
function crePost(id){
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
                $.messager.alert("提示","请等候下一周期到来");
                return;
            }else{
                if(data!=''&&data!=null){
                    crePostData(data);
                }
            }
        }
    });
}

function crePostData(data) {
    //隐藏首页及标签
    $("#bodyDiv2").fadeIn("fast");
    $("#bodyDiv").fadeOut("fast");
    $("#bodyHeader").fadeOut("fast");
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
                html+='<div id="equipment'+i+'" style="font-size: 40px;display: inline-block;">'+equipment+'</div>';
            }else{
                html+='<div id="equipment'+i+'" style="font-size: 40px;display: none">'+equipment+'</div>';
            }
        }
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
                                <td colspan="2"><input type="text" id="post'+postDataId+'" name="'+unit+'" readonly onclick="xfjianpan(this.id,this.name)" value="'+value+'" class="form-control" style="height: 80px;font-size: 30px;" placeholder="请输入...">\
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
    var list=document.getElementsByTagName("input");
    var strData= new Array(list.length);
    var postId=$("#postId").html();//员工模板id
    //对表单中所有的input进行遍历
    for(var i=0;i<list.length && list[i];i++)
    {
        if(list[i].type=="text")
        {
            if(list[i].value.trim()==''){
                $.messager.alert("提示","请确认填写完整!");
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
                $.messager.alert("提示","操作失败!请联系技术人员");
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
                        $.messager.alert("提示","任务完成");
                        init();
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
                                <td colspan="2"><input type="text" id="post'+postDataId+'" name="'+unit+'" readonly onclick="xfjianpan(this.id,this.name)" class="form-control" style="height: 80px;font-size: 30px;" placeholder="请输入...">\
                                </td></tr>';
                        }
                        $("#tbody").html(text);
                    }
                });
            }
        }
    });
}

/**
 * 后退方法
 * @constructor
 */
function  Back() {
    var postId=$("#postId").html();//员工模板id
    //判断提交次数，展示设备数据
    var eqList=$('div[id^="equipment"]');
    var equipmento='';
    //首项无法后退
    if(eqList[0].id==record){
        return;
    }
    for(var i=0;i<eqList.length;i++ ){
        if(record==eqList[i].id){
            equipmento=$("#equipment"+(i-1)).html();
            $("#equipment"+(i)).css("display","none");
            $("#equipment"+(i-1)).css("display","inline-block");
            record=eqList[i-1].id;//刷新标识
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
                text+='<tr><td colspan="2"><span>'+measuringType+'</span></td>\
                                <td colspan="2"><input type="text" id="post'+postDataId+'" readonly onclick="xfjianpan(this.id,this.unit)" value="'+info.measuringTypeData+'" class="form-control" style="height: 80px;font-size: 30px;" placeholder="请输入...">\
                                </td></tr>';
            }
            $("#tbody").html(text);
        }
    });
}
var index=0;
function init() {
    //表格:隐藏
    $("#bodyDiv2").fadeOut("fast");
    //主页面显示
    $('#bodyDiv').fadeIn("fast");
    $("#bodyHeader").fadeIn("fast");
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
                    html=html+'<div id="'+result.id+'" class="Task" onclick="crePost('+result.id+')">'+
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
    if(index==1){

    }
    index=1;
    getDate();
    setInterval(getDate, 1000);
}






