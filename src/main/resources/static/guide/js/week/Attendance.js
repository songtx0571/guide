$(function(){
    checkLogin();
    var userName = sessionStorage.Username
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
            console.log(data);
            for(var i=0;i<data.length;i++){
                if(data[i].id!=6&&data[i].type==1){
                    document.getElementById('li'+data[i].id).style.display='';
                }
            }
        }
    });
})
function checkLogin(){
    var userName = sessionStorage.Username;
    console.log(userName);
    if(userName==null){
        window.location="../";
    }
    $.ajax({
        "type" : 'post',
        "url": "/getPermissionByUserIdAndPermissionId",
        "data":{userName:userName,permissionId:5},
        "success":function(data){
            if(!data){
                layer.alert('该账号没有查看考勤系统的权限，请换账号重试!', {icon : 5});
                window.location="../";
            }

        }
    });
}