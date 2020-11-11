var index = parent.layer.getFrameIndex(window.name); 
var people;
var peopleName;
$(function(){
	people = $("#people").val();
	peopleName = $("#peopleName").val();
	var peopleNameTd = document.getElementById("peopleNameTd");
	var text = "";
	var peopleNames = peopleName.split(",");
	for(var i=0;i<peopleNames.length;i++){
		text += peopleNames[i]+"<img src='../img/reduce.png' onclick='delPeople("+i+")'/>";
	}
	text += "<img src='../img/and.png' onclick='addPeople()'/>";
	peopleNameTd.innerHTML = text; 
})
function addPeople(){
	var userName = sessionStorage.Username;
	var Name = sessionStorage.Name;
	
	if(people != ""&&people != null){
		var peoples = people.split(",");
		for(var i=0;i<peoples.length;i++){
			if(userName==peoples[i]){
				layer.alert('已以添加相同的人员!', {icon : 2});
				return;
			}
		}
		people = people +","+ userName;
		peopleName = peopleName + "," + Name
	}else{
		people = userName;
	}
	var text = "";
	var peopleNames = peopleName.split(",");
	for(var i=0;i<peopleNames.length;i++){
		text += peopleNames[i]+"<img src='../img/reduce.png' onclick='delPeople("+i+")'/>";
	}
	text += "<img src='../img/and.png' onclick='addPeople()'/>";
	peopleNameTd.innerHTML = text; 
}
function delPeople(index){
	var userName = sessionStorage.Username;
	var Name = sessionStorage.Name;
	var peoples = people.split(",");
	if(userName.toUpperCase()==peoples[index].toUpperCase()){
		fill(index);
	}else{
		var projectId = sessionStorage.MaintenanceProjectId;
		$.ajax({ 
			"type" : 'post', 
			"url": "/getPermissionByPermissionId",  
			"data":{userName:userName,projectId:projectId,permissionId:65},
			"success":function(data){
				if(!data){
					layer.alert('该账号没有删除人员的权限，请换账号重试!', {icon : 2});
					return;
				}
				fill(index);
			}
		});
	}	
}
function fill(index){
	var userName = sessionStorage.Username;
	var Name = sessionStorage.Name;
	var peoples = people.split(",");
	var peopleNames = peopleName.split(",");
	var num = 0;
	console.log(people);
	console.log(peopleName);
	people = "";
	peopleName = "";
	for(var i=0;i<peoples.length;i++){
		if(i!=index){
			if(num!=0){
				people += ",";
				peopleName += ",";
			}
			people +=  peoples[i];
			peopleName += peopleNames[i];
			num ++;
		}
	}
	console.log(people);
	console.log(peopleName);
	var text = "";
	peopleNames = peopleName.split(",");
	for(var i=0;i<peopleNames.length;i++){
		text += peopleNames[i]+"<img src='../img/reduce.png' onclick='delPeople("+i+")'/>";
	}
	text += "<img src='../img/and.png' onclick='addPeople()'/>";
	peopleNameTd.innerHTML = text; 
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

function back(){
	parent.layer.close(index);
}
var SubmitOrHidden = function(evt){
    evt = window.event || evt;
    if(evt.keyCode==13){//如果取到的键值是回车
    	insert();
     }
}