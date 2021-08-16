package com.howei.controller;

import com.alibaba.fastjson.JSONObject;
import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.ListUtils;
import com.howei.util.Result;
import com.howei.util.ResultEnum;
import org.apache.jasper.security.SecurityUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.text.Collator;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 维护引导管理
 */
@Controller
@RequestMapping("/guide/maintain")
@CrossOrigin
public class MaintainController {
    @Autowired
    private MaintainService maintainService;
    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EquipmentService equipmentService;
    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/toMaintainWork")
    public String toMaintainWorkPage() {
        return "maintainWork";
    }

    @GetMapping("/toMaintainConfig")
    public String toMaintainConfig() {
        return "maintainConfig";
    }

    public Users getPrincipal() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        return users;
    }

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
     * 保存维护配置
     *
     * @param maintain
     * @return
     */
    @PostMapping("/saveMaintain")
    @ResponseBody
    public Result saveMaintain(@RequestBody Maintain maintain) {

        Users user = (Users) SecurityUtils.getSubject().getPrincipal();
        if (user == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        int companyId = user.getCompanyId();
        if (maintain.getDepartmentId() == null) {
            int departmentId = user.getDepartmentId();
            maintain.setDepartmentId(departmentId);
        }
        int employeeId = user.getEmployeeId();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Integer id = maintain.getId();
        Date date = new Date();
        if (StringUtils.isEmpty(id)) {
            maintain.setCompanyId(companyId);
            maintain.setEmployeeId(employeeId);
            maintain.setCreateTime(date);
            maintain.setUpdateTime(date);
            maintain.setStartTime(sdf.format(date));
            maintainService.insertMaintain(maintain);
        } else {
            maintain.setUpdateTime(date);
            maintainService.updateMaintainById(maintain);
        }
        return Result.ok();
    }

    /**
     * 根据部门和编号查询
     *
     * @param departmentId
     * @param id
     * @return
     */
    @RequestMapping("/getMaintains")
    @ResponseBody
    public Result getMaintainList(
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String searchWord,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) String field,
            @RequestParam(required = false) String order
    ) {
        Subject subject = SecurityUtils.getSubject();
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        if (!subject.isPermitted("查询所有部门维护引导")) {
            departmentId = users.getDepartmentId();
        }

        Map<String, Object> map = new HashMap<>();
        if (departmentId != null) {
            map.put("departmentId", departmentId);
        }
        if (id != null) {
            map.put("id", id);
        }
        if (searchWord != null && !"".equals(searchWord.trim())) {
            map.put("searchWord", "%" + searchWord + "%");
        }
        List<Maintain> maintains = maintainService.getMaintainByMap(map);
        int count = maintains.size();
        //排序
        if (field != null && order != null) {
            maintains = maintains.stream().sorted((o1, o2) -> (getCompareByM1AndM2(o1, o2, field, order))).collect(Collectors.toList());
        }

        if (page != null && limit != null) {
            maintains = maintains.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
        }

        return Result.ok(count, maintains);
    }

    /**
     * 倒计时排序
     *
     * @param o1
     * @param o2
     * @param field
     * @param order
     * @return
     */
    private int getCompareByM1AndM2(Maintain o1, Maintain o2, String field, String order) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String o1Str = JSONObject.toJSONString(o1);
        JSONObject maintainJsonObject1 = JSONObject.parseObject(o1Str);
        String o2Str = JSONObject.toJSONString(o2);
        JSONObject maintainJsonObject2 = JSONObject.parseObject(o2Str);
        //1.按照倒计时排序
        if ("startTime".equals(field)) {
            //获取状态
            Integer status1 = Integer.valueOf(maintainJsonObject1.get("assignmentStatus").toString());
            Integer status2 = Integer.valueOf(maintainJsonObject2.get("assignmentStatus").toString());
            //获取周期
            Integer cycle1 = Double.valueOf(maintainJsonObject1.get("cycle").toString()).intValue();
            Integer cycle2 = Double.valueOf(maintainJsonObject2.get("cycle").toString()).intValue();
            //获取开始时间
            String startTime1 = maintainJsonObject1.get("startTime").toString();
            String startTime2 = maintainJsonObject2.get("startTime").toString();

            Date startTimeStamp1 = new Date();
            Date startTimeStamp2 = new Date();
            try {
                startTimeStamp1 = sdf.parse(startTime1);
                startTimeStamp2 = sdf.parse(startTime2);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            //当前时间
            Date date = new Date();
            //下次最近的开始时间戳倒计时
            Long startTimeStampLong1 = (startTimeStamp1.getTime() + cycle1 * 24 * 60 * 60 * 1000L) - date.getTime();
            Long startTimeStampLong2 = (startTimeStamp2.getTime() + cycle2 * 24 * 60 * 60 * 1000L) - date.getTime();
            //升序
            if ("asc".equals(order)) {
                if (status1.equals(status2)) {
                    //2是已暂停,1是已分配
                    return startTimeStampLong1.compareTo(startTimeStampLong2);
                } else {
                    return status1 >= status2 ? 1 : -1;
                }
            } else
                //降序
                if ("desc".equals(order)) {
                    if (status1.equals(status2)) {
                        //2是已暂停,1是已分配
                        return startTimeStampLong2.compareTo(startTimeStampLong1);
                    } else {
                        return status1 >= status2 ? -1 : 1;
                    }

                }
        }
        //2.按照其他数字字段排序
        else if ("planedWorkingHour".equals(field) || "cycle".equals(field) || "id".equals(field)) {
            Double field1 = Double.valueOf((String) maintainJsonObject1.get(field));
            Double field2 = Double.valueOf((String) maintainJsonObject2.get(field));
            if ("asc".equals(order)) {
                return field1.compareTo(field2);
            } else if ("desc".equals(order)) {
                return field2.compareTo(field1);
            }
        }
        //3.按照其他字符串字段排序
        else {
            Object fieldObj1 = maintainJsonObject1.get(field);
            String field1 = (fieldObj1 == null) ? "" : fieldObj1.toString();
            Object fieldObj2 = maintainJsonObject2.get(field);
            String field2 = (fieldObj2 == null) ? "" : fieldObj2.toString();
            if ("asc".equals(order)) {
                return field1.compareTo(field2);
            } else if ("desc".equals(order)) {
                return field2.compareTo(field1);
            }
        }
        return 0;

    }

    /**
     * 删除维护配置
     *
     * @param id
     * @return
     */
    @GetMapping("/deleteMaintain")
    @ResponseBody
    public Result deleteMaintain(@RequestParam Integer id) {
        maintainService.deleteMaintainById(id);
        return Result.ok();
    }


    /**
     * 分配维护配置
     *
     * @param maintainRecord
     * @return
     */
    @PostMapping("/insertMaintainRecord")
    @ResponseBody
    public Result insertMaintainRecord(@RequestBody MaintainRecord maintainRecord) {
        Integer maintainId = maintainRecord.getMaintainId();
        Maintain maintain = maintainService.getMaintainById(maintainId);
        String assignmentStatus = maintain.getAssignmentStatus();
        if ("1".equals(assignmentStatus)) {
            return Result.fail(ResultEnum.MAINTAIN_DISTRIBUTED);
        } else if ("2".equals(assignmentStatus)) {
            return Result.fail(ResultEnum.MAINTAIN_STOPED);
        }
        Date date = new Date();
        //更新时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Integer departmentId = maintainRecord.getDepartmentId();
        maintainRecord.setDepartmentId(departmentId);

        //设置维护编号
        Map<String, Object> map = new HashMap<>();
        map.put("departmentId", departmentId);
        List<MaintainRecord> maintainRecordByMap = maintainService.getMaintainRecordByMap(map);

        Integer count = 0;
        if (maintainRecordByMap != null) {
            count = maintainRecordByMap.size() + 1;
        }
        Company company = companyService.getCompanyById(departmentId.toString());
        DecimalFormat df = new DecimalFormat("00000");
        String maintainRecoreNo = company.getCodeName() + "W" + df.format(count);
        maintainRecord.setMaintainRecordNo(maintainRecoreNo);
        maintainRecord.setClaimTime(sdf.format(new Date()));
        maintainRecord.setCreateTime(date);
        maintainRecord.setUpdateTime(date);

        maintainRecord.setSystemId(maintain.getSystemId());
        maintainRecord.setEquipmentId(maintain.getEquipmentId());
        maintainRecord.setUnitId(maintain.getUnitId());
        maintainRecord.setWorkContent(maintain.getWorkContent());

        //插入记录
        int insertMaintainRecordFlag = maintainService.insertMaintainRecord(maintainRecord);
        //插入成功则修改维护配置状态为已分配
        if (insertMaintainRecordFlag >= 0) {
            maintain.setUpdateTime(date);
            maintain.setAssignmentStatus("1");
            maintainService.updateMaintainById(maintain);
        }
        return Result.ok();
    }

    /**
     * 保存维护记录
     *
     * @param maintainRecord
     * @return
     */
    @PostMapping("/updateMaintainRecord")
    @ResponseBody
    public Result updateMaintainRecord(@RequestBody MaintainRecord maintainRecord) {
        Users user = (Users) SecurityUtils.getSubject().getPrincipal();
        if (user == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        //  获取维护id
        maintainRecord.setUpdateTime(new Date());
        String status = maintainRecord.getStatus();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        DecimalFormat df = new DecimalFormat("0.0");
        //1.点击开始
        if ("1".equals(status)) {
            maintainRecord.setStartTime(sdf.format(new Date()));
        }
        // 2点击完成
        else if ("2".equals(status)) {
            //
            MaintainRecord maintainRecord1 = maintainService.getMaintainRecordById(maintainRecord.getId());

            Integer maintainId = maintainRecord1.getMaintainId();

            Maintain maintain = maintainService.getMaintainById(maintainId);
            //得到计划工时
            double planedWorkingHour = Double.valueOf(maintain.getPlanedWorkingHour());


            //得到开始时间
            String startTime = maintainRecord1.getStartTime();
            //声明开始时间时间戳,并赋初始值
            Long startDateTime = System.currentTimeMillis();
            try {
                //赋值开始时间的时间戳
                startDateTime = sdf.parse(startTime).getTime();
            } catch (ParseException e) {
            }

            Date endDate = new Date();
            //得到结束时间的时间戳
            Long endDateTime = endDate.getTime();
            maintainRecord.setEndTime(sdf.format(endDate));
            //计算工时
            double workingHourDouble = (endDateTime - startDateTime) * 1.0 / (60 * 60 * 1000);
            if (workingHourDouble > planedWorkingHour) {
                workingHourDouble = planedWorkingHour;
            }
            String workingHour = df.format(workingHourDouble);


            maintainRecord.setWorkingHour(workingHour);

        }
        //执行修改操作
        int updateMaintainRecordFlag = maintainService.updateMaintainRecordById(maintainRecord);
        // 根据维护配置id查询完成
        maintainRecord = maintainService.getMaintainRecordById(maintainRecord.getId());
        //维护记录修改成功且2为完成时间,则将维护配置修改为未分配
        if (updateMaintainRecordFlag > 0 && "2".equals(status)) {
            Maintain maintain = new Maintain();
            maintain.setId(maintainRecord.getMaintainId());
            maintain.setAssignmentStatus("0");
            maintain.setStartTime(sdf.format(new Date()));
            maintainService.updateMaintainById(maintain);
        }
        return Result.ok();
    }


    /**
     * 查询维护记录
     *
     * @param id
     * @return
     */
    @GetMapping("/getMaintainRecords")
    @ResponseBody
    public Result getMaintainRecords(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Integer id
    ) {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Map<String, Object> map = new HashMap<>();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }

        Integer employeeId = users.getEmployeeId();
        Integer departmentId = users.getDepartmentId();

        List<String> employeeIdList = new ArrayList<>();
        employeeIdList.add(employeeId.toString());
        List<Employee> rootList = employeeService.getEmployeeByManager(employeeId);

        List<Employee> empList = employeeService.getEmployeeByManager(0);

        ListUtils.getChildEmployeeId(rootList, empList, employeeIdList, null);

        if (employeeIdList.size() > 0) {
            map.put("employeeIdList", employeeIdList);
        }

        if (id != null) {
            map.put("id", id);
        }
        if (status != null) {
            map.put("status", status);
        }
        if (!subject.isPermitted("查询所有部门维护引导")) {
            map.put("departmentId", departmentId);
        }
        List<MaintainRecord> maintainRecordTotalList = maintainService.getMaintainRecordByMap(map);
        if (maintainRecordTotalList == null) {
            return Result.ok(1, new ArrayList<>());
        }
        List<MaintainRecord> maintainRecordPageList = null;
        if (page != null && limit != null) {
            maintainRecordPageList = maintainRecordTotalList.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
        }

        Map<Integer, String> usersMap = getUsersMap();
        if (maintainRecordPageList != null && maintainRecordPageList.size() > 0) {
            for (MaintainRecord maintainRecord : maintainRecordPageList) {
                String[] maintainRecordEmployeeIds = maintainRecord.getEmployeeId().split(",");
                String employeeNames = "";
                for (String maintainRecordEmployeeId : maintainRecordEmployeeIds) {
                    String employeeName = usersMap.get(Integer.valueOf(maintainRecordEmployeeId));
                    if (!StringUtils.isEmpty(employeeName)) {
                        employeeNames += employeeName + "、";
                    }
                }
                employeeNames = employeeNames.substring(0, employeeNames.length() - 1);
                maintainRecord.setEmployeeName(employeeNames);

            }

        }

        return Result.ok(maintainRecordTotalList.size(), maintainRecordPageList);
    }

    /**
     * 获取设备/系统
     *
     * @return
     */
    @GetMapping("/getEquipments")
    @ResponseBody
    public Result getEquMap(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String department
    ) {
        Map<String, Object> map = new HashMap<>();
        Subject subject = SecurityUtils.getSubject();
        Users user = (Users) subject.getPrincipal();
        if (user == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        if (subject.isPermitted("查询所有部门维护引导")) {
            map.put("department", department);

        } else {
            map.put("department", user.getDepartmentId());
        }

        if (!StringUtils.isEmpty(type)) {
            map.put("type", type);
        }
        if (!StringUtils.isEmpty(department)) {

        }
        List<Map<String, Object>> list = equipmentService.getEquMap1(map);
        list = list.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE)
                                .compare(o1.get("text") != null ? o1.get("text").toString() : "", o2.get("text") != null ? o2.get("text").toString() : "")
                )
        ).collect(Collectors.toList());
        return Result.ok(list.size(), list);
    }

}
