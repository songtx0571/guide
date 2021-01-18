var index = parent.layer.getFrameIndex(window.name); 
function insert(){
	var type = $('#type').val();
	var maintenanceId = $('#maintenanceId').val();
	var content = $('#content').val();
	if(!content){
		layer.alert("时间不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/insertMaintenanceRecord",  
		"data":{maintenanceId:maintenanceId,type:type,content:content},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert1(){
	var type = $('#type').val();
	var maintenanceId = $('#maintenanceId').val();
	var content = $('#content').val();
	
	if(!content){
		layer.alert("时间不可以为空",{icon:2});
		return;
	}
	var defectNumber = $("#defectNumber").val();
	if(!defectNumber){
		defectNumber = 0;
	}
	var people = $("#people").val();
	if(!people){
		layer.alert("检修人员不可以为空",{icon:2});
		return;
	}
	var workingHours = $("#workingHours").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/insertMaintenanceRecord",  
		"data":{maintenanceId:maintenanceId,type:type,content:content,defectNumber:defectNumber,people:people,workingHours:0},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}
function upd3(){
	var id = $('#id').val();
	var type = $('#type').val();
	var workingHours = $('#workingHours').val();
	var maintenanceId = $("#maintenanceId").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/updateMaintenanceRecord1",  
		"data":{id:id,type:type,workingHours:workingHours,maintenanceId:maintenanceId},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function upd2(){
	var id = $('#id').val();
	var content = $('#content').val();
	var type = $('#type').val();
	if(!content){
		layer.alert("内容不可以为空",{icon:2});
		return;
	}
	var defectNumber = $("#defectNumber").val();
	if(!defectNumber){
		defectNumber = 0;
	}
	var people = $("#people").val();
	if(!people){
		layer.alert("检修人员不可以为空",{icon:2});
		return;
	}
	var maintenanceId = $("#maintenanceId").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/updateMaintenanceRecord",  
		"data":{id:id,content:content,type:type,defectNumber:defectNumber,people:people,maintenanceId:maintenanceId},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}
function upd(){
	var id = $('#id').val();
	var content = $('#content').val();
	var type = $('#type').val();
	if(!content){
		layer.alert("内容不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/updateMaintenanceRecord",  
		"data":{id:id,content:content,type:type},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function change(){
	var datetime = $('#datetime').val();
	var id = $('#id').val();
	var projectId = $('#projectId').val();
	var leader = $('#leader').val();
	var attendance = $('#attendance').val();
	if(!leader){
		layer.alert("负责人不能为空",{icon:2});
		return;
	}
	var num = 0;
	if(!attendance){
		attendance = 0;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/maintenanceChange",  
		"data":{id:id,datetime:datetime,projectId:projectId,leader:leader,num:num,attendance:attendance},
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