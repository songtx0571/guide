$(function(){
    $('#equip').datagrid({
        url: '/guide/equipment/getEquipmentList',
        method: 'get',
        title: '设备创建',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { type: '2' }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', align: 'center', hidden:true},
            {field: 'name', title: '名称', width: 30,align: 'center',height: 10},
            {field: 'departmentName', title: '部门', width: 30,align: 'center',height: 10},
            {field: 'edit', title: '操作', width: 10, align: 'center',height: 10,
                formatter: function (value, row, index) {
                    var html="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block' onclick='updEquipment("+row.id+")'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'>编辑</a></div>\
                    <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block' onclick='delEquip(" + row.id + ")'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'>删除</a></div>";
                    return html;
                }
            },
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#equip').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
    });
});

/**
 * 打开编辑弹窗
 * @param id
 */
function updEquipment(id) {

    $.ajax({
        url: '/guide/equipment/findEquipment',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'id':id},
        success: function (data) {
            if(data!=null&&data!=''){
                $("#name").textbox('setValue',data.name);
                $("#departName").textbox('setValue',data.departmentName);
                $("#EquipId").val(data.id);
            }
        }
    });
    addEquipment=$('#equipment').window({
        title:'新建',
        height: 300,
        width: 850,
        closed: true,
        minimizable:false,
        maximizable:false,
        collapsible:false,
        cache:false,
        shadow:false
    });
    addEquipment.window('open');
}

/**
 * 删除设备
 * @param id
 */
function delEquip(id) {
    $.messager.confirm("提示","确定要删除吗", function (data){
        if(data){
            $.ajax({
                url: '/guide/equipment/delEquipment',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'id':id},
                success: function (data) {
                    if(data!=null&&data[0]=='error'){
                        $.messager.alert("提示","操作失败,请联系技术人员");
                    }
                    $('#equip').datagrid('reload');//刷新页面数据
                }
            });
        }
    });

}

