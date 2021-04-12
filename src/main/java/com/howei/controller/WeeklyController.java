package com.howei.controller;


import com.howei.pojo.Project;
import com.howei.pojo.Users;
import com.howei.pojo.Week;
import com.howei.pojo.Weekly;
import com.howei.service.WeeklyService;
import com.howei.util.JsonResult;
import com.howei.util.Type;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/guide/WeeklyController")
public class WeeklyController {


    @Autowired
    WeeklyService weeklyService;

    /**
     * 获取shiro存储的Users
     */
    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        return users;
    }

    @RequestMapping("/getLoginUser")
    public Map<String,String> getLoginUser(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        Map<String,String> map=new HashMap<>();
        map.put("userName",users.getUserName());
        map.put("userNumber",users.getUserNumber());
        map.put("userId",users.getId().toString());
        return map;
    }

    @RequestMapping("Weekly")
    public ModelAndView Weekly() {
        ModelAndView view = new ModelAndView();
        view.setViewName("weekly2");
        return view;
    }


    @RequestMapping("runningWeekly")
    public ModelAndView runningWeekly() {
        ModelAndView view = new ModelAndView();
        view.setViewName("runningWeekly2");
        return view;
    }


    @RequestMapping("Weeks")
    public ModelAndView Weeks(int id, int type) {
        ModelAndView view = new ModelAndView();
        if (type == 3) {
            view.setViewName("runningWeeklyRecord2");
        } else {
            view.setViewName("weeklyRecord2");
        }
        view.addObject("id", id);
        return view;
    }

    @RequestMapping("getWeeks")
    public JsonResult getWeeks(int project) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        Week[] weeks = weeklyService.getWeeks(project);
        return new JsonResult(weeks);
    }


    @RequestMapping("WeeklyRecord")
    public ModelAndView WeeklyRecord() {

        ModelAndView view = new ModelAndView();
        view.setViewName("weeks2");
        return view;
    }


    @RequestMapping("find")
    public JsonResult find(int year, int week, int type, int project) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        Weekly[] weeklys = weeklyService.getWeeklys(year, week, type, project);
        return new JsonResult(weeklys);
    }

    @RequestMapping("find1")
    public JsonResult find1(String id) {
        if(id!=null&&!id.equals("")){
            Weekly[] weeklys = weeklyService.getWeeklysByWeekId(Integer.parseInt(id));
            return new JsonResult(weeklys);
        }
        return new JsonResult("");
    }

    @RequestMapping("findWeek")
    public JsonResult findWeek(int year, int week, int type, int project) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        Week weeks = weeklyService.getWeek(year, week, type, project);
        return new JsonResult(weeks);
    }

    @RequestMapping("findWeek1")
    public JsonResult findWeek1(String id) {
        if(id!=null&&!id.equals("")){
            Week weeks = weeklyService.getWeekById(Integer.parseInt(id));
            return new JsonResult(weeks);
        }
        return new JsonResult("");
    }


    @RequestMapping("add")
    public ModelAndView add(int type, int weekId) {
        ModelAndView view = new ModelAndView();
        view.addObject("type", type);
        view.addObject("weekId", weekId);
        if (type == 2) {
            view.setViewName("weeklyadd2");
        } else if (type == 3) {
            view.setViewName("weeklyadd3");
        } else if (type == 4) {
            view.setViewName("weeklyadd4");
        } else if (type == 5) {
            view.setViewName("weeklyadd5");
        } else if (type == 6) {
            view.setViewName("weeklyadd6");
        } else {
            view.setViewName("weeklyadd1");
        }
        return view;
    }


    @RequestMapping("runningAdd")
    public ModelAndView runningAdd(int type, int weekId) {
        ModelAndView view = new ModelAndView();
        view.addObject("type", type);
        view.addObject("weekId", weekId);
        if (type < 8 && type > 1) {
            view.setViewName("runningWeeklyadd1");
        } else if (type == 8 || type == 10) {
            view.setViewName("runningWeeklyadd2");
        } else if (type == 17) {
            view.setViewName("runningWeeklyadd4");
        } else {
            view.setViewName("runningWeeklyadd3");
        }
        return view;
    }

    @RequestMapping("del")
    public JsonResult del(int id) {
        int num = weeklyService.delWeek(id);
        return new JsonResult(num);
    }

    @RequestMapping("updWeek")
    public ModelAndView updWeek(int year, int week, int type, int project) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        ModelAndView view = new ModelAndView();
        Week weeks = weeklyService.getWeek(year, week, type, project);
        view.addObject("week", weeks);
        view.setViewName("weekupd2");
        return view;
    }

    /**
     * 运行周报、检修周报添加批准人
     * @param id
     * @param type
     * @param projectId
     * @param week
     * @param year
     * @param userName
     * @return
     */
    @RequestMapping("addAuditor")
    public JsonResult addAuditor(int id, int type, int projectId, int week, int year, String userName) {
        Users users=this.getPrincipal();
        if(users==null){
            new JsonResult(Type.noUser);
        }
        if(projectId==0){
            projectId=users.getDepartmentId();
        }
        if(userName==null||userName.equals("")){
            userName=users.getUserNumber();
        }
        Week weeks = new Week(id, projectId, year, week, type,null, userName);
        int num = weeklyService.addAuditor(weeks);
        return new JsonResult(num);
    }

    /**
     *  运行周报、检修周报删除批准人
     * @param id
     * @param userName
     * @return
     */
    @RequestMapping("delAuditor")
    public JsonResult delAuditor(int id, String userName) {
        Users users=this.getPrincipal();
        if(users==null){
            new JsonResult(Type.noUser);
        }
        if(userName==null||userName.equals("")){
            userName=users.getUserNumber();
        }
        int num = weeklyService.delAuditor(id, userName);
        return new JsonResult(num);
    }

    /**
     * 运行周报、检修周报添加执行人
     * @param id
     * @param type
     * @param projectId
     * @param week
     * @param year
     * @param userName
     * @return
     */
    @RequestMapping("addFillIn")
    public JsonResult addFillIn(Integer id, int type, int projectId, int week, int year, String userName) {
        Users users=this.getPrincipal();
        if(users==null){
            new JsonResult(Type.noUser);
        }
        if(projectId==0){
            projectId=users.getDepartmentId();
        }
        if(userName==null||userName.equals("")){
            userName=users.getUserNumber();
        }
        Week weeks = new Week(id, projectId, year, week, type,userName,null);
        int num = weeklyService.addFillIn(weeks);
        return new JsonResult(num);
    }

    /**
     * 运行周报、检修周报删除执行人
     * @param id
     * @param userName
     * @return
     */
    @RequestMapping("delFillIn")
    public JsonResult delFillIn(int id, String userName) {
        Users users=this.getPrincipal();
        if(userName==null||userName.equals("")){
            userName=users.getUserNumber();
        }
        int num = weeklyService.delFillIn(id, userName);
        return new JsonResult(num);
    }


    @RequestMapping("changeWeek")
    public JsonResult changeWeek(int id, int type, int project, int week, int year, String name, String fillIn, String auditor) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        Week weeks = new Week(id, name, project, year, week, type, fillIn, auditor);
        int num = weeklyService.changeWeek(weeks);
        return new JsonResult(num);
    }


    @RequestMapping("runningUpd")
    public ModelAndView runningUpd(int id, int type) {
        ModelAndView view = new ModelAndView();
        Weekly weekly = weeklyService.getWeekly(id);
        view.addObject("weekly", weekly);
        if (type < 8 && type > 1) {
            view.setViewName("runningWeeklyupd1");
        } else if (type == 8 || type == 10) {
            view.setViewName("runningWeeklyupd2");
        } else if (type == 17) {
            view.setViewName("runningWeeklyupd4");
        } else {
            view.setViewName("runningWeeklyupd3");
        }
        return view;
    }

    @RequestMapping("upd")
    public ModelAndView upd(int id, int type) {
        ModelAndView view = new ModelAndView();
        Weekly weekly = weeklyService.getWeekly(id);
        view.addObject("weekly", weekly);
        if (type == 2) {
            view.setViewName("weeklyupd2");
        } else if (type == 3) {
            view.setViewName("weeklyupd3");
        } else if (type == 4) {
            view.setViewName("weeklyupd4");
        } else if (type == 5) {
            view.setViewName("weeklyupd5");
        } else if (type == 6) {
            view.setViewName("weeklyupd6");
        } else {
            view.setViewName("weeklyupd1");
        }
        return view;
    }


    @RequestMapping("insert")
    public JsonResult insert(Weekly weekly) {
        int num = weeklyService.insertWeekly(weekly);
        return new JsonResult(num);
    }

    @RequestMapping("update")
    public JsonResult update(Weekly weekly) {
        int num = weeklyService.updateWeekly(weekly);
        return new JsonResult(num);
    }


    @RequestMapping("next")
    public JsonResult next(int type, int week, int year, int project) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        Week weeks = weeklyService.getWeek(year, week + 1, type, project);
        return new JsonResult(weeks);
    }

    @RequestMapping("last")
    public JsonResult last(int type, int week, int year, int project) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        Week weeks = weeklyService.getWeek(year, week - 1, type, project);
        return new JsonResult(weeks);
    }


    @RequestMapping("getProject")
    public JsonResult getProject() {
        Project[] Projects = weeklyService.getProject();
        return new JsonResult(Projects);
    }

    @RequestMapping("getProject2")
    public JsonResult getProject2(String userName) {
        Users users=this.getPrincipal();
        if(users!=null){
            userName=users.getUserNumber();
        }
        else{
            userName="";
        }
        Project[] Projects = weeklyService.getProject2(userName);
        return new JsonResult(Projects);
    }


    @RequestMapping("getProject1")
    public JsonResult getProject1(String userName) {
        Project[] Projects = weeklyService.getProject1(userName);
        return new JsonResult(Projects);
    }

    @RequestMapping("getParamList")
    public JsonResult getParamList(){
        Users users=this.getPrincipal();
        Map map=new HashMap();
        if(users!=null){
            map.put("userName",users.getUserNumber());
            map.put("Name",users.getUserName());
        }
        return new JsonResult(map);
    }
}
