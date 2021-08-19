$(function(){
    var temid=$("#workId").val();
    $('#tempChild').datagrid({
        url: '/guide/template/getTemplateChildList',
        method: 'get',
        title: '路线规划列表',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { 'temid': temid }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 30, align: 'center',hidden:true},
            {field: 'equipment', title: '设备名称', width: 30},
            {field: 'measuringType', title: '测点类型', width: 30, align: 'center'},
            {field: 'unit', title: '单位', width: 30, align: 'center'},
            {field: 'status', title: '状态', width: 30, align: 'center',
                formatter: function (value, row, index) {
                    var action="";
                    if(row.status=='1'){//启用状态
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00ee00;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",1)'>启用</a></div>\
                        <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",2)'>暂停</a></div>";
                    }else if(row.status=='2'){//暂停状态
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",1)'>启用</a></div>\
                        <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00ee00;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",2)'>暂停</a></div>";
                    }else {
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",1)'>启用</a></div>\
                        <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",2)'>暂停</a></div>";
                    }
                    return action;
                }
            },
            {field: 'edit', title: '操作', width: 40, align: 'center',
                formatter: function (value, row, index) {
                    var action="";
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00bbee;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='updWorkChild(" + row.id + ")'>编辑</a></div>\
                                <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00bbee;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditPriority(" + row.id + ")'>上移</a></div>\
                                <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00bbee;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='delWorkChild(" + row.id + ")'>删除</a></div>";
                    return action;
                }
            },
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#tempChild').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
    });
    //加载编辑下拉框
    $.ajax({
        type:"post",
        url:"/guide/template/getSysNameList",//获取系统号
        data: {'temid':temid},
        dataType:"json",
        success:function(json){
            if (json.code == 0 || json.code == 200) {
                $("#sysName").combobox({
                    data:json.data,
                    valueField:"id",//value值
                    textField:"name",//文本值
                    panelHeight:"300"
                })
            } else {
                layer.alert(json.msg);
            }
        }
    });
    $.ajax({
        type:"post",
        url:"/guide/template/getEquNameList",//获取设备名
        data: {'temid':temid},
        dataType:"json",
        success:function(json){
            if (json.code == 0 || json.code == 200) {
                $("#equName").combobox({//往下拉框塞值
                    data:json.data,
                    valueField:"id",
                    textField:"name",
                    panelHeight:"300"
                })
            } else {
                layer.alert(json.msg)
            }

        }
    });
    $.ajax({
        type:"post",
        url:"/guide/template/getSightType",//获取测点类型
        data: {'type':'2','temid':temid},
        dataType:"json",
        success:function(json){
            if (json.code == 0 || json.code == 200) {
                $("#sightType").combobox({
                    data:json.data,
                    valueField:"id",//value值
                    textField:"name",//文本值
                    panelHeight:"300"
                })
            } else {
                layer.alert(json.msg)
            }
        }
    });
    $.ajax({
        type:"post",
        url:"/guide/template/getSightType",//获取
        data: {'type':'1','temid':temid},
        dataType:"json",
        success:function(json){
            if (json.code == 0 || json.code == 200) {
                $("#unitType").combobox({
                    data:json,
                    valueField:"id",//value值
                    textField:"name",//文本值
                    panelHeight:"300"
                })
            } else {
                layer.alert(json.msg)
            }
        }
    });
});

//修改路线状态
function EditStatus(id,status){
    $.ajax({
        url: '/guide/template/updStatus',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'id':id,'status':status},
        success: function (data) {
            if (data.code == 0 || data.code == 200) {
                $.messager.alert("提示",data.data[0]);
                $('#tempChild').datagrid('reload');//刷新页面数据
            } else {
                layer.alert(data.msg)
            }
        },
    });
}

//修改执行循序
function EditPriority(id){
    var workId=$("#workId").val();//parentId
    $.ajax({
        url: '/guide/template/updPriority',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'id':id,'workId':workId},
        success: function (data) {
            if (data.code == 0 || data.code == 200) {
                $('#tempChild').datagrid('reload');//刷新页面数据
            } else {
                layer.alert(data.msg)
            }
        },
    });
}


//删除路线
function delWorkChild(id){
    $.messager.confirm("提示","确定要删除吗",function(data){
        if(data){
            $.ajax({
                url: '/guide/template/delWorkChild',
                type: 'GET',
                dataType: 'json',
                async: false,
                data:{'id':id},
                success: function (data) {
                    if (data.code == 0 || data.code == 200) {
                        $('#tempChild').datagrid('reload');//刷新页面数据
                    } else {
                        layer.alert(data.msg)
                    }
                },
            });
        }
    });
}
//编辑路线
function updWorkChild(id) {
    $.ajax({
        url: '/guide/template/getWorkperator',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'id':id},
        success: function (data) {
            if (data.code == 0 || data.code == 200) {
                data = data.data;
                $('#sysName').combobox('setText',data.sysName);
                $('#equName').combobox('setText',data.equipment);
                $('#sightType').combobox('setText',data.measuringType);
                $('#unitType').combobox('setText',data.unit);
                $('#temChildId').val(data.id);
            } else {
                layer.alert(data.msg);
            }

        },
    });
    addTempChildWin=$('#updtempChild').window({
        title:'新建路线',
        height: 400,
        width: 900,
        closed: true,
        minimizable:false,
        maximizable:false,
        collapsible:false,
        cache:false,
        shadow:false
    });
    addTempChildWin.window('open');
}
