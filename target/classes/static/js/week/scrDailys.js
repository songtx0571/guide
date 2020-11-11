var oTable;
$(document).ready( function () {
	var userName = sessionStorage.Username;
	$.ajax({
		"type" : 'post', 
		"url": "../WeeklyController/getProject1",
    	"data":{userName:userName},
    	"success":function(Json){
    		var data = Json.data;
    		document.getElementById('project').length = 0;
    		var project = document.getElementById('project');
    		for(var i = 0;i<data.length;i++){
    			var opt1 = new Option(data[i].projectTeam, data[i].id); 
    			project.options.add(opt1);
    		}
    		bigDataTable($('#project').val());
    		$('#DataTable tbody').on('click','tr td:nth-child(2)', function (e) {
       	    	var index = $(this).siblings(":first").text();
       	    	//var other = $("#hidden-"+index).val();
       	    	find(index,2);
       	    });
    	}
	});
});
function change(){
	var project = $('#project').val();
	var other = $('#other').val();
	oTable.destroy();
	bigDataTable(project);
}
function bigDataTable(project){
	oTable = $('#DataTable').DataTable({
    	"oLanguage": {  
    		"sProcessing": "正在抓取数据，请稍后...",  
    		"sLengthMenu": "显示_MENU_条 ",  
    		"sZeroRecords": "没有您要搜索的内容",  
    		"sInfo": "从_START_ 到 _END_ 条记录——总记录数为 _TOTAL_ 条", 
    		"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",  
    		"sInfoFiltered": "(全部记录数 \_MAX\_ 条)",  
    		"sInfoPostFix": "",  
    		"sSearch": "全局模糊搜索",  
    		"sUrl": "",  
    		"oPaginate": {  
    			"sFirst":    "第一页",  
    			"sPrevious": " 上一页 ",  
    			"sNext":     " 下一页 ",  
    			"sLast":     " 最后一页 "  
    			}  
    		},
    	"autoWidth": false,
    	"paging":true,
        "sAjaxSource" : "../ScrDailyController/getscrDailys",//通过ajax实现分页的url路径。    
   		"fnServerData": function(sSource, aoData, fnCallback){
        	 $.ajax({ 
        	 'type' : 'post', 
        	 "data":{project:project,other:2},
        	 "url": sSource, 
        	"success":function(Json){
        		fnCallback(Json);
        	}
        	 });
        }, 
        "order": [[ 1, "desc" ]],
   	    "columns":[
   	    	 {"data" : "id","width": "10%" },
   	    	 {"data" : "datetime","width": "25%" },  
    	     {"data" : "type","width": "10%", "render": function ( data, type, full, meta ) {
                    if(data==1){
                    	return "8:00";
                    }else if(data==2){
                    	return "16:00";
                    }else{
                    	return "0:00";
                    }
                  }  
   	    	 }, 
             {"data" : "tradersName","width": "15%" }, 
             {"data" : "successorName","width": "15%"}, 
            
   	    ],
   	    "buttons": [
   	    	{
   	    		extend: 'print',
   	    		text: 'Print current page',
   	    		exportOptions: {
   	    			modifier: {
   	    				page: 'current'
   	    			}
   	    		}
   	    	}
        ],
       
    });
	
}

function find(id,other){
	layer.open({
		type: 2,
		shadeClose: true,
		shade: 0.8,
		title:["运行日志",'font-size:20px;font-weight:bold;'],
		area: ['900px', '90%'], 
		fixed: false, //不固定
		scrollbar: false,
		content: '../ScrDailyController/ScrDailyRecord?id='+ id +'&&other='+ other
	});
}

function del(id){
	var power = sessionStorage.power;
	console.log(power);
	if(power<2){
		layer.alert('该账号没有删除用户的权限，请换账号重试!', {icon : 2});
		return;
	}
	layer.confirm('确认删除？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			$.ajax({
				"type" : 'post', 
		    	"url": "../ScrDailyController/delScrDailys",
		    	"data":{id:id},
		    	"success":function(Json){
		    		if(Json.data>=1){
		    			layer.alert('删除成功',{icon:1});
		    			setTimeout(function(){window.location.href="../ScrDailyController/ScrDailys";},500);
		    		}else{
		    			layer.alert("删除失败,请稍后再试",{icon:2});
		    		}
		    	},
		    	"error":function(){
		    		layer.alert("系统繁忙!",{icon:2});
		    	}
			});
		}, function(){
		  layer.msg('已取消', {icon: 1});
		  return false;
		});
}