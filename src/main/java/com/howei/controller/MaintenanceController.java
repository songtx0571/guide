package com.howei.controller;


import com.howei.pojo.*;
import com.howei.service.MaintainService;
import com.howei.service.UserService;
import com.howei.util.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.howei.service.MaintenanceService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author cj
 */
@RestController
@RequestMapping("/guide/MaintenanceController")
public class MaintenanceController {

    @Autowired
    MaintenanceService maintenanceService;

    @Autowired
    UserService userService;
    @Autowired
    MaintainService maintainService;

    /**
     * 获取shiro存储的Users
     */
    public Users getPrincipal() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        return users;
    }

    @RequestMapping("Maintenance")
    public ModelAndView Maintenance(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        view.setViewName("Maintenance");
        return view;
    }

    @RequestMapping("addLeader")
    public JsonResult addSuccessor(int id, Integer projectId, String datetime, String userName) {

        Users users = this.getPrincipal();
        if (projectId == 0) {
            if (users == null) {
                return new JsonResult(Type.noUser);
            }
            projectId = users.getDepartmentId();
        }
        userName = users.getUserNumber();
        Maintenance maintenance = new Maintenance();
        maintenance.setProjectId(projectId);
        maintenance.setId(id);
        maintenance.setDatetime(datetime);
        maintenance.setLeader(userName);
        int num = maintenanceService.addLeader(maintenance);
        return new JsonResult(num);
    }

    @RequestMapping("delLeader")
    public JsonResult delSuccessor(int id, String userName) {
        int num = maintenanceService.delLeader(id, userName);
        return new JsonResult(num);
    }


    @RequestMapping("find")
    public JsonResult find(String datetime, int project) {
        Users users = this.getPrincipal();
        if (project == 0) {
            if (users == null) {
                return new JsonResult(Type.noUser);
            }
            project = users.getDepartmentId();
        }
        Maintenance maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        return new JsonResult(maintenance);

    }

    @RequestMapping("findRecord")
    public JsonResult findRecord(String datetime, int project) {
        Users users = this.getPrincipal();
        if (project == 0) {
            if (users == null) {
                return new JsonResult(Type.noUser);
            }
            project = users.getDepartmentId();
        }
        MaintenanceRecord[] maintenanceRecords = maintenanceService.getMaintenanceRecords(datetime, project);
        return new JsonResult(maintenanceRecords);
    }

    @RequestMapping("getMaintenances")
    public JsonResult getMaintenances(int project) {
        Users users = this.getPrincipal();
        if (project == 0) {
            if (users == null) {
                return new JsonResult(Type.noUser);
            }
            project = users.getDepartmentId();
        }
        Maintenance[] maintenances = maintenanceService.getMaintenances(project);
        Map<String, Object> map = new HashMap<>();
        map.put("departmentId", project);
        map.put("status", 2);
        List<MaintainRecord> maintainRecordList = maintainService.getMaintainRecordByMap(map);

        return new JsonResult(maintenances);

    }

    @RequestMapping("addMaintenanceRecord")
    public ModelAndView addMaintenanceRecord(int type, int maintenanceId) {
        ModelAndView view = new ModelAndView();
        view.addObject("maintenanceId", maintenanceId);
        view.addObject("type", type);
        if (type == 1) {
            view.setViewName("MaintenanceRecordAdd2");
        } else {
            view.setViewName("MaintenanceRecordAdd");
        }
        return view;
    }

    @RequestMapping("updMaintenanceRecord")
    public ModelAndView updMaintenanceRecord(int id) {
        ModelAndView view = new ModelAndView();
        MaintenanceRecord maintenanceRecord = maintenanceService.getMaintenanceRecord(id);
        System.out.println(maintenanceRecord.toString());
        view.addObject("maintenanceRecord", maintenanceRecord);
        view.addObject("aaa", "aaa");
        if (maintenanceRecord.getType() == 1) {
            view.setViewName("MaintenanceRecordUpd2");
        } else {
            view.setViewName("MaintenanceRecordUpd");
        }

        return view;
    }


    @RequestMapping("updMaintenanceRecord1")
    public ModelAndView updMaintenanceRecord1(int id) {
        ModelAndView view = new ModelAndView();
        MaintenanceRecord maintenanceRecord = maintenanceService.getMaintenanceRecord(id);
        view.addObject("maintenanceRecord", maintenanceRecord);
        view.setViewName("MaintenanceRecordUpd3");
        return view;
    }

    @RequestMapping("delMaintenanceRecord")
    public JsonResult delMaintenanceRecord(int id) {
        int num = maintenanceService.delMaintenanceRecord(id);
        return new JsonResult(num);
    }

    @RequestMapping("delMaintenance")
    public JsonResult delMaintenance(int id) {
        int num = maintenanceService.delMaintenance(id);
        return new JsonResult(num);
    }


    @RequestMapping("changeMaintenance")
    public ModelAndView changeMaintenance(String datetime, int project) {
        ModelAndView view = new ModelAndView();
        Maintenance maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        view.addObject("Maintenance", maintenance);
        view.setViewName("MaintenanceChange");
        return view;
    }

    @RequestMapping("maintenanceChange")
    public JsonResult maintenanceChange(Maintenance maintenance) {
        int num = maintenanceService.change(maintenance);
        return new JsonResult(num);
    }


    @RequestMapping("insertMaintenanceRecord")
    public JsonResult insertMaintenanceRecord(MaintenanceRecord MaintenanceRecord) {
        int num = maintenanceService.insertMaintenanceRecord(MaintenanceRecord);
        return new JsonResult(num);
    }

    @RequestMapping("updateMaintenanceRecord")
    public JsonResult updateMaintenanceRecord(MaintenanceRecord MaintenanceRecord) {
        int num = maintenanceService.updateMaintenanceRecord(MaintenanceRecord);
        return new JsonResult(num);
    }

    @RequestMapping("updateMaintenanceRecord1")
    public JsonResult updateMaintenanceRecord1(MaintenanceRecord MaintenanceRecord) {
        int num = maintenanceService.updateMaintenanceRecord1(MaintenanceRecord);
        return new JsonResult(num);
    }


    @RequestMapping("Maintenances")
    public ModelAndView Maintenances() {
        ModelAndView view = new ModelAndView();
        view.setViewName("Maintenances");
        return view;
    }


    @RequestMapping("MaintenanceRecord")
    public ModelAndView MaintenanceRecord(int id) {
        ModelAndView view = new ModelAndView();
        view.addObject("id", id);
        view.setViewName("MaintenanceRecord");
        return view;
    }

    @RequestMapping("find1")
    public JsonResult find1(int id) {
        Maintenance maintenance = maintenanceService.getMaintenanceById(id);
        return new JsonResult(maintenance);
    }

    @RequestMapping("findRecord1")
    public JsonResult findRecord1(int maintenanceId) {
        MaintenanceRecord[] maintenanceRecords = maintenanceService.getMaintenanceRecordsByMaintenanceId(maintenanceId);
        return new JsonResult(maintenanceRecords);
    }

    @RequestMapping("next")
    public JsonResult next(String datetime, int project) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, 1);
        date = calendar.getTime();
        datetime = sdf.format(date);
        Maintenance Maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        if (Maintenance.getId() == 0) {
            Maintenance.setDatetime(sdf.format(date));
        }
        return new JsonResult(Maintenance);
    }

    @RequestMapping("last")
    public JsonResult last(String datetime, int project) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, -1);
        date = calendar.getTime();
        datetime = sdf.format(date);

        Maintenance Maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        if (Maintenance.getId() == 0) {
            Maintenance.setDatetime(sdf.format(date));
        }
        return new JsonResult(Maintenance);
    }

    /**
     * --------------------------------------获取缺陷系统的数据-----------------------------------------
     */

    @RequestMapping("getDefectList")
    public JsonResult getDefectList(
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) String date) {

        List<Map<String, Object>> mapList = new ArrayList<>();
        Map map = new HashMap();
        Subject subject = SecurityUtils.getSubject();
        Users loginUser = (Users) subject.getPrincipal();

        if (departmentId == null || departmentId == 0) {
            departmentId = loginUser.getDepartmentId();
        }
        map.put("departmentId", departmentId);
        if (date != null && !"".equals(date)) {
            map.put("date", date);
        }
        List<Defect> defectLis = maintenanceService.getDefectList(map);
        List<MaintainRecord> maintainRecordList = maintenanceService.getMaintainRecordList(map);
        if (defectLis != null && defectLis.size() > 0) {
            for (Defect defect : defectLis) {
                map = new HashMap();
                map.put("number", defect.getNumber());
                map.put("abs", defect.getAbs());
                String[] arr = defect.getEmpIds().split(",");
                String empIdsName = "";
                for (String str : arr) {
                    Users users = userService.findByEmpId(str);
                    if (users != null) {
                        empIdsName += users.getUserName() + "、";
                    }
                }
                empIdsName = empIdsName != null ? empIdsName.substring(0, empIdsName.length() - 1) : null;
                map.put("id", defect.getId());
                map.put("empIdsName", empIdsName);
                map.put("realExecuteTime", defect.getRealExecuteTime());
                map.put("confirmer1Time", defect.getConfirmer1Time());
                map.put("type", 0);
                mapList.add(map);
            }
        }

        if (maintainRecordList != null && maintainRecordList.size() > 0) {
            for (MaintainRecord maintainRecord : maintainRecordList) {
                map = new HashMap();
                map.put("number", maintainRecord.getMaintainRecordNo());
                map.put("abs", maintainRecord.getSystemName() + maintainRecord.getEquipmentName() + maintainRecord.getUnitName());
                String[] arr = maintainRecord.getEmployeeId().split(",");
                String empIdsName = "";
                for (String str : arr) {
                    Users users = userService.findByEmpId(str);
                    if (users != null) {
                        empIdsName += users.getUserName() + "、";
                    }
                }
                empIdsName = empIdsName != null ? empIdsName.substring(0, empIdsName.length() - 1) : null;
                map.put("empIdsName", empIdsName);
                map.put("realExecuteTime", maintainRecord.getWorkingHour());
                map.put("confirmer1Time", maintainRecord.getEndTime());
                map.put("type", 1);
                mapList.add(map);
            }
        }
        return new JsonResult( mapList);
    }
}
