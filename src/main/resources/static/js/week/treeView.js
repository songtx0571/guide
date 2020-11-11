var ghideTreeT;
var treeWidth = 198;
var tree;

function aaa(url,menuId){
	$("#contentView").attr("src",url);
}

function setIframeStyle(){
	var wWidth=window.innerWidth;
	var wHeight=window.innerHeight;
	var tWidth = tree.getWidth();
	var cDom = $("#contentView")[0];
	cDom.style.height = (wHeight-6-82)+"px";
	//cDom.style.width = (wWidth-tWidth)+"px";
}

function hideTree() {
   /* if(ghideTreeT){
        clearTimeout(ghideTreeT)
    }
    var content = document.getElementById("contentView")
    ghideTreeT =  setTimeout(function () {
    
        treeWidth = 28;
        if(tree.isPC){
        	 $(content).removeClass("contentView-narrow").addClass("contentView-width")
        }else{
        	 $(content).removeClass("contentViewPhone-narrow").addClass("contentViewPhone-width")
        }
       
        setIframeStyle();
    },1000)*/
}

function showTree() {
    if(ghideTreeT){
        clearTimeout(ghideTreeT)
    }
    var content = document.getElementById("contentView")
    treeWidth = 130;
    if(tree.isPC){
    	$(content).removeClass("contentView-width").addClass("contentView-narrow")
    }else{
    	$(content).removeClass("contentViewPhone-width").addClass("contentViewPhone-narrow")
    }
    setIframeStyle();
}


$(window).resize(function(){setTimeout(function(){setIframeStyle();},200);})
$(function(){
	tree = new Tree(treeData);
	aaa('../WeeklyController/Weekly')
    setIframeStyle();
	showTree()
})



$(function(){
	var userName = sessionStorage.Username
	console.log(userName);
	document.getElementById('li1').style.display='none';
	document.getElementById('li2').style.display='none';
	document.getElementById('li3').style.display='none';
	// document.getElementById('li4').style.display='none';
	document.getElementById('li5').style.display='none';
	$.ajax({
    	url: '/getPermissionByUserId',
    	type: "POST",
    	datatype: 'json',
    	data:{userName: userName},
    	success: function (data) {
    		for(var i=0;i<data.length;i++){
    			if(data[i].id!=6&&data[i].type==1){
        			document.getElementById('li'+data[i].id).style.display='';
    			}
    		}
    	}
	});
})
