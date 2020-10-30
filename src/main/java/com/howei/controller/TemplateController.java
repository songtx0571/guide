package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.DateFormat;
import com.howei.util.EasyuiResult;
import com.howei.util.Page;
import com.howei.util.Type;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8080","http://192.168.1.27:8848"},allowCredentials = "true")
@RequestMapping("/guide/template")
//@RequestMapping("/template")
public class TemplateController {

    @Autowired
    WorkPeratorService workPeratorService;

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    UnitService unitService;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    CompanyService companyService;

    /**
     * 获取当前用户登录信息
     * @return
     */
    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        return users;
    }

    /**
     * 查询
     * @param session
     * @return
     */
    @RequestMapping("/getTemplate")
    @ResponseBody
    public EasyuiResult getTemplate(HttpSession session,HttpServletRequest request){
        Users users=this.getPrincipal();
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        String department=request.getParameter("department");
        int offset=Page.getOffSet(page,rows);
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("page",offset);
        map.put("pageSize",rows);
        if(users!=null){
            map.put("userId",users.getId());
        }
        if(department!=null&&!department.equals("")){
            map.put("department",department);
        }
        List<WorkPerator> list=workPeratorService.selByUser(map);
        String total=workPeratorService.selByUserCount(map);
        for (WorkPerator work:list){
            String dep=work.getProjectDepartment();//项目
            Company company=companyService.getCompanyById(dep);
            work.setDepartmentName(company.getName());
            int id=work.getId();
            map.clear();
            map.put("page",0);
            map.put("pageSize",1000);
            map.put("parent",id);
            List<WorkPerator> list1=workPeratorService.getTemplateChildList(map);
            work.setArtificialNumber(list1.size());
        }
        EasyuiResult easyuiResult=new EasyuiResult();
        easyuiResult.setTotal(Integer.parseInt(total));
        easyuiResult.setRows(list);
        return easyuiResult;
    }

    /**
     * 添加模板
     * @return
     */
    @RequestMapping("/addWorkPerator")
    @ResponseBody
    public List<String> addWorkPerator(HttpSession session,HttpServletRequest request){
        Users users=this.getPrincipal();//当前登陆人id
        String workId=request.getParameter("workId");//模板id
        String planTime=request.getParameter("planTime");//计划时间
        String patrolTask=request.getParameter("patrolTask");
        String department=request.getParameter("department");//部门
        String cycle=request.getParameter("cycle");//周期
        List<String> list=new ArrayList<String>();
        String result="";
        Map map=new HashMap();
        map.put("patrolTask",patrolTask);
        map.put("projectDepartment",department);
        List<WorkPerator> list1=workPeratorService.selByMap(map);
        //修改
        if(workId!=null&&!workId.equals("")){
            //判断是否有同名
            if(list1!=null&&list1.size()>0){
                WorkPerator workPerator=list1.get(0);
                Integer id=workPerator.getId();
                if(id==Integer.parseInt(workId)){

                }else{
                    result="patrolTaskError";
                    list.add(result);
                    return list;
                }
            }
            WorkPerator workPerator=workPeratorService.selWorkperator(workId);
            if(workPerator!=null){
                workPerator.setPlanTime(planTime);
                workPerator.setCycle(cycle);
                workPerator.setPatrolTask(patrolTask);
            }
            int index=workPeratorService.updWorkperator(workPerator);
            if(index>0){
                result="success";
            }else {
                result="error";
            }
        }else{
            if(list1!=null&&list1.size()>0){
                result="patrolTaskError";
                list.add(result);
                return list;
            }
            Date now = new Date();
            String created=DateFormat.getYMDHMS(now);
            WorkPerator work=new WorkPerator();
            if(users!=null){
                work.setUserId(users.getId());
                work.setCreatedBy(users.getId());
            }
            work.setAiNumber(0);
            work.setCreated(created);
            work.setCycle(cycle);
            work.setParent(0);
            work.setStatus(0);
            work.setPatrolTask(patrolTask);
            work.setPlanTime(planTime);
            work.setProjectDepartment(department);
            work.setPriority(0);
            work.setEquipment("");
            work.setMeasuringType("");
            work.setUnit("");
            int index=workPeratorService.addWorkPerator(work);
            if(index>0){
                result="success";
            }else {
                result="error";
            }
        }
        list.add(result);
        return list;
    }

    /**
     * 修改模板状态
     * @param session
     * @param request
     * @return
     */
    @RequestMapping("/updStatus")
    @ResponseBody
    public List<String> updStatus(HttpSession session,HttpServletRequest request){
        String workPeratorId= request.getParameter("id");
        String status=request.getParameter("status");
        Users users=this.getPrincipal();
        String updated=DateFormat.getYMDHMS(new Date());
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("id",Integer.parseInt(workPeratorId));
        map.put("updated",updated);
        if(users!=null){
            map.put("updatedBy",users.getId());
        }
        map.put("status",status);
        int index=0;
        String result="";
        if(status.equals("1")){//启用
            index=workPeratorService.updStatus(map);
            if(index>0){
                result="已启用";
            }else{
                result="程序错误,请联系技术人员！";
            }
        }else if(status.equals("2")){//暂停
            index=workPeratorService.updStatus(map);
            if (index>0){
                result="已暂停";
            }else{
                result="程序错误,请联系技术人员！";
            }
        }else if(status.equals("3")){//删除
            map.clear();
            map.put("id",Integer.parseInt(workPeratorId));
            workPeratorService.delWorkPerator(map);
            result=workPeratorService.selById(Integer.parseInt(workPeratorId));
            if (result==null||result.equals("")){
                result="已删除";
            }else{
                result="程序错误,请联系技术人员！";
            }
        }
        List<String> list=new ArrayList<String>();
        list.add(result);
        return list;
    }

    /**
     * 根据id获取模板记录
     * @param request
     * @return
     */
    @RequestMapping("/getWorkPerator")
    @ResponseBody
    public WorkPerator getWorkPerator(HttpServletRequest request){
        String id=request.getParameter("id");
        WorkPerator workPerator=workPeratorService.selWorkperator(id);
        if(workPerator!=null){
            return workPerator;
        }
        return null;
    }

    /**
     * 跳转路线规划页面
     * @return
     */
    @RequestMapping("/toTemplateChild")
    public ModelAndView toTemplateChild(@Param("temid") String temid){
        ModelAndView model=new ModelAndView();
        model.setViewName("templateChild");
        model.addObject("temid",temid);
        return model;
    }

    /**
     * 获取路线列表
     * @param request
     * @return
     */
    @RequestMapping("/getTemplateChildList")
    @ResponseBody
    public EasyuiResult getTemplateChildList(HttpServletRequest request){
        EasyuiResult easyuiResult=new EasyuiResult();
        String parentId=request.getParameter("temid");
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        if(parentId!=null&&!parentId.equals("")){
            int offset=Page.getOffSet(page,rows);
            Map map=new HashMap();
            map.put("parent",parentId);
            map.put("admin","true");
            int count=workPeratorService.getTemplateChildListCount(map);
            map.put("page",offset);
            map.put("pageSize",rows);
            List<WorkPerator> result=workPeratorService.getTemplateChildList(map);
            easyuiResult.setRows(result);
            easyuiResult.setTotal(count);
            return easyuiResult;
        }
        return null;
    }

    /**
     * 获取系统号
     * @return
     */
    @RequestMapping("/getSysNameList")
    @ResponseBody
    public List<Map<String,Object>> getSysNameList(HttpServletRequest request){
        List<Map<String,Object>> list=new ArrayList<>();
        String postPeratorId=request.getParameter("temid");
        WorkPerator workPerator=workPeratorService.selWorkperator(postPeratorId);
        if(workPerator!=null){
           String department= workPerator.getProjectDepartment();
            List<Equipment> eqList=equipmentService.getSysNameList(Integer.parseInt(department));
            if(eqList!=null){
                for(int i=0;i<eqList.size();i++){
                    Equipment equipment=eqList.get(i);
                    Map<String,Object> map=new HashMap<>();
                    map.put("id",equipment.getId());
                    map.put("name",equipment.getName());
                    list.add(map);
                }
            }
        }
        return list;
    }

    /**
     * 获取设备名称
     * @return
     */
    @RequestMapping("/getEquNameList")
    @ResponseBody
    public List<Map<String,Object>> getEquNameList(HttpServletRequest request){
        List<Map<String,Object>> list=new ArrayList<>();
        String postPeratorId=request.getParameter("temid");
        WorkPerator workPerator=workPeratorService.selWorkperator(postPeratorId);
        if(workPerator!=null) {
            String department = workPerator.getProjectDepartment();
            List<Equipment> eqList=equipmentService.getEquNameList(Integer.parseInt(department));
            if(eqList!=null){
                for(int i=0;i<eqList.size();i++){
                    Equipment equipment=eqList.get(i);
                    Map<String,Object> map=new HashMap<>();
                    map.put("id",equipment.getId());
                    map.put("name",equipment.getName());
                    list.add(map);
                }
            }
        }
        return list;
    }

    /**
     * 获取测点类型
     * @return
     */
    @RequestMapping("/getSightType")
    @ResponseBody
    public List<Map<String,Object>> getSightType(HttpServletRequest request){
        String type=request.getParameter("type");
        String postPeratorId=request.getParameter("temid");
        List<Map<String,Object>> list=new ArrayList<>();
        List<Unit> unitList=new ArrayList<>();
        WorkPerator workPerator=workPeratorService.selWorkperator(postPeratorId);
        Map map1=new HashMap();
        if(workPerator!=null) {
            map1.put("department",workPerator.getProjectDepartment());
        }
        if(type.equals("1")){
            map1.put("type",'1');
        }else if(type.equals("2")){
            map1.put("type",'2');
        }
        unitList=unitService.getUnityMap(map1);
        if(unitList!=null){
            for(int i=0;i<unitList.size();i++){
                Unit unit=unitList.get(i);
                Map<String,Object> map=new HashMap<>();
                map.put("id",i);
                map.put("name",unit.getNuit());//获取测点
                list.add(map);
            }
        }
        return list;
    }
    /**
     * 获取单位名称
     * @return
     */
    @RequestMapping("/getUnitType")
    @ResponseBody
    public List<Map<String,Object>> getUnitType(){
        List<Map<String,Object>> list=new ArrayList<>();
        List<Unit> unitList=unitService.getUnitType();
        if(unitList!=null){
            for(int i=0;i<unitList.size();i++){
                Unit unit=unitList.get(i);
                Map<String,Object> map=new HashMap<>();
                map.put("id",i);
                map.put("name",unit.getNuit());
                list.add(map);
            }
        }
        return list;
    }

    /**
     * 添加/更新路线
     * @param request
     * @return
     */
    @RequestMapping("/addWorkPeratorChild")
    @ResponseBody
    public List<String> addWorkPeratorChild(HttpServletRequest request,HttpSession session){
        List<String> list=new ArrayList<>();
        String sysName=request.getParameter("sysName");
        String equName=request.getParameter("equName");
        String sightType=request.getParameter("sightType");
        String unitType=request.getParameter("unitType");
        String workId=request.getParameter("workId");//模板id
        String temChildId=request.getParameter("temChildId");//路线id
        Users users=this.getPrincipal();
        String result="";
        WorkPerator work=new WorkPerator();
        if(temChildId.equals("")){//添加
            Map map=new HashMap();
            map.put("page",0);
            map.put("pageSize",1);
            map.put("parent",workId);
            WorkPerator WorkPerator=workPeratorService.getLastTemplateChildByPriority(map);
            if(WorkPerator!=null){
                work.setPriority(WorkPerator.getPriority()+1);//设置执行顺序
            }else{
                work.setPriority(1);//设置执行循序
            }
            work.setAiNumber(0);
            work.setCreated(DateFormat.getYMDHMS(new Date()));
            work.setCycle("");
            work.setParent(Integer.parseInt(workId));
            work.setPatrolTask("");
            work.setPlanTime("");
            work.setStatus(0);
            work.setEquipment(sysName+","+equName);
            work.setMeasuringType(sightType);
            work.setUnit(unitType);
            if(users!=null){
                work.setUserId(users.getId());
                work.setCreatedBy(users.getId());
            }
            int index=workPeratorService.addWorkPerator(work);
            if(index>0){
                result="success";
            }else {
                result="error";
            }

        }else{//修改
            Map map=new HashMap();
            map.put("equipment",sysName+","+equName);
            map.put("measuringType",sightType);
            map.put("unit",unitType);
            map.put("id",temChildId);
            int id=workPeratorService.updWorkperatorChild(map);
            if(id>0){
                result="updsuccess";
            }else{
                result="error";
            }
        }
        list.add(result);
        return list;
    }

    /**
     * 修改执行优先级
     * @return
     */
    @RequestMapping("/updPriority")
    @ResponseBody
    public List<String> updPriority(HttpServletRequest request){
        String id=request.getParameter("id");
        String parent=request.getParameter("workId");
        List<String> list=new ArrayList<>();
        if(id!=null&&!id.equals("")){
            WorkPerator workPerator=workPeratorService.selWorkperator(id);
            int priority=0;
            if(workPerator!=null){
                priority=workPerator.getPriority();//获取优先级
                if(priority==1){//不可上移
                    list.add("cancle");
                    return list;
                }
                Map map=new HashMap();
                map.put("page",0);
                map.put("pageSize",10000);
                map.put("parent",parent);
                map.put("admin","12");
                List<WorkPerator> list1=workPeratorService.getTemplateChildList(map);//查询此模板下的所有路线
                if(list1!=null){
                    if(list1.size()!=0){
                        for(WorkPerator work:list1){
                            if(work.getPriority()+1==priority){
                                work.setPriority(work.getPriority()+1);
                                workPeratorService.updWorkperator(work);
                            }
                        }
                        list.add("success");
                    }
                }
                workPerator.setPriority(priority-1);
                workPeratorService.updWorkperator(workPerator);
            }else{
                list.add("");
            }
        }
        return list;
    }

    /**
     * 删除路线
     * 删除
     * @return
     */
    @RequestMapping("/delWorkChild")
    @ResponseBody
    public List<String> delWorkChild(HttpServletRequest request){
        List<String> list=new ArrayList<>();
        String id=request.getParameter("id");
        String result;
        if(id!=null&&!id.equals("")){
            WorkPerator workPerator=workPeratorService.selWorkperator(id);
            int priority=workPerator.getPriority();//优先级
            int parent=workPerator.getParent();//模板
            Map map=new HashMap();
            map.put("id",id);
            workPeratorService.delWorkPerator(map);
            map.clear();
            map.put("page",0);
            map.put("pageSize",10000);
            map.put("parent",parent);
            map.put("admin","12");
            List<WorkPerator> list1=workPeratorService.getTemplateChildList(map);//查询此模板下的所有路线
            if(list1!=null){
                if(list1.size()!=0){
                    for(WorkPerator work:list1){
                        if(work.getPriority()>priority){
                            work.setPriority(work.getPriority()-1);
                            workPeratorService.updWorkperator(work);
                        }
                    }
                }
            }
            WorkPerator work=workPeratorService.selWorkperator(id);
            if(work==null){
                result="success";
            }else{
                result="error";
            }
            list.add(result);
        }
        return list;
    }

    /**
     * 获取路线记录
     * @param request
     * @return
     */
    @RequestMapping("/getWorkperator")
    @ResponseBody
    public WorkPerator getWorkperator(HttpServletRequest request){
        String id=request.getParameter("id");
        WorkPerator workPerator=workPeratorService.selWorkperator(id);
        String name=workPerator.getEquipment();//拆分名称
        String[] str=name.split(",");
        workPerator.setEquipment(str[1]);
        workPerator.setSysName(str[0]);
        return workPerator;
    }

    /**
     * 查询部门列表
     * @return
     */
    @RequestMapping("/getDepartmentList")
    @ResponseBody
    public String getDepartmentList(){
        List<Map<String,String>> list=companyService.getDepartmentList("1");
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString(Type.CANCEL);
    }

    /**
     * 根据条件查询模板
     * @param request
     * @return
     */
    @RequestMapping("/searchWorkPerator")
    @ResponseBody
    public EasyuiResult searchWorkPerator(HttpSession session,HttpServletRequest request){
        String department=request.getParameter("department");
        Map<String,Object> map=new HashMap<>();
        String[] param=department.split(",");
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
        //获取模板信息
        List<WorkPerator> list=workPeratorService.selAll(map);
        int count=workPeratorService.selAllCount(map);
        EasyuiResult result=new EasyuiResult();
        result.setTotal(count);
        result.setRows(list);
        return result;
    }

    /**
     * 下拉属性:任务名称
     * @return
     */
    @RequestMapping("/getTemplateMap")
    @ResponseBody
    public List<Map<String,Object>> getTemplateMap(HttpServletRequest request){
        String depart=request.getParameter("depart");
        List<Map<String,Object>> result=new ArrayList<>();
        Map map=new HashMap();
        map.put("name","patrolTask");
        map.put("status","1");
        map.put("parent","0");
        if(depart!=null&&!depart.equals("")){
            map.put("depart",depart);
        }
        List<Map> list=workPeratorService.getTemplateMap(map);
        if(list!=null){
            for(int i=0;i<list.size();i++){
                Map<String,Object> map1=list.get(i);
                Map<String,Object> listMap= new HashMap<>();
                listMap.put("id",map1.get("id"));
                listMap.put("text",map1.get("patrolTask"));
                result.add(listMap);
            }
        }
        return result;
    }
}
