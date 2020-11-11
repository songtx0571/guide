/**
 * 
 */
var oTable;
$(document).ready( function () {
	var userName = sessionStorage.Username;
	$.ajax({
		"type" : 'post', 
    	"url": "../WeeklyController/getProject1",
    	"data":{userName:userName},
    	"success":function(Json){
    		var data = Json.data;
    		console.log(data);
    		document.getElementById('project').length = 0;
    		var project = document.getElementById('project');
    		for(var i = 0;i<data.length;i++){
    			var opt1 = new Option(data[i].projectTeam, data[i].id); 
    			project.options.add(opt1);
    		}
    		bigDataTable($('#project').val());
    	}
	});
});
function change(){
	var project = $('#project').val();
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
        "sAjaxSource" : "../WeeklyController/getWeeks",//通过ajax实现分页的url路径。    
   		"fnServerData": function(sSource, aoData, fnCallback){
        	 $.ajax({ 
        	 'type' : 'post', 
        	 "url": sSource, 
        	 'data':{project:project},
        	"success":function(Json){
        		fnCallback(Json);
        	}
        	 });
        }, 
        "lengthMenu": [ 15,20, 50, 75, 100 ],
        "order": [[ 1, "desc" ],[ 2, "desc" ]],
   	    "columns":[
   	    	 {"data" : "id","width": "5%" }, 
    	     	 {"data" : "year","width": "5%" }, 
    	    	 {"data" : "week","width": "5%"}, 
    	    	 {"data" : "type","width": "10%", "render": function ( data, type, full, meta ) {
                    if(data==1){
                    	return "电仪";
                    }else if(data==2){
                    	return "机务";
                    }else{
                    	return "运行";
                    }
                  }  }, 
    	    	 {"data" : "coding", "width": "20%"}, 
   	    	 	 {"data" : "fillInName", "width": "10%"}, 
    	    	 {"data" : "auditorName","width": "10%"},
    	    	 {
             		data: null,
             		'width': '15%',
             		orderable: false,
             		'render': function (a, b, c, d) {
             			var str = "(" + c.id + ","+c.type+")";/*
                     	if ('@Model.Data' == "000") return '<span style="color:red;">没有权限</span>';*/
             			var html = "";
             			/*  if ('@Model.Data.ToString().Substring(1,1)' == "1")*/
                         html += '<input id="btn1" type="button" class="btn btn-primary btn-sm" onclick="find' + str + '" value="详情信息" />';
                         return html;
             		}
             	}	
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

function find(id,type){
	layer.open({
		type: 2,
		shadeClose: true,
		shade: 0.8,
		title:["周报详情信息",'font-size:20px;font-weight:bold;'],
		area: ['900px', '90%'], 
		fixed: false, //不固定
		scrollbar: false,
		content: '../WeeklyController/Weeks?id='+id+'&&type='+type
	});
}

