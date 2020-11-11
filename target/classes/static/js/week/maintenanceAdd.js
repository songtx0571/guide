var index = parent.layer.getFrameIndex(window.name);
function insert(){
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

function addPeople(){
	var userName = sessionStorage.Username;
	var Name = sessionStorage.Name;
	var peopleName = document.getElementById("peopleName");
	
	peopleName.innerHTML = Name+"<img src='../img/reduce.png' onclick='delPeople()'/>";
	$("#people").val(userName);
}
function delPeople(){
	document.getElementById("peopleName").innerHTML = "<img src='../img/add.png' onclick='addPeople()'/>";
	$("#people").val("");
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