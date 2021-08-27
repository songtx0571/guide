package com.howei.controller;

import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.DateFormat;
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
import javax.servlet.http.HttpSession;
import java.text.Collator;
import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 运行岗位
 */
@Controller
@CrossOrigin
@RequestMapping("/guide/staff")
public class StaffController {

    @Autowired
    UserService userService;

    @Autowired
    WorkPeratorService workPeratorService;

    @Autowired
    PostPeratorService postPeratorService;

    @Autowired
    PostPeratorDataService postPeratorDataService;

    @Autowired
    PermissionService permissionService;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    AiConfigurationDataService aiConfigurationDataService;

    @Autowired
    EquipmentService equipmentService;


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
     * 跳转员工页面
     *
     * @return
     */
    @RequestMapping("/toStaff")
    public String toStaff() {
        return "staffhome";
    }

    /**
     * 页面初始化数据
     * <p>
     * 同步方法
     * 防止项目覆盖
     *
     * @return
     */
    @RequestMapping("/init")
    @ResponseBody
    public synchronized Result init(HttpServletRequest request) {
        String departmentId = request.getParameter("departmentId");
        Subject subject = SecurityUtils.getSubject();
        Users user = (Users) subject.getPrincipal();
        Map<String, Object> map = new HashMap<>();
        if (user == null) {
            return Result.fail(ResultEnum.NO_USER);
        }

        Map<String,Object> resultMap=new HashMap<>();
        String userName = user.getUserName();
        String dateTime = DateFormat.getYMD();
        if (StringUtils.isEmpty(departmentId) && !subject.isPermitted("运行专工")) {
            departmentId = String.valueOf(user.getDepartmentId());
        }

        map.put("departmentId", departmentId);

        //获取模板信息
        List<WorkPerator> workPeratorList = workPeratorService.selAll(map);
        List<Object> resultList = new ArrayList<>();
        for (WorkPerator work : workPeratorList) {
            Map<String, Object> mapRes = new HashMap<>();
            mapRes.put("id", work.getId());
            mapRes.put("patrolTask", work.getPatrolTask());
            mapRes.put("cycle", work.getCycle());
            map.clear();
            map.put("peratorId", work.getId());
            PostPerator postPerator = postPeratorService.getLastPerator1(map);
            if (postPerator != null) {
                if (postPerator.getInspectionEndTime() == null || postPerator.getInspectionEndTime().equals("")) {
                    mapRes.put("inspectionEndTime", "");
                } else {
                    mapRes.put("inspectionEndTime", postPerator.getInspectionEndTime());
                }
            } else {
                mapRes.put("inspectionEndTime", "");
            }
            resultList.add(mapRes);
        }
        resultMap.put("userName", userName);
        resultMap.put("dateTime", dateTime);
        resultMap.put("workPeratorList", resultList);
        return Result.ok(1, resultMap);
    }

