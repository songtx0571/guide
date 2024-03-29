$(function () {
    var tmpDate = new Date();
    var D = tmpDate.getDate();
    var M = tmpDate.getMonth() + 1;
    var Y = tmpDate.getFullYear();
    var h = tmpDate.getHours();
    var min = tmpDate.getMinutes();
    var s = tmpDate.getSeconds();

    // document.getElementById("datetime").value = Y + "-" + M + "-" + D + " " + h + ":" + min + ":" + s;
    document.getElementById("datetime").value = Y + "-" + M + "-" + D ;
    var type = sessionStorage.wfgdDailyType;
    var datetime = sessionStorage.wfgdDailydatetime;
    if (type) {
        // var type = document.querySelector("input[name='type']:checked").value;
        // $('#type').val(type);
    }
    if (datetime) {
        document.getElementById('datetime').value = datetime;
    }
    getUserName();
    getProject();
});

function getUserName() {
    $.ajax({
        "url": "../WeeklyController/getParamList",
        "success": function (Json) {
            var info = Json.data.userName;
            sessionStorage.Username = info;
        }
    });
}

function compareTime() {
    // var type = $("#type").val();
    var type = document.querySelector("input[name='type']:checked").value;
    var startDate = $("#datetime").val();
    var endDate = $("#datetime").val();
    var arrStartDate = startDate.split("-");
    var arrEndDate = endDate.split("-");
    var allStartDate;
    var allEndDate;
    var date = new Date();
    if (type == 1) {
        allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1] - 1), arrStartDate[2], 7, 0, 0);
        allEndDate = new Date(arrEndDate[0], parseInt(arrStartDate[1] - 1), arrEndDate[2], 17, 0, 0);
    } else if (type == 2) {
        allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1] - 1), arrStartDate[2], 15, 0, 0);
        allEndDate = new Date(arrEndDate[0], parseInt(arrStartDate[1] - 1), parseInt(arrStartDate[2] + 1), 1, 0, 0);
    } else {
        allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1] - 1), parseInt(arrStartDate[2] - 1), 23, 0, 0);
        allEndDate = new Date(arrEndDate[0], parseInt(arrStartDate[1] - 1), arrEndDate[2], 9, 0, 0);
    }

    if (date.getTime() < allStartDate.getTime()) {
        layer.alert("当前时间未到该班的工作时间,不可修改运行日志", {icon: 2});
        return false;
    } else if (date.getTime() > allEndDate.getTime()) {
        layer.alert("当前时间已超过该班的工作时间,不可修改运行日志", {icon: 2});
        return false;
    } else {
        return true;
    }
}

function getProject() {
    var userName = sessionStorage.Username;
    $.ajax({
        "type": 'post',
        "url": "../WeeklyController/getProject2",
        "data": {userName: userName},
        "success": function (Json) {
            var data = Json.data;
            //document.getElementById('project').length = 0;
            var project = document.getElementById('project');
            var projectId = sessionStorage.wfgdDailyProject;
            if (project) {
                var option = "";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].projectTeam + "</option>";
                }
                project.innerHTML = option;
            }
            change();
        }
    });
}

