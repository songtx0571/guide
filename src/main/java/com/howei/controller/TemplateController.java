package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.*;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.Collator;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@CrossOrigin
@RequestMapping("/guide/template")
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

    @Autowired
    DataConfigurationService dataConfigurationService;

    @Autowired
    AiConfigurationDataService aiConfigurationDataService;


    /**
     * 跳转路线规划页面
     *
     * @return
     */
    @RequestMapping("/toTemplateChild")
    public ModelAndView toTemplateChild(@Param("temid") String temid) {
        ModelAndView model = new ModelAndView();
        model.setViewName("templateChild");
        model.addObject("temid", temid);
        return model;
    }

    /**
     * 获取当前用户登录信息
     *
     * @return
     */
    public Users getPrincipal() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        return users;
    }

    /**
     * 查询
     *
     * @return
     */
    @RequestMapping("/getTemplate")
    @ResponseBody
    public Result getTemplate(HttpServletRequest request) {
        Users users = this.getPrincipal();
        String page = request.getParameter("page");
        String limit = request.getParameter("limit");
        String department = request.getParameter("department");
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("userId", users.getId());
        if (department != null && !"0".equals(department)) {
            map.put("department", department);
        }
        List<WorkPerator> workPeratorList = workPeratorService.selByUser(map);
        if (workPeratorList == null || workPeratorList.size() == 0) {
            return Result.ok(0, new ArrayList<>());
        }
        int listCount = workPeratorList.size();
        if (!StringUtils.isEmpty(page) && !StringUtils.isEmpty(limit)) {
            workPeratorList = workPeratorList.stream().skip((Integer.valueOf(page) - 1) * Integer.valueOf(limit)).limit(Integer.valueOf(limit)).collect(Collectors.toList());
        }
        Map<String, Object> companyMap = companyService.getCompanysMap(1);
        for (WorkPerator work : workPeratorList) {
            String deptId = work.getProjectDepartment();//项目
            work.setDepartmentName(String.valueOf(companyMap.get(deptId)));
            int id = work.getId();
            map.clear();
            map.put("page", 0);
            map.put("pageSize", 1000);
            map.put("parent", id);
            List<WorkPerator> workPeratorChildlist = workPeratorService.getTemplateChildList(map);
            Long artificialNumberCount = 0L;
            Long AiNumber = 0L;
            if (workPeratorChildlist != null) {
                artificialNumberCount = workPeratorChildlist.stream().filter((item) -> item.getDataType() == 1).count();
                AiNumber = workPeratorChildlist.size() - artificialNumberCount;
            }
            work.setArtificialNumber(artificialNumberCount.intValue());
            work.setAiNumber(AiNumber.intValue());
        }
        System.out.println(workPeratorList.size());
        return Result.ok(listCount, workPeratorList);
    }

    /**
     * 添加模板配置
     *
     * @return
     */
    @RequestMapping("/addWorkPerator")
    @ResponseBody
    public Result addWorkPerator(HttpServletRequest request) {
        Users users = this.getPrincipal();//当前登陆人id
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String workId = request.getParameter("workId");//模板id
        String planTime = request.getParameter("planTime");//计划时间
        String patrolTask = request.getParameter("patrolTask");
        String department = request.getParameter("department");//部门
        String cycle = request.getParameter("cycle");//周期
        Map map = new HashMap();
        map.put("patrolTask", patrolTask);
        map.put("projectDepartment", department);
        //根据任务名称查
        /*List<WorkPerator> workPeratorList = workPeratorService.selByMap(map);
        //如果存在同名,则返回失败
        if (workPeratorList != null && workPeratorList.size() > 0) {
            return Result.fail(ResultEnum.WORKPERATOR_HAVE_SAME_RECORD);
        }*/
        //id存在则是修改,没有则是添加
        if (workId != null && !workId.equals("")) {
            WorkPerator workPerator = workPeratorService.selWorkperator(workId);
            if (workPerator != null) {
                if (planTime != null) {
                    workPerator.setPlanTime(planTime);
                }
                if (cycle != null) {
                    workPerator.setCycle(cycle);
                }
                if (patrolTask != null) {
                    workPerator.setPatrolTask(patrolTask);
                }
            }
            workPeratorService.updWorkperator(workPerator);
        } else {
            Date now = new Date();
            String created = DateFormat.getYMDHMS(now);
            WorkPerator work = new WorkPerator();
            if (users != null) {
                work.setUserId(users.getId());
                work.setCreatedBy(users.getId());
            }
            work.setAiNumber(0);
            work.setCreated(created);
            work.setCycle(cycle);
            work.setParent(0);
            work.setStatus(2);//暂停状态
            work.setPatrolTask(patrolTask);
            work.setPlanTime(planTime);
            work.setProjectDepartment(department);
            work.setPriority(0);
            work.setEquipment("");
            work.setMeasuringType("");
            work.setUnit("");
            workPeratorService.addWorkPerator(work);
        }
        return Result.ok();
    }

    /**
     * 修改模板状态
     *
     * @param session
     * @param request
     * @return
     */
    @RequestMapping("/updStatus")
    @ResponseBody
    public Result updStatus(HttpSession session, HttpServletRequest request) {
        String workPeratorId = request.getParameter("id");
        String status = request.getParameter("status");
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String updated = DateFormat.getYMDHMS(new Date());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", Integer.parseInt(workPeratorId));
        map.put("updated", updated);
        map.put("updatedBy", users.getId());
        map.put("status", status);
        String msg = "该配置";
        if (status.equals("1")) {//启用
            workPeratorService.updStatus(map);
            msg += "已启用";
        } else if (status.equals("2")) {//暂停
            workPeratorService.updStatus(map);
            msg += "已暂停";
        } else if (status.equals("3")) {//删除
            map.clear();
            map.put("id", Integer.parseInt(workPeratorId));
            workPeratorService.delWorkPerator(map);
            msg += "已删除";
        }
        return Result.ok(msg);
    }

    /**
     * 根据id获取模板记录
     *
     * @param request
     * @return
     */
    @RequestMapping("/getWorkPerator")
    @ResponseBody
    public Result getWorkPerator(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String id = request.getParameter("id");
        WorkPerator workPerator = workPeratorService.selWorkperator(id);
        if (workPerator == null) {
            return Result.fail();
        }
        return Result.ok(1, workPerator);
    }


    /**
     * 获取路线列表
     *
     * @param request
     * @return
     */
    @RequestMapping("/getTemplateChildList")
    @ResponseBody
    public Result getTemplateChildList(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String parentId = request.getParameter("temid");
        if (parentId == null || "".equals(parentId)) {
            return Result.fail(ResultEnum.NO_PARAMETERS);
        }
        Map map = new HashMap();
        map.put("parent", parentId);
        int count = workPeratorService.getTemplateChildListCount(map);
        List<WorkPerator> workPeratorList = workPeratorService.getTemplateChildList(map);
        if (workPeratorList.size() > 0) {
            for (WorkPerator workPerator : workPeratorList) {
                String equipment = workPerator.getEquipment();
                String departmentId = workPerator.getProjectDepartment();
                Integer systemId = workPerator.getSystemId();
                Integer equipId = workPerator.getEquipId();
                if (equipment != null && !equipment.equals("")) {
                    if (systemId != null && equipId != null) {
                        Equipment equipmentObj = equipmentService.findEquipmentById(systemId);
                        Equipment equipmentObj1 = equipmentService.findEquipmentById(equipId);
                        if (equipmentObj != null && equipmentObj1 != null) {
                            workPerator.setEquipment(equipmentObj.getName() + "," + equipmentObj1.getName());
                        }
                    }
                    String[] str = equipment.split(",");
                    String sysName = str[0];//系统名称
                    String equiqmentName = str[1];//设备名称
                    Equipment equipmentObj = equipmentService.getEquipmentByName(sysName, departmentId);
                    Equipment equipmentObj1 = equipmentService.getEquipmentByName(equiqmentName, departmentId);
                    if (equipmentObj != null) {
                        workPerator.setSysId(equipmentObj.getId());
                    }
                    if (equipmentObj1 != null) {
                        workPerator.setEquipmentId(equipmentObj1.getId());
                    }
                } else {
                    if (systemId != null && equipId != null) {
                        workPerator.setSysId(workPerator.getSystemId());
                        workPerator.setEquipmentId(workPerator.getEquipId());
                        //获取名称
                        Equipment equipmentObj = equipmentService.findEquipmentById(systemId);
                        Equipment equipmentObj1 = equipmentService.findEquipmentById(equipId);
                        if (equipmentObj != null && equipmentObj1 != null) {
                            workPerator.setEquipment(equipmentObj.getName() + "," + equipmentObj1.getName());
                        }
                    }
                }
            }
        }

        return Result.ok(count, workPeratorList);
    }

    /**
     * 获取系统号
     *
     * @return
     */
    @RequestMapping("/getSysNameList")
    @ResponseBody
    public Result getSysNameList(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        List<Map<String, Object>> resultList = new ArrayList<>();
        String postPeratorId = request.getParameter("id");
        WorkPerator workPerator = workPeratorService.selWorkperator(postPeratorId);
        if (workPerator != null) {
            String department = workPerator.getProjectDepartment();
            List<Equipment> eqList = equipmentService.getSysNameList(Integer.parseInt(department));
            if (eqList != null) {
                for (int i = 0; i < eqList.size(); i++) {
                    Equipment equipment = eqList.get(i);
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", equipment.getId());
                    map.put("name", equipment.getName());
                    resultList.add(map);
                }
            }
        }

        resultList = resultList.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE).compare(o1.get("name") != null ? o1.get("name").toString() : "", o2.get("name") != null ? o2.get("name").toString() : "")
                )
        ).collect(Collectors.toList());
        return Result.ok(resultList.size(), resultList);
    }

    /**
     * 获取设备名称
     *
     * @return
     */
    @RequestMapping("/getEquNameList")
    @ResponseBody
    public Result getEquNameList(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        List<Map<String, Object>> resultList = new ArrayList<>();
        String postPeratorId = request.getParameter("id");
        WorkPerator workPerator = workPeratorService.selWorkperator(postPeratorId);
        if (workPerator != null) {
            String department = workPerator.getProjectDepartment();
            List<Equipment> eqList = equipmentService.getEquNameList(Integer.parseInt(department));
            if (eqList != null) {
                for (int i = 0; i < eqList.size(); i++) {
                    Equipment equipment = eqList.get(i);
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", equipment.getId());
                    map.put("name", equipment.getName());
                    resultList.add(map);
                }
            }
        }
        resultList = resultList.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE).compare(o1.get("name") != null ? o1.get("name").toString() : "", o2.get("name") != null ? o2.get("name").toString() : "")
                )
        ).collect(Collectors.toList());

        return Result.ok(resultList.size(), resultList);
    }

    /**
     * 获取测点类型
     *
     * @return
     */
    @RequestMapping("/getSightType")
    @ResponseBody
    public Result getSightType(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String type = request.getParameter("type");//测点/单位
        String postPeratorId = request.getParameter("id");
        String dataType = request.getParameter("dataType");
        String name = request.getParameter("name");//系统、设备名称
        String systemId = request.getParameter("systemId");//系统Id
        String equipId = request.getParameter("equipId");//设备Id
        List<Map<String, Object>> resultList = new ArrayList<>();
        List<?> unitList = null;
        Map map1 = new HashMap();
        if (name != null && !name.equals("")) {
            map1.put("equipment", name);
        }
        if (systemId != null && !systemId.equals("")) {
            map1.put("systemId", systemId);
        }
        if (equipId != null && !equipId.equals("")) {
            map1.put("equipId", equipId);
        }
        WorkPerator workPerator = workPeratorService.selWorkperator(postPeratorId);
        if (workPerator != null) {
            map1.put("department", workPerator.getProjectDepartment());
        }
        if (type.equals("1")) {
            map1.put("type", '1');
        } else if (type.equals("2")) {
            map1.put("type", '2');
        }

        if (dataType != null) {
            if (dataType.equals("1")) {//人工数据
                unitList = unitService.getUnityMap(map1);
            } else if (dataType.equals("2")) {//ai数据
                unitList = dataConfigurationService.getMeasuringType(map1);
            } else {
                unitList = unitService.getUnityMap(map1);
            }
        }
        if (unitList != null) {
            for (int i = 0; i < unitList.size(); i++) {
                Unit unit = (Unit) unitList.get(i);
                Map<String, Object> map = new HashMap<>();
                map.put("id", unit.getId());
                map.put("name", unit.getNuit());//获取测点
                resultList.add(map);
            }
        }
        resultList = resultList.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE).compare(o1.get("name") != null ? o1.get("name").toString() : "", o2.get("name") != null ? o2.get("name").toString() : "")
                )
        ).collect(Collectors.toList());
        return Result.ok(resultList.size(), resultList);
    }

