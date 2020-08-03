package com.howei.controller;

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
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
    public EasyuiResult getMouldList(HttpServletRequest request){
        List<Mould> result=new ArrayList<>();
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
                    String userName=user.getName();
                    mould.setUserName(userName);
                }
                result.add(mould);
            }
        }
        EasyuiResult easyuiResult=new EasyuiResult();
        easyuiResult.setRows(result);
        easyuiResult.setTotal(result.size());
        return easyuiResult;
    }

    /**
     * 查询数据
     * @param request
     * @return
     */
    @RequestMapping("/getPostPerData")
    @ResponseBody
    public EasyuiResult getPostPerData(HttpServletRequest request){
        List<PostPeratorData> result=new ArrayList<>();
        String postPeratorId=request.getParameter("postPeratorId");//员工模板id
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        int offset=Page.getOffSet(page,rows);
        int count=0;
        if(postPeratorId!=null&&!postPeratorId.equals("")){
            Map map=new HashMap();
            map.put("postPeratorId",postPeratorId);
            result=postPeratorDataService.selPostPerDataById(map);
            count=result.size();
            result.clear();
            map.put("page",offset);
            map.put("pageSize",rows);
            result=postPeratorDataService.selPostPerDataById(map);
        }
        EasyuiResult easyuiResult=new EasyuiResult();
        easyuiResult.setRows(result);
        easyuiResult.setTotal(count);
        return easyuiResult;
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