function change() {
    $("tbody tr").remove("tr[id=123]");
    var datetime = $('#datetime').val();
    // var type = $('#type').val();
    var type = document.querySelector("input[name='type']:checked").value;
    var project = $('#project').val();
    sessionStorage.wfgdDailyType = type;
    sessionStorage.wfgdDailydatetime = datetime;
    sessionStorage.wfgdDailyProject = project;
    if (project == null) {
        project = 0;
    }
    $.ajax({
        "type": 'post',
        "url": "../ScrDailyController/find",
        "data": {datetime: datetime, type: type, project: project, other: 2},
        "success": function (Json) {
            if (Json.data == "noUser") {
                layer.alert("请重新登录");
            } else {
                fill(Json.data);
                fillA(project,datetime,type);
            }
        },
        "error": function () {
            layer.alert("系统繁忙");
        }
    });
    $.ajax({
        "type": 'post',
        "url": "../ScrDailyController/findscrDaily",
        "data": {datetime: datetime, type: type, project: project, other: 2},
        "success": function (Json) {
            var data = Json.data;
            sessionStorage.wfgdDailySuccessor = data.successor;
            sessionStorage.wfgdDailyTraders = data.traders;
            sessionStorage.wfgdDailyRecorder = data.recorder;
            //document.getElementById("name").innerHTML = data.name;

            var aa = "";
            if (data.successor != "" && data.successor != null) {
                var successorsName = data.successorName.split(",");
                var successors = data.successor.split(";");
                for (var i = 0; i < successorsName.length; i++) {
                    aa += successorsName[i];
                    successorsName[i] = "'" + successors[i] + "'";
                    aa +=  '<img src="../img/reduce.png" onclick="delSuccessor(' + successorsName[i] + ')">';
                }

            }
            aa += "<img src='../img/and.png' onclick='addSuccessor()'>";
            document.getElementById("successor").innerHTML = aa;

            var bb = "";
            if (data.traders != "" && data.traders != null) {
                var tradersName = data.tradersName.split(",");
                var traderss = data.traders.split(";");
                for (var i = 0; i < tradersName.length; i++) {
                    bb += tradersName[i];
                    tradersName[i] = "'" + traderss[i] + "'";
                    bb +=  '<img src="../img/reduce.png" onclick="delTrader(' + tradersName[i] + ')">';
                }
            }
            bb += "<img src='../img/and.png' onclick='addTrader()'>";
            document.getElementById("traders").innerHTML = bb;

            var cc = "";
            if (data.recorder != "" && data.recorder != null) {
                var recorderName = data.recorderName.split(",");
                for (var i = 0; i < recorderName.length - 1; i++) {
                    cc += recorderName[i] + "，";
                }
                cc += recorderName[recorderName.length - 1]
            }

            document.getElementById("recorder").innerHTML = cc;


            /*if(data.group==1){
                document.getElementById("group").innerHTML = '甲';
            }else if(data.group==2){
                document.getElementById("group").innerHTML = '乙';
            }else if(data.group==3){
                document.getElementById("group").innerHTML = '丙';
            }else if(data.group==4){
                document.getElementById("group").innerHTML = '丁';
            }else{
                document.getElementById("group").innerHTML = "";
            }*/
            sessionStorage.wfgdDailyId = data.id;
        },
        "error": function () {
            layer.alert("系统繁忙");
        }
    });
}


