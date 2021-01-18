var path = "";
//全局变量
var developId = "";
var updRoleId = "";
var authoritys = "";
$(function () {
});
//将字符串转化为json
function strToJson(str){
    var json = eval('(' + str + ')');
    return json;
}
//显示开发数据*****************************************************
function showDevelop() {
    $(".develop").css("display","block");
    $(".role").css("display", "none");
    $(".authority").css("display", "none");
    layui.config({
        base: '../'
    }).use(['layer', 'util', 'treeTable'], function () {
        var $ = layui.jquery;
        var layer = layui.layer;
        var util = layui.util;
        var treeTable = layui.treeTable;
        // 渲染表格
        var insTb = treeTable.render({
            elem: '#demoTreeTb',
            url: path +'/authority/getURLList',
            height: 'full',
            tree: {
                iconIndex: 2,
                isPidData: true,
                idName: 'id',
                pidName: 'parentId'
            },
            cols: [
                [
                    {field: '', title: '',width:'0px'},
                    {field: '', title: '',width:'0px'},
                    {title: '权限名称', field: 'name', edit: 'text'},
                    {
                        title: '菜单图标', align: 'center', hide: true,
                        templet: '<p><i class="layui-icon {{d.menuIcon}}"></i></p>'
                    },
                    {title: '路径', field: 'url', edit: 'text'},
                    {title: '备注', field: 'remark', align: 'center', edit: 'text'},
                    {align: 'center', toolbar: '#tbBar', title: '操作', width: 180}
                ]
            ]
        });
        //工具列点击事件
        treeTable.on('tool(demoTreeTb)', function (obj) {
            var data = obj.data;
            var event = obj.event;
             if (event === 'edit') {
                 var authority = {};
                 authority.id = data.id;
                 authority.name = data.name;
                 authority.url = data.url;
                 authority.remark = data.remark;
                 $.ajax({
                     url:path + "/authority/updAistributeURL",
                     dataType: "json",//数据格式
                     type: "post",//请求方式
                     data: JSON.stringify(authority),
                     contentType: "application/json; charset=utf-8",
                     success:function(data){
                         backDatd(data,showDevelop)
                     }
                 });
            }
            else if (event === 'add') {
                 // var tr = $(this).parent().parent().parent().parent();
                 // tr.append(tr.clone(false))
                 $("#addDevelopType").text(data.name);
                 developId = data.id;
                 layui.use('layer', function() { //独立版的layer无需执行这一句
                     var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
                     layer.open({
                         type: 1
                         , id: 'develop_insert' //防止重复弹出
                         , content: $(".develop_insert")
                         , btnAlign: 'c' //按钮居中
                         , shade: 0.4 //不显示遮罩
                         , area: ['100%', '100%']
                         , yes: function () {
                         }
                     });
                 });
            }
        });
        // 全部展开
        $('#btnExpandAll').click(function () {
            insTb.expandAll();
        });

        // 全部折叠
        $('#btnFoldAll').click(function () {
            insTb.foldAll();
        });

        // 展开指定
        $('#btnExpand').click(function () {
            insTb.expand(2);
        });

        // 折叠指定
        $('#btnFold').click(function () {
            insTb.fold(2);
        });

        // 设置选中
        $('#btnChecked').click(function () {
            insTb.expand(4);
            insTb.setChecked([4]);
        });

    });
}
//添加数据
function addDevelop() {
    var authority = {};
    authority.parentId = developId;
    authority.name = $("#addDevelopName").val();
    authority.type = $("#addDevelopType").val();
    authority.url = $("#addDevelopUrl").val();
    authority.remark = $("#addDevelopRemark").val();
    $.ajax({
        url:path + "/authority/addAistributeURL",
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: JSON.stringify(authority),
        contentType: "application/json; charset=utf-8",
        success:function(data){
            $("#addDevelopName").val("");
            $("#addDevelopUrl").val("");
            $("#addDevelopRemark").val("");
            backDatd(data,showDevelop);
        }
    });
}
//用户权限分配*****************************************************
function showAuthority() {
    $(".develop").css("display", "none");
    $(".role").css("display", "none");
    $(".authority").css("display", "block");
    showAuthorityList();
    showPathInfo();
}
//显示路径详细信息
function showPathInfo() {
    layui.use(['form'],function(){
        var form = layui.form;
        $.ajax({
            type:'GET',
            url:path + "/getAuthorityMap",
            success:function(data){
                data = strToJson(data);
                $("#pathList").empty();
                var option = "<option value='0' >请选择路径</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#pathList').html(option);
                form.render();//菜单渲染 把内容加载进去
                form.render('select');
            }
        });
        form.on('select(pathList)', function(data) {
            $("#pathListHidden").val(data.value);
            $.ajax({
                type: "GET",
                url: path + "/getAuthorityMap",
                data: {"id": $("#pathListHidden").val()},
                dataType: "json",
                success: function (data) {
                    var tbody = document.getElementById("authorityTbody");
                    tbody.innerHTML = ""
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("class", "postTr");
                        var td = "<td>" + data[i].name + "</td><td>" + data[i].remark + "</td>";
                        tr.innerHTML = td;
                        tbody.appendChild(tr);
                    }
                }
            });
        });
    });
}
//显示列表
function showAuthorityList() {
    layui.use(['table'], function(){
        var table = layui.table;
        table.render({
            elem: '#test4'
            ,height: '700'
            ,url: path + '/getRoleAuthorityList' //数据接口
            ,page: true //开启分页
            ,limit: 10
            ,limits: [10, 20, 30]
            ,id: 'test4'
            ,cols: [[ //表头
                {field: 'roleName', title: '角色名称', align:'center', sort: true}//中文标题
                ,{fixed: '', title:'权限', toolbar: '#barDemo5', align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemo4', align:'center'}
            ]]
            , parseData: function(res) {
                // alert("权限认证失败");
            }
            ,done: function(res, curr, count){
                // alert("权限认证失败");
            }
        });
        //监听工具条
        table.on('tool(test4)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            //修改值
            $("#updAuthorityRole").val(data.roleName);
            updRoleId = data.id;
            if (obj.event === 'edit1') {// 修改权限
                showUpdAuthority();
                layui.use('layer', function() { //独立版的layer无需执行这一句
                    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
                    layer.open({
                        type: 1
                        , id: 'authority_update' //防止重复弹出
                        , content: $(".authority_update")
                        , btnAlign: 'c' //按钮居中
                        , shade: 0.1 //不显示遮罩
                        , area: ['100%', '100%']
                        , yes: function () {
                        }
                    });
                });
            } else if (obj.event === 'see'){
                $(".authorityDiv_div").css("display","block");
                $("#roleAuthority").text(data.roleName);
                var roleId = data.id;
                var $list = $(".authorityList");
                var li = "";
                $list.html("");
                $.ajax({
                    type: "GET",
                    url: path + "/getRoleAuthoritys",
                    data: {"roleId": roleId},
                    dataType: "json",
                    success: function (data) {
                       if (data != ""){
                           for (var i = 0; i < data.length; i ++){
                               li += "<li>"+data[i].name+"</li>";
                           }
                       } else{
                           li += "<li style='width: 97%;background: #fff;color: #000;font-size: 18px;'>该角色无权限！</li>";
                       }
                        $list.append(li);
                    }
                });
            }
        });
    });
}
//修改权限页面
function showUpdAuthority() {
    var roleId = updRoleId;
    var demoData = "";
    layui.use(['element','layer', 'dtree'], function(){
        var dtree1 = layui.dtree,
        $ = layui.$;
        $.ajax({
            url:path + "/getAuthorityURLMap",
            data: {id: roleId},
            type:"GET",
            dataType:"json",
            async:false,
            success:function(result){
                var node = result?result:null;
                if (node!=null) {
                    demoData=node;
                }
            }
        });
        var DTreeNode  = dtree1.render({
            elem: "#demoTree1",  //绑定元素
            checkbar: true,
            data: demoData,  //数据
            checkbarData: "choose"
        });
        // 绑定节点点击事件
        dtree1.on("node(demoTree1)", function(obj){
            var nodeId = obj.param.nodeId;

            DTreeNode.clickNodeCheckbar(nodeId);// 点击节点选中复选框

            var checkedData = dtree1.getCheckbarNodesParam("demoTree1");
            var authoritysId = "";
            for (var i = 0; i < checkedData.length; i ++) {
                authoritysId += checkedData[i].nodeId + ",";
            }
            authoritysId = authoritysId.substring(0,authoritysId.length-1);
            authoritys = "["+authoritysId+"]";
        });
    });
}
//确定修改
function getChecked() {
    var roleId = updRoleId;
    $.ajax({
        type:'POST',
        dataType: "json",//数据格式
        url:path + "/distributeRoleAuthority",
        data:{"roleId": roleId, "authoritys": authoritys},
        success:function(data){
            backDatd(data,showAuthorityList);
        }
    });
}
//关闭
function authorityClose() {
    $(".authorityDiv_div").css("display", "none")
}
// 返回值
function backDatd(data, fun) {
    data = data.toString();
    if (data == 'SUCCESS'){
        layer.closeAll();
        fun();
    } else if (data == 'ERROR'){
        layer.closeAll();
        alert("系统发生错误");
    } else if(data == 'CANCEL'){
        layer.closeAll();
        alert("页面发生错误");
    } else {
        layer.closeAll();
        alert("登录信息失效")
    }
}
//取消
function cancel() {
    layer.closeAll();
}