    /**
     * 创建员工空数据
     *
     * @param request id 模板id
     * @return
     * @throws ParseException
     */
    @RequestMapping("/crePost")
    @ResponseBody
    public Result crePost(HttpServletRequest request) throws ParseException {
        Users users = this.getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String peratorId = request.getParameter("id");//模板id
        String created = DateFormat.getYMDHMS(new Date());//创建时间
        //查找模板周期，判断是否创建员工数据
        WorkPerator work = workPeratorService.selWorkperator(peratorId);
        System.out.println(work);
        String cycle = "";
        String planTime = "";//计划完成时间
        String department = "";//部门
        if (work != null) {
            cycle = work.getCycle();
            planTime = work.getPlanTime();
            department = work.getProjectDepartment();
        }
        String inspectionEndTheoryTime = DateFormat.getBehindTime3(planTime);//理论结束时间
        Map map = new HashMap();
        map.put("postPeratorId", users.getId());
        map.put("peratorId", peratorId);
        PostPerator postPerator = postPeratorService.getLastPerator(map);
        String inspectionEndTime = "";//实际结束时间
        String endTime = "";
        String inspectionStaTime = "";//实际结束时间

        PostPerator post = new PostPerator();
        post.setCreated(created);
        post.setPostPeratorId(users.getId());//专工id
        post.setCreatedBy(users.getId());//专工id
        post.setInspectionStaTime(created);//巡检开始日期
        post.setInspectionEndTheoryTime(inspectionEndTheoryTime);//理论结束时间
        post.setPeratorId(Integer.parseInt(peratorId));
        post.setDepartment(Integer.parseInt(department));

        boolean bool;
        //没有表示最近没有巡检记录,需要新建
        if (postPerator == null) {
            crePost(post);
            return Result.ok();
        }
        Map<String, Object> resultMap = new HashMap<>();
        if (postPerator != null) {
            inspectionEndTime = postPerator.getInspectionEndTime();//实际结束时间
            inspectionStaTime = postPerator.getInspectionStaTime();//开始时间
            if (inspectionEndTime == null || inspectionEndTime.equals("")) {//未完成，判断开始时间与当前时间
                try {
                    boolean bool1 = DateFormat.comparetoTime(DateFormat.getBehindTime2(inspectionStaTime, cycle), DateFormat.getYMDHMS(new Date()));
                    if (bool1) {
                        resultMap = crePost(post);
                        return Result.ok(1, resultMap);
                    } else {//未完成，未超过周期结束，打开
                        return Result.fail(ResultEnum.POSTPERATOR_OPEN);
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } else {//已完成，判断结束时间与当前时间
                //判断实际结束时间与当前时间:当前时间小于实际结束时间执行
                boolean boo = DateFormat.comparetoTime(DateFormat.getYMDHMS(new Date()), DateFormat.getBehindTime2(inspectionEndTime, cycle));
                if (boo) {
                    return Result.fail(ResultEnum.POSTPERATOR_CONSOLE);
                } else {
                    //判断实际结束时间与当前时间:当前时间大于实际结束时间+周期执行
                    endTime = DateFormat.getBehindTime2(inspectionEndTime, cycle);
                    try {
                        bool = DateFormat.comparetoTime(created, endTime);
                        if (!bool) {//当当前前时间大于时执行
                            resultMap = crePost(post);
                            return Result.ok(1, resultMap);
                        } else {
                            return Result.fail(ResultEnum.POSTPERATOR_OPEN);
                        }
                    } catch (ParseException e) {

                    }
                }
            }
        }
        return Result.ok();
    }

    /**
     * 同步方法:避免无法指定用户
     * 创建员工执行的任务
     *
     * @param post
     */
    public Map<String, Object> crePost(PostPerator post) {
        Map<String, Object> resultMap = new HashMap<>();
        List<Map<String, String>> list = new ArrayList<>();
        Map<String, String> map1 = new HashMap<>();
        postPeratorService.crePost(post);
        int id = post.getId();//postPeratorId
        PostPerator postPerator = postPeratorService.selById(id);//获取当前添加的模板的信息
        if (postPerator == null) {
            return null;
        }
        Users users = this.getPrincipal();
        Integer userId = users.getId();
        int peratorId = postPerator.getPeratorId();//管理员模板Id
        WorkPerator workPerator = workPeratorService.selWorkperator(String.valueOf(peratorId));//获取管理员模板的信息
        if (workPerator == null) {
            return null;
        }
        Map map = new HashMap();
        map.put("parent", workPerator.getId());
        map.put("page", 0);
        map.put("pageSize", 10000);
        map.put("state", "true");
        List<WorkPerator> workPeratorList = workPeratorService.getTemplateChildList(map);
        int count = workPeratorList.size();//管理员模板的子任务列表
        for (int i = 0; i < count; i++) {
            WorkPerator work = workPeratorList.get(i);
            PostPeratorData postPeratorData = new PostPeratorData();
            postPeratorData.setEquipId(work.getEquipId());//设备Id
            postPeratorData.setSystemId(work.getSystemId());//系统Id
            postPeratorData.setMeasuringType(work.getMeasuringType());//测点类型
            postPeratorData.setEquipment(work.getEquipment());//系统设备名称
            postPeratorData.setPostPeratorId(id);
            postPeratorData.setCreatedBy(userId);
            postPeratorData.setCreated(DateFormat.getYMDHMS(new Date()));
            postPeratorData.setUnit(work.getUnit());
            postPeratorData.setInd(i);
            postPeratorData.setMeasuringTypeId(work.getMeasuringTypeId());
            postPeratorData.setEquipId(work.getEquipId());
            postPeratorData.setUnitId(work.getUnitId());
            postPeratorDataService.crePostChild(postPeratorData);
        }
        //返回设备名称
        map.clear();
        map.put("parent", peratorId);
        list = workPeratorService.selByParam(map);//获取设备名称
        resultMap.put("workPerators", list);
        resultMap.put("id", String.valueOf(id));
        resultMap.put("patrolTask", workPerator.getPatrolTask());
        return resultMap;
    }

    /**
     * 查询
     *
     * @param request
     * @return
     */
    @RequestMapping("/getPostChildList")
    @ResponseBody
    public Result getPostChildList(HttpServletRequest request) {
        Users users = getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String postId = request.getParameter("postId");//员工模板id
//        String equipmento = request.getParameter("equipmento");//设备名称
        String systemId = request.getParameter("systemId");//设备名称
        String equipId = request.getParameter("equipId");//设备名称
        Map map = new HashMap();
        map.put("systemId", systemId);
        map.put("equipId", equipId);
        map.put("postPeratorId", postId);
        List<PostPeratorData> postPeratorDataList = postPeratorDataService.selByEquipment(map);
        if (postPeratorDataList == null) {
            return Result.ok(0, new ArrayList<>());
        }
        for (PostPeratorData postPeratorData : postPeratorDataList) {
            if (postPeratorData.getMeasuringType().contains("AI")) {
                map.clear();
                PostPerator postPerator = postPeratorService.selById(Integer.parseInt(postId));
                map.put("projectDepartment", postPerator.getDepartment());
                map.put("equipment", postPeratorData.getEquipment());
                map.put("measuringType", postPeratorData.getMeasuringType());
                AiConfigurationData aiConfigurationData = aiConfigurationDataService.getLastAiConfigureData(map);
                if (aiConfigurationData != null) {
                    postPeratorData.setMeasuringTypeData(aiConfigurationData.getData());
                }
            }
        }
        return Result.ok(postPeratorDataList.size(), postPeratorDataList);
    }

    /**
     * 更新记录
     *
     * @param request
     * @return
     */
    @RequestMapping("/updPost")
    @ResponseBody
    public Result updPost(HttpServletRequest request) {
        Users users = getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        String str = request.getParameter("strData");
        String postId = request.getParameter("postId");
        if (str != null && !str.equals("")) {
            String[] strData = str.split(",");
            for (String s : strData) {
                String[] strs = s.split(":");
                Map map = new HashMap();
                map.put("id", strs[0]);
                map.put("measuringTypeData",  strs[1]);
                postPeratorDataService.updPostData(map);
            }
        }
        //此次巡检执行结束
        if (postId != null && !postId.equals("")) {
            //修改结束时间
            Map map = new HashMap();
            map.put("id", postId);
            map.put("inspectionEndTime", DateFormat.getYMDHMS(new Date()));
            postPeratorService.updPost(map);
        }
        return Result.ok();
    }

    /**
     * 查询最后一个大于当前时间的任务
     *
     * @param request
     * @return
     */
    @RequestMapping("/selPost")
    @ResponseBody
    public Result selPost(HttpServletRequest request) {
        Users users = getPrincipal();
        if (users == null) {
            return Result.fail(ResultEnum.NO_USER);
        }
        Map<String, Object> resultMap = new HashMap<>();
        String id = request.getParameter("id");//管理员模板
        Map map = new HashMap();
        map.put("peratorId", id);
        map.put("postPeratorId", users.getId());
        map.put("date", DateFormat.getYMDHMS(new Date()));
        PostPerator postPerator = postPeratorService.selLatest(map);
        if (postPerator != null) {
            int postId = postPerator.getId();//当前员工模板Id
            WorkPerator workPerator = workPeratorService.selWorkperator(String.valueOf(id));//获取管理员模板的信息
            if (workPerator != null) {
                //返回设备名称
                map.clear();
                map.put("parent", id);
                List<Map<String, Object>> list = workPeratorService.selByParam(map);//获取设备名称
                map.clear();
                map.put("workPerators", list);
                map.put("postPeratorId", String.valueOf(postId));
                map.put("patrolTask", workPerator.getPatrolTask());
            }
        }
        return Result.ok(1, map);
    }

    /**
     * 获取部门下拉框
     *
     * @return
     */
    @RequestMapping("/getDepMap")
    @ResponseBody
    public Result getDepMap() {
        List<Company> companyList = departmentService.getDepMap();
        List<Map<String, String>> resultList = new ArrayList<>();
        if (companyList != null && companyList.size() > 0) {
            for (Company company : companyList) {
                Map<String, String> map = new HashMap<>();
                map.put("id", String.valueOf(company.getId()));
                map.put("text", company.getName());
                resultList.add(map);
            }
        }
        return Result.ok(resultList.size(), resultList);
    }
}
