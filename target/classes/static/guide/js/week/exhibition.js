$(function(){
    $('#bg').datagrid({
        url: '/guide/template/getTemplate',
        method: 'get',
        title: '巡检模板',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        //queryParams: { type: 'yes' }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', align: 'center', hidden:true},
            {field: 'staus', title: '状态', hidden:true },
            {field: 'patrolTask', title: '巡检任务', width: 30, align: 'center',
                formatter: function (value, row, index) {
                    var html='<a href="javascript:void(0);" onclick="javascript:openExhibitopn('+row.id+')" style="text-decoration: none">'+row.patrolTask+'</a>';
                    return html;
            }
            },
            {field: 'departmentName', title: '项目部', width: 60, align: 'center'},
            {field: 'artificialNumber', title: '人工巡检数', width: 30, align: 'center'},
            {field: 'aiNumber', title: 'ai巡检数量', width: 30,align: 'center'},
            {field: 'planTime', title: '计划时间/分钟', width: 30,align: 'center'},
            {field: 'cycle', title: '周期/小时', width: 30, align: 'center'},
            {field: 'edit', title: '状态', width: 55, align: 'center',
                formatter: function (value, row, index) {
                    var action="";
                    if(row.status=='1'){//启用状态
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00ee00;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",1)'>启用</a></div>\
                        <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",2)'>暂停</a></div>";
                        //<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",3)'>删除</a></div>";
                    }else if(row.status=='2'){//暂停状态
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",1)'>启用</a></div>\
                        <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00ee00;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",2)'>暂停</a></div>";
                        //<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",3)'>删除</a></div>";
                    }else {//已删除
                        action="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",1)'>启用</a></div>\
                        <div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",2)'>暂停</a></div>";
                        //<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'  onclick='EditStatus(" + row.id + ",3)'>删除</a></div>";
                    }
                    return action;
                }
            },
            {field: 'open', title: '编辑', width: 20, align: 'center',
                formatter: function (value, row, index) {
                    var html="<div style='width: 50px;height: 30px;line-height:30px;text-align:center;background-color: #00BBEE;border-radius: 5px;display: inline-block' onclick='openWorkPerator2("+row.id+")'><a style='text-decoration: none;color: #222222' href='javascript:void(0);'>编辑</a></div>";
                    return html;
                }
            },
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#bg').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
    });
    //获取部门信息
    $.ajax({
        type:"post",
        url:"/guide/template/getDepartmentList",
        dataType:"json",
        success:function(json){
            $("#department").combobox({//往下拉框塞值
                data:json,
                valueField:"id",//value值
                textField:"text",//文本值
                panelHeight:"auto"
            });
        }
    });
});

function openExhibitopn(id){
    //设置部门下拉选项
    $.ajax({
        type:"post",
        url:"/guide/template/getDepartmentList",
        dataType:"json",
        async: false,
        success:function(json){
            $("#department").combobox({//往下拉框塞值
                data:json,
                valueField:"id",//value值
                textField:"text",//文本值
                panelHeight:"auto"
            });
        }
    });
    //获取模版记录
    $.ajax({
        url: '/guide/template/getWorkPerator',
        type: 'GET',
        dataType: 'json',
        async: false,
        data:{'id':id},
        success: function (data) {
            $('#cycle').combobox('select',data.cycle);
            $('#patrolTask').textbox("setValue",data.patrolTask);
            $('#planTime').textbox("setValue",data.planTime);
            $("#workId").val(data.id);
            var department=data.projectDepartment;//部门
            $("#department").combobox("setValue",department);
        },
    });
    addDataWin=$('#workPerator').window({
        title:'新建模板',
        height: 480,
        width: 850,
        closed: true,
        minimizable:false,
        maximizable:false,
        collapsible:false,
        cache:false,
        shadow:false
    });
    addDataWin.window('open');
}


//修改模板状态
function EditStatus(id,status){
    if(status==3){
        $.messager.confirm("提示","确定要删除吗", function (data){
            if(data){
                $.ajax({
                    url: '/guide/template/updStatus',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':id,'status':status},
                    success: function (data) {
                        $.messager.alert("提示",data[0]);
                        $('#bg').datagrid('reload');//刷新页面数据
                    },
                });
            }
        });
    }else{
        $.ajax({
            url: '/guide/template/updStatus',
            type: 'GET',
            dataType: 'json',
            async: false,
            data:{'id':id,'status':status},
            success: function (data) {
                $.messager.alert("提示",data[0]);
                $('#bg').datagrid('reload');//刷新页面数据
            },
        });
    }
}

//跳转创建路线页面
function openWorkPerator2(id) {
    var text="编辑模板-"+id;
    if (parent.$('#tabs').tabs('exists',text)){
        parent.$('#tabs').tabs('select', text);
    }else {
        var content = '<iframe width="100%" height="100%" frameborder="0" src="/guide/template/toTemplateChild?temid='+id+'" style="width:100%;height:100%;margin:0px 0px;"></iframe>';
        parent.$('#tabs').tabs('add',{
            title:text,
            content:content,
            closable:true
        });
    }
}
