<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
<style type="text/css">
    td{
        height: 50px;
        line-height: 50px
    }
</style>
<div style="padding: 30px 30px 30px 30px;" hidden id="equipment">
    <form method="poxt">
        <input type="text" hidden id="EquipId"/>
        <table style="border-collapse:separate; border-spacing:0px 20px;">
            <tr>
                <td>名称</td>
                <td><input class="easyui-textbox"id="name" name="name" data-options="prompt:'请输入名称',required:true" style="width:250px;"/></td>
                <td width="100px"></td>
                <td style="float: right">类型&nbsp;&nbsp;</td>
                <td>
                    <input class="easyui-textbox" style="width:250px;" value="设备" readonly/>
                </td>
            </tr>
            <tr>
                <td>部门</td>
                <td><select id="departName" class="easyui-combobox" data-options="prompt:'请选择部门',required:true" style="width:250px;"></select></td>
            </tr>
        </table>
        <div style="text-align: center; padding: 5px;height: 80px;line-height: 80px">
            <div id="save" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="saveAddData()">
                <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">保存</a>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="closeWin(addEquipment)">
                <a href="javascript:void(0)" id="btn-close-save" style="text-decoration: none;color: #222222">取消</a>
            </div>
        </div>
    </form>
</div>


