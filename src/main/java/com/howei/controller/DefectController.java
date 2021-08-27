package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.howei.pojo.*;
import com.howei.service.CompanyService;
import com.howei.service.DefectService;
import com.howei.service.EmployeeService;
import com.howei.service.EquipmentService;
import com.howei.util.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.Collator;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static com.howei.util.Image.ImageToBase64ByLocal;
import static org.apache.shiro.authz.annotation.Logical.AND;

/**
 * 缺陷
 */
@RestController
@RequestMapping("guide/defect")
@CrossOrigin
public class DefectController {

    @Autowired
    private DefectService defectService;

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    CompanyService companyService;

    public Users getPrincipal() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        return users;
    }

    /**
     * 跳转缺陷详单页面
     *
     * @return
     */
    @RequestMapping("/toDefectDetailed")
    public ModelAndView toDefectDetailed() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("defectDetailed");
        return modelAndView;
    }

    /**
     * 跳转缺陷数据页面
     *
     * @return
     */
    @RequestMapping("/toDefectData")
    public ModelAndView toDefectData() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("defectData");
        return modelAndView;
    }

    /**
     * 跳转缺陷单登记页面
     *
     * @return
     */
    @RequestMapping("/toDefect")
    public ModelAndView toDefect() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("defect");
        return modelAndView;
    }

    /**
     * 获取当前登录人信息
     *
     * @return
     */
    @RequestMapping("/getLoginUserInfo")
    public Map getLoginUserInfo() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Map<String, Object> map = new HashMap<>();
        if (users != null) {
            map.put("id", users.getEmployeeId());
            map.put("userName", users.getUserName());
            map.put("userNumber", users.getUserNumber());
            map.put("departmentId", users.getDepartmentId());
        }
        return map;
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
     * ------------------------------------------------缺陷单列表登记页面-----------------------------------------------------/
     * <p>
     * /**
     * 查询缺陷单列表
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/getDefectList", method = RequestMethod.GET)
    public Result getDefectList(HttpServletRequest request) throws ParseException {
        String type = request.getParameter("type");//缺陷状态
        String sysId = request.getParameter("sysId");//系统
        String equipmentId = request.getParameter("equipmentId");//设备
        String departmentId = request.getParameter("departmentId");//部门
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Subject subject = SecurityUtils.getSubject();
        //加载用户Map
        Map empMap = getUsersMap();

        Map map = new HashMap();
        if (!StringUtils.isEmpty(type) && !"0".equals(type)) {
            map.put("type", type);
        } else {
            map.put("type1", 4);
        }
        if (sysId != null && !"".equals(sysId) && !sysId.equals("-1")) {
            map.put("sysId", sysId);
        }
        if (equipmentId != null && !"".equals(equipmentId) && !equipmentId.equals("-1")) {
            map.put("equipmentId", equipmentId);
        }
        if (departmentId != null && !departmentId.equals("") && !departmentId.equals("-1")) {
            map.put("departmentId", departmentId);
        } else if (!subject.isPermitted("缺陷管理员")) {
            map.put("departmentId", users.getDepartmentId());
        }

        List<Defect> list = defectService.getDefectList(map);

        int count = list != null ? list.size() : 0;
        Iterator<Defect> iterator = list.iterator();
        while (iterator.hasNext()) {
            Defect defect = iterator.next();
            //获取执行人
            String[] strs = (defect.getEmpIds() != null && (!defect.getEmpIds().equals(""))) ? defect.getEmpIds().split(",") : null;
            if (strs != null) {
                String empIdsName = "";
                for (String str : strs) {
                    empIdsName += empMap.get(Integer.parseInt(str)) + ",";
                }
                empIdsName = empIdsName.equals("") || empIdsName == null ? "" : empIdsName.substring(0, empIdsName.length() - 1);
                defect.setEmpIdsName(empIdsName);
            }
            if (defect.getRealExecuteTime() == null) {
                String realETime = defect.getRealETime();//实际结束时间
                Double plannedWork = defect.getPlannedWork() == null ? 0.0 : defect.getPlannedWork();//计划完成时间
                String realSTime = defect.getRealSTime();//实际开始时间
                if (realETime != null && realSTime != null && !"".equals(realETime) && !"".equals(realSTime)) {
                    double diff2 = DateFormat.getBothNH(realSTime, realETime);
                    if (plannedWork <= diff2) {
                        defect.setRealExecuteTime(plannedWork);
                    } else {
                        defect.setRealExecuteTime(diff2);
                    }
                }
            }
        }
        return Result.ok(count, list);
    }

    @RequestMapping("/getPermission")
    public Result getPermission(String permissionName) {
        Subject subject = SecurityUtils.getSubject();
        boolean bool = subject.isPermitted(permissionName);
        if (bool) {
            return Result.ok();
        }
        return Result.fail(ResultEnum.NO_PERMISSION);
    }

    /**
     * 添加缺陷单
     *
     * @param defect
     * @return
     */
    @RequestMapping(value = "/addDefect", method = RequestMethod.POST)
    public Result addDefect(@RequestBody Defect defect) {
        Users users = this.getPrincipal();
        String dateStr = DateFormat.getYMDHMS(new Date());
        defect.setCreated(dateStr);
        defect.setCompany(1);
        defect.setType(1);//未认领
        defect.setYear(DateFormat.getYMD());
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);//用户验证过期
        }
        defect.setDepartmentId(users.getDepartmentId());
        defect.setCreatedBy(users.getEmployeeId());
        //获取部门首字母
        Company company = companyService.getCompanyById(users.getDepartmentId() + "");
        if (company == null || "".equals(company.getCodeName().trim())) {
            return Result.fail(ResultEnum.NO_DEPARTMENT_ID);//当前部门无编号
        }
        //根据来源设置系统及设备
        //1：defect项目创建
        //2：guide项目创建
        if (defect.getSourceType() == 2) {
            String sysName = defect.getSysName();//系统名称
            String equipName = defect.getEquipmentName();//设备名称

            Equipment equipment = equipmentService.getEquipmentByName(sysName, defect.getDepartmentId().toString());
            if (equipment != null) {
                defect.setSysId(equipment.getId());
            }
            equipment = equipmentService.getEquipmentByName(equipName, defect.getDepartmentId().toString());
            if (equipment != null) {
                defect.setEquipmentId(equipment.getId());
            }
        }

        Integer level = defect.getLevel();
        Double plannedHours = 96D;
        if (level == 0) {
            plannedHours = 4D;
        } else if (level == 1) {
            plannedHours = 12D;
        } else if (level == 2) {
            plannedHours = 24D;
        } else if (level == 3) {
            plannedHours = 48D;
        }
        defect.setPlannedHours(plannedHours);

        defect.setPartStartTime(dateStr);
        defect.setTotalStartTime(dateStr);

        int result = defectService.addDefect(defect);
        //设置缺陷单编号
        if (result >= 0) {
            int count = defectService.getDefectCountByDep(users.getDepartmentId());
            count += 1;
            if (company.getId() == 19) {//浦江项目部从819开始
                count = 819 + count;
            }
            DecimalFormat df = new DecimalFormat("0000");
            defect.setNumber(company.getCodeName() + df.format(count));
            defectService.updDefect(defect);
            return Result.ok();
        }
        return Result.fail(ResultEnum.FAIL);
    }

    /**
     * 修改:消缺反馈
     *
     * @param defect
     * @return
     */
    @RequestMapping(value = "/updDefect", method = RequestMethod.PUT)
    public synchronized Result updDefect(@RequestBody Defect defect) throws ParseException {
        Integer id = defect.getId();
        Integer type = defect.getType();
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);//用户验证过期,重新登录
        }
        if (id != null) {
            if (type == 1) {//未认领状态
                if (defect.getCreatedBy() == users.getEmployeeId()) {
                    defectService.updDefect(defect);
                    return Result.ok();
                }
                return Result.fail(ResultEnum.NO_PERMISSION);//无权限
            } else if (type.equals(2)) {      //'消缺中'状态修改为'已完成'状态
                Defect defect1 = defectService.getDefectById(id);
                if (defect1 != null) {
                    if (defect1.getIsStarted() != 0) {
                        return Result.fail(ResultEnum.DEFECT_NOT_STARTED);
                    }
                    //判断当前登录人是否有权限修改这条记录
                    if (String.valueOf(defect1.getEmpIds()).indexOf(String.valueOf(users.getEmployeeId())) < 0) {
                        return Result.fail(ResultEnum.NO_PERMISSION);
                    }
                }
//                //判断记录是否被修改，驳回
//                if (defect1.getRealETime() != null && !defect1.getRealETime().trim().equals("")) {
//                    return Result.fail(ResultEnum.REJECT);
//                }

                defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
                defect.setPartPauseSeconds(0D);
                defect.setType(7);//已消缺
                defect.setCompleter(users.getEmployeeId());
                String realETime = DateFormat.getYMDHMS(new Date());//实际结束时间
                defect.setRealETime(realETime);

                Double plannedWork = defect.getPlannedWork();//计划工时
                String realSTime = defect.getRealSTime();//实际开始时间
                Double diff2 = DateFormat.getBothNH(realSTime, realETime);
                if (plannedWork <= diff2) {
                    defect.setRealExecuteTime(plannedWork);
                    BigDecimal bd = new BigDecimal(diff2 - plannedWork);
                    defect.setOvertime(bd.setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue());
                } else {
                    BigDecimal bd = new BigDecimal(diff2);
                    defect.setRealExecuteTime(bd.setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue());
                    defect.setOvertime(0D);
                }
                defectService.updDefect(defect);
                return Result.ok();
            }
        }
        return Result.fail();
    }

    /**
     * 开始执行
     *
     * @param id          缺陷编号
     * @param type        类型,6表示延期
     * @param delayETime
     * @param delayReason
     * @return
     */
    @RequestMapping(value = "/startExecution", method = RequestMethod.PUT)
    public synchronized Result startExecution(Integer id, String type, String delayETime, Integer delayReason) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("empId", users.getEmployeeId());
        map.put("type", 2);
        List<Defect> defectList = defectService.getDefectList(map);
        if (defectList.size() >= 2) {
            return Result.fail(ResultEnum.DEFECT_TWO_START_EXECUTING);
        }
        if (id != null) {
            return Result.fail(ResultEnum.NO_PARAMETERS);
        }

        Defect defect = defectService.getDefectById(id);
        if (defect != null) {
            if (defect.getIsStarted() != 0) {
                return Result.fail(ResultEnum.DEFECT_NOT_STARTED);
            }
            if (type != null && type.equals("6")) {
                if (String.valueOf(defect.getEmpIds()).indexOf(String.valueOf(users.getEmployeeId())) > -1) {
                    defect.setType(6);//延期中
                    defect.setDelaySTime(DateFormat.getYMDHMS(new Date()));//延期开始时间
                    defect.setDelayETime(delayETime);//延期结束时间
                    defect.setDelayReason(delayReason);//延期理由
                    defectService.updDefect(defect);
                    return Result.ok();
                } else {
                    return Result.fail(ResultEnum.NO_PERMISSION);
                }
            } else {
                if (String.valueOf(defect.getEmpIds()).indexOf(String.valueOf(users.getEmployeeId())) > -1) {
                    defect.setType(2);//消缺中
                    defect.setRealSTime(DateFormat.getYMDHMS(new Date()));
                    defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
                    defect.setPartPauseSeconds(0D);
                    defectService.updDefect(defect);
                    return Result.ok();
                } else {
                    return Result.fail(ResultEnum.NO_PERMISSION);
                }
            }
        }
        return Result.fail();
    }

    /**
     * 把图片保存到服务器
     *
     * @param file
     * @return
     * @throws IOException
     */
    @RequestMapping("imgUpload")
    public synchronized JsonResult imgUpload(@RequestParam("file") MultipartFile file) throws IOException {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMessage(ImgUploadUtil.upload(file, "/home/defect/img/"));
        return jsonResult;
    }

    /**
     * 缺陷单的认领或者延期(type=6时)(权限:班长)
     *
     * @param type        type=6表示延期
     * @param delayETime  延期结束时间
     * @param delayReason 延期原因 1
     * @param empIds      分配的执行人员
     * @param id          缺陷单Id
     * @param plannedWork 计划工时
     * @return
     */
    @RequestMapping("claim")
    public synchronized Result claim(String empIds, Integer id, Double plannedWork, String type, String delayETime, Integer delayReason) {
        Subject subject = SecurityUtils.getSubject();
        if (!subject.isPermitted("缺陷检修班长")) {
            return Result.fail(ResultEnum.NO_PERMISSION);//无权限
        }
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Defect defect = defectService.getDefectById(id);

        if (defect.getIsStarted() != 0) {
            return Result.fail(ResultEnum.DEFECT_NOT_STARTED);
        }
        //type=6
        if (type != null && type.equals("6")) {
            defect.setType(6);//延期中
            defect.setDelayBy(users.getEmployeeId());//申请延期人
            defect.setDelaySTime(DateFormat.getYMDHMS(new Date()));//延期开始时间
            defect.setDelayETime(delayETime);//延期结束时间
            defect.setDelayReason(delayReason);//延期理由
            defect.setRealETime("");//实际检修结束时间
            defect.setRealSTime("");//实际检修开始时间
            defect.setEmpIds("");//执行人员
            //设置认领数据为空
        } else {
            if (empIds != null) {
                defect.setEmpIds(empIds);
                defect.setPlannedWork(plannedWork);//计划工时
                defect.setOrderReceivingTime(DateFormat.getYMDHMS(new Date()));//接单时间
                defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
                defect.setPartPauseSeconds(0D);
                defect.setType(5);//已认领
                //设置延期为空
                defect.setDelayBy(users.getEmployeeId());//申请延期人
                defect.setClaimant(users.getEmployeeId());
            } else {
                JSON.toJSONString(Type.FORMAT);//格式错误
            }
        }
        defectService.updDefect(defect);
        return Result.ok();
    }

    /**
     * 值班确认
     *
     * @param id
     * @param result 2驳回,1确认,
     * @return
     */
    @RequestMapping(value = "/dutyConfirmation", method = RequestMethod.PUT)
    public Result dutyConfirmation(Integer id, Integer result) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }

        if (id != null) {
            Defect defect = defectService.getDefectById(id);
            if (defect != null) {
                if (defect.getIsStarted() != 0) {
                    return Result.fail(ResultEnum.DEFECT_NOT_STARTED);
                }
                //驳回
                if (result == 2) {
                    defect.setType(1);//未认领
                    defect.setEmpIds("");
                    defect.setOrderReceivingTime("");
                    defect.setPlanedTime("");
                    defect.setRealSTime("");
                    defect.setRealETime("");
                    defect.setRealExecuteTime(0.0);
                    defect.setPlannedWork(0.0);
                    defect.setMethod("");
                    defect.setProblem("");
                    defect.setRemark("");
                    defect.setaPlc("");
                    defect.setTotalStartTime(DateFormat.getYMDHMS(new Date()));
                    defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
                    defect.setTotalPauseSeconds(0D);
                    defect.setPartPauseSeconds(0D);
                } else if (result == 1) {
//                    if (defect.getConfirmer1Time() != null) {
//                        return Result.fail(ResultEnum.REJECT);//已完成不可再确认
//                    }
                    defect.setType(4);//已完成
                    defect.setConfirmer1(users.getEmployeeId());
                    defect.setConfirmer1Time(DateFormat.getYMDHMS(new Date()));
                    defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
                    defect.setPartPauseSeconds(0D);
                    defect.setCountdownDelayTimes(0);
                    defect.setPlannedHoursPart1(2D);
                    defect.setPlannedHoursPart5(4D);
                    defect.setPlannedHoursPart2(4D);
                    defect.setPlannedHoursPart3(4D);
                    defect.setPlannedHoursPart7(2D);
                    Integer level = defect.getLevel();
                    Double plannedHours = 96D;
                    if (level == 0) {
                        plannedHours = 4D;
                    } else if (level == 1) {
                        plannedHours = 12D;
                    } else if (level == 2) {
                        plannedHours = 24D;
                    } else if (level == 3) {
                        plannedHours = 48D;
                    }
                    defect.setPlannedHours(plannedHours);
                }
                defectService.updDefect(defect);
                return Result.ok();
            }
        }
        return Result.fail();
    }

    /**---------------------------------------------------- 下拉框 ----------------------------------------------*/

    /**
     * 获取设备/系统
     *
     * @param request
     * @return
     */
    @RequestMapping("/getEquMap")
    public List<Map<String, Object>> getEquMap(HttpServletRequest request) {
        String type = request.getParameter("type");
        Users users = this.getPrincipal();
        Subject subject = SecurityUtils.getSubject();

        Map souMap = new HashMap();
        if (!subject.isPermitted("缺陷管理员")) {
            if (users != null) {
                int departmentId = users.getDepartmentId();
                departmentId = (departmentId == 21 || departmentId == 22) ? 20 : departmentId;
                souMap.put("department", departmentId);
            }
        }
        souMap.put("type", type);
        List<Map<String, Object>> list = equipmentService.getEquMap1(souMap);
        list = list.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE).compare(o1.get("text") != null ? o1.get("text").toString() : "", o2.get("text") != null ? o2.get("text").toString() : "")
                )
        ).collect(Collectors.toList());
        return list;
    }

    /**
     * 人员下拉框
     *
     * @return
     */
    @RequestMapping("/getEmpMap")
    public Object getEmpMap() {
        Users users = this.getPrincipal();
        //用户信息过期
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }

        String empIdStr = "";
        Integer logUserEmployeeId = users.getEmployeeId();
        List<String> employeeIdList = new ArrayList<>();
        employeeIdList.add(logUserEmployeeId.toString());
        List<Employee> rootList = employeeService.getEmployeeByManager(logUserEmployeeId);
        List<Employee> empList = employeeService.getEmployeeByManager(0);
        ListUtils.getChildEmployeeId(rootList, empList, employeeIdList, null);
        if (employeeIdList.size() > 0) {
            for (String employeeId : employeeIdList) {
                empIdStr += employeeId + ",";
            }
        }
        if (empIdStr != null && !empIdStr.equals("")) {
            empIdStr = empIdStr.substring(0, empIdStr.lastIndexOf(","));
        }
        Map map = new HashMap();
        map.put("empId", empIdStr);
        List<Map<String, Object>> list = employeeService.getEmpMap(map);
        list = list.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE).compare(o1.get("text") != null ? o1.get("text").toString() : "", o2.get("text") != null ? o2.get("text").toString() : "")
                )
        ).collect(Collectors.toList());
        return list;
    }


    /**
     * 部门下拉框
     *
     * @return
     */
    @RequestMapping("/getDepMap")
    public List<Map<String, String>> getDepMap() {
        Subject subject = SecurityUtils.getSubject();
        List<Map<String, String>> list = new ArrayList<>();
        if (subject.isPermitted("缺陷管理员")) {
            list = companyService.getDepartmentList("1");
        }
        return list;
    }


    /**
     * 根据设备获取历史缺陷
     *
     * @param sysId
     * @param euqipmentId
     * @return
     */
    @RequestMapping("/getDefectHistiryByEqu")
    public List<Map<String, String>> getDefectHistiryByEqu(Integer sysId, Integer euqipmentId) {
        Users users = this.getPrincipal();
        Subject subject = SecurityUtils.getSubject();
        List<Map<String, String>> result = new ArrayList<>();
        if (sysId == -1 && euqipmentId == -1) {
            return null;
        }
        if (users == null) {
            Map<String, String> map = new HashMap<>();
            map.put("msg", "noUser");
            result.add(map);
            return result;
        }
        Map map = new HashMap();
        map.put("equipmentId", euqipmentId);
        map.put("sysId", sysId);
        if (!subject.isPermitted("缺陷管理员")) {
            map.put("departmentId", users.getDepartmentId());
        }
        result = defectService.getDefectHistiryByEqu(map);
        return result;
    }

    /**
     * 获取缺陷
     *
     * @param id
     * @return
     */
    @RequestMapping("/getDefectById")
    public Result getDefectById(Integer id) {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        if (id != null) {
            Defect defect = defectService.getDefectById(id);
            //加载用户Map
            Map empMap = getUsersMap();
            String[] strs = (defect.getEmpIds() != null && (!defect.getEmpIds().equals(""))) ? defect.getEmpIds().split(",") : null;
            if (strs != null) {
                String empIdsName = "";
                for (String str : strs) {
                    empIdsName += empMap.get(Integer.parseInt(str)) + ",";
                }
                empIdsName = empIdsName.equals("") || empIdsName == null ? "" : empIdsName.substring(0, empIdsName.length() - 1);
                defect.setEmpIdsName(empIdsName);
            }
            if (defect.getaPlc() != null) {
                String aPlc64 = ImageToBase64ByLocal("/home/defect/img/" + defect.getaPlc());
                if (aPlc64.equals("")) {
                    defect.setaPlc64("");
                } else {
                    defect.setaPlc64(aPlc64);
                }
            }
            if (defect.getbPlc() != null) {
                String bPlc64 = ImageToBase64ByLocal("/home/defect/img/" + defect.getbPlc());
                if (bPlc64.equals("")) {
                    defect.setbPlc64("");
                } else {
                    defect.setbPlc64(bPlc64);
                }
            }
            return Result.ok(1, defect);
        }
        return null;
    }

    /**------------------------------------------------------缺陷详情KPI（缺陷数据页面）--------------------------------------------------------*/

    /**
     * 查询指定月份缺陷数据
     *
     * @throws ParseException
     */
    @RequestMapping(value = "/getDefectDataList", method = RequestMethod.GET)
    public Result getDefectDataList(String month, Integer departmentId) throws ParseException {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        //加载用户Map
        Map empMap = getUsersMap();

        Map map = new HashMap();
        map.put("type", 4);//查询已完成缺陷数据
        if (departmentId != null && !departmentId.equals("") && !departmentId.equals("-1")) {
            map.put("departmentId", departmentId);
        }
        if (month != null && !month.equals("")) {
            month = month + "-01";
            map.put("month", month);
        }
        List<Defect> list = defectService.getDefectList(map);
        Iterator<Defect> iterator = list.iterator();
        while (iterator.hasNext()) {
            Defect defect = iterator.next();
            //获取执行人
            String[] strs = (defect.getEmpIds() != null && (!defect.getEmpIds().equals(""))) ? defect.getEmpIds().split(",") : null;
            if (strs != null) {
                String empIdsName = "";
                for (String str : strs) {
                    empIdsName += empMap.get(Integer.parseInt(str)) + ",";
                }
                empIdsName = empIdsName.equals("") || empIdsName == null ? "" : empIdsName.substring(0, empIdsName.length() - 1);
                defect.setEmpIdsName(empIdsName);
            }
        }
        return Result.ok(list.size(), list);
    }


    /**
     * 删除缺陷
     *
     * @param id
     * @return
     */
    @GetMapping("/delete")
    public Result deleteDefect(@RequestParam Integer id) {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        defectService.deleteById(id);
        return Result.ok();
    }


    /**
     * 工时确认
     *
     * @param id            缺陷编号
     * @param confirmResult 0审核通过,1审核不通过
     * @return
     */
    @PostMapping("/postWorkTimeConfirm")
    public Result assigmentConfirm(
            @RequestParam Integer id,
            @RequestParam Integer confirmResult,
            @RequestParam(required = false) String realExecuteTime,
            @RequestParam(required = false) String overtime
    ) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Defect defect = defectService.getDefectById(id);
        if (defect.getIsStarted() != 0) {
            return Result.fail(ResultEnum.DEFECT_NOT_STARTED);
        }
        if (confirmResult == 0) {
            defect.setType(3);
            if (realExecuteTime != null && !"".equals(realExecuteTime.trim())) {
                defect.setRealExecuteTime(Double.valueOf(realExecuteTime));
            }
            if (overtime != null && !"".equals(overtime.trim())) {
                defect.setOvertime(Double.valueOf(overtime));
            }
            defect.setWorkTimeConfirmTime(DateFormat.getYMDHMS(new Date()));
            defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
            defect.setPartPauseSeconds(0D);
        } else {
            defect.setType(1);
            defect.setRealETime("");
            defect.setTotalStartTime(DateFormat.getYMDHMS(new Date()));
            defect.setPartStartTime(DateFormat.getYMDHMS(new Date()));
            defect.setTotalPauseSeconds(0D);
            defect.setPartPauseSeconds(0D);
            defect.setCountdownDelayTimes(0);
            defect.setPlannedHoursPart1(2D);
            defect.setPlannedHoursPart5(4D);
            defect.setPlannedHoursPart2(4D);
            defect.setPlannedHoursPart3(4D);
            defect.setPlannedHoursPart7(2D);
            Integer level = defect.getLevel();
            Double plannedHours = 96D;
            if (level == 0) {
                plannedHours = 4D;
            } else if (level == 1) {
                plannedHours = 12D;
            } else if (level == 2) {
                plannedHours = 24D;
            } else if (level == 3) {
                plannedHours = 48D;
            }
            defect.setPlannedHours(plannedHours);
        }
        defectService.updDefect(defect);

        return Result.ok();
    }

    /**
     * 超时类型
     *
     * @param id
     * @param type
     * @return
     */
    @GetMapping("/updateTimeoutType")
    public Result updateTimeoutType(
            @RequestParam Integer id,
            @RequestParam String type
    ) {

        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Defect defect = defectService.getDefectById(id);
        Integer defectType = defect.getType();
        if ("A".equals(type) && defectType != 1) {
            return Result.fail(ResultEnum.DEFECT_NO_CLAIM_TIMEOUT);
        }
        if ("B".equals(type) && defectType != 5) {
            return Result.fail(ResultEnum.DEFECT_NO_START_TIMEOUT);
        }
        if ("C".equals(type) && defectType != 2) {
            return Result.fail(ResultEnum.DEFECT_NO_FEEDBACK_TIMEOUT);
        }
        if ("D".equals(type) && defectType != 3) {
            return Result.fail(ResultEnum.DEFECT_NO_CHECK_TIMEOUT);
        }
        if ("E".equals(type) && defectType != 7) {
            return Result.fail(ResultEnum.DEFECT_NO_END_TIMEOUT);
        }
        if ("Z".equals(type) && defectType == 6) {
            return Result.fail(ResultEnum.DEFECT_NO_HANDLE_TIMEOUT);
        }
        String timeoutType = defect.getTimeoutType();
        if (timeoutType == null) {
            timeoutType = type;
        } else if (timeoutType != null && !timeoutType.contains(type)) {
            timeoutType += type;
        }
        defect.setTimeoutType(timeoutType);
        defectService.updDefect(defect);
        return Result.ok();
    }

    /**
     * 开始或者暂停,延时功能
     * type为0时,设置该缺陷开始倒计时或者停止倒计时
     * type为1时,设置该缺陷加时次数,第一次加时1小时,第二次加时0.5小时,第三次加时0.25分钟
     *
     * @param id        缺陷id,
     * @param paramType 修改的类型,0设置开始或者暂停,1设置延期
     * @return
     */
    @GetMapping("/updateStartedOrDelay")
    public Result startPauseCountDown(
            @RequestParam Integer id,
            @RequestParam Integer paramType
    ) {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String msg;
        Defect defect = defectService.getDefectById(id);
        Date date = new Date();
        if (paramType == 0) {
            Integer isStarted = defect.getIsStarted();
            if (isStarted == 0) {
                isStarted = 1;
                msg = "缺陷暂停成功";
                String formatDate = sdf.format(date);
                defect.setPauseTime(formatDate);
            } else {
                isStarted = 0;
                String pauseTime = defect.getPauseTime();
                Date parsePauseTime;
                BigDecimal bd = new BigDecimal(0);
                try {
                    parsePauseTime = sdf.parse(pauseTime);
                    bd = new BigDecimal((date.getTime() - parsePauseTime.getTime()) / 1000);
                } catch (ParseException e) {
                }
                Double pauseSeconds = bd.setScale(0, BigDecimal.ROUND_HALF_UP).doubleValue();
                defect.setTotalPauseSeconds(pauseSeconds + defect.getTotalPauseSeconds());
                defect.setPartPauseSeconds(pauseSeconds + defect.getPartPauseSeconds());
                msg = "缺陷开始成功";
            }
            defect.setIsStarted(isStarted);
            defectService.updDefect(defect);
            return Result.ok(msg);
        } else {
            double additionalTime = 0;
            Integer times = defect.getCountdownDelayTimes();

            if (times == 0) {
                additionalTime = 1;
            } else if (times == 1) {
                additionalTime = 0.5;
            } else if (times == 2) {
                additionalTime = 0.25;
            } else {
                return Result.fail("已增加过3次时间,无法继续延时");
            }
            Integer type = defect.getType();
            if (type == 1) {
                defect.setPlannedHoursPart1(defect.getPlannedHoursPart1() + additionalTime);
            } else if (type == 5) {
                defect.setPlannedHoursPart5(defect.getPlannedHoursPart5() + additionalTime);
            } else if (type == 2) {
                defect.setPlannedHoursPart2(defect.getPlannedHoursPart2() + additionalTime);
            } else if (type == 3) {
                defect.setPlannedHoursPart3(defect.getPlannedHoursPart3() + additionalTime);
            } else if (type == 7) {
                defect.setPlannedHoursPart7(defect.getPlannedHoursPart7() + additionalTime);
            }
            defect.setPlannedHours(defect.getPlannedHours() + additionalTime);
            defect.setCountdownDelayTimes(times + 1);
            defectService.updDefect(defect);
            return Result.ok("加时成功,第" + (times + 1) + "次加时,增加" + additionalTime + "小时");
        }
    }

}
