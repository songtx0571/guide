$(function(){
	change($('#id').val());
});
function aa() {
	$("#myElementId").print();
}
function exportWord(){
    $("#myElementId").wordExport(document.getElementById("h2").innerHTML);
}
function next(){
	var type = sessionStorage.ScrDailyRecordType;
	var project = sessionStorage.ScrDailyRecordProject;
	var str = document.getElementById("datetime").innerHTML;
	var datetime = str.substring(3,str.length);
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/next",  
		"data":{datetime:datetime,type:type,project:project,other:2},
		"success":function(Json){
			var data = Json.data
			if(data.id==0){
				if(data.type==1){
					layer.alert(data.datetime+"8点的运行日志不存在");
				}else if(data.type==2){
					layer.alert(data.datetime+"16点的运行日志不存在");
				}else{
					layer.alert(data.datetime+"0点的运行日志不存在");
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
	var type = sessionStorage.ScrDailyRecordType;
	var project = sessionStorage.ScrDailyRecordProject;
	var str = document.getElementById("datetime").innerHTML;
	var datetime = str.substring(3,str.length);
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/last",  
		"data":{type:type,datetime:datetime,project:project,other:2},
		"success":function(Json){
			var data = Json.data
			if(data.id==0){
				if(data.type==1){
					layer.alert(data.datetime+"8点的运行日志不存在");
				}else if(data.type==2){
					layer.alert(data.datetime+"16点的运行日志不存在");
				}else{
					layer.alert(data.datetime+"0点的运行日志不存在");
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
	$("tbody tr").remove("tr[id=123]");
	for(var i=1;i<3;i++){
		document.getElementById(""+i+"-1").innerHTML = 0;
		document.getElementById(""+i+"-2").innerHTML = 0;
		document.getElementById(""+i+"-3").innerHTML = 0;
		document.getElementById(""+i+"-4").innerHTML = 0;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/find1",  
		"data":{scrDailyId:id},
		"success":function(Json){
			fill(Json.data);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/findscrDaily1",  
		"data":{id:id},
		"success":function(Json){
			var data = Json.data;
			document.getElementById("successor").innerHTML = data.successorName;
			document.getElementById("traders").innerHTML = data.tradersName;
			document.getElementById("recorder").innerHTML = data.recorderName;
			document.getElementById("datetime").innerHTML = "日期:"+data.datetime;
			sessionStorage.ScrDailyRecordType = data.type;
			sessionStorage.ScrDailyRecordProject = data.projectId;
			if(data.type==1){
				document.getElementById("type").innerHTML = '8:00';
				document.getElementById("h2").innerHTML = data.datetime + "8点脱硫运行日志";
			}else if(data.type==2){
				document.getElementById("type").innerHTML = '16:00';
				document.getElementById("h2").innerHTML = data.datetime + "16点脱硫运行日志"
			}else if(data.type==3){
				document.getElementById("type").innerHTML = '0:00';
				document.getElementById("h2").innerHTML = data.datetime + "0点脱硫运行日志"
			}
			if(data.group==1){
				document.getElementById("group").innerHTML = '班组:甲';
			}else if(data.group==2){
				document.getElementById("group").innerHTML = '班组:乙';
			}else if(data.group==3){
				document.getElementById("group").innerHTML = '班组:丙';
			}else if(data.group==4){
				document.getElementById("group").innerHTML = '班组:丁';
			}else{
				document.getElementById("group").innerHTML = "";
			}
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
	for(var i=0;i<data.length;i++){
		var tr = document.createElement("tr");
		tr.setAttribute("id", "123");
		if(data[i].type==1){
			var td =  "<td>"+index1+"</td><td  colspan='8'>"+data[i].content1+"</td>"
			index1++;
			tr.innerHTML = td;
			tbody1.appendChild(tr);
		}else if(data[i].type==2){
			var num = data[i].content1
			document.getElementById(""+num+"-1").innerHTML = data[i].content2;
			document.getElementById(""+num+"-2").innerHTML = data[i].content3;
			document.getElementById(""+num+"-3").innerHTML = data[i].content4;
			document.getElementById(""+num+"-4").innerHTML = data[i].content5;
			
		}else if(data[i].type==3){
			var td = "<td>"+index3+"</td><td colspan='3'>"+data[i].content1+"</td><td colspan='5'>"+data[i].content2+"</td>";
			index3++;
			tr.innerHTML = td;
			tbody3.appendChild(tr);
		}else if(data[i].type==4){
			var td ="<td>"+index4+"</td><td colspan='3'>"+data[i].content1+"</td><td colspan='5'>"+data[i].content2+"</td>";
			tr.innerHTML = td;
			tbody4.appendChild(tr);
			index4++;
		}
	}
		
		if(index1==1){
			var tr11 = document.createElement("tr");
			tr11.setAttribute("id", "123"); 
			var td11 = "<td colspan='9'>未添加</td>";
			tr11.innerHTML = td11;
			tbody1.appendChild(tr11);
		}
		if(index3==1){
			var tr13 = document.createElement("tr");
			tr13.setAttribute("id", "123"); 
			var td13 = "<td colspan='9'>未添加</td>";
			tr13.innerHTML = td13;
			tbody3.appendChild(tr13);
		}
		if(index4==1){
			var tr14 = document.createElement("tr");
			tr14.setAttribute("id", "123"); 
			var td14 =  "<td colspan='9'>未添加</td>";;
			tr14.innerHTML = td14;
			tbody4.appendChild(tr14);
		}
	
}
