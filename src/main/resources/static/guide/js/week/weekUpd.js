var index = parent.layer.getFrameIndex(window.name); 
function insert1(){
	var type = $('#type').val();
	var week = $('#week').val();
	var year = $('#year').val();
	var project = $('#project').val();
	var id = $('#id').val();
	var name = $('#name').val();
	var fillIn = $('#fillIn').val();
	var auditor = $('#auditor').val();
	if(!name){
		layer.alert("项目名称不能为空",{icon:2});
		return;
	}
	if(!fillIn){
		layer.alert("填写人不能为空",{icon:2});
		return;
	}
	if(!auditor){
		layer.alert("审核人不能为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/changeWeek",  
		"data":{id:id,name:name,project:project,year:year,week:week,type:type,fillIn:fillIn,auditor:auditor},
		"success":function(Json){
			layer.alert('修改成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}


function back(){
	parent.layer.close(index);
}
var SubmitOrHidden = function(evt){
    evt = window.event || evt;
    if(evt.keyCode==13){//如果取到的键值是回车
    	insert();
     }
}