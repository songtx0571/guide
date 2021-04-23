package com.howei;

import com.howei.pojo.Unit;
import com.howei.pojo.WorkPerator;
import com.howei.service.AiConfigurationDataService;
import com.howei.service.DataConfigurationService;
import com.howei.service.UnitService;
import com.howei.service.WorkPeratorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootTest
class GuideApplicationTests {

    /*@Test
    void contextLoads() {

    }*/
    @Test
    public void a(){
        String today = "2013-01-14";
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = format.parse(today);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(date);

        System.out.println(calendar.get(Calendar.WEEK_OF_YEAR));
    }

}
