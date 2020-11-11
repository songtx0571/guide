$(function(){
	var tmpDate = new Date();
	var D = tmpDate.getDate();
	var M = tmpDate.getMonth() + 1;
	var Y = tmpDate.getFullYear();
	
	document.getElementById("datetime").value = Y+"-"+M+"-"+D;
	var type = sessionStorage.wfgdDailyType;
	var datetime = sessionStorage.wfgdDailydatetime;
	
	if(type){
		$('#type').val(type);
	}
	if(datetime){
		document.getElementById('datetime').value = datetime;
	}
	getProject()
});

function compareTime() {
	var type = $("#type").val();
	var startDate = $("#datetime").val();
	var	endDate = $("#datetime").val();
	var arrStartDate = startDate.split("-");   
	var arrEndDate = endDate.split("-"); 
	var allStartDate;
	var allEndDate;
	var date = new Date();
	if(type==1){
		allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1]-1), arrStartDate[2],7,0,0);   
		allEndDate = new Date(arrEndDate[0], parseInt(arrStartDate[1]-1), arrEndDate[2], 17,0,0);   
	}else if(type==2){
		allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1]-1), arrStartDate[2],15,0,0);   
		allEndDate = new Date(arrEndDate[0], parseInt(arrStartDate[1]-1), parseInt(arrStartDate[2]+1),1,0,0);   
	}else{
		allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1]-1), parseInt(arrStartDate[2]-1),23,0,0);   
		allEndDate = new Date(arrEndDate[0], parseInt(arrStartDate[1]-1), arrEndDate[2],9,0,0);   
	}

	if (date.getTime() < allStartDate.getTime()) {
		layer.alert("当前时间未到该班的工作时间,不可修改运行日志",{icon : 2});
		return false;   
	} else if(date.getTime() > allEndDate.getTime()) {
		layer.alert("当前时间已超过该班的工作时间,不可修改运行日志",{icon : 2});
		return false;   
	}else {
		return true;   
	}
}   

