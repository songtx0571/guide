$(function(){
	var tmpDate = new Date();
	var D = tmpDate.getDate();
	var M = tmpDate.getMonth() + 1;
	var Y = tmpDate.getFullYear();
	var YearWeek = getYearWeek(Y,M,D);
	
	document.getElementById("year").value = Y;
	document.getElementById('week').value = YearWeek;
	
	var year = sessionStorage.runningWeeklyyear;
	var week = sessionStorage.runningWeeklyYearWeek;
	if(week){
		document.getElementById('week').value = week;
	}
	if(year){
		document.getElementById("year").value = year;
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
    		var projectId = sessionStorage.runningWeeklyProject;
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
	var project = $('#project').val();
	sessionStorage.runningWeeklyyear = year;
	sessionStorage.runningWeeklyYearWeek = week;
	sessionStorage.runningWeeklyProject = project;
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/find",  
		"data":{year:year,week:week,type:3,project:project},
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
		"data":{year:year,week:week,type:3,project:project},
		"success":function(Json){
			var data = Json.data;
			document.getElementById("name").innerHTML = data.name;
			document.getElementById("fillIn").innerHTML = data.fillIn;
			document.getElementById("auditor").innerHTML = data.auditor;
			sessionStorage.weekId = data.id;
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}
function fill(data){
	
	var tbody1 = document.getElementById("tbody1");

	var tbody8 = document.getElementById("tbody8");
	var tbody9 = document.getElementById("tbody9");
	var tbody10 = document.getElementById("tbody10");
	var tbody11 = document.getElementById("tbody11");
	var tbody12 = document.getElementById("tbody12");
	var tbody13 = document.getElementById("tbody13");
	var tbody14 = document.getElementById("tbody14");
	var tbody15 = document.getElementById("tbody15");
	var tbody16 = document.getElementById("tbody16");
	var tbody17 = document.getElementById("tbody17");
	var index1= 1,index2 = 1,index3 = 1,index4 = 1,index5 = 1,index6 = 1,index7 = 1,index8 = 1,
		index9= 1,index10 = 1,index11 = 1,index12 = 1,index13 = 1,index14 = 1,index15 = 1,
		index16 = 1,index17 = 1;
	for(var i=0;i<data.length;i++){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123");
		if(data[i].type==1){
			var td = "<td>"+index1+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+")'/></td>";
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}else if(data[i].type==8){
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
			"<td colspan='2'>"+data[i].content3+"</td><td colspan='2'>"+data[i].content4+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/></td>";
			index8++;
			tr.innerHTML = td;
			tbody8.appendChild(tr);
		}else if(data[i].type==9){
			var td = "<td>"+index9+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index9++;
			tr.innerHTML = td;
			tbody9.appendChild(tr);
		}else if(data[i].type==10){
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
			"<td colspan='2'>"+data[i].content3+"</td><td colspan='2'>"+data[i].content4+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/></td>";
			index10++;
			tr.innerHTML = td;
			tbody10.appendChild(tr);
		}else if(data[i].type==11){
			var td = "<td>"+index11+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index11++;
			tr.innerHTML = td;
			tbody11.appendChild(tr);
		}else if(data[i].type==12){
			var td = "<td>"+index12+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index12++;
			tr.innerHTML = td;
			tbody12.appendChild(tr);
		}else if(data[i].type==13){
			var td = "<td>"+index13+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index13++;
			tr.innerHTML = td;
			tbody13.appendChild(tr);
		}else if(data[i].type==14){
			var td = "<td>"+index14+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index14++;
			tr.innerHTML = td;
			tbody14.appendChild(tr);
		}else if(data[i].type==15){
			var td = "<td>"+index15+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+","+data[i].type+")'/></td>";
			index15++;
			tr.innerHTML = td;
			tbody15.appendChild(tr);
		}else if(data[i].type==16){
			var td = "<td>"+index16+"</td><td colspan='7'>"+data[i].content1+"</td>"+
			"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/>" +
			"<img src='../img/week/delete.png' onclick='del("+data[i].id+")'/></td>";
			index16++;
			tr.innerHTML = td;
			tbody16.appendChild(tr);
		}else{
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
					"<td colspan='2'>"+data[i].content3+"</td><td colspan='2'>"+data[i].content4+"</td>"+
				"<td><img src='../img/week/update.png' onclick='upd("+data[i].id+","+data[i].type+")'/></td>";
			index17++;
			tr.innerHTML = td;
			tbody17.appendChild(tr);
		}
	}
	if(index1==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody1.appendChild(tr);
	}
	if(index8==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0.00%</td>" +
				"<td><img src='../img/week/update.png' onclick='add(8)'/></td>";
		tr.innerHTML = td;
		tbody8.appendChild(tr);
	}
	if(index9==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody9.appendChild(tr);
	}
	if(index10==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='2'>0</td colspan='2'><td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0.00%</td>" +
		"<td><img src='../img/week/update.png' onclick='add(10)'/></td>";
		tr.innerHTML = td;
		tbody10.appendChild(tr);
	}
	if(index11==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody11.appendChild(tr);
	}
	if(index12==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody12.appendChild(tr);
	}
	if(index13==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody13.appendChild(tr);
	}
	if(index14==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody14.appendChild(tr);
	}
	if(index15==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody15.appendChild(tr);
	}
	if(index16==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='9'>无</td>";
		tr.innerHTML = td;
		tbody16.appendChild(tr);
	}
	if(index17==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0</td>" +
		"<td><img src='../img/week/update.png' onclick='add(17)'/></td>";
		tr.innerHTML = td;
		tbody17.appendChild(tr);
	}
	
	var tr1 = document.createElement("tr");
	tr1.setAttribute("id", "123"); 
	var td1 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(1)'/></td>";
	tr1.innerHTML = td1;
	tbody1.appendChild(tr1);
	
	var tr9 = document.createElement("tr");
	tr9.setAttribute("id", "123"); 
	var td9 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(9)'/></td>";
	tr9.innerHTML = td9;
	tbody9.appendChild(tr9);
	
	var tr11 = document.createElement("tr");
	tr11.setAttribute("id", "123"); 
	var td11 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(11)'/></td>";
	tr11.innerHTML = td11;
	tbody11.appendChild(tr11);
	
	var tr12 = document.createElement("tr");
	tr12.setAttribute("id", "123"); 
	var td12 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(12)'/></td>";
	tr12.innerHTML = td12;
	tbody12.appendChild(tr12);
	
	var tr13 = document.createElement("tr");
	tr13.setAttribute("id", "123"); 
	var td13 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(13)'/></td>";
	tr13.innerHTML = td13;
	tbody13.appendChild(tr13);
	
	var tr14 = document.createElement("tr");
	tr14.setAttribute("id", "123"); 
	var td14 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(14)'/></td>";
	tr14.innerHTML = td14;
	tbody14.appendChild(tr14);
	
	var tr15 = document.createElement("tr");
	tr15.setAttribute("id", "123"); 
	var td15 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(15)'/></td>";
	tr15.innerHTML = td15;
	tbody15.appendChild(tr15);
	
	var tr16 = document.createElement("tr");
	tr16.setAttribute("id", "123"); 
	var td16 = "<td colspan='8'></td><td><img src='../img/week/add.png' onclick='add(16)'/></td>";
	tr16.innerHTML = td16;
	tbody16.appendChild(tr16);
	
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
				layer.alert('该账号没有添加运行周报内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			var name = document.getElementById("name").innerHTML;
			if(!name){
				layer.alert('请先添加项目名称栏', {icon : 2});
				return;	
			}
			var weekId= sessionStorage.weekId;
			layer.open({
				  type: 2,
				  title:["添加周报",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../WeeklyController/runningAdd?type='+type+"&&weekId="+weekId
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
				layer.alert('该账号没有修改运行周报内容的权限，请换账号重试!', {icon : 2});
				return;
			}
			layer.open({
				  type: 2,
				  title:["修改周报内容",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../WeeklyController/runningUpd?id='+id+'&&type='+type
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
				layer.alert('该账号没有删除运行周报内容的权限，请换账号重试!', {icon : 2});
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
				    			setTimeout(function(){window.location.href="../WeeklyController/runningWeekly";},500);
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


function updWeek(){
	var userName = sessionStorage.Username;
	var projectId = $("#project").val();
	var year = $('#year').val();
	var week = $('#week').val();
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByPermissionId",  
		"data":{userName:userName,projectId:projectId,permissionId:32},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有创建运行周报的权限，请换账号重试!', {icon : 2});
				return;
			}
			layer.open({
				  type: 2,
				  title:["修改周报信息",'font-size:20px;font-weight:bold;'],
				  area: ['500px', '400px'], 
				  fixed: false, //不固定
				  maxmin: true,
				  content: '../WeeklyController/updWeek?year='+year+'&&week='+week+'&&type=3&&project=' + projectId
			});
		}
	});
	
	
}


function getPermissionId(index){
	if(index==1){
		return 33;
	}else{
		return 26+index;
	}
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

