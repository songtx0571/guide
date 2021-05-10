package com.howei.controller;

import com.howei.pojo.Company;
import com.howei.pojo.Department;
import com.howei.pojo.Unit;
import com.howei.service.CompanyService;
import com.howei.service.DepartmentService;
import com.howei.service.UnitService;
import com.howei.util.*;
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

@Controller
@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8080","http://192.168.1.27:8848"},allowCredentials = "true")
@RequestMapping("/guide/unit")
//@RequestMapping("/unit")
public class UnitController {

    @Autowired
    UnitService unitService;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    CompanyService companyService;

    /**
     * 跳转单位页面
     * @return
     */
    @RequestMapping("/toUnit")
    public String toUnit(){
        return "unit";
    }

    /**
     * 跳转测点页面
     * @return
     */
    @RequestMapping("/toSightPoint")
    public String toSightPoint(){
        return "sightpoint";
    }

    /**
     * 查询列表
     * @param request
     * @return
     */
    @RequestMapping("/getUnitList")
    @ResponseBody
    public Result getUnitList(HttpServletRequest request){
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);
        String mold=request.getParameter("mold");
        String depart=request.getParameter("department");
        Map map=new HashMap();
        map.put("mold",mold);
        if(depart!=null&&!depart.equals("")){
            map.put("department",depart);
        }
        int count=unitService.getUnitListCount(map);
        map.put("pageSize",limit);
        map.put("page",rows);
        List<Unit> unit=unitService.getUnitList(map);
        for(Unit unit1 : unit){
            Company company=companyService.getCompanyById(String.valueOf(unit1.getDepartment()));
            unit1.setDepartmentName(company.getName());
        }
        WebSocket webSocket=new WebSocket();
        webSocket.sendMessage("你好");
        Result result=new Result();
        result.setCount(count);
        result.setData(unit);
        return result;
    }

    /**
     * 查询属性
     * @param request
     * @return
     */
    @RequestMapping("/findUnit")
    @ResponseBody
    public Unit findUnit(HttpServletRequest request){
        String id=request.getParameter("id");
        if(id!=null){
            Unit unit=unitService.findUnitById(Integer.parseInt(id));
            Company company=companyService.getCompanyById(unit.getDepartment()+"");
            unit.setDepartmentName(company.getName());
            return unit;
        }
        return null;
    }

    /**
     * 添加/修改
     * @param request
     * @return
     */
    @RequestMapping("/addUnit")
    @ResponseBody
    public List<String> addUnit(HttpServletRequest request){
        List<String> list=new ArrayList<String>();
        String nuit=request.getParameter("nuit");
        String type=request.getParameter("type");
        String id=request.getParameter("id");
        String mold=request.getParameter("mold");
        String depart=request.getParameter("depart");
        String bothType=request.getParameter("bothType");//1:人工；2:ai
        int index=0;
        String result="";
        Map map=new HashMap();
        if(id!=null&&id!=""){//修改
            map.put("nuit",nuit);
            map.put("type",type);
            if(depart!=null){
                Map map1=new HashMap();
                map1.put("departmentName",depart);
                Department department=departmentService.selByMapParam(map1);
                if(department!=null){
                    map.put("depart",department.getId());
                }
            }
            index=unitService.findUnit(map);
            if(index>0){
                result="系统中已存在此名称";
                list.add(result);
                return list;
            }
            map.put("id",id);
            index=unitService.updUnit(map);
            if(index>0){
                result="已更新";
            }else{
                result="操作失败,请联系技术人员";
            }
        }else{//添加
            map.put("nuit",nuit);
            map.put("type",type);
            map.put("depart",depart);
            index=unitService.findUnit(map);
            if(index>0){
                result="系统中已存在此名称";
                list.add(result);
                return list;
            }
            Unit unit=new Unit();
            unit.setNuit(nuit);
            unit.setType(type);
            unit.setCode(0);
            unit.setMold(Integer.parseInt(mold));
            unit.setDepartment(Integer.parseInt(depart));
            unit.setBothType(Integer.parseInt(bothType));
            int key=unitService.addUnit(unit);
            if(key>0){
                result="添加成功";
            }else{
                result="操作失败,请联系技术人员";
            }
        }
        list.add(result);
        return list;
    }

    /**
     * 下拉框属性
     * @return
     */
    @RequestMapping("/getUnitMap")
    @ResponseBody
    public List<Map<String,Object>> getUnitMap(){
        List<Map<String,Object>> list=new ArrayList<>();
        List<Unit> unit=unitService.getUnitMap();
        if(unit!=null){
            for(int i=0;i<unit.size();i++){
                Unit u=unit.get(i);
                Map<String,Object> map= new HashMap<>();
                map.put("type",u.getType());
                map.put("id",i);
                list.add(map);
            }
        }
        return list;
    }

    /**
     * 删除
     * @return
     */
    @RequestMapping("/delUnit")
    @ResponseBody
    public List<String> delUnit(HttpServletRequest request){
        String id=request.getParameter("id");
        List<String> list=new ArrayList<>();
        String result="";
        if(id!=null){
            unitService.delUnit(Integer.parseInt(id));
            Unit unit=unitService.findUnitById(Integer.parseInt(id));
            if(unit!=null){
                result="error";
            }else{
                result="success";
            }
            list.add(result);
        }
        return  list;
    }

    /**
     * 下拉框属性
     * 获取测点类型
     * @param request
     * @return
     */
    @RequestMapping("/getUnityMap")
    @ResponseBody
    public List<Map<String,Object>> getUnityMap(HttpServletRequest request){
        String mold=request.getParameter("mold");
        String departName=request.getParameter("departName");
        String name=request.getParameter("name");
        List<Map<String,Object>> result=new ArrayList<>();
        Map map1=new HashMap();
        map1.put("type",mold);
        List<Unit> list=unitService.getUnityMap(map1);
        for(int i=0;i<list.size();i++){
            Map map=new HashMap();
            Unit unit=list.get(i);
            String unitName=unit.getNuit();
            map.put("id",i);
            map.put("text",unitName);
            result.add(map);
        }
        return result;
    }

}
