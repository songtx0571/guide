package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Menu;
import com.howei.pojo.Permission;
import com.howei.pojo.Users;
import com.howei.service.MenuService;
import com.howei.service.PermissionService;
import com.howei.util.MenuTree;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8080","http://192.168.1.27:8848"},allowCredentials = "true")
@RequestMapping("/guide/menu")
//@RequestMapping("/menu")
public class MenuController {

    @Autowired
    MenuService menuService;

    @Autowired
    PermissionService permissionService;

    @RequestMapping("/getMenuTree")
    @ResponseBody
    public String getMenuTree(HttpServletRequest request){
        String id= request.getParameter("id");
        Map map=new HashMap();
        map.put("parentId",id);
        List<MenuTree> resultList=new ArrayList<>();
        List<Menu> menuList=menuService.getMenuTree(map);
        for(Menu menu:menuList){
            MenuTree menuTree=new MenuTree();
            menuTree.setId(String.valueOf(menu.getId()));
            menuTree.setText(menu.getName());
            menuTree.setState("close");
            menuTree.setpId(String.valueOf(menu.getParent()));
            menuTree.setIconCls("icon-bullet-blue");
            menuTree.setUrl(menu.getUrl());
            resultList.add(menuTree);
        }
        String json = JSON.toJSONString(resultList);
        return json;
    }
}
