$(function(){
	var tmpDate = new Date();
	var D = tmpDate.getDate();
	var M = tmpDate.getMonth() + 1;
	var Y = tmpDate.getFullYear();
	var YearWeek = getYearWeek(Y,M,D);
	
	document.getElementById("year").value = Y;
	document.getElementById('week').value = YearWeek;
	var type = sessionStorage.weeklyType;
	var year = sessionStorage.weeklyyear;
	var yearWeek = sessionStorage.weeklyYearWeek;
	
	if(type){
		$('#type').val(type);
	}
	if(year){
		document.getElementById("year").value = year;
	}
	if(yearWeek){
		document.getElementById('week').value = yearWeek;
	}
	getProject()
	
});


function getProject(){
	$.ajax({
		"type" : 'post', 
    	"url": "../WeeklyController/getProject",  
    	"success":function(Json){
    		var data = Json.data;
    		document.getElementById('project').length = 0;
    		var project = document.getElementById('project');
    		var projectId = sessionStorage.weeklyProject;
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
	var year = $('#year').val();
	var week = $('#week').val();
	var type = $('#type').val();
	var project = $('#project').val();
	sessionStorage.weeklyType =  $('#type').val();
	sessionStorage.weeklyyear = year;
	sessionStorage.weeklyYearWeek = week;
	sessionStorage.weeklyProject = project;
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/find",  
		"data":{year:year,week:week,type:type,project:project},
		"success":function(Json){
			fill(Json.data);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/findWeek",  
		"data":{year:year,week:week,type:type,project:project},
		"success":function(Json){
			var data = Json.data;
			
			sessionStorage.weeklyFillIn = data.fillIn;
			sessionStorage.weeklyAuditor = data.auditor;
			//document.getElementById("name").innerHTML = data.name;
			var aa = "";
			if(data.fillIn != ""&&data.fillIn != null){
				var fillIns = data.fillInName;				
				for(var i=0;i<fillIns.length;i++){
					aa += fillIns[i]+"<img src='../img/reduce.png' onclick='delFillIn("+i+")'>";
				}
				
			}
			aa += "<img src='../img/and.png' onclick='addFillIn()'>";
			document.getElementById("fillIn").innerHTML = aa;
			
			var bb = "";
			if(data.auditor != ""&&data.auditor != null){
				var auditors = data.auditorName;
				for(var i=0;i<auditors.length;i++){
					bb += auditors[i]+"<img src='../img/reduce.png'  onclick='delAuditor("+i+")'>";
				}
			}
			bb += "<img src='../img/and.png' onclick='addAuditor()'>";
			document.getElementById("auditor").innerHTML = bb;
			
			sessionStorage.weekId = data.id;
		},
		"error":function(){
			layer.alert("系统繁忙");
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
	var tbody7 = document.getElementById("tbody7");
	var tbody8 = document.getElementById("tbody8");
	var index1 = 1,index2 = 1,index3 = 1,index4 = 1,index5 = 1,index6 = 1,index7 = 1,index8 = 1;
	for(var i=0;i<data.length;i++){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123");
		if(data[i].type==1){
			var td = "<td>"+index1+"</td><td colspan='5'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
					"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}else if(data[i].type==2){
			var td = "<td>"+index2+"</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td><td>"+data[i].content3+"</td>"+
				"<td colspan='2'>"+data[i].content4+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>"
			index2++;
			tr.innerHTML = td;
			tbody2.appendChild(tr);
		}else if(data[i].type==3){
			var td = "<td>"+index3+"</td><td colspan='2'>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
					"<td  colspan='2'>"+data[i].content3+"</td> "+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index3++;
			tr.innerHTML = td;
			tbody3.appendChild(tr);
		}else if(data[i].type==4){
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
				"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/></td>";
			tr.innerHTML = td;
			tbody4.appendChild(tr);
			index4++;
		}else if(data[i].type==5){
			var td = "<td>"+index5+"</td><td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
				"<td>"+data[i].content3+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index5++;
			tr.innerHTML = td;
			tbody5.appendChild(tr);
		}else if(data[i].type==6){
			var td = "<td>"+index6+"</td><td colspan='2'>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
				"<td colspan='2'>"+data[i].content3+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index6++;
			tr.innerHTML = td;
			tbody6.appendChild(tr);
		}else if(data[i].type==7){
			var td = "<td>"+index7+"</td><td colspan='5'>"+data[i].content1+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index7++;
			tr.innerHTML = td;
			tbody7.appendChild(tr);
		}else{
			var td = "<td>"+index8+"</td><td colspan='5'>"+data[i].content1+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
				"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index8++;
			tr.innerHTML = td;
			tbody8.appendChild(tr);
		}
	}
	if(index1==1){
		var tr11 = document.createElement("tr");
		tr11.setAttribute("id", "123"); 
		var td11 = "<td colspan='7'>尚未添加内容</td>";
		tr11.innerHTML = td11;
		tbody1.appendChild(tr11);
	}
	if(index2==1){
		var tr12 = document.createElement("tr");
		tr12.setAttribute("id", "123"); 
		var td12 = "<td colspan='7'>尚未添加内容</td>";
		tr12.innerHTML = td12;
		tbody2.appendChild(tr12);
	}
	if(index3==1){
		var tr13 = document.createElement("tr");
		tr13.setAttribute("id", "123"); 
		var td13 = "<td colspan='7'>尚未添加内容</td>";
		tr13.innerHTML = td13;
		tbody3.appendChild(tr13);
	}
	if(index4==1){
		var tr14 = document.createElement("tr");
		tr14.setAttribute("id", "123"); 
		var td14 = "<td colspan='2'>0</td><td colspan='2'>0</td>" +
				"<td>0</td><td>0</td>"+
				"<td><img src='../img/week/update.png' onclick='add(4)'/></td>";
		tr14.innerHTML = td14;
		tbody4.appendChild(tr14);
	}
	if(index5==1){
		var tr15 = document.createElement("tr");
		tr15.setAttribute("id", "123"); 
		var td15 = "<td colspan='7'>尚未添加内容</td>";
		tr15.innerHTML = td15;
		tbody5.appendChild(tr15);
	}
	if(index6==1){
		var tr16 = document.createElement("tr");
		tr16.setAttribute("id", "123"); 
		var td16 = "<td colspan='7'>尚未添加内容</td>";
		tr16.innerHTML = td16;
		tbody6.appendChild(tr16);
	}
	if(index7==1){
		var tr17 = document.createElement("tr");
		tr17.setAttribute("id", "123"); 
		var td17 = "<td colspan='7'>尚未添加内容</td>";
		tr17.innerHTML = td17;
		tbody7.appendChild(tr17);
	}
	if(index8==1){
		var tr18 = document.createElement("tr");
		tr18.setAttribute("id", "123"); 
		var td18 = "<td colspan='7'>尚未添加内容</td>";
		tr18.innerHTML = td18;
		tbody8.appendChild(tr18);
	}
	
	
	var tr1 = document.createElement("tr");
	tr1.setAttribute("id", "123"); 
	var td1 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(1)'/></td>";
	tr1.innerHTML = td1;
	tbody1.appendChild(tr1);
	
	var tr2 = document.createElement("tr");
	tr2.setAttribute("id", "123"); 
	var td2 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(2)'/></td>";
	tr2.innerHTML = td2;
	tbody2.appendChild(tr2);
	
	var tr3 = document.createElement("tr");
	tr3.setAttribute("id", "123"); 
	var td3 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(3)'/></td>";
	tr3.innerHTML = td3;
	tbody3.appendChild(tr3);
	
	var tr5 = document.createElement("tr");
	tr5.setAttribute("id", "123"); 
	var td5 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(5)'/></td>";
	tr5.innerHTML = td5;
	tbody5.appendChild(tr5);
	
	var tr6 = document.createElement("tr");
	tr6.setAttribute("id", "123"); 
	var td6 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(6)'/></td>";
	tr6.innerHTML = td6;
	tbody6.appendChild(tr6);
	
	var tr7 = document.createElement("tr");
	tr7.setAttribute("id", "123"); 
	var td7 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(7)'/></td>";
	tr7.innerHTML = td7;
	tbody7.appendChild(tr7);
	
	var tr8 = document.createElement("tr");
	tr8.setAttribute("id", "123"); 
	var td8 = "<td colspan='6'></td><td><img src='../img/week/add.png' onclick='add(8)'/></td>";
	tr8.innerHTML = td8;
	tbody8.appendChild(tr8);
	
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
				layer.alert('该账号没有增加周报内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			var weekId = sessionStorage.weekId;
			if(weekId==0){
				layer.alert('请先创建项目', {icon : 2});
				return;	
			}
			layer.open({
				  type: 2,
				  title:["添加周报内容",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../WeeklyController/add?type='+type+"&&weekId="+weekId
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
			console.log(data);
			if(!data){
				layer.alert('该账号没有修改周报内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			
			layer.open({
				  type: 2,
				  title:["修改周报内容",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../WeeklyController/upd?id='+id+'&&type='+type
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
				layer.alert('该账号没有删除周报内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			
			layer.confirm('确认删除？', {
				  btn: ['确定','取消'] //按钮
				}, function(){
					$.ajax({  
						"type" : 'post', 
						"url": "../WeeklyController/del",  
						"data":{id:id},
						"success":function(Json){
							if(Json.data==1){
				    			layer.alert('删除成功',{icon:1});
				    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
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
	return index+23;
}

function updWeek(){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:23},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有创建检修周报的权限，请换账号重试!', {icon : 2});
				return;
			}
			var year = $('#year').val();
			var week = $('#week').val();
			var type = $('#type').val();
			layer.open({
				  type: 2,
				  title:["修改周报信息",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../WeeklyController/updWeek?year='+year+'&&week='+week+'&&type='+type + '&&project='+ projectId
			});
		}
	});
	
}




//增加填写人
function addFillIn(){
	var userName = sessionStorage.Username;
	var weekId = sessionStorage.weekId;
	var weeklyType = sessionStorage.weeklyType;
	var year = sessionStorage.weeklyyear;
	var week = sessionStorage.weeklyYearWeek;
	var project = sessionStorage.weeklyProject;
	var FillIn = sessionStorage.weeklyFillIn;
	if(FillIn != ""&&FillIn != null){
		var FillIns = FillIn.split(";");
		for(var i=0;i<FillIns.length;i++){
			if(userName==FillIns[i]){
				layer.alert('已以添加相同的填写人!', {icon : 2});
				return;
			}
		}
		FillIn = FillIn +";"+ userName;
		
		
	}else{
		FillIn = userName;
	}
	
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:51},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有添加的权限，请换账号重试!', {icon : 2});
				return;
			}
			$.ajax({ 
				"type" : 'post', 
				"url": "../WeeklyController/addFillIn",  
				"data":{userName:FillIn,id:weekId,year:year,week:week,projectId:project,type:weeklyType},
				"success":function(Json){
					if(Json.data==1){
		    			layer.alert('添加成功',{icon:1});
		    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
		      	  	}
				}	
			});
		}
	});
	
	
}
//删除填写人
function delFillIn(index){
	var userName = sessionStorage.Username;
	var weekId = sessionStorage.weekId;
	var FillIn = sessionStorage.weeklyFillIn;
	var FillIns = FillIn.split(";");
	var name = "";
	var num = 0;
	for(var i=0;i<FillIns.length;i++){
		if(i!=index){
			if(num!=0){
				name += ";";
			}
			name +=  FillIns[i];
			num ++;
		}
	}
	if(userName==FillIns[index]){
		$.ajax({ 
			"type" : 'post', 
			"url": "../WeeklyController/delFillIn",  
			"data":{userName:name,id:weekId},
			"success":function(Json){
				if(Json.data==1){
	    			layer.alert('删除成功',{icon:1});
	    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
	      	  	}
			}	
		});
		return;
	}
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:52},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有删除填写人的权限，请换账号重试!', {icon : 2});
				return;
			}
			$.ajax({ 
				"type" : 'post', 
				"url": "../WeeklyController/delFillIn",  
				"data":{userName:name,id:weekId},
				"success":function(Json){
					if(Json.data==1){
		    			layer.alert('删除添加成功',{icon:1});
		    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
		      	  	}
				}	
			});
		}
		
	});
	
	
	
}

//添加批准人
function addAuditor(){
	var userName = sessionStorage.Username;
	var weekId = sessionStorage.weekId;
	var weeklyType = sessionStorage.weeklyType;
	var year = sessionStorage.weeklyyear;
	var week = sessionStorage.weeklyYearWeek;
	var project = sessionStorage.weeklyProject;
	var Auditor = sessionStorage.weeklyAuditor;
	console.log(Auditor);
	if(Auditor != ""&&Auditor != null){
		var Auditors = Auditor.split(";");
		for(var i=0;i<Auditors.length;i++){
			if(userName==Auditors[i]){
				layer.alert('已以添加相同的填写人!', {icon : 2});
				return;
			}
		}
		Auditor = Auditor +";"+ userName;
	}else{
		Auditor = userName;
	}
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:53},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有添加的权限，请换账号重试!', {icon : 2});
				return;
			}
			$.ajax({ 
				"type" : 'post', 
				"url": "../WeeklyController/addAuditor",  
				"data":{userName:Auditor,id:weekId,year:year,week:week,projectId:project,type:weeklyType},
				"success":function(Json){
					if(Json.data==1){
		    			layer.alert('添加成功',{icon:1});
		    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
		      	  	}
				}	
			});
		}
	});
	
}
//删除批准人
function delAuditor(index){
	var userName = sessionStorage.Username;
	var weekId = sessionStorage.weekId;
	var Auditor = sessionStorage.weeklyAuditor;
	var Auditors = Auditor.split(";");
	var name = "";
	var num = 0;
	for(var i=0;i<Auditors.length;i++){
		if(i!=index){
			if(num!=0){
				name += ";";
			}
			name +=  Auditors[i];
			num ++;
		}
	}
	if(userName==Auditors[index]){
		$.ajax({ 
			"type" : 'post', 
			"url": "../WeeklyController/delAuditor",  
			"data":{userName:name,id:weekId},
			"success":function(Json){
				if(Json.data==1){
	    			layer.alert('添加成功',{icon:1});
	    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
	      	  	}
			}	
		});
		return;
	}
	var projectId = $("#project").val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:54},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有删除填写人的权限，请换账号重试!', {icon : 2});
				return;
			}
			$.ajax({ 
				"type" : 'post', 
				"url": "../WeeklyController/delAuditor",  
				"data":{userName:name,id:weekId},
				"success":function(Json){
					if(Json.data==1){
		    			layer.alert('添加成功',{icon:1});
		    			setTimeout(function(){window.location.href="../WeeklyController/Weekly";},500);
		      	  	}
				}	
			});
		}
	});
	
	
	
}









function getYearWeek(y, m, d) {
	var now = new Date(y, m - 1, d),
	year = now.getFullYear(),
	month = now.getMonth(),
	days = now.getDate();
	//那一天是那一年中的第多少天
	for (var i = 0; i < month; i++) {
		days += getMonthDays(year, i);
	}
	//那一年第一天是星期几
	var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
	
	var week = null;
	if (yearFirstDay == 1) {
		week = Math.ceil(days / 7);
	} else {
		days -= (7 - yearFirstDay + 1);
	    week = Math.ceil(days / 7) + 1;
	}
	return week;
};

function getMonthDays(year, month) {
	return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}
function isLeapYear(year) {
	return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

function funccc(){
	$dp.$('week').value=$dp.cal.getP('W','WW');
	document.getElementById("year").value = $dp.cal.getP('y');
}

