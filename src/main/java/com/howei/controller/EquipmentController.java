package com.howei.controller;

import com.howei.pojo.Company;
import com.howei.pojo.Department;
import com.howei.pojo.Equipment;
import com.howei.service.CompanyService;
import com.howei.service.DepartmentService;
import com.howei.service.EquipmentService;
import com.howei.util.EasyuiResult;
import com.howei.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@CrossOrigin(origins={"http://192.168.1.27:8082","http:localhost:8080","http://192.168.1.27:8848"},allowCredentials = "true")
@Controller
@RequestMapping("/guide/equipment")
//@RequestMapping("/equipment")
public class EquipmentController {

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    CompanyService companyService;

    @Autowired
    DepartmentService departmentService;
    /**
     * 跳转设备页面
     * @return
     */
    @RequestMapping("/toEquipment")
    public String toEquipment(){

        return "equipment";
    }

    /**
     * 跳转系统页面
     * @return
     */
    @RequestMapping("/toSystem")
    public String toSystem(){

        return "system";
    }

    /**
     * 创建设备:获取设备列表
     * @return
     */
    @RequestMapping("/getEquipmentList")
    @ResponseBody
    public EasyuiResult getEquipmentList(HttpServletRequest request){
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        String type=request.getParameter("type");
        String depar=request.getParameter("department");
        int offset=Page.getOffSet(page,rows);
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("type",type);
        if(depar!=null&&!depar.equals("")){
            map.put("department",depar);
        }
        List<Equipment> total=equipmentService.getEquipmentList(map);
        map.put("page",offset);
        map.put("pageSize",rows);
        List<Equipment> result=equipmentService.getEquipmentList(map);
        for(Equipment equipment : result){
            Company company =companyService.getCompanyById(String.valueOf(equipment.getDepartment()));
            equipment.setDepartmentName(company.getName());
        }
        EasyuiResult easy=new EasyuiResult();
        easy.setTotal(total.size());
        easy.setRows(result);
        return easy;
    }

    /**
     * 下拉框属性
     * @return
     */
    @RequestMapping("/getEquMap")
    @ResponseBody
    public List<Map<String,Object>> getEquMap(HttpServletRequest request){
        List<Map<String,Object>> list=new ArrayList<>();
        String type=request.getParameter("type");
        String department=request.getParameter("departName");
        Map souMap=new HashMap();
        if(department!=null&&!department.equals("")){
            souMap.put("department",department);
        }
        souMap.put("type",type);
        List<Equipment> equ=equipmentService.getEquMap(souMap);
        if(equ!=null){
            for(int i=0;i<equ.size();i++){
                Equipment equipment=equ.get(i);
                Map<String,Object> map= new HashMap<>();
                map.put("text",equipment.getName());
                map.put("id",i);
                list.add(map);
            }
        }
        return list;
    }

    /**
     * 添加/更新系统号/设备
     * @param request
     * @return
     */
    @RequestMapping("/addEquipment")
    @ResponseBody
    public List<String> addEquipment(HttpServletRequest request){
        List<String> list=new ArrayList<String>();
        String name=request.getParameter("name");
        String type=request.getParameter("type");
        String depart=request.getParameter("depart");
        String id=request.getParameter("id");
        int index=0;
        String result="";
        Map map=new HashMap();
        if(id!=null&&id!=""){//修改
            //判断系统表中是否存在此名称
            map.put("name",name);
            map.put("type",Integer.parseInt(type));
            if(depart!=null){
                Map map1=new HashMap();
                map1.put("departmentName",depart);
                Department department=departmentService.selByMapParam(map1);
                if(department!=null){
                    map.put("depart",department.getId());
                }
            }
            index=equipmentService.findEquipment(map);
            if(index>0){
                result="系统中已存在此名称";
                list.add(result);
                return list;
            }
            //修改
            map.put("id",id);
            index=equipmentService.updEquipment(map);
            if(index>0){
                result="已更新";
            }else{
                result="操作失败,请联系技术人员";
            }
        }else{//添加
            //判断系统表中是否存在此名称
            map.put("name",name);
            map.put("type",Integer.parseInt(type));
            map.put("depart",depart);
            index=equipmentService.findEquipment(map);
            if(index>0){
                result="系统中已存在此名称";
                list.add(result);
                return list;
            }
            //添加
            Equipment equipment=new Equipment();
            equipment.setName(name);
            equipment.setType(Integer.parseInt(type));
            equipment.setDepartment(Integer.parseInt(depart));
            int key=equipmentService.addEquipment(equipment);
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
     * 通过id查询
     * @param request
     * @return
     */
    @RequestMapping("/findEquipment")
    @ResponseBody
    public Equipment findEquipment(HttpServletRequest request){
        String id=request.getParameter("id");
        if(id!=null){
            Equipment equipment=equipmentService.findEquipmentById(Integer.parseInt(id));
            Company company=companyService.getCompanyById(equipment.getDepartment()+"");
            equipment.setDepartmentName(company.getName());
            return equipment;
        }else{
            return null;
        }
    }

    /**
     * 删除
     * @param request
     * @return
     */
    @RequestMapping("/delEquipment")
    @ResponseBody
    public List<String> delEquipment(HttpServletRequest request){
        String id=request.getParameter("id");
        List<String> list=new ArrayList<>();
        String result="";
        if(id!=null){
            equipmentService.delEquipment(Integer.parseInt(id));
            Equipment equipment=equipmentService.findEquipmentById(Integer.parseInt(id));
            if(equipment!=null){
                result="error";
            }else{
                result="success";
            }
            list.add(result);
        }
        return  list;
    }
}