//    /**
//     * 获取单位名称
//     *
//     * @return
//     */
//    @RequestMapping("/getUnitType")
//    @ResponseBody
//    public List<Map<String, Object>> getUnitType() {
//        List<Map<String, Object>> list = new ArrayList<>();
//        List<Unit> unitList = unitService.getUnitType();
//        if (unitList != null) {
//            for (int i = 0; i < unitList.size(); i++) {
//                Unit unit = unitList.get(i);
//                Map<String, Object> map = new HashMap<>();
//                map.put("id", unit.getId());
//                map.put("name", unit.getNuit());
//                list.add(map);
//            }
//        }
//        return list;
//    }

    /**
     * 添加模板配置的运行路线
     *
     * @param request
     * @return
     */
    @RequestMapping("/addWorkPeratorChild")
    @ResponseBody
    public Result addWorkPeratorChild(HttpServletRequest request, HttpSession session) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        List<String> list = new ArrayList<>();
        String sysName = request.getParameter("sysName");//系统名称
        String equName = request.getParameter("equName");//设备名称
        String systemId = request.getParameter("systemId");//系统id
        String equipId = request.getParameter("equipId");//设备id
        String sightType = request.getParameter("sightType");//测点类型名称
        String sightTypeId = request.getParameter("sightTypeId");//测点类型id
        String unitType = request.getParameter("unitType");//单位类型名称
        String unitTypeId = request.getParameter("unitTypeId");//单位类型Id

        String workId = request.getParameter("workId");//模板id
        String temChildId = request.getParameter("temChildId");//路线id
        String dataType = request.getParameter("dataType");//ai或人工
        WorkPerator work = new WorkPerator();
        if (temChildId == null || "".equals(temChildId)) {//添加
            Map map = new HashMap();
            map.put("page", 0);
            map.put("pageSize", 1);
            map.put("parent", workId);
            WorkPerator WorkPerator = workPeratorService.getLastTemplateChildByPriority(map);
            if (WorkPerator != null) {
                work.setPriority(WorkPerator.getPriority() + 1);//设置执行顺序
            } else {
                work.setPriority(1);//设置执行循序
            }
            work.setAiNumber(0);
            work.setCreated(DateFormat.getYMDHMS(new Date()));
            work.setCycle("");
            work.setParent(Integer.parseInt(workId));
            work.setPatrolTask("");
            work.setPlanTime("");
            work.setStatus(2);
            work.setDataType(Integer.parseInt(dataType));
            work.setEquipment(sysName + "," + equName);
            work.setEquipId(Integer.parseInt(equipId));
            work.setSystemId(Integer.parseInt(systemId));
            work.setMeasuringType(sightType);
            work.setMeasuringTypeId(sightTypeId);
            work.setUnit(unitType);
            work.setUnitId(unitTypeId);
            work.setUserId(users.getId());
            work.setCreatedBy(users.getId());
            workPeratorService.addWorkPerator(work);

        } else {//修改
            Map map = new HashMap();
            map.put("equipment", sysName + "," + equName);
            map.put("systemId", systemId);

            map.put("equipId", equipId);

            map.put("measuringType", sightType);
            map.put("measuringTypeId", sightTypeId);

            map.put("unit", unitType);
            map.put("unitId", unitTypeId);


            map.put("id", temChildId);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            map.put("updated", sdf.format(new Date()));

            workPeratorService.updWorkperatorChild(map);
        }
        return Result.ok();
    }

    /**
     * 修改执行优先级
     *
     * @return
     */
    @RequestMapping("/updPriority")
    @ResponseBody
    public Result updPriority(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String id = request.getParameter("id");
        String parent = request.getParameter("workId");
        if (id == null || parent == null) {
            return Result.fail(ResultEnum.NO_PARAMETERS);
        }
        List<String> list = new ArrayList<>();
        WorkPerator workPerator = workPeratorService.selWorkperator(id);
        int priority = 0;
        if (workPerator != null) {
            priority = workPerator.getPriority();//获取优先级
            if (priority == 1) {//不可上移
                return Result.ok();
            }
            Map map = new HashMap();
            map.put("page", 0);
            map.put("pageSize", 10000);
            map.put("parent", parent);
            map.put("admin", "12");
            List<WorkPerator> list1 = workPeratorService.getTemplateChildList(map);//查询此模板下的所有路线
            if (list1 != null && list1.size() > 0) {
                for (WorkPerator work : list1) {
                    if (work.getPriority() + 1 == priority) {
                        work.setPriority(work.getPriority() + 1);
                        workPeratorService.updWorkperator(work);
                    }
                }
            }
            workPerator.setPriority(priority - 1);
            workPeratorService.updWorkperator(workPerator);
        }
        return Result.ok();
    }

    /**
     * 删除路线
     * 删除
     *
     * @return
     */
    @RequestMapping("/delWorkChild")
    @ResponseBody
    public Result delWorkChild(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String id = request.getParameter("id");
        if (id == null) {
            return Result.fail(ResultEnum.NO_PARAMETERS);
        }
        WorkPerator workPerator = workPeratorService.selWorkperator(id);
        int priority = workPerator.getPriority();//优先级
        int parent = workPerator.getParent();//模板
        Map map = new HashMap();
        map.put("id", id);
        workPeratorService.delWorkPerator(map);
        map.clear();
        map.put("page", 0);
        map.put("pageSize", 10000);
        map.put("parent", parent);
        map.put("admin", "12");
        //修改优先级
        List<WorkPerator> WorkPeratorList = workPeratorService.getTemplateChildList(map);//查询此模板下的所有路线
        if (WorkPeratorList != null && WorkPeratorList.size() > 0) {
            for (WorkPerator work : WorkPeratorList) {
                if (work.getPriority() > priority) {
                    work.setPriority(work.getPriority() - 1);
                    workPeratorService.updWorkperator(work);
                }
            }
        }
        return Result.ok();
    }

    /**
     * 获取路线记录
     *
     * @param request
     * @return
     */
    @RequestMapping("/getWorkperator")
    @ResponseBody
    public Result getWorkperator(HttpServletRequest request) {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String id = request.getParameter("id");
        WorkPerator workPerator = workPeratorService.selWorkperator(id);
        String name = workPerator.getEquipment();//拆分名称
        String[] str = name.split(",");
        workPerator.setEquipment(str[1]);
        workPerator.setSysName(str[0]);
        return Result.ok(1, workPerator);
    }

    /**
     * 查询部门列表
     *
     * @return
     */
    @RequestMapping("/getDepartmentList")
    @ResponseBody
    public Result getDepartmentList() {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        List<Map<String, String>> list = companyService.getDepartmentList("1");
        return Result.ok(list.size(), list);
    }

    /**
     * 根据条件查询模板
     *
     * @param request
     * @return
     */