function getProject(){
	$.ajax({
		"type" : 'post', 
    	"url": "../WeeklyController/getProject",  
    	"success":function(Json){
    		var data = Json.data;
    		document.getElementById('project').length = 0;
    		var project = document.getElementById('project');
    		var projectId = sessionStorage.wfgdDailyProject;
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
	var type = $('#type').val();
	var project = $('#project').val();
	sessionStorage.wfgdDailyType = type;
	sessionStorage.wfgdDailydatetime = datetime;
	sessionStorage.wfgdDailyProject = project;
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/find",  
		"data":{datetime:datetime,type:type,project:project,other:2},
		"success":function(Json){
			fill(Json.data);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/findscrDaily",  
		"data":{datetime:datetime,type:type,project:project,other:2},
		"success":function(Json){
			var data = Json.data;
			document.getElementById("successor").innerHTML = data.successor;
			document.getElementById("traders").innerHTML = data.traders;
			if(data.group==1){
				document.getElementById("group").innerHTML = '甲';
			}else if(data.group==2){
				document.getElementById("group").innerHTML = '乙';
			}else if(data.group==3){
				document.getElementById("group").innerHTML = '丙';
			}else if(data.group==4){
				document.getElementById("group").innerHTML = '丁';
			}else{
				document.getElementById("group").innerHTML = "";
			}
			sessionStorage.wfgdDailyId = data.id;
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function fill(data){
	var tbody1 = document.getElementById("tbody1");
	var tbody3 = document.getElementById("tbody3");
	var tbody4 = document.getElementById("tbody4");
	var index1 = 1,index3 = 1,index4 = 1;
	for(var i=1;i<3;i++){
		document.getElementById(""+i+"-1").innerHTML = 0;
		document.getElementById(""+i+"-2").innerHTML = 0;
		document.getElementById(""+i+"-3").innerHTML = 0;
		document.getElementById(""+i+"-4").innerHTML = 0;
		document.getElementById(""+i+"-5").innerHTML = "<img src='../img/week/update.png' onclick='add1("+i+")'/>";
	}
	
	for(var i=0;i<data.length;i++){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123");
		if(data[i].type==1){
			var td = "<td>"+index1+"</td><td  colspan='8'>"+data[i].content1+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}else if(data[i].type==2){
			var num = data[i].content1
			document.getElementById(""+num+"-1").innerHTML = data[i].content2;
			document.getElementById(""+num+"-2").innerHTML = data[i].content3;
			document.getElementById(""+num+"-3").innerHTML = data[i].content4;
			document.getElementById(""+num+"-4").innerHTML = data[i].content5;
			document.getElementById(""+num+"-5").innerHTML = "<img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>";
		}else if(data[i].type==3){
			var td = "<td>"+index3+"</td><td colspan='3'>"+data[i].content1+"</td><td colspan='5'>"+data[i].content2+"</td>" +
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index3++;
			tr.innerHTML = td;
			tbody3.appendChild(tr);
		}else if(data[i].type==4){
			var td = "<td>"+index4+"</td><td colspan='3'>"+data[i].content1+"</td><td colspan='5'>"+data[i].content2+"</td>" +
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			tr.innerHTML = td;
			tbody4.appendChild(tr);
			index4++;
		}
	}
		
		if(index1==1){
			var tr11 = document.createElement("tr");
			tr11.setAttribute("id", "123"); 
			var td11 = "<td colspan='10'>尚未添加内容</td>";
			tr11.innerHTML = td11;
			tbody1.appendChild(tr11);
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
		var tr1 = document.createElement("tr");
		tr1.setAttribute("id", "123"); 
		var td1 = "<td colspan='9'></td><td><img src='../img/week/add.png' onclick='add(1)'/></td>";
		tr1.innerHTML = td1;
		tbody1.appendChild(tr1);
		
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
}

function add1(content1){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:getPermissionId(2)},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有修改运行日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			var traders = document.getElementById("traders").innerHTML;
			if(!traders){
				layer.alert('请先填写交班人一栏', {icon : 2});
				return;	
			}
			if(!compareTime()){
				return;
			}
			var wfgdDailyId= sessionStorage.wfgdDailyId;
			layer.open({
				  type: 2,
				  title:["运行日志添加",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定s
				  maxmin: true,
				  content: '../ScrDailyController/add1?type=2&&scrDailyId='+wfgdDailyId+'&&content1='+content1
			});
		}
	});
	
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
				layer.alert('该账号没有修改运行日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			var traders = document.getElementById("traders").innerHTML;
			if(!traders){
				layer.alert('请先填写交班人一栏', {icon : 2});
				return;	
			}
			if(!compareTime()){
				return;
			}
			var wfgdDailyId= sessionStorage.wfgdDailyId;
			layer.open({
				  type: 2,
				  title:["运行日志添加",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../ScrDailyController/add1?type='+type+"&&scrDailyId="+wfgdDailyId
			});
		}
	});
	
}


function upd(id,type){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:getPermissionId(type)},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有修改运行日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			if(!compareTime()){
				return;
			}
			layer.open({
				  type: 2,
				  title:["运行日志修改",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../ScrDailyController/upd1?id='+id+'&&type='+type
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
				layer.alert('该账号没有删除运行日志内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			if(!compareTime()){
				return;
			}
			layer.confirm('确认删除？', {
				  btn: ['确定','取消'] //按钮
				}, function(){
					$.ajax({ 
						"type" : 'post', 
						"url": "../ScrDailyController/del",  
						"data":{id:id},
						"success":function(Json){
							if(Json.data==1){
				    			layer.alert('删除成功',{icon:1});
				    			setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
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
	return 18+index
}

function updScrDaily(){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	var datetime = $('#datetime').val();
	var group = $('#group').val();
	var type = $('#type').val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:18},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有创建运行日志的权限，请换账号重试!', {icon : 2});
				return;
			}
			
			if(!compareTime()){
				return;
			}
			layer.open({
				type: 2,
				title:["运行日志修改",'font-size:20px;font-weight:bold;'],
				area: ['500px', '400px'], 
				fixed: false, //不固定
				maxmin: true,
				content: '../ScrDailyController/updScrDaily?datetime='+datetime+'&&type=' + type+'&&project='+projectId+'&&other=2'
			});
		}
	});
}
