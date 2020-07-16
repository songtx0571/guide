<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style type="text/css">
    td{
        height: 50px;
        line-height: 50px
    }
</style>
<div style="padding: 30px 30px 30px 30px;" hidden id="search">
    <form method="post">
        <table style="border-collapse:separate; border-spacing:0px 20px;">
            <tr>
                <td style="float: right">部门&nbsp;&nbsp;</td>
                <td colspan="2"><select id="depart" class="easyui-combobox"  data-options="required:true,prompt:'请选择部门',width:'250px'"></select></td>
            </tr>
        </table>
        <div style="text-align: center; padding: 5px;height: 80px;line-height: 80px">
            <div id="searchOk" style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="javascript:searchWork()" class="easyui-linkbutton" plain="true">
                <a href="javascript:void(0)" id="btn-save" style="text-decoration: none;color: #222222">确定</a>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div style="height: 40px;width: 80px;border-radius: 5px;background-color: #00bbee;display: inline-block;line-height: 40px;" onclick="javascript:closeSearch(search)">
                <a href="javascript:void(0)" id="btn-close-save" style="text-decoration: none;color: #222222">取消</a>
            </div>
        </div>
    </form>
</div>


