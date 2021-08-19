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
        String name = request.getParameter("name");
        String depart = request.getParameter("departName");
        String type = request.getParameter("type");//1：人工；2：ai,3维护,4缺陷
        String startTime = request.getParameter("startTime");//开始时间
        String endTime = request.getParameter("endTime");//结束时间
        String page = request.getParameter("page");
        String limit = request.getParameter("limit");
        String systemId = request.getParameter("systemId");
        String equipmentId = request.getParameter("equipmentId");
        int rows = Page.getOffSet(page, limit);
        Result result = new Result();
        Subject subject = SecurityUtils.getSubject();
        Users loginUser = (Users) subject.getPrincipal();
        if (loginUser == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Map<String, Object> resultMap = new HashMap<>();
        Map<Integer, String> usersMap = getUsersMap();
        int total;
        if (name != null && !"".equals(name)) {
            Map map = new HashMap();
            if (startTime != null && !startTime.equals("")) {
                map.put("startTime", startTime);
            }
            if (endTime != null && !endTime.equals("")) {
                map.put("endTime", endTime);
            }

            if (type.contains("1")) {//人工数据
                map.put("equipment", name);
                map.put("projectDepartment", depart);
                List<PostPeratorData> list = postPeratorDataService.selByName(map);
                total = list.size();
                list.clear();
                map.put("pageSize", limit);
                map.put("page", rows);
                list = postPeratorDataService.selByName(map);
                for (int i = 0; i < list.size(); i++) {
                    PostPeratorData postPeratorData = list.get(i);
                    Users user = userService.findById(postPeratorData.getCreatedBy() + "");
                    if (user != null) {
                        postPeratorData.setCreatedByName(user.getUserName());
                    } else {
                        postPeratorData.setCreatedByName("");
                    }
                }
                resultMap.put("RGTotal", total);
                resultMap.put("RGData", list);
            }

            if (type.contains("2")) {//ai数据
                map.put("equipment", name);
                map.put("projectDepartment", depart);
                List<AiConfigurationData> list = aiConfigurationDataService.getAiConfigureDataList(map);
                total = list.size();
                list.clear();
                if (startTime == null || startTime.equals("") && endTime == null || endTime.equals("")) {
                    map.put("pageSize", limit);
                    map.put("page", rows);
                }
                list = aiConfigurationDataService.getAiConfigureDataList(map);
                resultMap.put("AITotal", total);
                resultMap.put("AIData", list);
            }

            if (type.contains("3")) {
                map.put("departmentId", depart);
                map.put("systemId", systemId);
                map.put("equipmentId", equipmentId);
                map.put("status", 2);
                List<MaintainRecord> maintainRecordList = maintainService.getMaintainRecordByMap(map);
                maintainRecordList.stream().forEach(maintainRecord -> {
                    String employeeId = maintainRecord.getEmployeeId();
                    String[] maintainRecordEmployeeIds = null;
                    if (!StringUtils.isEmpty(employeeId)) {
                        maintainRecordEmployeeIds = employeeId.split(",");
                    }
                    String employeeNames = "";
                    if (maintainRecordEmployeeIds != null) {
                        for (String maintainRecordEmployeeId : maintainRecordEmployeeIds) {
                            String userName = usersMap.get(Integer.valueOf(maintainRecordEmployeeId));
                            if (StringUtils.isEmpty(userName)) {
                                employeeNames += userName + "、";
                            }
                        }
                    }
                    if (employeeNames.length() > 1) {
                        employeeNames = employeeNames.substring(0, employeeNames.length() - 1);
                    }
                    maintainRecord.setEmployeeName(employeeNames);
                });
                total = maintainRecordList.size();

                resultMap.put("WHTotal", total);
                resultMap.put("WHData", maintainRecordList);
            }

            if (type.contains("4")) {
                map.put("departmentId", depart);
                map.put("sysId", systemId);
                map.put("equipmentId", equipmentId);
                map.put("type", 4);
                List<Defect> defectList = defectService.getDefectList(map);
                defectList.stream().forEach(defect -> {
                    String empIds = defect.getEmpIds();
                    String[] defectEmpIds = null;
                    if (!StringUtils.isEmpty(empIds)) {
                        defectEmpIds = empIds.split(",");
                    }
                    String employeeNames = "";
                    for (String defectEmpId : defectEmpIds) {
                        String userName = usersMap.get(Integer.valueOf(defectEmpId));
                        if (StringUtils.isEmpty(userName)) {
                            employeeNames += userName + "、";
                        }
                    }
                    if (employeeNames.length() > 1) {
                        employeeNames = employeeNames.substring(0, employeeNames.length() - 1);
                    }
                    defect.setEmpIdsName(employeeNames);
                });
                resultMap.put("DeTotal", defectList.size());
                resultMap.put("DeData", defectList);
            }
        }
        result.setData(resultMap);
        result.setMsg("查询成功");
        result.setCode(0);
        return result;
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
