package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Mould;
import com.howei.pojo.PostPerator;
import com.howei.pojo.PostPeratorData;
import com.howei.pojo.Users;
import com.howei.service.PostPeratorDataService;
import com.howei.service.PostPeratorService;
import com.howei.service.UserService;
import com.howei.service.WorkPeratorService;
import com.howei.util.DateFormat;
import com.howei.util.EasyuiResult;

import com.howei.util.Page;
import com.howei.util.Result;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8080","http://192.168.1.27:8848"},allowCredentials = "true")
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
    public Result getMouldList(HttpServletRequest request){
        List<Mould> result=new ArrayList<>();
        String depart=request.getParameter("depart");
        String Template=request.getParameter("Template");
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);
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
        List<PostPerator> total=postPeratorService.getMouldList(map);

        map.put("pageSize",limit);
        map.put("page",rows);
        List<PostPerator> list=postPeratorService.getMouldList(map);
        if(list!=null){
            for(int i=0;i<list.size();i++){
                Map<String,Object> resultMap=new HashMap<>();
                PostPerator postPerator=list.get(i);
                int id=postPerator.getId();
                String startTime=postPerator.getInspectionStaTime();//开始时间
                String endTime=postPerator.getInspectionEndTime();//实际完成时间
                Mould mould=new Mould();
                try {
                    if(endTime!=null&&!endTime.equals("")){
                        String diachronic=DateFormat.getBothDate(startTime,endTime);//历时
                        mould.setStatus("正常");
                        mould.setDiachronic(diachronic);
                    }else{
                        mould.setStatus("异常");
                        mould.setDiachronic("未完成");
                    }
                } catch (ParseException e) {

                }
                Integer userId=postPerator.getCreatedBy();//巡检人
                mould.setId(id);
                mould.setStartTime(startTime);
                resultMap.put("startTime",startTime);
                if(endTime!=null&&!endTime.equals("")){
                    mould.setEndTime(endTime);
                }else{
                    mould.setEndTime("--");
                }
                mould.setCount(count);
                mould.setAIcount(0);
                Users user=userService.findById(userId+"");
                if(user!=null){
                    String userName=user.getUserName();
                    mould.setUserName(userName);
                }
                result.add(mould);
            }
        }
        Result result1=new Result();
        result1.setCode(0);
        result1.setData(result);
        result1.setCount(total.size());
        return result1;
    }

    /**
     * 查询数据
     * @param request
     * @return
     */
    @RequestMapping("/getPostPerData")
    @ResponseBody
    public Result getPostPerData(HttpServletRequest request){
        List<PostPeratorData> result=new ArrayList<>();
        String postPeratorId=request.getParameter("postPeratorId");//员工模板id
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);
        int count=0;
        if(postPeratorId!=null&&!postPeratorId.equals("")){
            Map map=new HashMap();
            map.put("postPeratorId",postPeratorId);
            result=postPeratorDataService.selPostPerDataById(map);
            count=result.size();
            result.clear();

            map.put("pageSize",limit);
            map.put("page",rows);
            result=postPeratorDataService.selPostPerDataById(map);
        }
        Result result1=new Result();
        result1.setCode(0);
        result1.setCount(count);
        result1.setData(result);
        return result1;
    }

    /**
     * 跳转展示查询模板具体数据
     * @param postPeratorId
     * @return
     */
    @RequestMapping("/toMouldChild")
    public ModelAndView toMouldChild(@Param("postPeratorId") String postPeratorId){
        ModelAndView model=new ModelAndView();
        model.setViewName("mouldChild");
        model.addObject("postPeratorId",postPeratorId);
        return model;
    }
}
