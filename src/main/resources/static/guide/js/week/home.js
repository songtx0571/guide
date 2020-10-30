window.onload = function() {
    /*var websocket = null;
    //浏览器是否支持
    if ('WebSocket' in window) {

        // 上面我们给webSocket定位的路径
        websocket = new WebSocket('ws://192.168.1.210:80/guide/webSocket');
        //websocket = new WebSocket('ws://localhost:8080/webSocket');
        //websocket = new WebSocket('ws://192.168.1.137:8080/webSocket');
    } else {
        $.messager.alert("提示","该浏览器不支持websocket!");
    }
    //建立连接
    websocket.onopen = function (event) {
        console.log('建立连接');
    }
    //关闭连接
    websocket.onclose = function (event) {
        console.log('连接关闭');
    }
    //消息来的时候的事件
    websocket.onmessage = function (event) {
        $.messager.alert("提示",event.data);
        console.log('收到消息:' + event.data);
    }

    //发生错误时
    websocket.onerror = function () {
        $.messager.alert("","websocket通信发生错误！");
    }
    //窗口关闭时，Websocket关闭
    window.onbeforeunload = function () {
        websocket.close();
    }*/

    jQuery("#nav").accordion({ //初始化accordion
        fillSpace:true,
        fit:true,
        border:false,
        animate:true,
    });
    $.post("/getMenu", { "parent": "0" }, //获取第一层目录
        function (data) {
            $.each(data, function (i, e) {//循环创建手风琴的项
                var id = e.id;
                $('#nav').accordion('add', {
                    title: e.name,
                    content: "<ul id='tree"+id+"' ></ul>",
                    selected: true,
                    iconCls:"icon-open"//e.Icon
                });
                $.parser.parse();
                $.post("/guide/menu/getMenuTree?id="+id,  function(data) {//循环创建树的项
                    $("#tree" + id).tree({
                        data: data,
                        onClick : function(node){
                            if (node.attributes) {
                                Open(node.text, node.url);
                            }
                        }
                    });
                }, 'json');
            });
        }, "json");

    $('#home').datagrid({
        url: '/guide/home/workPeratorList',
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
        //queryParams: { type: 'no' }, //往后台传参数用的。
        columns: [[
            {field: 'id', title: '编号', width: 30, align: 'center'},
            {field: 'patrolTask', title: '巡检任务', width: 30, editor: {type: 'numberbox'}, align: 'center'},
            {field: 'artificialNumber', title: '人工巡检数', width: 30, editor: {type: 'numberbox'}, align: 'center'},
            {field: 'aiNumber', title: 'ai巡检数量', width: 30, editor: {type: 'numberbox'}, align: 'center'},
            {field: 'planTime', title: '计划时间', width: 30, editor: {type: 'numberbox'}, align: 'center'},
            {field: 'cycle', title: '周期', width: 30, align: 'center'},

        ]],
        onClickRow: function(rowIndex, rowData){
            $('#home').datagrid('clearSelections');
        },
    });
    //在右边center区域打开菜单，新增tab
    function Open(text, url) {
        if ($("#tabs").tabs('exists', text)) {
            $('#tabs').tabs('select', text);
        } else {
            $('#tabs').tabs('add', {
                title : text,
                closable : true,
                content : '<iframe width="100%" height="100%" frameborder="0" src="'+url+'" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
            });
        }
    }
    //监听右键事件，创建右键菜单
    $('#tabs').tabs({
        onContextMenu:function(e, title,index){
            e.preventDefault();
            if(index>0){
                $('#mm').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        }
    });
    //右键菜单click
    $("#mm").menu({
        onClick : function (item) {
            closeTab(this, item.name);
        }
    });
    //删除Tabs
    function closeTab(menu, type){
        var allTabs = $("#tabs").tabs('tabs');
        var allTabtitle = [];
        $.each(allTabs,function(i,n){
            var opt=$(n).panel('options');
            if(opt.closable)
                allTabtitle.push(opt.title);
        });
        switch (type){
            case 1 :
                var curTabTitle = $(menu).data("tabTitle");
                $("#tabs").tabs("close", curTabTitle);
                return false;
                break;
            case 2 :
                for(var i=0;i<allTabtitle.length;i++){
                    $('#tabs').tabs('close', allTabtitle[i]);
                }
                break;
            case 3 :
                var curTabTitle = $(menu).data("tabTitle");
                for(var i=0;i<allTabtitle.length;i++){
                    if(curTabTitle==allTabtitle[i]){

                    }else{
                        $('#tabs').tabs('close', allTabtitle[i]);
                    }
                }
                break;
        }
    }
}



