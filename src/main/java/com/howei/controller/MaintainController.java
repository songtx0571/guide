package com.howei.controller;

import com.howei.pojo.*;
import com.howei.service.CompanyService;
import com.howei.service.MaintainService;
import com.howei.service.UserService;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    CompanyService companyService;


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
        int departmentId = user.getDepartmentId();
        int employeeId = user.getEmployeeId();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Integer id = maintain.getId();
        Date date = new Date();
        System.out.println("id::" + id);
        if (StringUtils.isEmpty(id)) {
            maintain.setCompanyId(companyId);
            maintain.setDepartmentId(departmentId);
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
    @GetMapping("/getMaintains")
    @ResponseBody
    public Result getMaintainList(
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer id
    ) {
        Result result = new Result();
        Map<String, Object> map = new HashMap<>();
        if (departmentId != null) {
            map.put("departmentId", departmentId);
        }
        if (id != null) {
            map.put("id", id);
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Maintain> maintains = maintainService.getMaintainByMap(map);
        result.setCode(0);
        result.setCount(maintains.size());
        System.out.println(maintains);
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
        if (!assignmentStatus.equals("0")) {
            return "DISTRIBUTED";
        }
        Date date = new Date();
        //更新时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Integer employeeId = maintainRecord.getEmployeeId();
        Users userByEmpId = userService.findByEmpId(employeeId.toString());
        int departmentId = userByEmpId.getDepartmentId();
        maintainRecord.setDepartmentId(departmentId);
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
            String workingHour = df.format(((endDateTime - startDateTime) * 1.0 / (60 * 60 * 1000)));
            maintainRecord.setWorkingHour(workingHour);

            //设置维护编号
            Integer departmentId = maintainRecord1.getDepartmentId();
            Map<String, Object> map = new HashMap<>();
            map.put("departmentId", departmentId);
            map.put("status", 2);
            List<MaintainRecord> maintainRecordByMap = maintainService.getMaintainRecordByMap(map);
            Integer count = 0;
            if (maintainRecordByMap != null) {
                count = maintainRecordByMap.size() + 1;
            }
            Company company = companyService.getCompanyById(departmentId.toString());
            df = new DecimalFormat("00000");
            String maintainRecoreNo = company.getCodeName() + "W" + df.format(count);
            maintainRecord.setMaintainRecordNo(maintainRecoreNo);
        }
        //执行修改操作
        int updateMaintainRecordFlag = maintainService.updateMaintainRecordById(maintainRecord);
        // 根据维护配置id查询完成
        maintainRecord = maintainService.getMaintainRecordById(maintainRecord.getId());
        //维护记录修改成功且2为完成时间,则将维护配置修改为未分配
        if (updateMaintainRecordFlag > 0 && "2".equals(status)) {
            Maintain maintain = new Maintain();
            System.out.println(maintainRecord.getMaintainId());
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
     * @param departmentId
     * @param id
     * @return
     */
    @GetMapping("/getMaintainRecords")
    @ResponseBody
    public Result getMaintainRecords(
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer employeeId,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Integer id
    ) {
        Result result = new Result();

        Map<String, Object> map = new HashMap<>();
        if (departmentId != null) {
            map.put("departmentId", departmentId);
        }
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if(users==null){
            result.setMsg("用户失效");
            return result;
        }
        employeeId = users.getEmployeeId();


        if (employeeId != null) {
            map.put("employeeId", employeeId);
        }
        if (id != null) {
            map.put("id", id);
        }
        if (status != null) {
            map.put("status", status);
        }
        List<MaintainRecord> maintainRecords = maintainService.getMaintainRecordByMap(map);
        result.setCode(0);
        result.setCount(maintainRecords.size());
        result.setData(maintainRecords);
        result.setMsg("成功");
        return result;
    }

}