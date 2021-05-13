<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script src="../js/week/defectData.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="../css/defect.css">
    <link rel="stylesheet" href="../js/layui/css/layui.css">
    <script src="../js/layui/layui.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div class="warp">
    <!-- 头部 -->
    <div class="top" style="height: 80px;">
        <div style="width: 100%;height: 50px;">
            <form class="layui-form" action="" style="float: left;">
                <input type="hidden" id="departmentHidden">
                <shiro:hasPermission name="缺陷管理员">
                    <div class="layui-inline" style="width: 150px;">
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="department" lay-search="" id="department"></select>
                        </div>
                    </div>
                </shiro:hasPermission>
            </form>
            <span style="float: left;margin: 0 10px 0 25px;line-height: 40px;">完成时间:</span>
            <div class="layui-inline" style="width: 150px;float: left;">
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" id="test1" placeholder="yyyy-MM">
                </div>
            </div>
        </div>
    </div>
    <!-- 表格内容 -->
    <div class="content">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="tbNumberBar">
            {{#  if(d.level == 0){ }}
            <span style="color: red;">{{d.number}}</span>
            {{#  } else if(d.level == 1) { }}
            <span style="color: orange;">{{d.number}}</span>
            {{#  } else if(d.level == 2) { }}
            <span style="color: mediumpurple;">{{d.number}}</span>
            {{#  } else if(d.level == 3) { }}
            <span style="color: #007DDB;">{{d.number}}</span>
            {{#  } else if(d.level == 4) { }}
            <span style="color: green;">{{d.number}}</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbSourceTypeBar">
            {{#  if(d.sourceType == 1){ }}
            <span>缺陷</span>
            {{#  } else if(d.sourceType == 2) { }}
            <span>巡检</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbTypeBar">
            {{#  if(d.type == 1){ }}
            <span style="color: red;">未认领</span>
            {{#  } else if(d.type == 5) { }}
            <span style="color: #dcb422;">已认领</span>
            {{#  } else if(d.type == 2) { }}
            <span style="color: #ff8100;">消缺中</span>
            {{#  } else if(d.type == 3) { }}
            <span style="color: #8fc323;">已消缺</span>
            {{#  } else if(d.type == 4) { }}
            <span style="color: green;">已完成</span>
            {{#  } else if(d.type == 6) { }}
            {{#  if(d.delayReason == 1){ }}
            <span style="color: #001580;">等待备件</span>
            {{#  } else if(d.delayReason == 2) { }}
            <span style="color: #001580;">无法安措</span>
            {{#  } else if(d.delayReason == 3) { }}
            <span style="color: #001580;">停炉处理</span>
            {{#  } else if(d.delayReason == 4) { }}
            <span style="color: #001580;">继续观察</span>
            {{#  } }}
            {{#  } }}
        </script>
        <script type="text/html" id="tbCategoryBar">
            {{#  if(d.maintenanceCategory == 1){ }}
            <span>机务</span>
            {{#  } else if(d.maintenanceCategory == 2) { }}
            <span>电仪</span>
            {{#  } }}
        </script>
        <script type="text/html" id="tbLevelBar">
            {{#  if(d.level == 0){ }}
            <span style="color: red;">0级</span>
            {{#  } else if(d.level == 1) { }}
            <span style="color: orange;">1级</span>
            {{#  } else if(d.level == 2) { }}
            <span style="color: mediumpurple;">2级</span>
            {{#  } else if(d.level == 3) { }}
            <span style="color: #007DDB;">3级</span>
            {{#  } else if(d.level == 4) { }}
            <span style="color: green;">4级</span>
            {{#  } }}
        </script>
    </div>
</div>
</body>
</html>
