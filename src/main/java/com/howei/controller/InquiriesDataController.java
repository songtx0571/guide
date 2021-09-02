package com.howei.controller;

import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.EasyuiResult;
import com.howei.util.Page;
import com.howei.util.Result;
import com.howei.util.ResultEnum;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 查询数据
 */
@Controller
@CrossOrigin(origins = {"http://192.168.1.27:8082", "http:localhost:8080", "http://192.168.1.27:8848"}, allowCredentials = "true")
@RequestMapping("/guide/inquiries")
//@RequestMapping("/inquiries")
public class InquiriesDataController {

    @Autowired
    PostPeratorDataService postPeratorDataService;
    @Autowired
    UserService userService;
    @Autowired
    DataConfigurationService dataConfigurationService;
    @Autowired
    AiConfigurationDataService aiConfigurationDataService;
    @Autowired
    MaintainService maintainService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DefectService defectService;

    /**
     * 获取用户Map
     *
     * @return
     */
    public Map<Integer, String> getUsersMap() {
        Map<Integer, String> map = employeeService.getUsersMap();
        return map;
    }

    /**
     * 跳转查询数据页面
     *
     * @return
     */
    @RequestMapping("/toData")
    public String toData() {
        return "inquiriesData";
    }

    /**
     * 根据系统名称+设备名称查询测点数据
     *
     * @param request
     * @return
     */
    @RequestMapping("/getInquiriesData")
    @ResponseBody
    public Result getInquiriesData(HttpServletRequest request) {
        String departmentId = request.getParameter("departmentId");
        String type = request.getParameter("type");//1：人工；2：ai,3维护,4缺陷
        String startTime = request.getParameter("startTime");//开始时间
        String endTime = request.getParameter("endTime");//结束时间
        Integer page = Integer.valueOf(request.getParameter("page"));
        Integer limit = Integer.valueOf(request.getParameter("limit"));
        String systemId = request.getParameter("systemId");
        String equipId = request.getParameter("equipmentId");
        String measuringTypeId = request.getParameter("measuringTypeId");
        Subject subject = SecurityUtils.getSubject();
        Users loginUser = (Users) subject.getPrincipal();
        if (loginUser == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Map<Integer, String> usersMap = getUsersMap();
        int count;
        Map map = new HashMap();
        if (!StringUtils.isEmpty(startTime) && !StringUtils.isEmpty(endTime)) {
            map.put("startTime", startTime);
            map.put("endTime", endTime);
        }
        if (!StringUtils.isEmpty(departmentId)) {
            map.put("departmentId", departmentId);
        }
        if (!StringUtils.isEmpty(systemId)) {
            map.put("systemId", systemId);
            map.put("sysId", systemId);
        }
        if (!StringUtils.isEmpty(equipId)) {
            map.put("equipId", equipId);
        }
        if (type.contains("1")) {//人工数据
            if (!StringUtils.isEmpty(measuringTypeId)) {
                map.put("measuringTypeId", measuringTypeId);
            }
            List<PostPeratorData> list = postPeratorDataService.selByName(map);
            count = list.size();
            if (!StringUtils.isEmpty(page) && !StringUtils.isEmpty(limit)) {
                list = list.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
            }
            list.stream().map(item -> {
                Users user = userService.findById(item.getCreatedBy() + "");
                String createdByName = (user != null) ? user.getUserName() : "";
                item.setCreatedByName(createdByName);
                return item;
            });
            return Result.ok(count, list);
        }
        if (type.contains("2")) {//ai数据
            List<AiConfigurationData> list = aiConfigurationDataService.getAiConfigureDataList(map);
            count = list.size();
            if (!StringUtils.isEmpty(page) && !StringUtils.isEmpty(limit)) {
                list = list.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
            }
            return Result.ok(count, list);
        }
        if (type.contains("3")) {
            map.put("status", 2);
            List<MaintainRecord> list = maintainService.getMaintainRecordByMap(map);
            count = list.size();
            if (!StringUtils.isEmpty(page) && !StringUtils.isEmpty(limit)) {
                list = list.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
            }
            list.stream().forEach(maintainRecord -> {
                String employeeId = maintainRecord.getEmployeeId();
                String[] maintainRecordEmployeeIds = null;
                if (!StringUtils.isEmpty(employeeId)) {
                    maintainRecordEmployeeIds = employeeId.split(",");
                }
                String employeeNames = "";
                if (maintainRecordEmployeeIds != null) {
                    for (String maintainRecordEmployeeId : maintainRecordEmployeeIds) {
                        String userName = usersMap.get(Integer.valueOf(maintainRecordEmployeeId));
                        if (!StringUtils.isEmpty(userName)) {
                            employeeNames += userName + "、";
                        }
                    }
                }
                if (employeeNames.length() > 1) {
                    employeeNames = employeeNames.substring(0, employeeNames.length() - 1);
                }
                maintainRecord.setEmployeeName(employeeNames);
            });
            return Result.ok(count, list);
        }
        if (type.contains("4")) {
            map.put("type", 4);
            List<Defect> list = defectService.getDefectList(map);
            count = list.size();
            if (!StringUtils.isEmpty(page) && !StringUtils.isEmpty(limit)) {
                list = list.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
            }
            list.stream().forEach(defect -> {
                String empIds = defect.getEmpIds();
                String[] defectEmpIds = null;
                if (!StringUtils.isEmpty(empIds)) {
                    defectEmpIds = empIds.split(",");
                }
                String employeeNames = "";
                for (String defectEmpId : defectEmpIds) {
                    String userName = usersMap.get(Integer.valueOf(defectEmpId));
                    if (!StringUtils.isEmpty(userName)) {
                        employeeNames += userName + "、";
                    }
                }
                if (employeeNames.length() > 1) {
                    employeeNames = employeeNames.substring(0, employeeNames.length() - 1);
                }
                defect.setEmpIdsName(employeeNames);
            });
            return Result.ok(count, list);
        }
        return Result.ok();
    }


    /**
     * 获取员工模板执行的测点类型数据
     *
     * @param request
     * @return
     */
    @RequestMapping("/getUnityMap")
    @ResponseBody
    public List<Map<String, Object>> getUnityMap(HttpServletRequest request) {
        List<Map<String, Object>> result = new ArrayList<>();
        String depart = request.getParameter("departName");//项目
        String equipment = request.getParameter("name");//系统名+设备名
        String type = request.getParameter("type");//1:人工；2:ai,3维护
        Map map = new HashMap();
        map.put("department", depart);
        map.put("equipment", equipment);
        List<Map> list = new ArrayList<>();
        if (type != null && !type.equals("")) {
            if (type.equals("1")) {//人工
                list = postPeratorDataService.getUnityMap(map);
            } else if (type.equals("2")) {//ai
                list = dataConfigurationService.getMeasuringTypeMap(map);
            } else if (type.equals("3")) {
                //维护
            }
        }
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> mapStr = new HashMap<>();
            Map object = list.get(i);
            String text = (String) object.get("measuringType");
            mapStr.put("id", i);
            mapStr.put("text", text);
            result.add(mapStr);
        }
        return result;
    }

}
