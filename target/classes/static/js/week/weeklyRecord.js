var weekType;
var project;
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
				if(data.type==1){
					layer.alert(data.year+"年"+data.week+"周电仪周报不存在");
				}else{
					layer.alert(data.year+"年"+data.week+"周机务周报不存在");
				}
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
				if(data.type==1){
					layer.alert(data.year+"年"+data.week+"周电仪周报不存在");
				}else{
					layer.alert(data.year+"年"+data.week+"周机务周报不存在");
				}
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
			document.getElementById("name").innerHTML = data.name;
			document.getElementById("fillIn").innerHTML = data.fillIn;
			document.getElementById("auditor").innerHTML = data.auditor;
			if(data.type==1){
				document.getElementById("year").innerHTML = data.year+"年"+data.week+"周电仪周报";
				document.getElementById("h").innerHTML = data.year+"年"+data.week+"周电仪周报";
				document.getElementById("people").innerHTML = data.year+"年第"+data.week+"周";
				document.getElementById("time").innerHTML = "HOPE-JXZB-A"+data.week;
			}else{
				document.getElementById("year").innerHTML = data.year+"年"+data.week+"周机务周报";
				document.getElementById("h").innerHTML = data.year+"年"+data.week+"周机务周报";
				document.getElementById("people").innerHTML = data.year+"年第"+data.week+"周";
				document.getElementById("time").innerHTML = "HOPE-JXZB-B"+data.week;
			}
			project = data.projectId;
			sessionStorage.weekId = data.id;
			weekType = data.type;
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}
function fill(data){
	$("tbody tr").remove("tr[id=123]");
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
			var td = "<td>"+index1+"</td><td id='tdleft' colspan='5'>"+data[i].content1+"</td>";
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}else if(data[i].type==2){
			var td = "<td>"+index2+"</td><td>"+data[i].content1+"</td><td>"+data[i].content2+"</td><td>"+data[i].content3+"</td>"+
				"<td colspan='2'>"+data[i].content4+"</td>";
			index2++;
			tr.innerHTML = td;
			tbody2.appendChild(tr);
		}else if(data[i].type==3){
			var td = "<td>"+index3+"</td><td colspan='2'>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
					"<td  colspan='2'>"+data[i].content3+"</td> ";
			index3++;
			tr.innerHTML = td;
			tbody3.appendChild(tr);
		}else if(data[i].type==4){
			var td = "<td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
				"<td>"+data[i].content3+"</td><td>"+data[i].content4+"</td>";
			tr.innerHTML = td;
			tbody4.appendChild(tr);
			index4++;
		}else if(data[i].type==5){
			var td = "<td>"+index5+"</td><td colspan='2'>"+data[i].content1+"</td><td colspan='2'>"+data[i].content2+"</td>" +
				"<td>"+data[i].content3+"</td>";
			index5++;
			tr.innerHTML = td;
			tbody5.appendChild(tr);
		}else if(data[i].type==6){
			var td = "<td>"+index6+"</td><td colspan='2'>"+data[i].content1+"</td><td>"+data[i].content2+"</td>" +
				"<td colspan='2'>"+data[i].content3+"</td>";
			index6++;
			tr.innerHTML = td;
			tbody6.appendChild(tr);
		}else if(data[i].type==7){
			var td = "<td>"+index7+"</td><td id='tdleft' colspan='5'>"+data[i].content1+"</td>";
			index7++;
			tr.innerHTML = td;
			tbody7.appendChild(tr);
		}else{
			var td = "<td>"+index8+"</td><td id='tdleft' colspan='5'>"+data[i].content1+"</td>";
			index8++;
			tr.innerHTML = td;
			tbody8.appendChild(tr);
		}
	}
	if(index1==1){
		var tr11 = document.createElement("tr");
		tr11.setAttribute("id", "123"); 
		var td11 = "<td colspan='6'>尚未添加内容</td>";
		tr11.innerHTML = td11;
		tbody1.appendChild(tr11);
	}
	if(index2==1){
		var tr12 = document.createElement("tr");
		tr12.setAttribute("id", "123"); 
		var td12 = "<td colspan='6'>尚未添加内容</td>";
		tr12.innerHTML = td12;
		tbody2.appendChild(tr12);
	}
	if(index3==1){
		var tr13 = document.createElement("tr");
		tr13.setAttribute("id", "123"); 
		var td13 = "<td colspan='6'>尚未添加内容</td>";
		tr13.innerHTML = td13;
		tbody3.appendChild(tr13);
	}
	if(index4==1){
		var tr14 = document.createElement("tr");
		tr14.setAttribute("id", "123"); 
		var td14 = "<td colspan='2'>0</td><td colspan='2'>0</td>" +
				"<td>0</td><td>0</td>";
				
		tr14.innerHTML = td14;
		tbody4.appendChild(tr14);
	}
	if(index5==1){
		var tr15 = document.createElement("tr");
		tr15.setAttribute("id", "123"); 
		var td15 = "<td colspan='6'>尚未添加内容</td>";
		tr15.innerHTML = td15;
		tbody5.appendChild(tr15);
	}
	if(index6==1){
		var tr16 = document.createElement("tr");
		tr16.setAttribute("id", "123"); 
		var td16 = "<td colspan='6'>尚未添加内容</td>";
		tr16.innerHTML = td16;
		tbody6.appendChild(tr16);
	}
	if(index7==1){
		var tr17 = document.createElement("tr");
		tr17.setAttribute("id", "123"); 
		var td17 = "<td colspan='6'>尚未添加内容</td>";
		tr17.innerHTML = td17;
		tbody7.appendChild(tr17);
	}
	if(index8==1){
		var tr18 = document.createElement("tr");
		tr18.setAttribute("id", "123"); 
		var td18 = "<td colspan='6'>尚未添加内容</td>";
		tr18.innerHTML = td18;
		tbody8.appendChild(tr18);
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

