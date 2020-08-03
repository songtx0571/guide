$(function(){
    //获取部门信息
    $.ajax({
        type:"post",
        url:"/guide/template/getDepartmentList",
        dataType:"json",
        success:function(json){
            $('#departName').combobox({
                valueField: "id", //Value字段
                textField: "text", //Text字段
                panelHeight:"300",
                data:json,
                onChange:function(newValue,oldValue){
                    var departName= $('#departName').combobox('getValue');
                    //获取系统号
                    $.ajax({
                        type:"post",
                        url:"/guide/equipment/getEquMap",//请求后台数据
                        dataType:"json",
                        data: {'type':'1','departName':departName},
                        success:function(json){
                            $("#sysName").combobox({//往下拉框塞值
                                data:json,
                                valueField:"id",//value值
                                textField:"text",//文本值
                                panelHeight:"300"
                            });
                            var data = $('#sysName').combobox('getData');
                            $('#sysName').combobox('select',data[0].id);
                        }
                    });
                    //获取设备
                    $.ajax({
                        type:"post",
                        url:"/guide/equipment/getEquMap",//请求后台数据
                        dataType:"json",
                        data: {'type':'2','departName':departName},
                        success:function(json){
                            $("#equName").combobox({//往下拉框塞值
                                data:json,
                                valueField:"id",//value值
                                textField:"text",//文本值
                                panelHeight:"300",
                                onLoadSuccess:function(){
                                    var departName= $('#departName').combobox('getValue');
                                    var sysName= $('#sysName').combobox('getText');
                                    var equName= $('#equName').combobox('getText');
                                    var name=sysName+","+equName;
                                    $.ajax({
                                        type:"post",
                                        url:"/guide/inquiries/getUnityMap",//请求后台数据
                                        dataType:"json",
                                        data: {'departName':departName,'name':name},
                                        success:function(json){
                                            $("#measuringType").combobox({//往下拉框塞值
                                                data:json,
                                                valueField:"id",//value值
                                                textField:"text",//文本值
                                                panelHeight:"300"
                                            });
                                            var data = $('#measuringType').combobox('getData');
                                            $('#measuringType').combobox('select',data[0].id);
                                        }
                                    });
                                },
                                onChange:function(newValue,oldValue){
                                    var departName= $('#departName').combobox('getValue');
                                    var sysName= $('#sysName').combobox('getText');
                                    var equName= $('#equName').combobox('getText');
                                    var name=sysName+","+equName;
                                    $.ajax({
                                        type:"post",
                                        url:"/guide/inquiries/getUnityMap",//请求后台数据
                                        dataType:"json",
                                        data: {'departName':departName,'name':name},
                                        success:function(json){
                                            $("#measuringType").combobox({//往下拉框塞值
                                                data:json,
                                                valueField:"id",//value值
                                                textField:"text",//文本值
                                                panelHeight:"300"
                                            });
                                            var data = $('#measuringType').combobox('getData');
                                            $('#measuringType').combobox('select',data[0].id);
                                        }
                                    });
                                }
                            });
                            var data = $('#equName').combobox('getData');
                            $('#equName').combobox('select',data[0].id);
                        }
                    });
                }
            });
        }
    });
    //获取系统号
    $.ajax({
        type:"post",
        url:"/guide/equipment/getEquMap",//请求后台数据
        dataType:"json",
        data: {'type':'1'},
        success:function(json){
            $("#sysName").combobox({//往下拉框塞值
                data:json,
                valueField:"id",//value值
                textField:"text",//文本值
                panelHeight:"300"
            });
            var data = $('#sysName').combobox('getData');
            $('#sysName').combobox('select',data[0].id);
        }
    });
    //获取设备
    $.ajax({
        type:"post",
        url:"/guide/equipment/getEquMap",//请求后台数据
        dataType:"json",
        data: {'type':'2'},
        success:function(json){
            $("#equName").combobox({//往下拉框塞值
                data:json,
                valueField:"id",//value值
                textField:"text",//文本值
                panelHeight:"300",
                onLoadSuccess:function(){
                    var departName= $('#departName').combobox('getValue');
                    var sysName= $('#sysName').combobox('getText');
                    var equName= $('#equName').combobox('getText');
                    var name=sysName+","+equName;
                    $.ajax({
                        type:"post",
                        url:"/guide/inquiries/getUnityMap",//请求后台数据
                        dataType:"json",
                        data: {'departName':departName,'name':name},
                        success:function(json){
                            $("#measuringType").combobox({//往下拉框塞值
                                data:json,
                                valueField:"id",//value值
                                textField:"text",//文本值
                                panelHeight:"300"
                            });
                            var data = $('#measuringType').combobox('getData');
                            $('#measuringType').combobox('select',data[0].id);
                        }
                    });
                },
                onChange:function(newValue,oldValue){
                    var departName= $('#departName').combobox('getValue');
                    var sysName= $('#sysName').combobox('getText');
                    var equName= $('#equName').combobox('getText');
                    var name=sysName+","+equName;
                    $.ajax({
                        type:"post",
                        url:"/guide/inquiries/getUnityMap",//请求后台数据
                        dataType:"json",
                        data: {'departName':departName,'name':name},
                        success:function(json){
                            $("#measuringType").combobox({//往下拉框塞值
                                data:json,
                                valueField:"id",//value值
                                textField:"text",//文本值
                                panelHeight:"300"
                            });
                            var data = $('#measuringType').combobox('getData');
                            $('#measuringType').combobox('select',data[0].id);
                        }
                    });
                }
            });
            var data = $('#equName').combobox('getData');
            $('#equName').combobox('select',data[0].id);
        }
    });
});

/**
 * 根据名称查询测点
 */
function searchByEqu() {
    var departName= $('#departName').combobox('getValue');
    var sysName= $('#sysName').combobox('getText');
    var equName= $('#equName').combobox('getText');
    var measuringType= $('#measuringType').combobox('getText');
    if(departName==''||departName==null){
        $.messager.alert("提示","请选择部门!");
        return;
    }
    if(sysName==''||sysName==null){
        $.messager.alert("提示","请选择系统号!");
        return;
    }
    if(equName==''||equName==null){
        $.messager.alert("提示","请选择设备名称!");
        return;
    }
    var name=sysName+","+equName;
    // 显示查询的模板
    $('#inquiresTable').datagrid({
        url: '/guide/inquiries/getInquiriesData',
        method: 'get',
        title: '查询数据',
        //width: 'auto',
        height: 600,
        //fitColumns: true,//自适应列
        loadMsg: '正在加载信息...',
        pagination: true,//允许分页
        //singleSelect: true,//单行选中。
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 15, 20, 30, 50],
        queryParams: { 'name':name,'departName':departName,'measuringType':measuringType }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 30, align: 'center',height: 10,hidden:true},
            {field: 'measuringType', title: '测点类型', width: 30, align: 'center',height: 10},
            {field: 'measuringTypeData', title: '数据', width: 30, align: 'center',height: 10},
            {field: 'unit', title: '单位', width: 30, align: 'center',height: 10},
            {field: 'createdByName', title: '巡检人', width: 30, align: 'center',height: 10},
            {field: 'created', title: '时间', width: 30, align: 'center',height: 10},
        ]],
        onClickRow: function(rowIndex, rowData){
            $('#inquiresTable').datagrid('clearSelections');
        },
        onLoadSuccess: function (data) {
            if (data.total == 0) {

            }
            else $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
        },
    });
}

