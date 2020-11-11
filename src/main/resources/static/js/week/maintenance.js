$(function(){
	var tmpDate = new Date();
	var D = tmpDate.getDate();
	var M = tmpDate.getMonth() + 1;
	var Y = tmpDate.getFullYear();
	
	document.getElementById("datetime").value = Y+"-"+M+"-"+D;
	var datetime = sessionStorage.MaintenanceDatetime;
	document.getElementById("leader").innerHTML="";
	document.getElementById("attendance").innerHTML="";
	if(datetime){
		document.getElementById('datetime').value = datetime;
	}
	getProject()
});

function getProject(){
	var userName = sessionStorage.Username;
	$.ajax({
		"type" : 'post', 
    	"url": "../WeeklyController/getProject2",
		"data":{userName:userName},
    	"success":function(Json){
    		var data = Json.data;
    		document.getElementById('project').length = 0;
    		var project = document.getElementById('project');
    		var projectId = sessionStorage.MaintenanceProject;
    		for(var i = 0;i<data.length;i++){
    			var opt1 = new Option(data[i].projectTeam, data[i].id); 
    			if(data[i].id == projectId){
    				opt1.selected = true;
    			}
    			project.options.add(opt1);
    		}
    		change();
    	}
	});
}

function change(){
	$("tbody tr").remove("tr[id=123]");
	var datetime = $('#datetime').val();
	var project = $('#project').val();
	sessionStorage.MaintenanceDatetime = datetime;
	sessionStorage.MaintenanceProject = project;
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/findRecord",  
		"data":{datetime:datetime,project:project},
		"success":function(Json){
			fill(Json.data);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/find",  
		"data":{datetime:datetime,project:project},
		"success":function(Json){
			var data = Json.data;
			console.log(data);
			sessionStorage.MaintenanceLeader = data.leader;
			var aa = "";
			if(data.leaderName != ""&&data.leaderName != null){
				var leaders = data.leaderName.split(",");				
				for(var i=0;i<leaders.length;i++){
					aa += leaders[i]+"<img src='../img/reduce.png' onclick='delLeader("+i+")'>";
				}
				
			}
			aa += "<img src='../img/and.png' onclick='addLeader()'>";
			document.getElementById("leader").innerHTML = aa;
			
			
			if(data.attendance==-1){
				document.getElementById("attendance").innerHTML = 0;
			}else{
				document.getElementById("attendance").innerHTML = data.attendance;
			}
			
			sessionStorage.MaintenanceId = data.id;
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}
function addLeader(){
	var userName = sessionStorage.Username;
	var MaintenanceId = sessionStorage.MaintenanceId;
	var datetime = $('#datetime').val();
	var projectId = $("#project").val();
	
	var leader = sessionStorage.MaintenanceLeader;
	if(leader != ""&&leader != null){
		var leaders = leader.split(",");
		for(var i=0;i<leaders.length;i++){
			console.log(userName);
			console.log(leaders[i]);
			if(userName==leaders[i]){
				layer.alert('已以添加相同的填写人!', {icon : 2});
				return;
			}
		}
		leader = leader +","+ userName;
	}else{
		leader = userName;
	}
	
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:63},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有添加负责人的权限，请换账号重试!', {icon : 2});
				return;
			}
			$.ajax({ 
				"type" : 'post', 
				"url": "../MaintenanceController/addLeader",  
				"data":{userName:leader,id:MaintenanceId,datetime:datetime,projectId:projectId},
				"success":function(Json){
					if(Json.data==1){
		    			layer.alert('添加成功',{icon:1});
		    			setTimeout(function(){window.location.href="../MaintenanceController/Maintenance";},500);
		      	  	}
				}	
			});
		}
	});
}
function delLeader(index){
	var userName = sessionStorage.Username;
	var MaintenanceId = sessionStorage.MaintenanceId;
	var Leader = sessionStorage.MaintenanceLeader;
	var Leaders = Leader.split(",");
	var name = "";
	var num = 0;
	for(var i=0;i<Leaders.length;i++){
		if(i!=index){
			if(num!=0){
				name += ",";
			}
			name +=  Leaders[i];
			num ++;
		}
	}
	if(userName.toUpperCase()==Leaders[index].toUpperCase()){
		$.ajax({ 
			"type" : 'post', 
			"url": "../MaintenanceController/delLeader",  
			"data":{userName:name,id:MaintenanceId},
			"success":function(Json){
				if(Json.data==1){
	    			layer.alert('删除成功',{icon:1});
	    			setTimeout(function(){window.location.href="../MaintenanceController/Maintenance";},500);
	      	  	}
			}	
		});
		return;
	}
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:64},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有删除负责人的权限，请换账号重试!', {icon : 2});
				return;
			}
			$.ajax({ 
				"type" : 'post', 
				"url": "../MaintenanceController/delLeader",   
				"data":{userName:name,id:MaintenanceId},
				"success":function(Json){
					if(Json.data==1){
		    			layer.alert('删除添加成功',{icon:1});
		    			setTimeout(function(){window.location.href="../MaintenanceController/Maintenance";},500);
		      	  	}
				}	
			});
		}
		
	});
}


