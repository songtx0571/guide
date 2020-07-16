package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Menu;
import com.howei.pojo.Permission;
import com.howei.service.MenuService;
import com.howei.service.PermissionService;
import com.howei.util.MenuTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/guide/menu")
//@RequestMapping("/menu")
public class MenuController {

    @Autowired
    MenuService menuService;

    @Autowired
    PermissionService permissionService;

    @RequestMapping("/getMenuTree")
    @ResponseBody
    public String getMenuTree(HttpSession session, HttpServletRequest request){
        Integer userId=(Integer)session.getAttribute("userId");
        String id= request.getParameter("id");
        List<Permission> list=permissionService.selByUserId(userId);
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
        map.put("parentId",id);
        map.put("isAdmin",isAdmin);
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
