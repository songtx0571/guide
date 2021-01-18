package com.howei;

import com.howei.controller.TemplateController;
import com.howei.pojo.Unit;
import com.howei.pojo.WorkPerator;
import com.howei.service.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@SpringBootTest(classes = GuideApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DisplayName("Junit5单元测试")
public class UnitTest {

    @Autowired
    WorkPeratorService workPeratorService;

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    UnitService unitService;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    CompanyService companyService;

    @Autowired
    DataConfigurationService dataConfigurationService;

    @Autowired
    AiConfigurationDataService aiConfigurationDataService;

    /**
     * 获取测点类型
     * @return
     */
    @Test
    @DisplayName("测试组合断言")
    public void test(){
        String type="2";
        String postPeratorId="956";
        String dataType="1";
        List<Map<String,Object>> list=new ArrayList<>();
        List<?> unitList=new ArrayList<>();
        WorkPerator workPerator=workPeratorService.selWorkperator(postPeratorId);
        Map map1=new HashMap();
        if(workPerator!=null) {
            //map1.put("department",workPerator.getProjectDepartment());
            map1.put("department",18);
        }
        if(type.equals("1")){
            map1.put("type",'1');
        }else if(type.equals("2")){
            map1.put("type",'2');
        }

        if(dataType!=null){
            if(dataType.equals("0")){//人工数据
                unitList=unitService.getUnityMap(map1);
            }else if(dataType.equals("1")){//ai数据
                unitList = dataConfigurationService.getMeasuringType(map1);
            }
        }
        if(unitList!=null){
            for(int i=0;i<unitList.size();i++){
                Unit unit=(Unit)unitList.get(i);
                Map<String,Object> map=new HashMap<>();
                map.put("id",unit.getId());
                map.put("name",unit.getNuit());//获取测点
                System.out.println("id:"+unit.getId()+"   "+"name:"+unit.getNuit());
                list.add(map);
            }
        }
    }
}
