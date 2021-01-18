$(function(){
    var postPeratorId=$("#postPeratorId").val();
    $('#mouldChildTable').datagrid({
        url: '/guide/mould/getPostPerData',
        method: 'get',
        title: '',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { 'postPeratorId': postPeratorId}, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 30, align: 'center',hidden:true},
            {field: 'equipment', title: '设备', width: 30, align: 'center'},
            {field: 'measuringType', title: '测点类型',align: 'center', width: 30},
            {field: 'measuringTypeData', title: '数据', width: 30, align: 'center'},
            {field: 'unit', title: '单位', width: 30, align: 'center'},
            {field: 'created', title: '执行时间', width: 30, align: 'center'},
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#mouldChildTable').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
    });
});

