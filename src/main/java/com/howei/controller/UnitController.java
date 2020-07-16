package com.howei.controller;

import com.howei.pojo.Equipment;
import com.howei.pojo.Unit;
import com.howei.service.UnitService;
import com.howei.util.EasyuiResult;
import com.howei.util.Page;
import com.howei.util.PinYin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/guide/unit")
//@RequestMapping("/unit")
public class UnitController {

    @Autowired
    UnitService unitService;

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
    public EasyuiResult getUnitList(HttpServletRequest request){
        String page=request.getParameter("page");
        String rows=request.getParameter("rows");
        String mold=request.getParameter("mold");
        int offset=Page.getOffSet(page,rows);
        Map map=new HashMap();
        map.put("mold",mold);
        int count=unitService.getUnitListCount(map);
        map.put("page",offset);
        map.put("pageSize",rows);
        List<Unit> unit=unitService.getUnitList(map);
        EasyuiResult easy=new EasyuiResult();
        easy.setTotal(count);
        easy.setRows(unit);
        return easy;
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
        int index=0;
        String result="";
        Map map=new HashMap();
        map.put("nuit",nuit);
        map.put("type",type);
        index=unitService.findUnit(map);
        if(index>0){
            result="系统中已存在此名称";
            list.add(result);
            return list;
        }
        if(id!=null&&id!=""){
            map.put("id",id);
            index=unitService.updUnit(map);
            if(index>0){
                result="已更新";
            }else{
                result="操作失败,请联系技术人员";
            }
        }else{
            Unit unit=new Unit();
            unit.setNuit(nuit);
            unit.setType(type);
            unit.setCode(0);
            unit.setMold(Integer.parseInt(mold));
            String english=PinYin.ToPinyin(type);
            unit.setEnglish(english);
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
     * 下拉框动态赋值
     * @param request
     * @return
     */
    @RequestMapping("/getUnitLike")
    @ResponseBody
    public List<Map<String,Object>> getUnitLike(HttpServletRequest request){
        String type=request.getParameter("q");
        List<Unit> unit;
        List<Map<String,Object>> list=new ArrayList<>();
        if(type==null||type.equals("")){
            unit=unitService.getUnitMap();
        }else{
            String english=PinYin.ToPinyin(type);
            unit=unitService.getUnitMap2(type,english);
        }

        if(unit!=null){
            for(Unit u:unit){
                Map<String,Object> map= new HashMap<>();
                map.put("type",u.getType());
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
}
