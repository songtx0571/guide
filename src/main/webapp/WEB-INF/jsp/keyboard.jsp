<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="../js/icon/iconfont.css">
    <style type="text/css">
        * { margin: 0; padding: 0; }
        ::-ms-clear {
            display: none;
        }
        ::-ms-reveal {
            display: none;
        }
        body { font-family: 微软雅黑; width: 100%; height: 100%; }
        .title { font-family: 微软雅黑; color: #3090e7; position: relative; font-size: 1.4em; width: 100%; text-align: center;display: inline-block }
        .title div{
            display: inline;
        }
        .title span {display: inline-block; margin: 0 10px 5px;color: #00BBFF; }
        #jianpan { position: absolute; background: #ffffff; border-radius: 5px; bottom: 0px; z-index: 9999; width: 99.9%; height: 40%; display: none; overflow: hidden; border: 1px solid rgba(0, 0, 0, 0.5); -user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        #jianpan .title { width: 100%; height: 10%;border-bottom: 1px solid #dcdddd; padding: 0; cursor: move; font-size: 1em;color: #00bbee }
        #jianpan .jianpan_hide { width: 40px; float: right; }
        #xfjp { width: 100%; height: 90%; }
        #shift { font-size: 0.8em; }
        .jianpan { color: #dcdddd; }
        .jianpan td { color: #333333; width: 10%; text-align: center; font-size: 2em; border-bottom: 1px solid #dcdddd; border-left: 1px solid #dcdddd;border-radius: 8px }
        .jianpan tr td:first-child { border-left: none; }
        .jianpan tr:last-child td { border-bottom: none; }
        table tr td:hover{
            background-color: #00bbee;
        }
        /*弹层动画（从下往上）*/
        .fadelogIn {
            -webkit-animation: fadelogIn .4s;
            animation: fadelogIn .4s;
        }
        @keyframes fadelogIn {
            0% {
                -webkit-transform: translate3d(0, 100%, 0);
                -webkit-transform: translate3d(0, 100%, 0);
                transform: translate3d(0, 100%, 0);
                transform: translate3d(0, 100%, 0);
            }
            100% {
                -webkit-transform: none;
                transform: none;
            }
        }
        @-webkit-keyframes fadelogIn {
            0% {
                -webkit-transform: translate3d(0, 100%, 0);
            }
            100% {
                -webkit-transform: none;
            }
        }
        .t2{
            display: none;
        }
    </style>
    <script type="text/javascript">
        $("#jianpan .title").css("line-height",$("#jianpan").height()/5+"px");
        function xfjianpan(id,unit) {
            $("#xfjp td").unbind("click");
            if (id != "false") {
                $("#jianpan").addClass("fadelogIn");
                $("#jianpan").show();
                //显示标签键盘
                if(unit!=null&&unit=='Label'){
                    $("#t1").css("display","none");
                    $("#t1").hide();
                    $("#t2").show();
                }else{
                    $("#t1").css("display","");
                    $("#t1").show();
                    $("#t2").hide();
                }
                var xfjp_text = $("#"+id).val();                        //获取input框当前的val值
                $("#xfjp td").click(function () {
                    var click = $(this).html();                         //获取点击按键的内容
                    if (click == "清空") {
                        xfjp_text = "";
                        $("#"+id).val(xfjp_text);
                    }else if(click == "后退"){
                        xfjp_text=xfjp_text.substring(0,xfjp_text.length-1);
                        $("#"+id).val(xfjp_text);
                    }else if(click == "正常"){
                        console.log($("#"+id));
                        $("#"+id).val("正常");
                    }else if(click == "渗水"){
                        $("#"+id).val("渗水");
                    }else if(click == "漏水"){
                        $("#"+id).val("漏水");
                    }else if(click == "漏浆"){
                        $("#"+id).val("漏浆");
                    }else if(click == "漏灰"){
                        $("#"+id).val("漏灰");
                    }else if(click == "异音"){
                        $("#"+id).val("异音");
                    }else if(click == "高"){
                        $("#"+id).val("高");
                    }else if(click == "中"){
                        $("#"+id).val("中");
                    }else if(click == "低"){
                        $("#"+id).val("低");
                    }else if(click == "确定"){
                        $("#jianpan").hide();
                    }else if(click == '切换'){
                        $("#t1").hide();
                        $("#t2").css("display","");
                        $("#t2").show();
                    }else if(click == '切换 '){
                        $("#t2").hide();
                        $("#t1").show();
                    }else {                                             //正常录入
                        xfjp_text = xfjp_text + click;
                        $("#"+id).val(xfjp_text);
                    }
                    $("#"+id).focus();
                })
            }else{
                $("#jianpan").removeClass("fadelogIn");
                $("#jianpan").hide();
            }
        }
    </script>
</head>
<body>
<div id="jianpan">
    <div class="title" style="text-align:center;">
        <div>浩维安全键盘</div>
        <div class="jianpan_hide" onClick="xfjianpan('false')">×</div>
    </div>
    <table id="xfjp" class="jianpan" cellspacing="0" cellpadding="0">
        <tbody id="t1">
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td style="color: #00BBFF">后退</td>
            </tr>
            <tr>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td style="color: #00BBFF">切换</td>
            </tr>
            <tr>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td rowspan="2" onClick="xfjianpan('false')" style="color: #00BBFF">确定</td>
            </tr>
            <tr>
                <td>0</td>
                <td>.</td>
                <td style="color: #00BBFF">清空</td>
            </tr>
        </tbody>
        <tbody id="t2" style="display: none">
            <tr>
                <td>正常</td>
                <td>渗水</td>
                <td>漏水</td>
                <td rowspan="2" style="color: #00BBFF">切换 </td>
            </tr>
            <tr>
                <td>漏灰</td>
                <td>异音</td>
                <td>高</td>
            </tr>
            <tr>
                <td>低</td>
                <td>中</td>
                <td>漏浆</td>
                <td style="color: #00BBFF">确定</td>
            </tr>
        </tbody>
    </table>
</div>
</body>
</html>
