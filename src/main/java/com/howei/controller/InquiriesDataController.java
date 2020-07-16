package com.howei.controller;

import com.howei.pojo.InquiriesData;
import com.howei.pojo.InquiriesDataV;
import com.howei.pojo.PostPeratorData;
import com.howei.pojo.Users;
import com.howei.service.PostPeratorDataService;
import com.howei.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 查询数据
 */
@Controller
@RequestMapping("/guide/inquiries")
//@RequestMapping("/inquiries")
public class InquiriesDataController {

    @Autowired
    PostPeratorDataService postPeratorDataService;

    @Autowired
    UserService userService;

    /**
     * 跳转查询数据页面
     * @return
     */
    @RequestMapping("/toData")
    public String toData(){
        return "inquiriesData";
    }

    /**
     * 根据系统名称+设备名称查询测点数据
     * @param request
     * @return
     */
    @RequestMapping("/getInquiriesData")
    @ResponseBody
    public List<InquiriesData> getInquiriesData(HttpServletRequest request){
        String name=request.getParameter("name");
        String depart=request.getParameter("departName");
        List<InquiriesData> result=new ArrayList<>();
        if(name!=null&&!name.equals("")){
            Map map2=new HashMap();
            map2.put("equipment",name);
            map2.put("projectDepartment",depart);
            List<Map> list=postPeratorDataService.selTypeByName(map2);
            InquiriesData inquiriesData;
            for(int i=0;i<list.size();i++){
                inquiriesData=new InquiriesData();
                Map map=list.get(i);
                String measuringType=(String)map.get("measuringType");
                Map m=new HashMap();
                m.put("equipment",name);
                m.put("measuringType",measuringType);
                m.put("projectDepartment",depart);
                List<PostPeratorData> postPeratorDataList=postPeratorDataService.selByName(m);
                List<InquiriesDataV> inquiriesDataVList=new ArrayList<>();
                for(int k=0;k<postPeratorDataList.size();k++){
                    PostPeratorData postPeratorData= postPeratorDataList.get(k);
                    InquiriesDataV inquiriesDataV=new InquiriesDataV();
                    inquiriesDataV.setDateTime(postPeratorData.getCreated());//时间
                    inquiriesDataV.setData(postPeratorData.getMeasuringTypeData());//测点类型
                    inquiriesDataV.setUnit(postPeratorData.getUnit());//单位
                    Users user=userService.findById(postPeratorData.getCreatedBy()+"");
                    if(user!=null){
                        inquiriesDataV.setCreatedBy(user.getName());
                    }else{
                        inquiriesDataV.setCreatedBy("");
                    }
                    inquiriesDataVList.add(inquiriesDataV);
                }
                inquiriesData.setDataName(measuringType);
                inquiriesData.setDataType(inquiriesDataVList);
                result.add(inquiriesData);
            }
        }
        return result;
    }
}
