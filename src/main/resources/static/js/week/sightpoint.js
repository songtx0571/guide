$(function(){
    $('#sightpoint').datagrid({
        url: '/guide/unit/getUnitList',
        method: 'get',
        title: '属性',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { mold: '2' }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 20, align: 'center',height: 10,hidden:true},
            {field: 'type', title: '类型', width: 20,align: 'center',height: 10,hidden:true},
            {field: 'nuit', title: '名称', width: 30,align: 'center',height: 10},
            {field: 'edit', title: '操作', width: 20, align: 'center',height: 10,
                formatter: function (value, row, index) {
                    var html="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block' onclick='updPoint("+row.id+")'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'>编辑</a></div>\
                    <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block' onclick='delPoint(" + row.id + ")'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'>删除</a></div>";
                    return html;
                }
            },
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#sightpoint').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
    });
});

/*function ComboDataLoader(param, success, error) {
    var q = param.q;
    if (q == undefined || q == "" || q == null)
        return false;
    $.ajax({
        url: "/guide/unit/getUnitLike",
        type: "post",
        data: { 'q': q,},
        dataType: "json",
        success: function (data) {
            success(data);
        },
    });
}*/

/**
 * 打开编辑弹窗
 * @param id
 */
function updPoint(id) {
    $.ajax({
        url: '/guide/unit/findUnit',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'id':id},
        success: function (data) {
            if(data!=null&&data!=''){
                $("#nuit").textbox('setValue',data.nuit);
                $("#pointId").val(data.id);
            }
        }
    });
    addPointWin=$('#pointWin').window({
        title:'新建',
        height: 300,
        width: 400,
        closed: true,
        minimizable:false,
        maximizable:false,
        collapsible:false,
        cache:false,
        shadow:false
    });
    addPointWin.window('open');
}

/**
 * 删除设备
 * @param id
 */
function delPoint(id) {
    $.messager.confirm("提示","确定要删除吗", function (data){
        if(data){
            $.ajax({
                url: '/guide/unit/delUnit',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'id':id},
                success: function (data) {
                    if(data!=null&&data[0]=='error'){
                        $.messager.alert("提示","操作失败,请联系技术人员");
                    }
                    $('#sightpoint').datagrid('reload');//刷新页面数据
                }
            });
        }
    });
}

