package com.howei.controller;

import com.howei.service.WorkPeratorService;
import com.howei.util.EasyuiResult;
import com.howei.pojo.WorkPerator;
import com.howei.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/guide/home")
//@RequestMapping("/home")
public class HomeController {

    @Autowired
    WorkPeratorService workPeratorService;
    /**
     *运行专工查询
     * @return
     */
    @RequestMapping("/workPeratorList")
    @ResponseBody
    public EasyuiResult workPeratorList(HttpSession session,HttpServletRequest request){
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        Integer userId=(Integer) session.getAttribute("userId");
        int offset=Page.getOffSet(page,rows);
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("page",offset);
        map.put("pageSize",rows);
        map.put("userId",userId);
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
}