//增加接班人
function addSuccessor(){
    var userName = sessionStorage.Username;
    var wfgdDailyId = sessionStorage.wfgdDailyId;
    var type = sessionStorage.wfgdDailyType;
    var datetime = sessionStorage.wfgdDailydatetime;
    // var successorTime = sessionStorage.successorTime;

    var projectId = $("#project").val();
    if (!compareTime()) {
        return;
    }
    if (projectId == null) {
        projectId = 0;
    }
    var Successor = sessionStorage.wfgdDailySuccessor;
    if (Successor != "" && Successor != null) {
        var Successors = Successor.split(";");
        for (var i = 0; i < Successors.length; i++) {
            if (userName == Successors[i]) {
                layer.alert('已以添加相同的填写人!', {icon: 2});
                return;
            }
        }
        Successor = Successor + ";" + userName;


    } else {
        Successor = userName;
    }

    var Recorder = sessionStorage.wfgdDailyRecorder;
    if (Recorder != "" && Recorder != null) {
        var Recorders = Recorder.split(";");
        for (var i = 0; i < Recorders.length; i++) {
            if (userName == Recorders[i]) {
                $.ajax({
                    "type": 'post',
                    "url": "../ScrDailyController/addSuccessor",
                    "data": {
                        userName: Successor,
                        id: wfgdDailyId,
                        datetime: datetime,
                        projectId: projectId,
                        type: type,
                        name: Recorder
                    },
                    "success": function (Json) {
                        if (Json.data == "success") {
                            layer.alert('添加成功', {icon: 1});
                            setTimeout(function () {
                                window.location.href = "../ScrDailyController/WfgdDaily";
                            }, 500);
                        } else if (Json.data == "haveRecords") {
                            layer.alert('存在尚未完成的日志登记', {icon: 1});
                        }
                    }
                });
                return;
            }
        }
        Recorder = Recorder +";"+ userName;
    }else{
        Recorder = userName;
    }

    $.ajax({
        "type" : 'post',
        "url": "../ScrDailyController/addSuccessor",
        // "data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type,name:Recorder,successorTime:successorTime},
        "data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type,name:Recorder},
        "success":function(Json){
            if(Json.data=="success"){
                layer.alert('添加成功',{icon:1});
                setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
            } else if(Json.data=="noUser"){
                layer.alert("登录失效！");
            } else if (Json.data == "haveRecords") {
                layer.alert('存在尚未完成的日志登记', {icon: 1});
            }
        }
    });

}
//删除接班人
function delSuccessor(index){
    if(!compareTime()){
        return;
    }
    var userName = sessionStorage.Username;
    var wfgdDailyId = sessionStorage.wfgdDailyId;
    var Successor = sessionStorage.wfgdDailySuccessor;
    var Successors = Successor.split(";");
    // var successorTime = sessionStorage.successorTime;
    // var successorTimes = successorTime.split(";");
    var name = "";
    var num = 0;
    /*var timeName = "";
    var timeNum = 0;*/


    for(var i=0;i<Successors.length;i++){
        if(Successors[i]!=index){
            if(num!=0){
                name += ";";
            }
            name +=  Successors[i];
            num ++;
        }
    }

    /*for (var j = 0; j < successorTimes.length; j ++) {
        if(j != index){
            if(timeNum!=0){
                timeName += ";";
            }
            timeName +=  successorTimes[j];
            timeNum ++;
        }
    }*/

    var Recorder=sessionStorage.wfgdDailyRecorder;
    if(Recorder != ""&&Recorder != null){
        var Recorders = Recorder.split(";");
        for(var i=0;i<Recorders.length;i++){
            if(userName==Recorders[i]){
                $.ajax({
                    "type" : 'post',
                    "url": "../ScrDailyController/delSuccessor",
                    // "data":{userName:name,id:wfgdDailyId,name:Recorder,successorTime:timeName},
                    "data":{userName:name,id:wfgdDailyId,name:Recorder},
                    "success":function(Json){
                        if(Json.data==1){
                            layer.alert('删除成功',{icon:1});
                            setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                        }
                    }
                });
            }
        }
        Recorder = Recorder +";"+ userName;
    }else{
        Recorder = userName;
    }
    $.ajax({
        "type" : 'post',
        "url": "../ScrDailyController/delSuccessor",
        // "data":{userName:name,id:wfgdDailyId,name:Recorder,successorTime:timeName},
        "data":{userName:name,id:wfgdDailyId,name:Recorder},
        "success":function(Json){
            if(Json.data==1){
                layer.alert('删除成功',{icon:1});
                setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
            }
        }
    });
}
//添加交班人
function addTrader(){
    if(!compareTime()){
        return;
    }
    var userName = sessionStorage.Username;
    var wfgdDailyId = sessionStorage.wfgdDailyId;
    var type = sessionStorage.wfgdDailyType;
    var datetime = sessionStorage.wfgdDailydatetime;
    var projectId = $("#project").val();
    var Trader = sessionStorage.wfgdDailyTraders;
    var tradersTime = sessionStorage.tradersTime;

    if(Trader != ""&&Trader != null){
        var Traders = Trader.split(";");
        for(var i=0;i<Traders.length;i++){
            if(userName==Traders[i]){
                layer.alert('已以添加相同的填写人!', {icon : 2});
                return;
            }
        }
        Trader = Trader +";"+ userName;
    }else{
        Trader = userName;
    }
    if(projectId==null){
        projectId=0;
    }
    var Recorder=sessionStorage.wfgdDailyRecorder;
    if(Recorder != ""&&Recorder != null){
        var Recorders = Recorder.split(";");
        for(var i=0;i<Recorders.length;i++){
            if(userName==Recorders[i]){
                $.ajax({
                    "type" : 'post',
                    "url": "../ScrDailyController/addTrader",
                    // "data":{userName:Trader,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type,Name:Recorder,tradersTime:tradersTime},
                    "data":{userName:Trader,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type,Name:Recorder},
                    "success":function(Json){
                        if(Json.data=="success"){
                            layer.alert('添加成功',{icon:1});
                            setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                        } else if (Json.data == "haveRecords") {
                            layer.alert('存在尚未完成的日志登记', {icon: 1});
                        }
                    }
                });
                return;
            }
        }
        Recorder = Recorder +";"+ userName;
    }else{
        Recorder = userName;
    }

    $.ajax({
        "type" : 'post',
        "url": "../ScrDailyController/addTrader",
        // "data":{userName:Trader,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type,Name:Recorder,tradersTime:tradersTime},
        "data":{userName:Trader,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type,Name:Recorder},
        "success":function(Json){
            if(Json.data=="success"){
                layer.alert('添加成功',{icon:1});
                setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
            } else if (Json.data == "haveRecords") {
                layer.alert('存在尚未完成的日志登记', {icon: 1});
            }
        }
    });
}
//删除交班人
function delTrader(index){
    if(!compareTime()){
        return;
    }
    var userName = sessionStorage.Username;
    var wfgdDailyId = sessionStorage.wfgdDailyId;
    var Trader = sessionStorage.wfgdDailyTraders;
    /*var tradersTime = sessionStorage.tradersTime;
    var tradersTimes = tradersTime.split(";");*/
    var Traders = Trader.split(";");
    var name = "";
    var num = 0;
    /*var timeName = "";
    var timeNum = "";*/
    for(var i=0;i<Traders.length;i++){
        if(Traders[i]!=index){
            if(num!=0){
                name += ";";
            }
            name +=  Traders[i];
            num ++;
        }
    }

    /*for (var j = 0; j < tradersTimes.length; j ++) {
        if(j != index){
            if(timeNum!=0){
                timeName += ";";
            }
            timeName +=  tradersTimes[j];
            timeNum ++;
        }
    }*/

    var Recorder=sessionStorage.wfgdDailyRecorder;
    if(Recorder != ""&&Recorder != null){
        var Recorders = Recorder.split(";");
        for(var i=0;i<Recorders.length;i++){
            if(userName==Recorders[i]){
                if(userName.toUpperCase()==index.toUpperCase()){
                    $.ajax({
                        "type" : 'post',
                        "url": "../ScrDailyController/delTrader",
                        // "data":{userName:name,id:wfgdDailyId,name:Recorder,tradersTime:timeName},
                        "data":{userName:name,id:wfgdDailyId,name:Recorder},
                        "success":function(Json){
                            if(Json.data==1){
                                layer.alert('刪除成功',{icon:1});
                                setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                            }
                        }
                    });
                    return;
                }
                var projectId = $("#project").val();
                $.ajax({
                    "type" : 'post',
                    "url": "../ScrDailyController/delTrader",
                    // "data":{userName:name,id:wfgdDailyId,name:Recorder,tradersTime:timeName},
                    "data":{userName:name,id:wfgdDailyId,name:Recorder},
                    "success":function(Json){
                        if(Json.data==1){
                            layer.alert('刪除成功',{icon:1});
                            setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                        }
                    }
                });
                return;
            }
        }
        Recorder = Recorder +";"+ userName;
    }else{
        Recorder = userName;
    }

    if(userName.toUpperCase()==index.toUpperCase()){
        $.ajax({
            "type" : 'post',
            "url": "../ScrDailyController/delTrader",
            "data":{userName:name,id:wfgdDailyId,name:Recorder},
            "success":function(Json){
                if(Json.data==1){
                    layer.alert('删除成功',{icon:1});
                    setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                }
            }
        });
        return;
    }
    var projectId = $("#project").val();
    $.ajax({
        "type" : 'post',
        "url": "../ScrDailyController/delTrader",
        "data":{userName:name,id:wfgdDailyId,name:Recorder},
        "success":function(Json){
            if(Json.data==1){
                layer.alert('删除成功',{icon:1});
                setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
            }
        }
    });
}

