var index = parent.layer.getFrameIndex(window.name); 
function insert1(){
	var type = $('#type').val();
	var weekId = $('#weekId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	var content5 = $('#content5').val();
	var content6 = $('#content6').val();
	if(isNaN(content1)){
		layer.alert("请正确输入1号炉的排量",{icon:2});
		return;
	}
	if(isNaN(content2)){
		layer.alert("请正确输入2号炉的排量",{icon:2});
		return;
	}
	if(isNaN(content3)){
		layer.alert("请正确输入3号炉的排量",{icon:2});
		return;
	}
	if(isNaN(content4)){
		layer.alert("请正确输入4号炉的排量",{icon:2});
		return;
	}
	if(isNaN(content5)){
		layer.alert("请正确输入5号炉的排量",{icon:2});
		return;
	}
	if(isNaN(content6)){
		layer.alert("请正确输入6号炉的排量",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/insert",  
		"data":{weekId:weekId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:content5,content6:content6},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert3(){
	var type = $('#type').val();
	var weekId = $('#weekId').val();
	var content1 = $('#content1').val();
	if(!content1){
		layer.alert("内容不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/insert",  
		"data":{weekId:weekId,type:type,content1:content1,content2:0,content3:0,content4:0,content5:0,content6:0},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert4(){
	var type = $('#type').val();
	var weekId = $('#weekId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	if(isNaN(content1)){
		layer.alert("请在习惯性违章栏输入正确的数字",{icon:2});
		return;
	}if(isNaN(content2)){
		layer.alert("请在安装违章栏输入正确的数字",{icon:2});
		return;
	}if(isNaN(content3)){
		layer.alert("请在人员习惯违章栏输入正确的数字",{icon:2});
		return;
	}if(isNaN(content4)){
		layer.alert("请在考核栏输入正确的数字",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/insert",  
		"data":{weekId:weekId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:0,content6:0},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert2(){
	var type = $('#type').val();
	var weekId = $('#weekId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	if(isNaN(content1)){
		layer.alert("请在缺陷总数栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content2)){
		layer.alert("请在已完成栏输入正确的数字",{icon:2});
		return;
	}
	content3 = content1-content2;
	content4 = Math.round(content2 / content1 * 10000) / 100.00 + "%";
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/insert",  
		"data":{weekId:weekId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:0,content6:0},
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