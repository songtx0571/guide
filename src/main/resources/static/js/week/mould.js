$(function(){
    //获取部门信息
    $.ajax({
        type:"post",
        url:"/guide/template/getDepartmentList",
        dataType:"json",
        success:function(json){
            $('#depart').combobox({
                valueField: "id", //Value字段
                textField: "text", //Text字段
                panelHeight:"300",
                data:json,
            });
        }
    });
    //获取系统号
    $.ajax({
        type:"post",
        url:"/guide/template/getTemplateMap",//请求后台数据
        dataType:"json",
        success:function(json){
            $("#Template").combobox({//往下拉框塞值
                data:json,
                valueField:"id",//value值
                textField:"text",//文本值
                panelHeight:"300"
            });
            var data = $('#Template').combobox('getData');
            $('#Template').combobox('select',data[0].id);
        }
    });
});

/**
 * 根据名称查询测点
 */
function searchByWorkPer() {
    var depart= $('#depart').combobox('getValue');
    var Template= $('#Template').combobox('getValue');
    if(depart==''||depart==null){
        $.messager.alert("提示","请选择部门!");
        $('#depart').focus;
        return;
    }
    if(Template==''||Template==null){
        $.messager.alert("提示","请选择模板!");
        $('#Template').focus;
        return;
    }
    //请求后台数据
    $.ajax({
        type:"post",
        url:"/guide/mould/getMouldList",//请求后台数据
        dataType:"json",
        data: {'depart':depart,'Template':Template},
        success:function(json){
            var html='<tr><td></td><td>开始时间</td><td>结束时间</td><td>历时</td><td>巡检人</td><td>人工巡检数</td><td>AI巡检数</td></tr>';
            for(var i=0;i<json.length;i++){
                var mouldData=json[i];
                var id=mouldData.id;//员工模板id
                var startTime=mouldData.startTime;//开始时间
                var endTime=mouldData.endTime;//结束时间
                var count=mouldData.count;//人工巡检数
                var AIcount=mouldData.AIcount;//人工巡检数
                var status=mouldData.status;//状态
                var userName=mouldData.userName;//巡检人
                var diachronic=mouldData.diachronic;//历时
                html+='<tr id="tr'+id+'"><td id="'+id+'"><a href="javascript:openPostPerData('+id+')" class="a">'+status+'</a></td><td>'+startTime+'</td><td>'+endTime+'</td><td>'+diachronic+
                    '</td><td>'+userName+'</td><td>'+count+'</td><td>'+AIcount+'</td></tr>';
            }
            $("#mouldTable").html(html);
        }
    });
}

/**
 * 弹窗:查看员工数据
 * 条件:根据员工模板id
 */
function openPostPerData(id) {
    var listTr=new Array();
    listTr=$('tr[id*="tr"]');
    for(var i=0;i<listTr.length;i++){
        var tr=listTr[i];
        var trId=$(tr).attr("id");
        $("#"+trId).removeClass("background_color");
    }
    //获取员工运行数据
    $.ajax({
        url: '/guide/mould/getPostPerData',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: {'id': id},
        success: function (data) {
            $("#tr"+id).removeClass("background_color").addClass("background_color");
            var html='<tr><td>巡检点</td><td>数据</td><td>单位</td><td>时间</td></tr>';
            for(var i=0;i<data.length;i++){
                var postPeratorData=data[i];
                var equipment=postPeratorData.equipment;
                var measuringTypeData=postPeratorData.measuringTypeData;
                var measuringType=postPeratorData.measuringType;
                var unit=postPeratorData.unit;
                var created=postPeratorData.created;
                if(measuringTypeData==null||measuringTypeData==''){
                    measuringTypeData="--";
                }
                if(unit=="Label"){
                    unit="测点";
                }
                var str=new Array();
                str=equipment.split(',');
                equipment=str[0]+"</br>"+str[1]+"</br>"+measuringType;
                html+='<tr><td>'+equipment+'</td><td>'+measuringTypeData+'</td><td>'+unit+'</td><td>'+created+'</td></tr>';
            }
            $("#postPerDataTable").html(html);
        }
    });
    postPerData=$('#postPerData').window({
        title:'查看',
        height: 600,
        width: 550,
        closed: true,
        minimizable:false,
        maximizable:false,
        collapsible:false,
        cache:false,
        shadow:false
    });
    postPerData.window('open');
}