function fill(data){
    var tbody1 = document.getElementById("tbody1");
    var tbody3 = document.getElementById("tbody3");
    var tbody4 = document.getElementById("tbody4");
    var index1 = 1,index3 = 1,index4 = 1;
    for(var i=1;i<3;i++){
        document.getElementById(""+i+"-1").innerHTML = 0;
        document.getElementById(""+i+"-2").innerHTML = 0;
        document.getElementById(""+i+"-3").innerHTML = 0;
        document.getElementById(""+i+"-4").innerHTML = 0;
        document.getElementById(""+i+"-5").innerHTML = "<img src='../img/week/update.png' onclick='add1("+i+")'/>";
    }

    for(var i=0;i<data.length;i++){
        var tr = document.createElement("tr");
        tr.setAttribute("id", "123");
        if(data[i].type==1){
            var td = "<td>"+index1+"</td><td  colspan='8'>"+data[i].content1+"</td>"+
                "<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
                "<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
            index1++;
            tr.innerHTML = td;
            tbody1.appendChild(tr);
        }else if(data[i].type==2){
            var num = data[i].content1
            document.getElementById(""+num+"-1").innerHTML = data[i].content2;
            document.getElementById(""+num+"-2").innerHTML = data[i].content3;
            document.getElementById(""+num+"-3").innerHTML = data[i].content4;
            document.getElementById(""+num+"-4").innerHTML = data[i].content5;
            document.getElementById(""+num+"-5").innerHTML = "<img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>";
        }else if(data[i].type==3){
            var td = "<td>"+index3+"</td><td colspan='3'>"+data[i].content1+"</td><td colspan='5'>"+data[i].content2+"</td>" +
                "<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
                "<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
            index3++;
            tr.innerHTML = td;
            tbody3.appendChild(tr);
        }else if(data[i].type==4){
            var td = "<td>"+index4+"</td><td colspan='3'>"+data[i].content1+"</td><td colspan='5'>"+data[i].content2+"</td>" +
                "<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
                "<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
            tr.innerHTML = td;
            tbody4.appendChild(tr);
            index4++;
        }
    }

    if(index1==1){
        var tr11 = document.createElement("tr");
        tr11.setAttribute("id", "123");
        var td11 = "<td colspan='10'>尚未添加内容</td>";
        tr11.innerHTML = td11;
        tbody1.appendChild(tr11);
    }
    if(index3==1){
        var tr13 = document.createElement("tr");
        tr13.setAttribute("id", "123");
        var td13 = "<td colspan='10'>尚未添加内容</td>";
        tr13.innerHTML = td13;
        tbody3.appendChild(tr13);
    }
    if(index4==1){
        var tr14 = document.createElement("tr");
        tr14.setAttribute("id", "123");
        var td14 = "<td colspan='10'>尚未添加内容</td>";
        tr14.innerHTML = td14;
        tbody4.appendChild(tr14);
    }
    var tr1 = document.createElement("tr");
    tr1.setAttribute("id", "123");
    var td1 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(1)'/></td>";
    tr1.innerHTML = td1;
    tbody1.appendChild(tr1);

    var tr3 = document.createElement("tr");
    tr3.setAttribute("id", "123");
    var td3 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(3)'/></td>";
    tr3.innerHTML = td3;
    tbody3.appendChild(tr3);

    var tr4 = document.createElement("tr");
    tr4.setAttribute("id", "123");
    var td4 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(4)'/></td>";
    tr4.innerHTML = td4;
    tbody4.appendChild(tr4);
}

