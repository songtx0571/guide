package com.howei.controller;

import com.howei.pojo.PostPerator;
import com.howei.pojo.PostPeratorData;
import com.howei.pojo.Users;
import com.howei.pojo.WorkPerator;
import com.howei.service.PostPeratorDataService;
import com.howei.service.PostPeratorService;
import com.howei.service.UserService;
import com.howei.service.WorkPeratorService;
import com.howei.util.DateFormat;
import com.howei.util.EasyuiResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 数据查询模块
 * 查询模板
 */
@Controller
@RequestMapping("/guide/mould")
public class MouldController {

    @Autowired
    WorkPeratorService workPeratorService;

    @Autowired
    PostPeratorService postPeratorService;

    @Autowired
    PostPeratorDataService postPeratorDataService;

    @Autowired
    UserService userService;

    @RequestMapping("/toMould")
    public String toMould(){
        return "mould";
    }

    /**
     * 获取模板数据
     * @param request
     * @return
     */
    @RequestMapping("/getMouldList")
    @ResponseBody
    /*public List<Map<String,Object>> getMouldList(HttpServletRequest request){
        List<Map<String,Object>> result=new ArrayList<>();
        String depart=request.getParameter("depart");
        String Template=request.getParameter("Template");
        Map map=new HashMap();
        map.put("parent",Template);
        int count=workPeratorService.getTemplateChildListCount(map);//人工巡检数
        map.clear();
        if(depart!=null&&!depart.equals("")){
            map.put("depart",depart);
        }
        if(Template!=null&&!Template.equals("")){
            map.put("Template",Template);
        }
        List<PostPerator> list=postPeratorService.getMouldList(map);
        if(list!=null){
            for(int i=0;i<list.size();i++){
                Map<String,Object> resultMap=new HashMap<>();
                PostPerator postPerator=list.get(i);
                int id=postPerator.getId();
                String startTime=postPerator.getInspectionStaTime();//开始时间
                String endTime=postPerator.getInspectionEndTime();//实际完成时间
                try {
                    if(endTime!=null&&!endTime.equals("")){
                        String diachronic=DateFormat.getBothDate(startTime,endTime);//历时
                        resultMap.put("status","正常");
                        resultMap.put("diachronic",diachronic);
                    }else{
                        resultMap.put("status","异常");
                        resultMap.put("diachronic","未完成");
                    }
                } catch (ParseException e) {

                }
                Integer userId=postPerator.getCreatedBy();//巡检人
                resultMap.put("id",id);
                resultMap.put("startTime",startTime);
                if(endTime!=null&&!endTime.equals("")){
                    resultMap.put("endTime",endTime);
                }else{
                    resultMap.put("endTime","--");
                }
                resultMap.put("count",count);
                resultMap.put("AIcount",0);//Ai巡检数
                Users user=userService.findById(userId+"");
                if(user!=null){
                    String userName=user.getName();
                    resultMap.put("userName",userName);
                }
                result.add(resultMap);
            }
        }
        return result;
    }*/
    public EasyuiResult getMouldList(HttpServletRequest request){
        List<Map<String,Object>> result=new ArrayList<>();
        String depart=request.getParameter("depart");
        String Template=request.getParameter("Template");
        Map map=new HashMap();
        map.put("parent",Template);
        int count=workPeratorService.getTemplateChildListCount(map);//人工巡检数
        map.clear();
        if(depart!=null&&!depart.equals("")){
            map.put("depart",depart);
        }
        if(Template!=null&&!Template.equals("")){
            map.put("Template",Template);
        }
        List<PostPerator> list=postPeratorService.getMouldList(map);
        if(list!=null){
            for(int i=0;i<list.size();i++){
                Map<String,Object> resultMap=new HashMap<>();
                PostPerator postPerator=list.get(i);
                int id=postPerator.getId();
                String startTime=postPerator.getInspectionStaTime();//开始时间
                String endTime=postPerator.getInspectionEndTime();//实际完成时间
                try {
                    if(endTime!=null&&!endTime.equals("")){
                        String diachronic=DateFormat.getBothDate(startTime,endTime);//历时
                        resultMap.put("status","正常");
                        resultMap.put("diachronic",diachronic);
                    }else{
                        resultMap.put("status","异常");
                        resultMap.put("diachronic","未完成");
                    }
                } catch (ParseException e) {

                }
                Integer userId=postPerator.getCreatedBy();//巡检人
                resultMap.put("id",id);
                resultMap.put("startTime",startTime);
                if(endTime!=null&&!endTime.equals("")){
                    resultMap.put("endTime",endTime);
                }else{
                    resultMap.put("endTime","--");
                }
                resultMap.put("count",count);
                resultMap.put("AIcount",0);//Ai巡检数
                Users user=userService.findById(userId+"");
                if(user!=null){
                    String userName=user.getName();
                    resultMap.put("userName",userName);
                }
                result.add(resultMap);
            }
        }
        EasyuiResult easyuiResult=new EasyuiResult();
        easyuiResult.setRows(result);
        easyuiResult.setTotal(result.size());
        return easyuiResult;
    }

    @RequestMapping("/getPostPerData")
    @ResponseBody
    public List<PostPeratorData> getPostPerData(HttpServletRequest request){
        List<PostPeratorData> result=new ArrayList<>();
        String postPeratorId=request.getParameter("id");//员工模板id
        if(postPeratorId!=null&&!postPeratorId.equals("")){
            result=postPeratorDataService.selPostPerDataById(postPeratorId);
        }
        return result;
    }
}
