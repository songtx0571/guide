package com.howei.service;


import com.howei.pojo.Defect;
import com.howei.pojo.Project;
import com.howei.pojo.Week;
import com.howei.pojo.Weekly;

import java.util.List;
import java.util.Map;

public interface WeeklyService {

    Weekly[] getWeeklys(int year, int week, int type, int project);

    Weekly[] getWeeklysByWeekId(int weekId);

    Weekly getWeekly(int id);

    Week getWeek(int year, int week, int type, int project);

    Week getWeekById(int id);

    Week[] getWeeks(int project);

    int insertWeekly(Weekly weekly);

    int updateWeekly(Weekly weekly);

    int delWeek(int id);

    int changeWeek(Week week);

    Project[] getProject();

    Project[] getProject2(String userName);

    Project[] getProject1(String userName);


    int addFillIn(Week week);

    int delFillIn(int id, String userName);

    int addAuditor(Week week);

    int delAuditor(int id, String userName);

    List<Defect> getDefectList(Map map);
}
