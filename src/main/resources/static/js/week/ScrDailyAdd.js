var index = parent.layer.getFrameIndex(window.name); 
function insert1(){
	var type = $('#type').val();
	var scrDailyId = $('#scrDailyId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	if(!content1){
		layer.alert("时间不可以为空",{icon:2});
		return;
	}
	if(!content2){
		layer.alert("内容不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/insert",  
		"data":{scrDailyId:scrDailyId,type:type,content1:content1,content2:content2,content3:0,content4:0,content5:0,content6:0},
		"success":function(Json){
			var userName = sessionStorage.Username;
			var projectId = $("#project").val();
			var wfgdDailyId= sessionStorage.wfgdDailyId;
			var type1 = sessionStorage.wfgdDailyType;
			var datetime = sessionStorage.wfgdDailydatetime;
			var Successor = sessionStorage.wfgdDailySuccessor;
			var Recorder=sessionStorage.wfgdDailyRecorder;
			if(Recorder != ""&&Recorder != null){
				var Recorders = Recorder.split(";");
				for(var i=0;i<Recorders.length;i++){
					if(userName==Recorders[i]){

								$.ajax({
									"type" : 'post',
									"url": "../ScrDailyController/addSuccessor2",
									"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
									"success":function(Json){
										if(Json.data==1){
											// layer.alert('添加成功',{icon:1});
											// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
										}
									}
								});

						layer.alert('添加成功',{icon:1});
						setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
						return;
					}
				}
				Recorder = Recorder +";"+ userName;
			}
			else{
				Recorder = userName;
			}



					$.ajax({
						"type" : 'post',
						"url": "../ScrDailyController/addSuccessor2",
						"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
						"success":function(Json){
							if(Json.data==1){
								// layer.alert('添加成功',{icon:1});
								// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
							}
						}
					});

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
	var scrDailyId = $('#scrDailyId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	var content5 = $('#content5').val();
	if(isNaN(content2)||!content2){
		layer.alert("请在喷氨量栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content3)||!content3){
		layer.alert("请在氨逃逸栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content4)||!content4){
		layer.alert("请在出口NOx浓度栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content5)||!content5){
		layer.alert("请在反应压强栏输入正确的数字",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/insert",  
		"data":{scrDailyId:scrDailyId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:content5,content6:0},
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
	var scrDailyId = $('#scrDailyId').val();
	var content1 = $('#content1').val();
	if(!content1){
		layer.alert("内容不可以为空",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/insert",  
		"data":{scrDailyId:scrDailyId,type:type,content1:content1,content2:0,content3:0,content4:0,content5:0,content6:0},
		"success":function(Json){
			var userName = sessionStorage.Username;
			var projectId = $("#project").val();
			var wfgdDailyId= sessionStorage.wfgdDailyId;
			var type1 = sessionStorage.wfgdDailyType;
			var datetime = sessionStorage.wfgdDailydatetime;
			var Successor = sessionStorage.wfgdDailySuccessor;
			var Recorder=sessionStorage.wfgdDailyRecorder;
			if(Recorder != ""&&Recorder != null){
				var Recorders = Recorder.split(";");
				for(var i=0;i<Recorders.length;i++){
					if(userName==Recorders[i]){

								$.ajax({
									"type" : 'post',
									"url": "../ScrDailyController/addSuccessor2",
									"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
									"success":function(Json){
										if(Json.data==1){
											// layer.alert('添加成功',{icon:1});
											// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
										}
									}
								});

						layer.alert('添加成功',{icon:1});
						setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
						return;
					}
				}
				Recorder = Recorder +";"+ userName;
			}
			else{
				Recorder = userName;
			}


					$.ajax({
						"type" : 'post',
						"url": "../ScrDailyController/addSuccessor2",
						"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
						"success":function(Json){
							if(Json.data==1){
								// layer.alert('添加成功',{icon:1});
								// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
							}
						}
					});

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
	var scrDailyId = $('#scrDailyId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	var content5 = $('#content5').val();
	var content6 = $('#content6').val();
	if(isNaN(content1)||!content1){
		layer.alert("请在1#输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content2)||!content2){
		layer.alert("请在2#栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content3)||!content3){
		layer.alert("请在3#栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content4)||!content4){
		layer.alert("请在4#栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content5)||!content5){
		layer.alert("请在5#栏输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content6)||!content6){
		layer.alert("请在6#栏输入正确的数字",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/insert",  
		"data":{scrDailyId:scrDailyId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:content5,content6:content6},
		"success":function(Json){
			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}


function insert5(){
	var type = $('#type').val();
	var scrDailyId = $('#scrDailyId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	var content5 = $('#content5').val();
	if(isNaN(content2)||!content2){
		layer.alert("请在对讲机输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content3)||!content3){
		layer.alert("请在电子秤输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content4)||!content4){
		layer.alert("请在测震仪输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content5)||!content5){
		layer.alert("请在测温仪输入正确的数字",{icon:2});
		return;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/insert",  
		"data":{scrDailyId:scrDailyId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:content5,content6:0},
		"success":function(Json){
			var userName = sessionStorage.Username;
			var projectId = $("#project").val();
			var wfgdDailyId= sessionStorage.wfgdDailyId;
			var type1 = sessionStorage.wfgdDailyType;
			var datetime = sessionStorage.wfgdDailydatetime;
			var Successor = sessionStorage.wfgdDailySuccessor;
			var Recorder=sessionStorage.wfgdDailyRecorder;
			if(Recorder != ""&&Recorder != null){
				var Recorders = Recorder.split(";");
				for(var i=0;i<Recorders.length;i++){
					if(userName==Recorders[i]){

								$.ajax({
									"type" : 'post',
									"url": "../ScrDailyController/addSuccessor2",
									"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
									"success":function(Json){
										if(Json.data==1){
											// layer.alert('添加成功',{icon:1});
											// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
										}
									}
								});
						layer.alert('添加成功',{icon:1});
						setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
						return;
					}
				}
				Recorder = Recorder +";"+ userName;
			}
			else{
				Recorder = userName;
			}


					$.ajax({
						"type" : 'post',
						"url": "../ScrDailyController/addSuccessor2",
						"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
						"success":function(Json){
							if(Json.data==1){
								// layer.alert('添加成功',{icon:1});
								// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
							}
						}
					});

			layer.alert('添加成功',{icon:1});
    		setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
		},
		"error":function(){
			layer.alert("系统繁忙");
		}	
	});
}

function insert6(){
	var type = $('#type').val();
	var scrDailyId = $('#scrDailyId').val();
	var content1 = $('#content1').val();
	var content2 = $('#content2').val();
	var content3 = $('#content3').val();
	var content4 = $('#content4').val();
	var content5 = $('#content5').val();
	if(isNaN(content2)||!content2){
		layer.alert("请在PH计输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content3)||!content3){
		layer.alert("请在量筒输入正确的数字",{icon:2});
		return;
	}
	if(isNaN(content4)||!content4){
		layer.alert("请在取样杯输入正确的数字",{icon:2});
		return;
	}
	if(!content5){
		content5 = 0;
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "../ScrDailyController/insert",  
		"data":{scrDailyId:scrDailyId,type:type,content1:content1,content2:content2,content3:content3,content4:content4,content5:content5,content6:0},
		"success":function(Json){
			var userName = sessionStorage.Username;
			var projectId = $("#project").val();
			var wfgdDailyId= sessionStorage.wfgdDailyId;
			var type1 = sessionStorage.wfgdDailyType;
			var datetime = sessionStorage.wfgdDailydatetime;
			var Successor = sessionStorage.wfgdDailySuccessor;
			var Recorder=sessionStorage.wfgdDailyRecorder;
			if(Recorder != ""&&Recorder != null){
				var Recorders = Recorder.split(";");
				for(var i=0;i<Recorders.length;i++){
					if(userName==Recorders[i]){

								$.ajax({
									"type" : 'post',
									"url": "../ScrDailyController/addSuccessor2",
									"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
									"success":function(Json){
										if(Json.data==1){
											// layer.alert('添加成功',{icon:1});
											// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
										}
									}
								});
						layer.alert('添加成功',{icon:1});
						setTimeout(function(){parent.location.reload(1);parent.layer.close(index);},500);
						return;
					}
				}
				Recorder = Recorder +";"+ userName;
			}
			else{
				Recorder = userName;
			}


					$.ajax({
						"type" : 'post',
						"url": "../ScrDailyController/addSuccessor2",
						"data":{userName:Successor,id:wfgdDailyId,datetime:datetime,projectId:projectId,type:type1,name:Recorder},
						"success":function(Json){
							if(Json.data==1){
								// layer.alert('添加成功',{icon:1});
								// setTimeout(function(){window.location.href="../ScrDailyController/WfgdDaily";},500);
							}
						}
					});

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