package com.howei.controller;

import com.howei.pojo.Users;
import com.howei.service.WorkPeratorService;
import com.howei.util.EasyuiResult;
import com.howei.pojo.WorkPerator;
import com.howei.util.Page;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/guide/home")
//@RequestMapping("/home")
@CrossOrigin
public class HomeController {

    @Autowired
    WorkPeratorService workPeratorService;

    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        return users;
    }


    /**
     *运行专工查询
     * @return
     */
    @RequestMapping("/workPeratorList")
    @ResponseBody
    public EasyuiResult workPeratorList(HttpSession session,HttpServletRequest request){
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        Users users=this.getPrincipal();
        int offset=Page.getOffSet(page,rows);
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("page",offset);
        map.put("pageSize",rows);
        if(users!=null){
            map.put("userId",users.getId());
        }
        List<WorkPerator> list=workPeratorService.selByUser(map);
        String total=workPeratorService.selByUserCount(map);
        for (WorkPerator work:list){
            int id=work.getId();
            map.clear();
            map.put("page",0);
            map.put("pageSize",1000);
            map.put("parent",id);
            List<WorkPerator> list1=workPeratorService.getTemplateChildList(map);
            work.setArtificialNumber(list1.size());
        }
        EasyuiResult easyuiResult=new EasyuiResult();
        easyuiResult.setTotal(Integer.valueOf(total));
        easyuiResult.setRows(list);
        return easyuiResult;
    }
    /**
     * 跳转
     * @return
     */
    @RequestMapping("/toExhibition")
    public String toExhibition(){
        return "exhibition";
    }

    @RequestMapping("/toStaffhome")
    public String toStaffhome(){
        return "staffhome";
    }

}
