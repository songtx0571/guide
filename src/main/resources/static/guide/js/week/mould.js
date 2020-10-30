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
        height: 200,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { 'depart':depart,'Template':Template }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 30, align: 'center',height: 10,hidden:true},
            {field: 'status', title: '状态', width: 30, align: 'center',
                formatter: function (value, row, index) {
                    var html='<a href="javascript:openPostPerData('+row.id+')" style="text-decoration: none">'+row.status+'</a>';
                    return html;
                }
            },
            {field: 'startTime', title: '开始时间', width: 30, align: 'center',height: 10},
            {field: 'endTime', title: '结束时间', width: 30, align: 'center',height: 10},
            {field: 'diachronic', title: '历时', width: 30, align: 'center',height: 10},
            {field: 'userName', title: '巡检人', width: 30, align: 'center',height: 10},
            {field: 'count', title: '人工巡检数', width: 30, align: 'center',height: 10},
            {field: 'AIcount', title: 'AI巡检数', width: 30, align: 'center',height: 10}
        ]],
        onClickRow: function (rowIndex, rowData) {
            $('#mouldTable').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        }
    });
}

/**
 * 查看员工数据
 * 条件:根据员工模板id
 */
function openPostPerData(id) {
    var text="巡检数据-"+id;
    if (parent.$('#tabs').tabs('exists',text)){
        parent.$('#tabs').tabs('select', text);
    }else {
        var content = '<iframe width="100%" height="100%" frameborder="0" src="/guide/mould/toMouldChild?postPeratorId='+id+'" style="width:100%;height:100%;margin:0px 0px;"></iframe>';
        parent.$('#tabs').tabs('add',{
            title:text,
            content:content,
            closable:true
        });
    }
}