function fill(data){
	var tbody1 = document.getElementById("tbody1");
	var tbody2 = document.getElementById("tbody2");
	var tbody3 = document.getElementById("tbody3");
	var tbody4 = document.getElementById("tbody4");
	var tbody5 = document.getElementById("tbody5");
	var tbody6 = document.getElementById("tbody6");
	var index1 = 1,index2 = 1,index3 = 1,index4 = 1,index5 = 1,index6 = 1;
	for(var i=0;i<data.length;i++){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123");
		if(data[i].type==1){
			var td = "<td>"+index1+"</td><td>"+data[i].defectNumber+"</td><td colspan='4'>"+data[i].content+"</td>";
			if(data[i].peopleName==null){
				td += "<td></td>";
			}else{
				var peopleNames = data[i].peopleName.split(/[、，；：:;,.]/);
				if(peopleNames.length>2){
					td += "<td>"+peopleNames[0]+","+peopleNames[1]+" 等</td>";
				}else{
					td += "<td>"+data[i].peopleName+"</td>";
				}
			}
			
			td += "<td onclick='updWorkingHours("+data[i].id+")'>"+data[i].workingHours+"h</td><td>"+data[i].datetime+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}else if(data[i].type==2){
			var td = "<td>"+index2+"</td><td colspan='8'>"+data[i].content+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index2++;
			tr.innerHTML = td;
			tbody2.appendChild(tr);
		}else if(data[i].type==3){
			var td = "<td>"+index3+"</td><td colspan='8'>"+data[i].content+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index3++;
			tr.innerHTML = td;
			tbody3.appendChild(tr);
		}else if(data[i].type==4){
			var td = "<td>"+index4+"</td><td colspan='8'>"+data[i].content+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index4++;
			tr.innerHTML = td;
			tbody4.appendChild(tr);
		}else if(data[i].type==5){
			var td = "<td>"+index5+"</td><td colspan='8'>"+data[i].content+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index5++;
			tr.innerHTML = td;
			tbody5.appendChild(tr);
		}else if(data[i].type==6){
			var td = "<td>"+index6+"</td><td colspan='8'>"+data[i].content+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index6++;
			tr.innerHTML = td;
			tbody6.appendChild(tr);
		}
	}
		document.getElementById("num").innerHTML = index1-1;
		if(index1==1){
			var tr11 = document.createElement("tr");
			tr11.setAttribute("id", "123"); 
			var td11 = "<td colspan='10'>尚未添加内容</td>";
			tr11.innerHTML = td11;
			tbody1.appendChild(tr11);
		}
		if(index2==1){
			var tr12 = document.createElement("tr");
			tr12.setAttribute("id", "123"); 
			var td12 = "<td colspan='10'>尚未添加内容</td>";
			tr12.innerHTML = td12;
			tbody2.appendChild(tr12);
		}
		if(index3==1){
			var tr13 = document.createElement("tr");
			tr13.setAttribute("id", "123"); 
			var td13 = "<td colspan='10'>尚未添加内容</td>";
			tr13.innerHTML = td13;
			tbody3.appendChild(tr13);
		}
		if(index4==1){
			var tr14 = document.createElement("tr");
			tr14.setAttribute("id", "123"); 
			var td14 = "<td colspan='10'>尚未添加内容</td>";
			tr14.innerHTML = td14;
			tbody4.appendChild(tr14);
		}
		if(index5==1){
			var tr15 = document.createElement("tr");
			tr15.setAttribute("id", "123"); 
			var td15 = "<td colspan='10'>尚未添加内容</td>";
			tr15.innerHTML = td15;
			tbody5.appendChild(tr15);
		}
		if(index6==1){
			var tr16 = document.createElement("tr");
			tr16.setAttribute("id", "123"); 
			var td16 = "<td colspan='10'>尚未添加内容</td>";
			tr16.innerHTML = td16;
			tbody6.appendChild(tr16);
		}
		
		
		
		var tr1 = document.createElement("tr");
		tr1.setAttribute("id", "123"); 
		var td1 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(1)'/></td>";
		tr1.innerHTML = td1;
		tbody1.appendChild(tr1);
		
		var tr2 = document.createElement("tr");
		tr2.setAttribute("id", "123"); 
		var td2 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(2)'/></td>";
		tr2.innerHTML = td2;
		tbody2.appendChild(tr2);
		
		var tr3 = document.createElement("tr");
		tr3.setAttribute("id", "123"); 
		var td3 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(3)'/></td>";
		tr3.innerHTML = td3;
		tbody3.appendChild(tr3);
		
		var tr4 = document.createElement("tr");
		tr4.setAttribute("id", "123"); 
		var td4 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(4)'/></td>";
		tr4.innerHTML = td4;
		tbody4.appendChild(tr4);
		
		var tr5 = document.createElement("tr");
		tr5.setAttribute("id", "123"); 
		var td5 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(5)'/></td>";
		tr5.innerHTML = td5;
		tbody5.appendChild(tr5);
		
		var tr6 = document.createElement("tr");
		tr6.setAttribute("id", "123"); 
		var td6 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(6)'/></td>";
		tr6.innerHTML = td6;
		tbody6.appendChild(tr6);
		
}