//填充班组运行情况A
function fillA(project,datetime,type){
    project = Number(project);
    $.ajax({
        type: 'get',
        url: "/guide/ScrDailyController/getTeamOperationLog",
        data: {date: datetime, departmentId: project,type: type},
        success: function (Json) {
            var data = Json.data;
            var tbody0 = document.getElementById("tbody0");
            var tr  = "";
            if (data == null || data.length == 0){
                tr = "<tr><td colspan='10'>无</td></tr>"
            } else {
                for (var i = 0; i < data.length; i ++) {
                    tr += "<tr><td>"+(i+1)+"</td><td colspan='2' style='cursor: pointer;color: red;' onclick='showDetailedInfoDiv("+data[i].id+","+data[i].type+")'>"+data[i].number+"</td><td colspan='3'>创建缺陷&nbsp;&nbsp;"+data[i].abs+"</td><td colspan='2'>"+data[i].creatName+"</td><td colspan='2'>"+data[i].createTime+"</td></tr>";
                }
            }
            tbody0.innerHTML = tr;
        }
    });
}

function showDetailedInfoDiv (id) {
    $.ajax({
        type: 'GET',
        url: "/guide/defect/getDefectById",
        data: {id:id},
        success: function (data) {
            layer.open({
                type: 2,
                title: ["缺陷详情页面", 'font-size:20px;font-weight:bold;text-align:center;'],
                area: ['100%', '100%'],
                fixed: false, //不固定
                maxmin: true,
                content: '../defect/toDefectDetailed?id=' + id
            });
        }
    })
}

function add1(content1){
    var userName = sessionStorage.Username;
    var projectId = $("#project").val();
    var traders = document.getElementById("traders").innerHTML;
    if(!traders){
        layer.alert('请先填写交班人一栏', {icon : 2});
        return;
    }
    if(!compareTime()){
        return;
    }
    var wfgdDailyId= sessionStorage.wfgdDailyId;
    layer.open({
        type: 2,
        title:["运行日志添加",'font-size:20px;font-weight:bold;'],
        area: ['500px', '400px'],
        fixed: false, //不固定s
        maxmin: true,
        content: '../ScrDailyController/add1?type=2&&scrDailyId='+wfgdDailyId+'&&content1='+content1
    });

}

