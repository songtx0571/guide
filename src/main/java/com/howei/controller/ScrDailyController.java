package com.howei.controller;

import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.DateFormat;
import com.howei.util.JsonResult;
import com.howei.util.Result;
import com.howei.util.Type;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.Data;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/guide/ScrDailyController")
@CrossOrigin
public class ScrDailyController {


    @Autowired
    ScrDailyService scrDailyService;

    @Autowired
    WorkingService workingService;

    @Autowired
    private DefectService defectService;

    /**
     * 获取shiro存储的Users
     */
    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        return users;
    }

    @RequestMapping("ScrDaily")
    public ModelAndView ScrDaily() {
        ModelAndView view = new ModelAndView();
        view.setViewName("ScrDaily");
        return view;
    }


    @RequestMapping("WfgdDaily")
    public ModelAndView WfgdDaily() {
        ModelAndView view = new ModelAndView();
        view.setViewName("WfgdDaily2");
        return view;
    }

    @RequestMapping("WfgdDailyP")
    public ModelAndView WfgdDailyP() {
        ModelAndView view = new ModelAndView();
        view.setViewName("WfgdDaily2P");
        return view;
    }


    @RequestMapping("ScrDailys")
    public ModelAndView ScrDailys() {
        ModelAndView view = new ModelAndView();
        view.setViewName("ScrDailys");
        return view;
    }

    @RequestMapping("ScrDailys2")
    public ModelAndView ScrDailys2() {
        ModelAndView view = new ModelAndView();
        view.setViewName("ScrDailys2");
        return view;
    }


    @RequestMapping("ScrDailyRecord")
    public ModelAndView ScrDailyRecord(int id, int other) {

        ModelAndView view = new ModelAndView();
        if (other == 1) {
            view.setViewName("ScrDailyRecord");
        } else {
            view.setViewName("WfgdDailyRecord");
        }
        view.addObject("id", id);
        return view;
    }

    /**
     * 添加接班人
     * @param id
     * @param type
     * @param projectId
     * @param datetime
     * @param userName
     * @param name
     * @param successorTime
     * @return
     */
    @RequestMapping("addSuccessor")
    public JsonResult addSuccessor(int id, int type, Integer projectId, String datetime, String userName, String name,String successorTime)
            throws ParseException{
        //用户信息过期
        Users user=this.getPrincipal();
        if(user==null){
            return new JsonResult(Type.noUser);
        }

        if(projectId==0){
            projectId=user.getDepartmentId();
        }
        ScrDaily scrDaily = new ScrDaily();
        scrDaily.setProjectId(projectId);
        scrDaily.setId(id);
        scrDaily.setType(type);
        scrDaily.setDatetime(datetime);
        scrDaily.setSuccessor(userName);
        scrDaily.setRecorder(name);
        if(successorTime!=null && !"".equals(successorTime.trim())){
            successorTime=successorTime+";"+DateFormat.getYMDHM();
        }else{
            successorTime=DateFormat.getYMDHM();
        }
        scrDaily.setSuccessorTime(successorTime);//接班时间
        int num = scrDailyService.addSuccessor(scrDaily);

        datetime=DateFormat.getYMD(datetime);
        //判断此用户当前是否存在正在进行的运行工时
        Map map=new HashMap();
        map.put("employeeId",user.getEmployeeId());
        map.put("other",1);
        List<OperatingHours> list=workingService.getOperatingHoursList(map);
        if(list!=null && list.size()>0){
            return new JsonResult(Type.haveRecords);//存在尚未完成的日志登记
        }
        //保存副本:operatingHours表
        OperatingHours operatingHours=new OperatingHours();
        operatingHours.setEmployeeId(user.getEmployeeId());
        operatingHours.setMonthDay(datetime);
        operatingHours.setOther(1);
        operatingHours.setProjectId(projectId);
        operatingHours.setScrdailyId(scrDaily.getId());
        operatingHours.setSuccessorTime(successorTime);
        workingService.addOperatingHours(operatingHours);
        return new JsonResult(Type.success);
    }

    @RequestMapping("addSuccessor2")
    public JsonResult addSuccessor2(int id, String datetime, String name) {
        ScrDaily ScrDaily = new ScrDaily();
        ScrDaily.setId(id);
        ScrDaily.setDatetime(datetime);
        ScrDaily.setRecorder(name);
        int num = scrDailyService.addSuccessor2(ScrDaily);
        return new JsonResult(num);
    }

    /**
     * 删除接班人
     * 前台传入交班人时间与交班人
     * @param id
     * @param userName
     * @param name
     * @return
     */
    @RequestMapping("delSuccessor")
    public JsonResult delSuccessor(int id, String userName, String name,String successorTime) {
        int num = scrDailyService.delSuccessor(id, userName, name,successorTime);
        return new JsonResult(num);
    }


    /**
     * 添加交班人
     * @param id
     * @param type
     * @param projectId
     * @param datetime
     * @param userName
     * @param Name
     * @return
     */
    @RequestMapping("addTrader")
    public JsonResult addTrader(int id, int type, Integer projectId, String datetime, String userName, String Name,String tradersTime)
            throws ParseException{
        Users users=this.getPrincipal();
        if(users==null){
            return new JsonResult(Type.noUser);
        }

        if(projectId==0){
            projectId=users.getDepartmentId();
        }

        ScrDaily scrDaily = new ScrDaily();
        scrDaily.setProjectId(projectId);
        scrDaily.setId(id);
        scrDaily.setType(type);
        scrDaily.setDatetime(datetime);
        scrDaily.setTraders(userName);
        scrDaily.setRecorder(Name);
        if(tradersTime!=null && !"".equals(tradersTime.trim())){
            tradersTime=tradersTime+";"+DateFormat.getYMDHM();
        }else{
            tradersTime=DateFormat.getYMDHM();
        }
        scrDaily.setTradersTime(tradersTime);//接班时间
        int num = scrDailyService.addTrader(scrDaily);

        //转化日期：yyyy-mm-dd
        datetime=DateFormat.getYMD(datetime);
        //保存副本:operatingHours表
        OperatingHours operatingHours=new OperatingHours();
        operatingHours.setEmployeeId(users.getEmployeeId());
        operatingHours.setMonthDay(datetime);
        operatingHours.setProjectId(projectId);
        operatingHours.setScrdailyId(scrDaily.getId());
        operatingHours.setTradersTime(tradersTime);

        //判断是否存在记录
        Map map =new HashMap();
        map.put("employeeId",users.getEmployeeId());
        map.put("other",1);
        OperatingHours operatingHour=workingService.findByMonthAndEmpId(map);
        if(operatingHour!=null && operatingHour.getId()!=null){
            operatingHours.setId(operatingHour.getId());
            operatingHours.setOther(2);//正常
            String successorTime=operatingHour.getSuccessorTime();//接班时间
            if(successorTime!=null && !"".equals(successorTime)){
                Double workingTime=DateFormat.getBothTime(successorTime,DateFormat.getYMDHM());
                operatingHours.setWorkingTime(workingTime);//工时
            }
            workingService.updOperatingHours(operatingHours);
        }else{
            return new JsonResult(Type.noRecords);//无记录
        }
        return new JsonResult(Type.success);
    }

    /**
     * 删除交班人
     * 前台传入交班人时间与交班人
     * @param id
     * @param userName
     * @param name
     * @return
     */
    @RequestMapping("delTrader")
    public JsonResult delTrader(int id, String userName, String name,String tradersTime) {
        int num = scrDailyService.delTrader(id, userName, name,tradersTime);
        return new JsonResult(num);
    }


    @RequestMapping("find")
    public JsonResult find(String datetime, int type, int project, int other) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        ScrDailyRecord[] ScrDailyRecord = scrDailyService.getScrDailyRecords(datetime, type, project, other);
        return new JsonResult(ScrDailyRecord);
    }

    @RequestMapping("find1")
    public JsonResult find1(int scrDailyId) {
        ScrDailyRecord[] ScrDailyRecord = scrDailyService.getScrDailyRecordsByScrDailyId(scrDailyId);
        return new JsonResult(ScrDailyRecord);
    }

    @RequestMapping("getscrDailys")
    public JsonResult getscrDailys(int project, int other) throws ParseException {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        ScrDaily[] scrDailys = scrDailyService.getScrDailys(project, other);
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < scrDailys.length; i++) {
            String dateTime=scrDailys[i].getDatetime();
            Date parse = sdf1.parse(dateTime);
            String timeStr1=sdf1.format(parse);
            scrDailys[i].setDatetime(timeStr1);
        }
        return new JsonResult(scrDailys);
    }

    @RequestMapping("findscrDaily")
    public JsonResult findscrDaily(String datetime, int type, Integer project, int other) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        ScrDaily scrDaily = scrDailyService.getScrDaily(datetime, type, project, other);
        return new JsonResult(scrDaily);
    }

    @RequestMapping("findscrDaily1")
    public JsonResult findscrDaily1(int id) throws ParseException {
        ScrDaily scrDaily = scrDailyService.getScrDailyById(id);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年M月d日");
        scrDaily.setDatetime(sdf1.format(sdf.parse(scrDaily.getDatetime())));
        return new JsonResult(scrDaily);
    }

    @RequestMapping("add")
    public ModelAndView add(HttpServletRequest request, int type, int scrDailyId) {
        ModelAndView view = new ModelAndView();
        if (type == 2) {
            String content1 = request.getParameter("content1");
            view.addObject("content1", content1);
        }
        view.addObject("type", type);
        view.addObject("scrDailyId", scrDailyId);
        if (type == 2) {

            view.setViewName("ScrDailyadd2");
        } else if (type == 3) {
            view.setViewName("ScrDailyadd3");
        } else if (type == 4) {
            view.setViewName("ScrDailyadd4");
        } else {
            view.setViewName("ScrDailyadd1");
        }
        return view;
    }


    @RequestMapping("add1")
    public ModelAndView add1(HttpServletRequest request, int type, int scrDailyId) {
        ModelAndView view = new ModelAndView();
        if (type == 2) {
            String content1 = request.getParameter("content1");
            view.addObject("content1", content1);
        }
        view.addObject("type", type);
        view.addObject("scrDailyId", scrDailyId);
        if (type == 2) {
            int content1 = Integer.valueOf(request.getParameter("content1"));
            if (content1 == 1) {
                view.setViewName("WfgdDailyadd1");
            } else {
                view.setViewName("WfgdDailyadd2");
            }
        } else if (type == 3) {
            view.setViewName("ScrDailyadd1");
        } else if (type == 4) {
            view.setViewName("ScrDailyadd1");
        } else {
            view.setViewName("ScrDailyadd3");
        }
        return view;
    }

    @RequestMapping("upd1")
    public ModelAndView upd1(int id, int type) {
        ModelAndView view = new ModelAndView();
        ScrDailyRecord ScrDailyRecord = scrDailyService.getScrDailyRecord(id);
        view.addObject("ScrDailyRecord", ScrDailyRecord);
        if (type == 2) {
            if ("1".equals(ScrDailyRecord.getContent1())) {
                view.setViewName("WfgdDailyupd1");
            } else {
                view.setViewName("WfgdDailyupd2");
            }
        } else if (type == 3) {
            view.setViewName("ScrDailyupd1");
        } else if (type == 4) {
            view.setViewName("ScrDailyupd1");
        } else {
            view.setViewName("ScrDailyupd3");
        }
        return view;
    }


    @RequestMapping("upd")
    public ModelAndView upd(int id, int type) {
        ModelAndView view = new ModelAndView();
        ScrDailyRecord ScrDailyRecord = scrDailyService.getScrDailyRecord(id);
        view.addObject("ScrDailyRecord", ScrDailyRecord);
        if (type == 2) {
            view.setViewName("ScrDailyupd2");
        } else if (type == 3) {
            view.setViewName("ScrDailyupd3");
        } else if (type == 4) {
            view.setViewName("ScrDailyupd4");
        } else {
            view.setViewName("ScrDailyupd1");
        }
        return view;
    }

    @RequestMapping("del")
    public JsonResult del(int id) {
        int num = scrDailyService.delScrDailyRecord(id);
        return new JsonResult(num);
    }

    @RequestMapping("delScrDailys")
    public JsonResult delScrDailys(int id) {
        int num = scrDailyService.delScrDailys(id);
        return new JsonResult(num);
    }

    @RequestMapping("insert")
    public JsonResult insert(ScrDailyRecord ScrDailyRecord) {
        int num = scrDailyService.insertScrDailyRecord(ScrDailyRecord);
        return new JsonResult(num);
    }

    @RequestMapping("update")
    public JsonResult update(ScrDailyRecord ScrDailyRecord) {
        System.out.println(ScrDailyRecord);
        int num = scrDailyService.updateScrDailyRecord(ScrDailyRecord);
        return new JsonResult(num);
    }


    @RequestMapping("updScrDaily")
    public ModelAndView updScrDaily(String datetime, int type, int project, int other) {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        ModelAndView view = new ModelAndView();
        ScrDaily scrDaily = scrDailyService.getScrDaily(datetime, type, project, other);
        view.addObject("scrDaily", scrDaily);
        view.setViewName("scrDailyupd");
        return view;
    }

    @RequestMapping("changeScrDaily")
    public JsonResult changeWeek(int projectId, int id, int type, int group, String datetime, String traders, String successor, int other) {
        if(projectId==0){
            Users users=this.getPrincipal();
            projectId=users.getDepartmentId();
        }
        ScrDaily scrDaily = new ScrDaily(id, datetime, projectId, group, type, traders, successor, other);
        int num = scrDailyService.changeScrDaily(scrDaily);
        return new JsonResult(num);
    }

    @RequestMapping("next")
    public JsonResult next(int type, String datetime, int project, int other) throws ParseException {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        if (type == 3) {
            type = 1;
        } else {

            if (type == 2) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(date);
                calendar.add(calendar.DATE, 1);
                date = calendar.getTime();
            }
            type++;
        }
        datetime = sdf1.format(date);
        ScrDaily scrDaily = scrDailyService.getScrDaily(datetime, type, project, other);
        if (scrDaily.getId() == 0) {
            scrDaily.setDatetime(sdf.format(date));
        }
        return new JsonResult(scrDaily);
    }

    @RequestMapping("last")
    public JsonResult last(int type, String datetime, int project, int other) throws ParseException {
        if(project==0){
            Users users=this.getPrincipal();
            project=users.getDepartmentId();
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        if (type == 1) {
            type = 3;

        } else {

            if (type == 3) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(date);
                calendar.add(calendar.DATE, -1);
                date = calendar.getTime();
            }
            type--;
        }
        datetime = sdf1.format(date);

        ScrDaily scrDaily = scrDailyService.getScrDaily(datetime, type, project, other);
        if (scrDaily.getId() == 0) {
            scrDaily.setDatetime(sdf.format(date));
        }
        return new JsonResult(scrDaily);
    }

    /**
     * 运行日志等级  班组运行情况A
     *
     * @param date         日期
     * @param departmentId
     * @return
     */
    @GetMapping("/getTeamOperationLog")
    public Result getTeamOpeartionLog(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String departmentId

    ) {
        Subject subject = SecurityUtils.getSubject();
        Users logUser = (Users) subject.getPrincipal();
        Map<String, Object> queryMap = new HashMap<>();
        if (date != null) {
            queryMap.put("createTime", date);
        }
        if (departmentId != null) {
            queryMap.put("departmentId", departmentId);
        }
        List<Defect> defectList = defectService.getDefectList(queryMap);

        List<Map> mapList = new ArrayList<>();
        HashMap map;
        if (defectList != null && defectList.size() > 0) {
            for (Defect defect : defectList) {
                map = new HashMap();
                map.put("id", defect.getId());
                map.put("number", defect.getNumber());
                map.put("abs", defect.getAbs());
                map.put("creatName", defect.getCreatedByName());
                map.put("createTime", defect.getCreated());
                mapList.add(map);
            }
        }
        return Result.ok(mapList.size(), mapList);

    }

}