/*    @RequestMapping("/searchWorkPerator")
    @ResponseBody
    public EasyuiResult searchWorkPerator(HttpSession session, HttpServletRequest request) {
        String department = request.getParameter("department");
        Map<String, Object> map = new HashMap<>();
        String[] param = department.split(",");
        for (String par : param) {
            if (par.equals("1")) {
                map.put("param1", "1");
            } else if (par.equals("2")) {
                map.put("param2", "2");
            } else if (par.equals("3")) {
                map.put("param3", "3");
            } else if (par.equals("4")) {
                map.put("param4", "4");
            }
        }
        //获取模板信息
        List<WorkPerator> list = workPeratorService.selAll(map);
        int count = workPeratorService.selAllCount(map);
        EasyuiResult result = new EasyuiResult();
        result.setTotal(count);
        result.setRows(list);
        return result;
    }*/

    /**
     * 下拉属性:任务名称
     *
     * @return
     */
    @RequestMapping("/getTemplateMap")
    @ResponseBody
    public Result getTemplateMap(HttpServletRequest request) {
        String depart = request.getParameter("depart");
        List<Map<String, Object>> resultList = new ArrayList<>();
        Map map = new HashMap();
        map.put("name", "patrolTask");
        map.put("status", "1");
        map.put("parent", "0");
        if (depart != null && !depart.equals("")) {
            map.put("depart", depart);
        }
        List<Map> list = workPeratorService.getTemplateMap(map);
        if (list != null) {
            for (int i = 0; i < list.size(); i++) {
                Map<String, Object> map1 = list.get(i);
                Map<String, Object> listMap = new HashMap<>();
                listMap.put("id", map1.get("id"));
                listMap.put("text", map1.get("patrolTask"));
                resultList.add(listMap);
            }
        }
        resultList = resultList.stream().sorted(
                (o1, o2) -> (
                        Collator.getInstance(Locale.CHINESE).compare(o1.get("name") != null ? o1.get("name").toString() : "", o2.get("name") != null ? o2.get("name").toString() : "")
                )
        ).collect(Collectors.toList());
        return Result.ok(resultList.size(), resultList);
    }
}