function add(type){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:getPermissionId(type)},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有增加删除检修日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			var leader = document.getElementById("leader").innerHTML;
			if(!leader){
				layer.alert('请先填写负责人一栏', {icon : 2});
				return;	
			}
			var maintenanceId= sessionStorage.MaintenanceId;
			layer.open({
				  type: 2,
				  title:["检修日志添加",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../MaintenanceController/addMaintenanceRecord?type='+type+"&&maintenanceId="+maintenanceId
			});
		}
	});
	
}


function upd(id,type){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	sessionStorage.MaintenanceProjectId = projectId;
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:getPermissionId(type)},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有修改检修日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			layer.open({
				  type: 2,
				  title:["检修日志修改",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../MaintenanceController/updMaintenanceRecord?id='+id
			});
		}
	});
	
}

function del(id,type){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:getPermissionId(type)},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有删除检修日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			layer.confirm('确认删除？', {
				  btn: ['确定','取消'] //按钮
				}, function(){
					$.ajax({ 
						"type" : 'post', 
						"url": "../MaintenanceController/delMaintenanceRecord",  
						"data":{id:id},
						"success":function(Json){
							if(Json.data==1){
				    			layer.alert('删除成功',{icon:1});
				    			setTimeout(function(){window.location.href="../MaintenanceController/Maintenance";},500);
				      	  	}
						},
						"error":function(){
							layer.alert("系统繁忙");
						}	
					});
				}, function(){
				  layer.msg('已取消', {icon: 1});
				  return false;
				});
			
		}
	});
			
	
}

function getPermissionId(index){
	return index+11;
}
function updMaintenance(){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	var datetime = $('#datetime').val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:11},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有创建检修日志的权限，请换账号重试!', {icon : 2});
				return;
			}
			layer.open({
				  type: 2,
				  title:["检修日志修改",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '250px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../MaintenanceController/changeMaintenance?datetime='+datetime+'&&project='+projectId
			});
		}
	});
	
}


function updWorkingHours(id){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:45},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有修改检修工时内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			layer.open({
				  type: 2,
				  title:["检修工时修改",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '150px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../MaintenanceController/updMaintenanceRecord1?id='+id
			});
		}
	});
}
