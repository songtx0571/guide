$(function(){
	change($('#id').val());
});
function aa() {
	$("#myElementId").print();
}
function exportWord(){
    $("#myElementId").wordExport(document.getElementById("datetime").innerHTML+"检修日志");
}
function next(){
	var project = sessionStorage.ScrDailyRecordProject;
	var datetime = document.getElementById("datetime").innerHTML;
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/next",  
		"data":{datetime:datetime,project:project},
		"success":function(Json){
			var data = Json.data
			if(data.id==0){
				layer.alert(data.datetime+"的检修日志不存在");				
			}else{
				change(data.id)
			}
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function last(){
	var project = sessionStorage.ScrDailyRecordProject;
	var datetime = document.getElementById("datetime").innerHTML;
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/last",  
		"data":{datetime:datetime,project:project},
		"success":function(Json){
			var data = Json.data
			if(data.id==0){
				layer.alert(data.datetime+"的检修日志不存在");	
			}else{
				change(data.id)
			}
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function change(id){
	$("tbody tr").remove("tr[id=123]");
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/findRecord1",  
		"data":{maintenanceId:id},
		"success":function(Json){
			console.log(Json.data);
			fill(Json.data);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
	$.ajax({ 
		"type" : 'post', 
		"url": "../MaintenanceController/find1",  
		"data":{id:id},
		"success":function(Json){
			var data = Json.data;
			console.log(data);
			console.log(data.num);
			document.getElementById("leader").innerHTML = data.leader;
			
			if(data.attendance==-1){
				document.getElementById("attendance").innerHTML = 0;
			}else{
				document.getElementById("attendance").innerHTML = data.attendance;
			}
			document.getElementById("num").innerHTML = data.num;
			
			document.getElementById("datetime").innerHTML = data.datetime;
			sessionStorage.ScrDailyRecordProject = data.projectId;
			
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function fill(data){
	var tbody1 = document.getElementById("tbody");
	var index1 = 0,index2 = 0,index3 = 0,index4 = 0,index5 = 0,index6 = 0;
	for(var i=0;i<data.length;i++){
		if(data[i].type==1){
			index1++;
		}else if(data[i].type==2){
			index2++;
		}else if(data[i].type==3){
			index3++;
		}else if(data[i].type==4){
			index4++;
		}else if(data[i].type==5){
			index5++;
		}else if(data[i].type==6){
			index6++;
		}
	}
	var num = 1;
	for(var i=0;i<data.length;i++){
		if(i==0){
			var tr = document.createElement("tr");
			tr.setAttribute("id", "123");
			index1 = index1 + 1;
			var td = "<th  width='10%' rowspan='"+index1+"'>工作安排</th><th   width='8%'>缺陷号</th><th  width='42%' colspan='3'>缺陷名称和处理方法</th>" +
					"<th colspan='2'  width='15%'>人员</th><th  width='5%'>工时</th><th  width='20%'>创建时间</th>";
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}
		if(data[i].type==1){
			var tr1 = document.createElement("tr");
			tr1.setAttribute("id", "123");
			var td1 = "<th>"+data[i].defectNumber+"</th><td colspan='3'>"+data[i].content+"</td>";
			var people = [];
			console.log(data[i]);
			if(data[i].peopleName !=null){
				people = data[i].peopleName.split(/[、，；：:;,.]/);
				if(people.length>2){
					td1 += "<th colspan='2'>"+people[0]+","+people[1]+" 等</th><th>"+data[i].workingHours+"h</th><th>"+data[i].datetime+"</th>";
				}else{
					td1 += "<th colspan='2'>"+data[i].peopleName+"</th><th>"+data[i].workingHours+"h</th><th>"+data[i].datetime+"</th>";
				}
			}else{
				people = data[i].people.split(/[、，；：:;,.]/);
				if(people.length>2){
					td1 += "<th colspan='2'>"+people[0]+","+people[1]+" 等</th><th>"+data[i].workingHours+"h</th><th>"+data[i].datetime+"</th>";
				}else{
					td1 += "<th colspan='2'>"+data[i].people+"</th><th>"+data[i].workingHours+"h</th><th>"+data[i].datetime+"</th>";
				}
			}
			
			
			tr1.innerHTML = td1;
			tbody1.appendChild(tr1)
		}
	}
	num = 1;
	for(var i=0;i<data.length;i++){
		
		if(data[i].type==2){
			var tr = document.createElement("tr");
			tr.setAttribute("id", "123");
			if(num==1){
				var td = "<th  rowspan='"+index2+"'>技术交流</th><td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr);
			}else{
				var td = "<td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr)
			}
		}
	}
	num = 1;
	for(var i=0;i<data.length;i++){
		
		if(data[i].type==3){
			var tr = document.createElement("tr");
			tr.setAttribute("id", "123");
			if(num==1){
				var td = "<th  rowspan='"+index3+"'>安全交流</th><td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr);
			}else{
				var td = "<td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr)
			}
		}
	}
	num = 1;
	for(var i=0;i<data.length;i++){
		if(data[i].type==4){
			var tr = document.createElement("tr");
			tr.setAttribute("id", "123");
			if(num==1){
				var td = "<th  rowspan='"+index4+"'>巡检情况</th><td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr);
			}else{
				var td = "<td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr)
			}
		}
	}
	num = 1;
	for(var i=0;i<data.length;i++){
		if(data[i].type==5){
			var tr = document.createElement("tr");
			tr.setAttribute("id", "123");
			if(num==1){
				var td = "<th  rowspan='"+index5+"'>检修情况</th><td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr);
			}else{
				var td = "<td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr)
			}
		}
	}
	num = 1;
	for(var i=0;i<data.length;i++){
		if(data[i].type==6){
			var tr = document.createElement("tr");
			tr.setAttribute("id", "123");
			if(num==1){
				var td = "<th  rowspan='"+index6+"'>班后总结</th><td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr);
			}else{
				var td = "<td colspan='8'>"+num+"、"+data[i].content+"</td>"
				num++;
				tr.innerHTML = td;
				tbody1.appendChild(tr)
			}
		}
	}
	
}
