var index = parent.layer.getFrameIndex(window.name); 
function insert1(){
	var id = $('#id').val();
	var content1 = $('#content1').val();
	if(!content1){
		layer.alert("内容不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/update",  
		"data":{id:id,content1:content1,content2:0,content3:0,content4:0,content5:0,content6:0},
		"success":function(Json){
			layer.alert('修改成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert2(){
	var id = $('#id').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	if(!content1){
		layer.alert("备件名称不可以为空",{icon:2});
		return;
	}
	if(!content2){
		layer.alert("备件数量不可以为空",{icon:2});
		return;
	}
	if(!content3){
		layer.alert("备件规格不可以为空",{icon:2});
		return;
	}
	if(!content4){
		layer.alert("备件用途不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/update",  
		"data":{id:id,content1:content1,content2:content2,content3:content3,content4:content4,content5:0,content6:0},
		"success":function(Json){
			layer.alert('修改成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}


function insert3(){
	var id = $('#id').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	if(!content1){
		layer.alert("项目名称不可以为空",{icon:2});
		return;
	}
	if(!content2){
		layer.alert("主要问题不可以为空",{icon:2});
		return;
	}
	if(!content3){
		layer.alert("处理对策不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../WeeklyController/update",  
		"data":{id:id,content1:content1,content2:content2,content3:content3,content4:0,content5:0,content6:0},
		"success":function(Json){
			layer.alert('修改成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert4(){
	var id = $('#id').val();
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
		"url": "../WeeklyController/update",  
		"data":{id:id,content1:content1,content2:content2,content3:content3,content4:content4,content5:0,content6:0},
		"success":function(Json){
			layer.alert('修改成功',{icon:1});
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