package com.howei.controller;


import com.howei.pojo.Menu;
import com.howei.pojo.Permission;
import com.howei.pojo.Users;
import com.howei.service.MenuService;
import com.howei.service.PermissionService;
import com.howei.service.UserService;
import com.howei.util.WebSocket;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    MenuService menuService;

    @Autowired
    PermissionService permissionService;

    @RequestMapping("/")
    public String login(HttpSession session,HttpServletRequest request){
        UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
        OperatingSystem os = userAgent.getOperatingSystem();
        int index=os.toString().toLowerCase().indexOf("window");
        index=-1;
        if(session.getAttribute("userId")!=null){
            Integer userId=(Integer) session.getAttribute("userId");
            List<Permission> list=permissionService.selByUserId(userId);
            boolean isAdmin=false;
            if(list!=null&&list.size()>0){
                Permission permission=list.get(0);
                if(list.size()==2){
                    isAdmin=true;
                }else if((list.size()==1)&&(permission.getId()==68)){
                    isAdmin=true;
                }else{
                    isAdmin=false;
                }
            }
            if((index!=-1&&!isAdmin)||isAdmin){//员工登录windows
                return "home";
            }else if(index==-1){//员工登录linux系统
                return "staffhome";
            }
            //return "keyboard";
        }
        return "redirect:/login";
    }

    @RequestMapping("/login")
    public String index(HttpSession session,HttpServletRequest request){
        UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
        OperatingSystem os = userAgent.getOperatingSystem();
        int index=os.toString().toLowerCase().indexOf("window");
        index=-1;
        if(session.getAttribute("userId")!=null){
            Integer userId=(Integer) session.getAttribute("userId");
            List<Permission> list=permissionService.selByUserId(userId);
            boolean isAdmin=false;
            if(list!=null&&list.size()>0){
                Permission permission=list.get(0);
                if(list.size()==2){
                    isAdmin=true;
                }else if((list.size()==1)&&(permission.getId()==68)){
                    isAdmin=true;
                }else{
                    isAdmin=false;
                }
            }
            if((index!=-1&&!isAdmin)||isAdmin){//员工登录windows
                return "home";
            }else if(index==-1){//员工登录linux系统
                return "staffhome";
            }
            //return "keyboard";
        }
        if(index!=-1){
            return "login";
        }else{
            return "postlogin";
        }
    }

    @RequestMapping(value = "/loginPage", method = {RequestMethod.POST, RequestMethod.GET})
    public String loginadmin(HttpServletRequest request, HttpSession session) {
        String UserName = request.getParameter("UserName");
        String Password = request.getParameter("Password");
        Users users = userService.findUser(UserName, Password);
        //获取浏览器操作系统
        UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
        OperatingSystem os = userAgent.getOperatingSystem();
        int index=os.toString().toLowerCase().indexOf("window");
        index=-1;
        if (users!=null) {
            Integer userId=users.getId();
            List<Permission> list=permissionService.selByUserId(userId);
            boolean isAdmin=false;
            if(list!=null&&list.size()>0){
                Permission permission=list.get(0);
                if(list.size()==2){
                    isAdmin=true;
                }else if((list.size()==1)&&(permission.getId()==68)){
                    isAdmin=true;
                }else{
                    isAdmin=false;
                }
            }
            session.setAttribute("userId", users.getId());//编号
            session.setAttribute("roleId", users.getRoleId());//角色id
            session.setAttribute("projectId", users.getProjectId());//项目部id
            session.setAttribute("userName",users.getName());//当前用户名
            if((index!=-1&&!isAdmin)||isAdmin){//员工登录windows
                return "home";
            }else if(index==-1){//员工登录linux系统
                return "staffhome";
            }else{
                return "home";
            }
            //return "keyboard";
        } else {
            return "redirect:/login";
        }
    }

    @RequestMapping("/guide/getMenu")
    @ResponseBody
    public List<Menu> getMenuTree(HttpSession session,HttpServletRequest request){
        Integer userId=(Integer)session.getAttribute("userId");
        String parentId=request.getParameter("parent");
        List<Permission> list=permissionService.selByUserId(userId);
        WebSocket webSocket=new WebSocket();
        webSocket.sendMessage("发送信息");
        String isAdmin="";
        if(list!=null&&list.size()>0){
            Permission permission=list.get(0);
            if(list.size()==2){
                isAdmin="true";
            }else if((list.size()==1)&&(permission.getId()==68)){
                isAdmin="true";
            }else{
                isAdmin="false";
            }
        }
        Map map=new HashMap();
        map.put("parentId",parentId);
        map.put("isAdmin",isAdmin);
        List<Menu> result=menuService.getMenuTree(map);
        return result;
    }
}
