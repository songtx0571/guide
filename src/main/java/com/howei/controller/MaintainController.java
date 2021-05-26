package com.howei.controller;

import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.Result;
import org.apache.jasper.security.SecurityUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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


    /**
     * 保存维护配置
     *
     * @param maintain
     * @return
     */
    @PostMapping("/saveMaintain")
    @ResponseBody
    public String saveMaintain(@RequestBody Maintain maintain) {

        Users user = (Users) SecurityUtils.getSubject().getPrincipal();
        if (user == null) {
            return "用户失效,请重新登陆";
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
        System.out.println("id::" + id);
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
        return "SUCCESS";
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
            @RequestParam(required = false) Integer limit
    ) {
        Result result = new Result();
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            result.setMsg("用户失效");
            return result;
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
        result.setCount(maintains.size());

        if (page != null && limit != null) {
            maintains = maintains.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
        }

        result.setCode(0);
        result.setData(maintains);
        result.setMsg("成功");
        return result;
    }

    /**
     * 删除维护配置
     *
     * @param id
     * @return
     */
    @DeleteMapping("/deleteMaintain")
    @ResponseBody
    public String deleteMaintain(@RequestParam Integer id) {
        int count = maintainService.deleteMaintainById(id);
        String result = "SUCCESS";
        if (count < 0) {
            result = "False";
        }
        return result;
    }


    @PostMapping("/insertMaintainRecord")
    @ResponseBody
    public String insertMaintainRecord(@RequestBody MaintainRecord maintainRecord) {
        Integer maintainId = maintainRecord.getMaintainId();
        Maintain maintain = maintainService.getMaintainById(maintainId);
        String assignmentStatus = maintain.getAssignmentStatus();
        if ("1".equals(assignmentStatus)) {
            return "DISTRIBUTED";
        } else if ("2".equals(assignmentStatus)) {
            return "STOPED";
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

        //插入记录
        int insertMaintainRecordFlag = maintainService.insertMaintainRecord(maintainRecord);
        //插入成功则修改维护配置状态为已分配
        if (insertMaintainRecordFlag >= 0) {
            maintain.setUpdateTime(date);
            maintain.setAssignmentStatus("1");
            maintainService.updateMaintainById(maintain);
        }
        return "SUCCESS";
    }

    /**
     * 保存维护记录
     *
     * @param maintainRecord
     * @return
     */
    @PostMapping("/updateMaintainRecord")
    @ResponseBody
    public String updateMaintainRecord(@RequestBody MaintainRecord maintainRecord) {
        Users user = (Users) SecurityUtils.getSubject().getPrincipal();
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
        return "SUCCESS";
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
        Result result = new Result();
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Map<String, Object> map = new HashMap<>();
        if (users == null) {
            result.setMsg("用户失效");
            return result;
        }

        Integer employeeId = users.getEmployeeId();
        Integer departmentId = users.getDepartmentId();

        List<String> employeeIdList = new ArrayList<>();
        if (employeeId != null) {
            employeeIdList.add(users.getEmployeeId() + "");
            List<Employee> rootList = employeeService.getEmployeeByManager(employeeId);
            if (rootList != null) {
                List<Employee> empList = employeeService.getEmployeeByManager(0);
                for (Employee employee : rootList) {
                    employeeIdList.add(String.valueOf(employee.getId()));
                    String[] employeeIds = getUsersId(employee.getId(), empList).split(",");
                    List<String> newEmployeeIdList = Arrays.asList(employeeIds);
                    if (newEmployeeIdList.size() > 0) {
                        employeeIdList.addAll(newEmployeeIdList);
                    }
                }
            }
        }
        if (employeeIdList.size() > 0) {
            map.put("employeeIdList", employeeIdList);
        }

        if (id != null) {
            map.put("id", id);
        }
        if (status != null) {
            map.put("status", status);
        }
        if(departmentId!=null){
            map.put("departmentId",departmentId);
        }
        List<MaintainRecord> maintainRecords = maintainService.getMaintainRecordByMap(map);
        if (maintainRecords.size() > 0) {

            for (MaintainRecord maintainRecord : maintainRecords) {
                String[] maintainRecordEmployeeIds = maintainRecord.getEmployeeId().split(",");
                String employeeNames = "";
                for (String maintainRecordEmployeeId : maintainRecordEmployeeIds) {
                    Users userByEmpId = userService.findByEmpId(maintainRecordEmployeeId);
                    if (userByEmpId != null) {
                        employeeNames += userByEmpId.getUserName() + "、";
                    }
                }
                employeeNames = employeeNames.substring(0, employeeNames.length() - 1);
                maintainRecord.setEmployeeName(employeeNames);

            }

        }

        result.setCode(0);
        result.setCount(maintainRecords.size());


        if (page != null && limit != null) {
            maintainRecords = maintainRecords.stream().skip((page - 1) * limit).limit(limit).collect(Collectors.toList());
        }

        result.setData(maintainRecords);
        result.setMsg("成功");
        return result;
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
        Result result = new Result();
        Map<String, Object> map = new HashMap<>();
        Subject subject = SecurityUtils.getSubject();
        Users user = (Users) subject.getPrincipal();
        if (user == null) {
            result.setCode(500);
            result.setMsg("用户失效");
            return result;
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
        result.setData(list);
        result.setCount(list.size());
        result.setCode(0);
        return result;
    }


    /**
     * 查询员工业绩:所有被绩效管理的员工
     *
     * @param empId
     * @param empList
     * @return
     */
    public String getUsersId(Integer empId, List<Employee> empList) {
        List<String> result = new ArrayList<>();
        String userId = "";
        String usersId = "";
        for (Employee employee : empList) {
            if (employee.getManager() != null || employee.getManager() != 0) {
                if (employee.getManager().equals(empId)) {
                    usersId += employee.getId() + ",";
                    result.add(employee.getId() + "");
                }
            }
        }
        for (String str : result) {
            String userId1 = getUsersId(Integer.parseInt(str), empList);
            if (userId1 != null && !userId1.equals("")) {
                userId += userId1;
            }
        }
        if (userId != null && !userId.equals("null")) {
            usersId += userId;
        }
        return usersId;
    }
}
