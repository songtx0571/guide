<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    td{
        height: 50px;
        line-height: 50px
    }
</style>
<div style="padding: 30px 30px 30px 30px;" hidden id="workPerator">
    <form method="post">
        <input type="text" id="workId" hidden />
        <table style="border-collapse:separate; border-spacing:0px 20px;">
            <tr>
                <td>巡检任务&nbsp;&nbsp;</td>
                <td><input class="easyui-textbox"id="patrolTask" name="patrolTask" data-options="prompt:'请输入巡检任务',required:true" style="width:250px;"/></td>
                <td width="100px"></td>
                <td style="float: right">周期&nbsp;&nbsp;</td>
                <td>
                    <select class="easyui-combobox" id="cycle" name="cycle" data-options="required:true,prompt:'请输入周期',editable:false,width:'250px'">
                        <option value="0" selected>请选择</option>
                        <option value="1">1小时</option>
                        <option value="2">2小时</option>
                        <option value="4">4小时</option>
                        <option value="8">8小时</option>
                        <option value="12">12小时</option>
                        <option value="24">24小时</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td style="float: right">计划时间&nbsp;&nbsp;</td>
                <td><input class="easyui-textbox" id="planTime" name="planTime" data-options="prompt:'计划时间单位为min',required:true" style="width:250px;"/></td>
                <td width="100px"></td>
                <td style="float: right">部门&nbsp;&nbsp;</td>
                <td colspan="4"><select id="department" class="easyui-combobox"  data-options="required:true,prompt:'请选择部门',editable:false,width:'250px'"></select></td>
            </tr>
        </table>
        <div style="text-align: center; padding: 5px;height: 80px;line-height: 80px">
            <div id="save" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="saveAddData()">
                <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">保存</a>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="closeWin(addDataWin)">
                <a href="javascript:void(0)" id="btn-close-save" style="text-decoration: none;color: #222222">取消</a>
            </div>
        </div>
    </form>
</div>


