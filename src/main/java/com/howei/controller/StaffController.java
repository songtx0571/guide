package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.*;
import com.howei.service.*;
import com.howei.util.DateFormat;
import com.howei.util.HandlerTest;
import com.howei.util.Result;
import com.howei.util.WebSocket;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.util.*;

/**
 * 运行岗位
 */
@Controller
@CrossOrigin(origins = {"http://192.168.1.27:8082", "http:localhost:8080", "http://192.168.1.27:8848"}, allowCredentials = "true")
@RequestMapping("/guide/staff")
//@RequestMapping("/staff")
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

//    public String userName;//当前登录人
//    public String equipment;//设备名称
//    public String patrolTask;//任务名称
//    public String dateTime;//日期:首页面显示

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
            return Result.fail("用户失效");
        }

        Integer projectId = user.getDepartmentId();
        String userName = user.getUserName();
        String dateTime = DateFormat.getYMD();

        if (departmentId == null || departmentId.equals("")) {
            map.put("departmentId", projectId);
        } else {
            map.put("departmentId", departmentId);
        }

        //获取模板信息
        List<WorkPerator> list = workPeratorService.selAll(map);
        List<Object> result = new ArrayList<>();
        for (WorkPerator work : list) {
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
            result.add(mapRes);
        }
        map.clear();
        map.put("userName", userName);
        map.put("dateTime", dateTime);
        result.add(map);
        return Result.ok(0, result);
    }

    //创建员工空数据
    @RequestMapping("/crePost")
    @ResponseBody
    public List<Map<String, String>> crePost(HttpSession session, HttpServletRequest request) throws ParseException {
        List<Map<String, String>> result = new ArrayList<>();
        Map<String, String> map1 = new HashMap<>();
        Users users = this.getPrincipal();
        String peratorId = request.getParameter("id");//模板id
        String created = DateFormat.getYMDHMS(new Date());//创建时间
        //查找模板周期，判断是否创建员工数据
        WorkPerator work = workPeratorService.selWorkperator(peratorId);
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
        if (users != null) {
            map.put("postPeratorId", users.getId());
        }
        map.put("peratorId", peratorId);
        PostPerator postPerator = postPeratorService.getLastPerator(map);
        String inspectionEndTime = "";//实际结束时间
        String endTime = "";
        String inspectionStaTime = "";

        PostPerator post = new PostPerator();
        post.setCreated(created);
        if (users != null) {
            post.setPostPeratorId(users.getId());//专工id
            post.setCreatedBy(users.getId());//专工id
        }
        post.setInspectionStaTime(created);//巡检开始日期
        post.setInspectionEndTheoryTime(inspectionEndTheoryTime);//理论结束时间
        post.setPeratorId(Integer.parseInt(peratorId));
        post.setDepartment(Integer.parseInt(department));

        boolean bool;
        String patrolTask = null;
        if (postPerator != null) {
            inspectionEndTime = postPerator.getInspectionEndTime();//实际结束时间
            inspectionStaTime = postPerator.getInspectionStaTime();//开始时间
            if (inspectionEndTime == null || inspectionEndTime.equals("")) {//未完成，判断开始时间与当前时间
                try {
                    boolean bool1 = DateFormat.comparetoTime(DateFormat.getBehindTime2(inspectionStaTime, cycle), DateFormat.getYMDHMS(new Date()));
                    if (bool1) {
                        result = crePost(post, session);
                        map1.put("patrolTask", patrolTask);
                        result.add(map1);
                        return result;
                    } else {//未完成，未超过周期结束，打开
                        map1.put("result", "open");
                        result.add(map1);
                        return result;
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } else {//已完成，判断结束时间与当前时间
                //判断实际结束时间与当前时间:当前时间小于实际结束时间执行DateFormat.getBehindTime2(inspectionEndTime,cycle)
                boolean boo = DateFormat.comparetoTime(DateFormat.getYMDHMS(new Date()), DateFormat.getBehindTime2(inspectionEndTime, cycle));
                if (boo) {
                    map1.put("result", "console");
                    result.add(map1);
                    return result;
                } else {
                    //判断实际结束时间与当前时间:当前时间大于实际结束时间+周期执行
                    endTime = DateFormat.getBehindTime2(inspectionEndTime, cycle);
                    try {
                        bool = DateFormat.comparetoTime(created, endTime);
                        if (!bool) {//当当前前时间大于时执行
                            result = crePost(post, session);
                            map1.put("patrolTask", patrolTask);
                            result.add(map1);
                            return result;
                        } else {
                            map1.put("result", "open");
                            result.add(map1);
                            return result;
                        }
                    } catch (ParseException e) {

                    }
                }
            }
            return result;
        } else {
            result = crePost(post, session);
            map1.put("patrolTask", patrolTask);
            result.add(map1);
            return result;
        }
    }

    /**
     * 同步方法:避免无法指定用户
     * 创建员工执行的任务
     *
     * @param post
     */
    public synchronized List<Map<String, String>> crePost(PostPerator post, HttpSession session) {
        List<Map<String, String>> result = new ArrayList<>();
        Map<String, String> map1 = new HashMap<>();
        postPeratorService.crePost(post);
        int id = post.getId();//postPeratorId
        PostPerator postPerator = postPeratorService.selById(id);//获取当前添加的模板的信息
        if (postPerator != null) {
            int peratorId = postPerator.getPeratorId();//管理员模板Id
            WorkPerator workPerator = workPeratorService.selWorkperator(String.valueOf(peratorId));//获取管理员模板的信息
            if (workPerator != null) {
                Map map = new HashMap();
                map.put("parent", workPerator.getId());
                map.put("page", 0);
                map.put("pageSize", 10000);
                map.put("state", "true");
                List<WorkPerator> list = workPeratorService.getTemplateChildList(map);
                int count = list.size();//管理员模板的子任务列表
                for (int i = 0; i < count; i++) {
                    WorkPerator work = list.get(i);
                    PostPeratorData postPeratorData = new PostPeratorData();
                    postPeratorData.setMeasuringType(work.getMeasuringType());//测点类型
                    postPeratorData.setEquipment(work.getEquipment());//设备名称
                    postPeratorData.setPostPeratorId(id);
                    Users users = this.getPrincipal();
                    if (users != null) {
                        postPeratorData.setCreatedBy(users.getId());
                    }
                    postPeratorData.setCreated(DateFormat.getYMDHMS(new Date()));
                    postPeratorData.setUnit(work.getUnit());
                    postPeratorData.setInd(i);
                    postPeratorDataService.crePostChild(postPeratorData);
                }
                //返回设备名称
                map.clear();
                map.put("parent", peratorId);
                result = workPeratorService.selByParam(map);//获取设备名称
                map1.put("id", String.valueOf(id));
                result.add(map1);
                return result;
            }
        }
        return result;
    }

    /**
     * 查询
     *
     * @param request
     * @return
     */
    @RequestMapping("/getPostChildList")
    @ResponseBody
    public List<PostPeratorData> getPostChildList(HttpServletRequest request) {
        List<PostPeratorData> list = new ArrayList<>();
        String postId = request.getParameter("postId");//员工模板id
        String equipmento = request.getParameter("equipmento");//设备名称
        if (!postId.equals("") && !equipmento.equals("")) {
            Map map = new HashMap();
            map.put("equipment", equipmento);
            map.put("postPeratorId", postId);
            list = postPeratorDataService.selByEquipment(map);
            if (list != null) {
                for (PostPeratorData postPeratorData : list) {
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
            }
        }
        return list;
    }

    /**
     * 更新记录
     *
     * @param request
     * @return
     */
    @RequestMapping("/updPost")
    @ResponseBody
    public List<String> updPost(HttpServletRequest request) {
        List<String> result = new ArrayList<>();
        String str = request.getParameter("strData");
        String postId = request.getParameter("postId");
        //Users users=this.getPrincipal();
        if (str != null && !str.equals("")) {
            String[] strData = str.split(",");
            String id = "";
            for (String s : strData) {
                String[] strs = s.split(":");
                id = strs[0];
                id = id.substring(4, id.length());
                String value = strs[1];
                Map map = new HashMap();
                map.put("id", id);
                map.put("measuringTypeData", value);
                postPeratorDataService.updPostData(map);
                result.add("success");
            }
        }
        //此次巡检执行结束
        if (postId != null && !postId.equals("")) {
            //修改结束时间
            Map map = new HashMap();
            map.put("id", postId);
            map.put("inspectionEndTime", DateFormat.getYMDHMS(new Date()));
            postPeratorService.updPost(map);
            result.add("success");
        }
        return result;
    }

    /**
     * 查询最后一个大于当前时间的任务
     *
     * @param request
     * @return
     */
    @RequestMapping("/selPost")
    @ResponseBody
    public List<Map<String, String>> selPost(HttpServletRequest request) {
        List<Map<String, String>> result = new ArrayList<>();
        String id = request.getParameter("id");//管理员模板
        Users users = this.getPrincipal();
        Map map = new HashMap();
        map.put("peratorId", id);
        if (users != null) {
            map.put("postPeratorId", users.getId());
        }
        map.put("date", DateFormat.getYMDHMS(new Date()));
        PostPerator postPerator = postPeratorService.selLatest(map);
        if (postPerator != null) {
            int postId = postPerator.getId();//当前员工模板Id
            WorkPerator workPerator = workPeratorService.selWorkperator(String.valueOf(id));//获取管理员模板的信息
            if (workPerator != null) {
                //返回设备名称
                map.clear();
                map.put("parent", id);
                result = workPeratorService.selByParam(map);//获取设备名称
                Map<String, String> map1 = new HashMap<>();
                map1.put("id", String.valueOf(postId));
                map1.put("patrolTask", workPerator.getPatrolTask());
                result.add(map1);
                return result;
            }
        }
        return result;
    }

    /**
     * 获取部门下拉框
     *
     * @return
     */
    @RequestMapping("/getDepMap")
    @ResponseBody
    public List<Map<String, String>> getDepMap() {
        List<Company> list = departmentService.getDepMap();
        List<Map<String, String>> result = new ArrayList<>();
        if (list != null) {
            for (Company company : list) {
                Map<String, String> map = new HashMap<>();
                map.put("id", company.getId() + "");
                map.put("text", company.getName());
                result.add(map);
            }
        }
        return result;
    }
}
