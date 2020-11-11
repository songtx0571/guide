var weekType;
var project
$(function(){
	change($("#id").val());
});
function aa() {
	$("#myElementId").print();
}
function exportWord(){
    $("#myElementId").wordExport(document.getElementById("year").innerHTML);
}
function next(){
	var str = document.getElementById("year").innerHTML;
	var year = str.substring(0,4);
	var week = str.substring(5,str.length-5);
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/next",  
		"data":{year:year,week:week,type:weekType,project:project},
		"success":function(Json){
			var data = Json.data
			if(data.id==0){
				layer.alert(data.year+"年"+data.week+"周运行周报不存在");
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
	var str = document.getElementById("year").innerHTML;
	var year = str.substring(0,4);
	var week = str.substring(5,str.length-5);
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/last",  
		"data":{year:year,week:week,type:weekType,project:project},
		"success":function(Json){
			var data = Json.data
			if(data.id==0){
				layer.alert(data.year+"年"+data.week+"周运行周报不存在");
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
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/find1",  
		"data":{id:id},
		"success":function(Json){
			fill(Json.data);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/findWeek1",  
		"data":{id:id},
		"success":function(Json){
			var data = Json.data;
			document.getElementById("fillIn").innerHTML = data.fillInName;
			document.getElementById("auditor").innerHTML = data.auditorName;
			document.getElementById("year").innerHTML = data.year+"年"+data.week+"周运行周报";
			document.getElementById("h").innerHTML = data.year+"年"+data.week+"周运行周报";
			document.getElementById("people").innerHTML = data.year+"年第"+data.week+"周";
			document.getElementById("time").innerHTML = "HOPE-JXZB-C"+data.week;
			sessionStorage.weekId = data.id;
			weekType = data.type;
			project = data.projectId;
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}
function fill(data){
	$("tbody tr").remove("tr[id=123]");
	var tbody1 = document.getElementById("tbody1");/*
	var tbody2 = document.getElementById("tbody2");
	var tbody3 = document.getElementById("tbody3");
	var tbody4 = document.getElementById("tbody4");
	var tbody5 = document.getElementById("tbody5");
	var tbody6 = document.getElementById("tbody6");
	var tbody7 = document.getElementById("tbody7");*/
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
			var td = "<td>"+index1+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}/*else if(data[i].type==2){
			var td = "<td>入口NOX浓度</td><td>mg/Nm3</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
			"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td><td>"+data[i].content5+"</td><td>"+data[i].content6+"</td>";
			index2++;
			tr.innerHTML = td;
			tbody2.appendChild(tr);
		}else if(data[i].type==3){
			var td = "<td>出口SO2浓度</td><td>mg/Nm3</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
			"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td><td>"+data[i].content5+"</td><td>"+data[i].content6+"</td>";
			index3++;
			tr.innerHTML = td;
			tbody3.appendChild(tr);
		}else if(data[i].type==4){
			var td = "<td>出口NOX浓度</td><td>mg/Nm3</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
			"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td><td>"+data[i].content5+"</td><td>"+data[i].content6+"</td>";
			tr.innerHTML = td;
			tbody4.appendChild(tr);
			index4++;
		}else if(data[i].type==5){
			var td = "<td>出口粉尘浓度</td><td>mg/Nm3</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
			"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td><td>"+data[i].content5+"</td><td>"+data[i].content6+"</td>";
			index5++;
			tr.innerHTML = td;
			tbody5.appendChild(tr);
		}else if(data[i].type==6){
			var td = "<td>石灰石耗量</td><td>mg/Nm3</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
			"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td><td>"+data[i].content5+"</td><td>"+data[i].content6+"</td>";
			index6++;
			tr.innerHTML = td;
			tbody6.appendChild(tr);
		}else if(data[i].type==7){
			var td = "<td>氨水耗量</td><td>T</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
			"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td><td>"+data[i].content5+"</td><td>"+data[i].content6+"</td>";
			index7++;
			tr.innerHTML = td;
			tbody7.appendChild(tr);
		}*/else if(data[i].type==8){
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
			"<td colspan='2'>"+data[i].content3+"</td><td colspan='2'>"+data[i].content4+"</td>";
			index8++;
			tr.innerHTML = td;
			tbody8.appendChild(tr);
		}else if(data[i].type==9){
			var td = "<td>"+index9+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index9++;
			tr.innerHTML = td;
			tbody9.appendChild(tr);
		}else if(data[i].type==10){
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
			"<td colspan='2'>"+data[i].content3+"</td><td colspan='2'>"+data[i].content4+"</td>";
			index10++;
			tr.innerHTML = td;
			tbody10.appendChild(tr);
		}else if(data[i].type==11){
			var td = "<td>"+index11+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index11++;
			tr.innerHTML = td;
			tbody11.appendChild(tr);
		}else if(data[i].type==12){
			var td = "<td>"+index12+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index12++;
			tr.innerHTML = td;
			tbody12.appendChild(tr);
		}else if(data[i].type==13){
			var td = "<td>"+index13+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index13++;
			tr.innerHTML = td;
			tbody13.appendChild(tr);
		}else if(data[i].type==14){
			var td = "<td>"+index14+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index14++;
			tr.innerHTML = td;
			tbody14.appendChild(tr);
		}else if(data[i].type==15){
			var td = "<td>"+index15+"</td><td id='tdleft' colspan='7'>"+data[i].content1+"</td>";
			index15++;
			tr.innerHTML = td;
			tbody15.appendChild(tr);
		}else if(data[i].type==16){
			var td = "<td>"+index16+"</td><td colspan='7'>"+data[i].content1+"</td>";
			index16++;
			tr.innerHTML = td;
			tbody16.appendChild(tr);
		}else{
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
					"<td colspan='2'>"+data[i].content3+"</td><td colspan='2'>"+data[i].content4+"</td>";
			index17++;
			tr.innerHTML = td;
			tbody17.appendChild(tr);
		}
	}
	if(index1==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td =  "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody1.appendChild(tr);
	}
	/*if(index2==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td>出口NOX浓度</td><td>mg/Nm3</td><td>0</td><td>0</td>" +
				"<td>0</td><td>0</td><td>0</td><td>0</td>";
		tr.innerHTML = td;
		tbody2.appendChild(tr);
	}
	if(index3==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td>出口SO2浓度</td><td>mg/Nm3</td><td>0</td><td>0</td>" +
				"<td>0</td><td>0</td><td>0</td><td>0</td>";
		tr.innerHTML = td;
		tbody3.appendChild(tr);
	}
	if(index4==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td>出口NOX浓度</td><td>mg/Nm3</td><td>0</td><td>0</td>" +
				"<td>0</td><td>0</td><td>0</td><td>0</td>";
		tr.innerHTML = td;
		tbody4.appendChild(tr);
	}
	if(index5==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td>出口粉尘</td><td>mg/Nm3</td><td>0</td><td>0</td>" +
				"<td>0</td><td>0</td><td>0</td><td>0</td>";
		tr.innerHTML = td;
		tbody5.appendChild(tr);
	}
	if(index6==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td>石灰石耗量</td><td>T</td><td>0</td><td>0</td>" +
				"<td>0</td><td>0</td><td>0</td><td>0</td>";
		tr.innerHTML = td;
		tbody6.appendChild(tr);
	}
	if(index7==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td>氨水耗量</td><td>T</td><td>0</td><td>0</td>" +
				"<td>0</td><td>0</td><td>0</td><td>0</td>";
		tr.innerHTML = td;
		tbody7.appendChild(tr);
	}*/
	if(index8==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0.00%</td>";
		tr.innerHTML = td;
		tbody8.appendChild(tr);
	}
	if(index9==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody9.appendChild(tr);
	}
	if(index10==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='2'>0</td colspan='2'><td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0.00%</td>";
		tr.innerHTML = td;
		tbody10.appendChild(tr);
	}
	if(index11==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody11.appendChild(tr);
	}
	if(index12==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody12.appendChild(tr);
	}
	if(index13==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody13.appendChild(tr);
	}
	if(index14==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody14.appendChild(tr);
	}
	if(index15==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody15.appendChild(tr);
	}
	if(index16==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='8'>无</td>";
		tr.innerHTML = td;
		tbody16.appendChild(tr);
	}
	if(index17==1){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123"); 
		var td = "<td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0</td><td colspan='2'>0</td>";
		tr.innerHTML = td;
		tbody17.appendChild(tr);
	}
	
	
}



