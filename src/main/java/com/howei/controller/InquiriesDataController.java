package com.howei.controller;

import com.howei.pojo.InquiriesData;
import com.howei.pojo.InquiriesDataV;
import com.howei.pojo.PostPeratorData;
import com.howei.pojo.Users;
import com.howei.service.PostPeratorDataService;
import com.howei.service.UserService;
import com.howei.util.EasyuiResult;
import com.howei.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8080","http://192.168.1.27:8848"},allowCredentials = "true")
@RequestMapping("/guide/inquiries")
//@RequestMapping("/inquiries")
public class InquiriesDataController {

    @Autowired
    PostPeratorDataService postPeratorDataService;

    @Autowired
    UserService userService;

    /**
     * 跳转查询数据页面
     * @return
     */
    @RequestMapping("/toData")
    public String toData(){
        return "inquiriesData";
    }

    /**
     * 根据系统名称+设备名称查询测点数据
     * @param request
     * @return
     */
    @RequestMapping("/getInquiriesData")
    @ResponseBody
    public EasyuiResult getInquiriesData(HttpServletRequest request){
        String name=request.getParameter("name");
        String depart=request.getParameter("departName");
        String measuringType=request.getParameter("measuringType");
        String rows=request.getParameter("rows");
        String page=request.getParameter("page");
        int offset=Page.getOffSet(page,rows);
        EasyuiResult easyuiResult=new EasyuiResult();
        List<PostPeratorData> list=new ArrayList<>();
        int count=0;
        if(name!=null&&!name.equals("")) {
            Map map = new HashMap();
            map.put("equipment", name);
            map.put("measuringType", measuringType);
            map.put("projectDepartment", depart);
            list = postPeratorDataService.selByName(map);
            count = list.size();
            list.clear();
            map.put("page", offset);
            map.put("pageSize", rows);
            list = postPeratorDataService.selByName(map);
            for(int i=0;i<list.size();i++){
                PostPeratorData postPeratorData=list.get(i);
                Users user=userService.findById(postPeratorData.getCreatedBy()+"");
                if(user!=null){
                    //postPeratorData.setCreatedByName(user.getName());
                }else{
                    postPeratorData.setCreatedByName("");
                }
            }
        }
        easyuiResult.setRows(list);
        easyuiResult.setTotal(count);
        return easyuiResult;
    }

    /**
     * 获取员工模板执行的测点类型数据
     * @param request
     * @return
     */
    @RequestMapping("/getUnityMap")
    @ResponseBody
    public List<Map<String,Object>> getUnityMap(HttpServletRequest request){
        List<Map<String,Object>> result=new ArrayList<>();
        String depart=request.getParameter("departName");//项目
        String equipment=request.getParameter("name");//系统名+设备名
        Map map=new HashMap();
        map.put("department",depart);
        map.put("equipment",equipment);
        List<Map> list=postPeratorDataService.getUnityMap(map);
        for (int i=0;i<list.size();i++){
            Map<String,Object> mapStr=new HashMap<>();
            Map object=list.get(i);
            String text=(String)object.get("measuringType");
            mapStr.put("id",i);
            mapStr.put("text",text);
            result.add(mapStr);
        }
        return result;
    }

}
