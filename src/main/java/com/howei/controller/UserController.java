package com.howei.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.howei.pojo.Menu;
import com.howei.pojo.Permission;
import com.howei.pojo.Users;
import com.howei.service.MenuService;
import com.howei.service.PermissionService;
import com.howei.service.UserService;
import com.howei.util.MD5;
import com.howei.util.WebSocket;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
//@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8082","http://192.168.1.27:8848"},allowCredentials = "true")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    MenuService menuService;

    @Autowired
    PermissionService permissionService;

    /*存入session里的用户名称*/
    public static final String SESSION_USER = "sessionUser";
    public ObjectMapper jsonTranster = new ObjectMapper();

    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        return users;
    }

    @RequestMapping("/")
    public String login(){
//        Users users=this.getPrincipal();
//        if(users!=null){
            return "home";
//        }
//        return "redirect:/login";
    }

    @RequestMapping("/login")
    public String index(){
        Users users=this.getPrincipal();
        if(users!=null){
            return "home";
        }
        return "login";
    }

    /**
     * 系统登出
     * @return
     */
    @RequestMapping("/logout")
    public String logOut(){
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            subject.logout();
            return "redirect:login";
        }
        return "login";
    }

    @RequestMapping(value = "/loginPage", method = {RequestMethod.POST, RequestMethod.GET})
    public String loginadmin(HttpServletRequest request) {
        String username = request.getParameter("userNumber").toUpperCase();
        String password = request.getParameter("password");
        MD5 md5=new MD5();
        try {
            password=md5.EncoderByMd5(password);
            Subject subject=SecurityUtils.getSubject();
            UsernamePasswordToken upt = new UsernamePasswordToken(username,password);
            subject.login(upt);
            Session session = subject.getSession();
            Users user = userService.loginUserNumber(username);
            user.setPassword("");
            session.setAttribute(SESSION_USER, user);
        } catch (UnknownAccountException e) {
            return "login";
        } catch (IncorrectCredentialsException e){
            return "login";
        } catch (Exception e){
            return "login";
        }
        return "home";
    }

    @RequestMapping("/guide/getMenu")
    @ResponseBody
    public List<Menu> getMenuTree(HttpServletRequest request){
        String parentId=request.getParameter("parent");
        Map map=new HashMap();
        map.put("parentId",parentId);
        List<Menu> result=menuService.getMenuTree(map);
        return result;
    }
}
