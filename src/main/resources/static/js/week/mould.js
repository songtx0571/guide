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
                onChange:function(newValue,oldValue){
                    var departName= $('#depart').combobox('getValue');
                    //获取系统号
                    $.ajax({
                        type:"post",
                        url:"/guide/template/getTemplateMap",//请求后台数据
                        data: {'depart':departName},
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
                }
            });
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
    // 显示查询的模板
    $('#mouldTable').datagrid({
        url: '/guide/mould/getMouldList',
        method: 'get',
        title: '查询模板',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { 'depart':depart,'Template':Template }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 30, align: 'center',height: 10},
            {field: 'status', title: '状态', width: 30, align: 'center',height: 10},
            {field: 'startTime', title: '开始时间', width: 30, align: 'center',height: 10},
            {field: 'endTime', title: '结束时间', width: 30, align: 'center',height: 10},
            {field: 'diachronic', title: '历时', width: 30, align: 'center',height: 10},
            {field: 'userName', title: '巡检人', width: 30, align: 'center',height: 10},
            {field: 'count', title: '人工巡检数', width: 30, align: 'center',height: 10},
            {field: 'AIcount', title: 'AI巡检数', width: 30, align: 'center',height: 10}
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#mouldTable').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
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