function add(type){
    var userName = sessionStorage.Username;
    var projectId = $("#project").val();
    var traders = document.getElementById("traders").innerHTML;
    if(!traders){
        layer.alert('请先填写交班人一栏', {icon : 2});
        return;
    }
    if(!compareTime()){
        return;
    }
    var wfgdDailyId= sessionStorage.wfgdDailyId;
    layer.open({
        type: 2,
        title:["运行日志添加",'font-size:20px;font-weight:bold;'],
        area: ['500px', '400px'],
        fixed: false, //不固定
        maxmin: true,
        content: '../ScrDailyController/add1?type='+type+"&&scrDailyId="+wfgdDailyId
    });


    var wfgdDailyId = sessionStorage.wfgdDailyId;
    var type1 = sessionStorage.wfgdDailyType;
    var datetime = sessionStorage.wfgdDailydatetime;


    var Successor = sessionStorage.wfgdDailySuccessor;

    var Recorder=sessionStorage.wfgdDailyRecorder;

}


function upd(id,type){
    var userName = sessionStorage.Username;
    var projectId = $("#project").val();

    if(!compareTime()){
        return;
    }
    layer.open({
        type: 2,
        title:["运行日志修改",'font-size:20px;font-weight:bold;'],
        area: ['500px', '400px'],
        fixed: false, //不固定
        maxmin: true,
        content: '../ScrDailyController/upd1?id='+id+'&&type='+type
    });

}

function del(id,type){

    var userName = sessionStorage.Username;
    var projectId = $("#project").val();

    if(!compareTime()){
        return;
    }
    layer.confirm('确认删除？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            "type" : 'post',
            "url": "../ScrDailyController/del",
            "data":{id:id},
            "success":function(Json){
                if(Json.data==1){
                    var userName = sessionStorage.Username;
                    var projectId = $("#project").val();
                    var wfgdDailyId= sessionStorage.wfgdDailyId;
                    var type1 = sessionStorage.wfgdDailyType;
                    var datetime = sessionStorage.wfgdDailydatetime;
                    var Successor = sessionStorage.wfgdDailySuccessor;
                    var Recorder=sessionStorage.wfgdDailyRecorder;
                    if(Recorder != ""&&Recorder != null){
                        var Recorders = Recorder.split(";");
                        for(var i=0;i<Recorders.length;i++){
                            if(userName==Recorders[i]){

                                $.ajax({
                                    "type" : 'post',
                                    "url": "../ScrDailyController/addSuccessor2",
                                    "data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
                                    "success":function(Json){
                                        if(Json.data==1){
                                            // layer.alert('添加成功',{icon:1});
                                            // setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                                        }
                                    }
                                });
                                layer.alert('删除成功',{icon:1});
                                setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                                return;
                            }
                        }
                        Recorder = Recorder +";"+ userName;
                    }
                    else{
                        Recorder = userName;
                    }


                    $.ajax({
                        "type" : 'post',
                        "url": "../ScrDailyController/addSuccessor2",
                        "data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
                        "success":function(Json){
                            if(Json.data==1){
                                // layer.alert('添加成功',{icon:1});
                                // setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                            }
                        }
                    });
                    layer.alert('删除成功',{icon:1});
                    setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
                }
            },
            "error":function(){
                layer.alert("系统繁忙");
            }
        });
    }, function(){
        layer.msg('已取消', {icon: 1});
        return false;
    });

}

function getPermissionId(index){
    return 18+index
}

function updScrDaily(){
    var userName = sessionStorage.Username;
    var projectId = $("#project").val();
    var datetime = $('#datetime').val();
    var group = $('#group').val();
    var type = $('#type').val();
    if(!compareTime()){
        return;
    }
    layer.open({
        type: 2,
        title:["运行日志修改",'font-size:20px;font-weight:bold;'],
        area: ['500px', '400px'],
        fixed: false, //不固定
        maxmin: true,
        content: '../ScrDailyController/updScrDaily?datetime='+datetime+'&&type=' + type+'&&project='+projectId+'&&other=2'
    });
}
