package com.howei;

import com.howei.controller.TemplateController;
import com.howei.pojo.*;
import com.howei.service.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.DataSizeUnit;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@SpringBootTest(classes = GuideApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DisplayName("测试")
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

    @Autowired
    WeeklyService weeklyService;

    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    DefectService defectService;

    /**
     * 获取测点类型
     * @return
     */
    //@Test
    @DisplayName("巡检数据来源")
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

    //@Test
    @DisplayName("获取周期")
    public void a(){
        String today = "2021-04-16";
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
        Date date1=null;
        try {
            date1=dateFormat.parse(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //获取一个Calendar对象
        Calendar calendar = Calendar.getInstance();
        //设置星期一为一周开始的第一天
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(date1);
        //设置在一年中第一个星期所需最少天数
        calendar.setMinimalDaysInFirstWeek(4);
        //格式化日期
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = null;
        try {
            parse = simpleDateFormat.parse(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        calendar.setTime(parse);
        //获得当前日期属于今年的第几周
        int weekOfYear = calendar.get(Calendar.WEEK_OF_YEAR);
        System.out.println(weekOfYear);
        //获得当前的年
        int weekYear = calendar.get(Calendar.YEAR);
        calendar.setWeekDate(weekYear, weekOfYear, 2);//获得指定年的第几周的开始日期
        long starttime = calendar.getTime().getTime();//创建日期的时间该周的第一天，
        calendar.setWeekDate(weekYear, weekOfYear, 1);//获得指定年的第几周的结束日期
        long endtime = calendar.getTime().getTime();
        String dateStart = simpleDateFormat.format(starttime);//将时间戳格式化为指定格式
        String dateEnd = simpleDateFormat.format(endtime);
        System.out.println(dateStart);
        System.out.println(dateEnd);
    }

   // @Test
    @DisplayName("获取管理用户")
    public void getUserMap(){
        Integer employeeId=230;
        String empIdStr = "";
        List<Employee> rootList = employeeService.getEmployeeByManager(employeeId);
        if (rootList != null) {
            empIdStr += employeeId + ",";
            List<Employee> empList = employeeService.getEmployeeByManager(0);
            for (Employee employee : rootList) {
                empIdStr += employee.getId() + ",";
                empIdStr += getUsersId(employee.getId(), empList);
            }
        }
        if (empIdStr != null && !empIdStr.equals("")) {
            empIdStr = empIdStr.substring(0, empIdStr.lastIndexOf(","));
        }
        Map map = new HashMap();
        map.put("empId", empIdStr);
        List<Map<String,Object>> list=employeeService.getEmpMap(map);
        for (int i = 0; i < list.size(); i++) {
            Map map2=list.get(i);
            System.out.println(map2.get("text"));
        }
    }

    public String getUsersId(Integer empId,List<Employee> empList){
        List<String> result=new ArrayList<>();
        String userId="";
        String usersId="";
        for(Employee employee:empList){
            if(employee.getManager()!=null||employee.getManager()!=0){
                if(employee.getManager().equals(empId)){
                    usersId+=employee.getId()+",";
                    result.add(employee.getId()+"");
                }
            }
        }
        for(String str:result){
            String userId1=getUsersId(Integer.parseInt(str),empList);
            if(userId1!=null&&!userId1.equals("")){
                userId+=userId1;
            }
        }
        if(userId!=null&&!userId.equals("null")){
            usersId+=userId;
        }
        return usersId;
    }

    //@Test
    @DisplayName("修改工时")
    public void upd()throws ParseException{

        List<Defect> list=defectService.getDefectList(new HashMap());
        if(list!=null){
            for (int i = 0; i <list.size() ; i++) {
                Defect defect=list.get(i);
                if(defect!=null){
                    String sTime=defect.getRealSTime();//开始时间
                    String eTime=defect.getRealETime();//结束时间
                    Double planndeTime=defect.getPlannedWork();
                    if(sTime!=null && eTime!=null && !sTime.equals("") && !eTime.equals("")){
                        Double bothNH=com.howei.util.DateFormat.getBothNH(sTime,eTime);
                        if(planndeTime!=null && !planndeTime.equals("")){
                            if(planndeTime<bothNH){
                                defect.setRealExecuteTime(planndeTime);
                            }else{
                                defect.setRealExecuteTime(bothNH);
                            }
                        }else{
                            defect.setRealExecuteTime(bothNH);
                        }
                        System.out.println("执行记录:"+i+" ;id="+defect.getId());
                        defectService.updDefect(defect);
                    }
                }
            }
        }
    }

    @Test
    @DisplayName("修改工时")
    public void updEqu(){
        Integer departmentId=17;
        Integer type=1;
        String nameB="氨水储存";//修改前名称
        String nameA="氨水储存系统";//修改后名称
        Map map=new HashMap();
        map.put("departmentId",departmentId);
        map.put("type",type);
        map.put("nameB",nameB);
        map.put("nameA",nameA);
        /*workPeratorService.getTemplateChildList();

        if(result>0){
            System.out.println("修改成功！");
        }*/
    }

}
