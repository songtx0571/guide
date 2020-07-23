package com.howei.controller;

import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.util.*;

/**
 * 运行岗位
 */
@Controller
@RequestMapping("/guide/staff")
//@RequestMapping("/staff")
public class StaffController {

    @Autowired
    UserService userService;

    @Autowired
    WorkPeratorService workPeratorService;

    @Autowired
    PostPeratorService postPeratorService;

    @Autowired
    PostPeratorDataService postPeratorDataService;

    @Autowired
    PermissionService permissionService;

    public String userName;//当前登录人
    public String equipment;//设备名称
    public String patrolTask;//任务名称
    public String dateTime;//日期:首页面显示

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getPatrolTask() {
        return patrolTask;
    }

    public void setPatrolTask(String patrolTask) {
        this.patrolTask = patrolTask;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    /**
     * 跳转员工页面
     * @return
     */
    @RequestMapping("/toStaff")
    public String toStaff(){
        return "staffhome";
    }

    /**
     * 页面初始化数据
     * @return
     */
    @RequestMapping("/init")
    @ResponseBody
    public List<Object> init(HttpSession session){
        Integer userId=(Integer) session.getAttribute("userId");
        String projectId=(String)session.getAttribute("projectId");//部门id
        String[] param=projectId.split(",");
        Map<String,Object> map=new HashMap<>();
        Users users = userService.findById(String.valueOf(userId));
        if(users!=null){
            userName=users.getName();
            dateTime=DateFormat.getYMD();
        }
        List<Permission> permissionList=permissionService.selByUserId(userId);
        if(permissionList!=null&&permissionList.size()>0){
            Permission permission=permissionList.get(0);
            if((permissionList.size()==2)||(permissionList.size()==1)&&(permission.getId()==68)){
                map.put("userId",userId);
            }else{
                for (String par:param){
                    if(par.equals("1")){
                        map.put("param1","1");
                    }else if(par.equals("2")){
                        map.put("param2","2");
                    }else if(par.equals("3")){
                        map.put("param3","3");
                    }else if(par.equals("4")){
                        map.put("param4","4");
                    }
                }
            }
        }
        //获取模板信息
        List<WorkPerator> list=workPeratorService.selAll(map);
        List<Object> result=new ArrayList<>();
        for (WorkPerator work:list){
            Map<String,Object> mapRes=new HashMap<>();
            mapRes.put("id",work.getId());
            System.out.println(work.getId());
            mapRes.put("patrolTask",work.getPatrolTask());
            mapRes.put("cycle",work.getCycle());
            map.clear();
            map.put("peratorId",work.getId());
            //map.put("postPeratorId",userId);
            PostPerator postPerator=postPeratorService.getLastPerator1(map);
            if(postPerator!=null){
                if(postPerator.getInspectionEndTime()==null||postPerator.getInspectionEndTime().equals("")){
                    mapRes.put("inspectionEndTime","");
                }else{
                    mapRes.put("inspectionEndTime",postPerator.getInspectionEndTime());
                }
            }else{
                mapRes.put("inspectionEndTime","");
            }
            result.add(mapRes);
        }
        map.clear();
        map.put("userName",userName);
        map.put("dateTime",dateTime);
        result.add(map);
        return result;
    }

    //创建员工空数据
    @RequestMapping("/crePost")
    @ResponseBody
    public List<Map<String,String>> crePost(HttpSession session,HttpServletRequest request) throws ParseException{
        List<Map<String,String>> result=new ArrayList<>();
        Map<String,String> map1=new HashMap<>();
        Integer userId=(Integer)session.getAttribute("userId");
        String peratorId=request.getParameter("id");//模板id
        String created=DateFormat.getYMDHMS(new Date());//创建时间
        //查找模板周期，判断是否创建员工数据
        WorkPerator work=workPeratorService.selWorkperator(peratorId);
        String cycle="";
        String planTime="";//计划完成时间
        String department="";//部门
        if(work!=null){
            cycle=work.getCycle();
            planTime=work.getPlanTime();
            department=work.getProjectDepartment();
        }
        String inspectionEndTheoryTime=DateFormat.getBehindTime3(planTime);//理论结束时间
        Map map=new HashMap();
        map.put("postPeratorId",userId);
        map.put("peratorId",peratorId);
        PostPerator postPerator=postPeratorService.getLastPerator(map);
        String inspectionEndTime="";//实际结束时间
        String endTime="";
        String inspectionStaTime="";

        PostPerator post=new PostPerator();
        post.setCreated(created);
        post.setPostPeratorId(userId);//专工id
        post.setCreatedBy(userId);//专工id
        post.setInspectionStaTime(created);//巡检开始日期
        post.setInspectionEndTheoryTime(inspectionEndTheoryTime);//理论结束时间
        post.setPeratorId(Integer.parseInt(peratorId));
        post.setDepartment(Integer.parseInt(department));

        boolean bool;
        if(postPerator!=null){
            inspectionEndTime=postPerator.getInspectionEndTime();//实际结束时间
            inspectionStaTime=postPerator.getInspectionStaTime();//开始时间
            if(inspectionEndTime==null||inspectionEndTime.equals("")){//未完成，判断开始时间与当前时间
                try {
                    boolean bool1=DateFormat.comparetoTime(DateFormat.getBehindTime2(inspectionStaTime,cycle),DateFormat.getYMDHMS(new Date()));
                    if(bool1){
                        result=crePost(post,session);
                        map1.put("patrolTask",patrolTask);
                        result.add(map1);
                        return result;
                    }else{//未完成，未超过周期结束，打开
                        map1.put("result","open");
                        result.add(map1);
                        return result;
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }else{//已完成，判断结束时间与当前时间
                //判断实际结束时间与当前时间:当前时间小于实际结束时间执行DateFormat.getBehindTime2(inspectionEndTime,cycle)
                boolean boo=DateFormat.comparetoTime(DateFormat.getYMDHMS(new Date()),DateFormat.getBehindTime2(inspectionEndTime,cycle));
                if(boo){
                    map1.put("result","console");
                    result.add(map1);
                    return result;
                }else{
                    //判断实际结束时间与当前时间:当前时间大于实际结束时间+周期执行
                    endTime=DateFormat.getBehindTime2(inspectionEndTime,cycle);
                    try {
                        bool=DateFormat.comparetoTime(created,endTime);
                        if(!bool){//当当前前时间大于时执行
                            result=crePost(post,session);
                            map1.put("patrolTask",patrolTask);
                            result.add(map1);
                            return result;
                        }else{
                            map1.put("result","open");
                            result.add(map1);
                            return result;
                        }
                    } catch (ParseException e) {

                    }
                }
            }
            return result;
        }else{
            result=crePost(post,session);
            map1.put("patrolTask",patrolTask);
            result.add(map1);
            return result;
        }
    }

    /**
     * 同步方法:避免无法指定用户
     * 创建员工执行的任务
     * @param post
     */
    public synchronized List<Map<String,String>> crePost(PostPerator post,HttpSession session){
        List<Map<String,String>> result=new ArrayList<>();
        Map<String,String> map1= new HashMap<>();
        postPeratorService.crePost(post);
        int id=post.getId();//postPeratorId
        PostPerator postPerator=postPeratorService.selById(id);//获取当前添加的模板的信息
        if(postPerator!=null){
            //int postId=postPerator.getId();//当前添加的员工模板Id
            int peratorId=postPerator.getPeratorId();//管理员模板Id
            WorkPerator workPerator=workPeratorService.selWorkperator(String.valueOf(peratorId));//获取管理员模板的信息
            if(workPerator!=null){
                Map map=new HashMap();
                map.put("parent",workPerator.getId());
                map.put("page",0);
                map.put("pageSize",10000);
                List<WorkPerator> list=workPeratorService.getTemplateChildList(map);
                int count=list.size();//管理员模板的子任务列表
                for(int i=0;i<count;i++){
                    WorkPerator work=list.get(i);
                    PostPeratorData postPeratorData=new PostPeratorData();
                    postPeratorData.setMeasuringType(work.getMeasuringType());//测点类型
                    postPeratorData.setEquipment(work.getEquipment());//设备名称
                    postPeratorData.setPostPeratorId(id);
                    Integer userId=(Integer) session.getAttribute("userId");
                    postPeratorData.setCreatedBy(userId);
                    postPeratorData.setCreated(DateFormat.getYMDHMS(new Date()));
                    postPeratorData.setUnit(work.getUnit());
                    postPeratorData.setInd(i);
                    postPeratorDataService.crePostChild(postPeratorData);
                }
                //返回设备名称
                map.clear();
                map.put("parent",peratorId);
                result=workPeratorService.selByParam(map);//获取设备名称
                map1.put("id",String.valueOf(id));
                result.add(map1);
                return result;
            }
        }
        return result;
    }

    /**
     * 查询
     * @param session
     * @param request
     * @return
     */
    @RequestMapping("/getPostChildList")
    @ResponseBody
    public List<PostPeratorData> getPostChildList(HttpSession session, HttpServletRequest request){
        List<PostPeratorData> list=new ArrayList<>();
        String postId=request.getParameter("postId");//员工模板id
        String equipmento=request.getParameter("equipmento");//设备名称
        if(!postId.equals("")&&!equipmento.equals("")){
            Map map=new HashMap();
            map.put("equipment",equipmento);
            map.put("postPeratorId",postId);
            list=postPeratorDataService.selByEquipment(map);
        }
        return list;
    }

    /**
     * 更新记录
     * @param request
     * @return
     */
    @RequestMapping("/updPost")
    @ResponseBody
    public List<String> updPost(HttpServletRequest request){
        List<String> result=new ArrayList<>();
        String str=request.getParameter("strData");
        String postId=request.getParameter("postId");
        if(str!=null&&!str.equals("")){
            String[] strData=str.split(",");
            for(String s:strData){
                String[] strs=s.split(":");
                String id=strs[0];
                id=id.substring(4,id.length());
                String value=strs[1];
                Map map=new HashMap();
                map.put("id",id);
                map.put("measuringTypeData",value);
                int index=postPeratorDataService.updPostData(map);
                result.add("success");
            }
        }
        if(postId!=null&&!postId.equals("")){
            Map map=new HashMap();
            map.put("id",postId);
            map.put("inspectionEndTime",DateFormat.getYMDHMS(new Date()));
            postPeratorService.updPost(map);
            result.add("success");
        }
        return result;
    }

    /**
     * 查询最后一个大于当前时间的任务
     * @param session
     * @param request
     * @return
     */
    @RequestMapping("/selPost")
    @ResponseBody
    public List<Map<String,String>> selPost(HttpSession session,HttpServletRequest request){
        List<Map<String,String>> result=new ArrayList<>();
        String id=request.getParameter("id");//管理员模板
        Integer userId=(Integer)session.getAttribute("userId");
        Map map = new HashMap();
        map.put("peratorId",id);
        map.put("postPeratorId",userId);
        map.put("date",DateFormat.getYMDHMS(new Date()));
        PostPerator postPerator=postPeratorService.selLatest(map);
        if(postPerator!=null){
            int postId=postPerator.getId();//当前员工模板Id
            WorkPerator workPerator=workPeratorService.selWorkperator(String.valueOf(id));//获取管理员模板的信息
            if(workPerator!=null){
                //返回设备名称
                map.clear();
                map.put("parent",id);
                result=workPeratorService.selByParam(map);//获取设备名称
                Map<String,String> map1= new HashMap<>();
                map1.put("id",String.valueOf(postId));
                map1.put("patrolTask",workPerator.getPatrolTask());
                result.add(map1);
                return result;
            }
        }
        return result;
    }
}
