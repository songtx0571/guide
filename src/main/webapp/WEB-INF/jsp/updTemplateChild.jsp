<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css" />
<style type="text/css">
    td{
        height: 50px;
        line-height: 50px
    }
</style>
<div style="padding: 30px 30px 30px 30px;" hidden id="updtempChild">
    <form method="poxt">
        <input type="text" hidden id="temId"/>
        <input type="text" hidden id="temChildId"/>
        <table style="border-collapse:separate; border-spacing:0px 20px;">
            <tr>
                <td>设备名称&nbsp;&nbsp;</td>
                <td>
                    <select class="easyui-combobox" id="sysName" name="type" data-options="required:true,prompt:'请选择系统号',width:'180px'">

                    </select>
                    <select class="easyui-combobox" id="equName" name="type" data-options="required:true,prompt:'请选择设备名称',width:'180px'">

                    </select>
                </td>
            </tr>
            <tr style="height: 10px"></tr>
            <tr>
                <td style="float: right">测点类型&nbsp;&nbsp;</td>
                <td>
                    <select class="easyui-combobox" id="sightType" name="sightType" data-options="required:true,prompt:'请选择测点类型',width:'150px'">
                    </select>
                    &nbsp;&nbsp;单位&nbsp;&nbsp;
                    <select class="easyui-combobox" id="unitType" name="unitType" data-options="required:true,prompt:'请选择单位',width:'150px'">
                    </select>
                </td>
            </tr>
        </table>
        <div style="text-align: center; padding: 5px;height: 80px;line-height: 80px">
            <div id="save" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="saveAddData()">
                <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">保存</a>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="closeWin(addTempChildWin)">
                <a href="javascript:void(0)" id="btn-close-save" style="text-decoration: none;color: #222222">取消</a>
            </div>
        </div>
    </form>
</div>


