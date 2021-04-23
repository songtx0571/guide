package com.howei.mapper;


import com.howei.pojo.Defect;
import com.howei.pojo.Project;
import com.howei.pojo.Week;
import com.howei.pojo.Weekly;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface WeeklyMapper {

    Weekly[] getWeeklys(@Param("year") int year, @Param("week") int week, @Param("type") int type, @Param("project") int project);

    Weekly[] getWeeklysByWeekId(@Param("weekId") int weekId);

    Weekly getWeekly(@Param("id") int id);

    Week getWeek(@Param("year") int year, @Param("week") int week, @Param("type") int type, @Param("project") int project);

    Week getWeekById(@Param("id") int id);

    Week[] getWeeks(@Param("project") int project);

    int insertWeekly(@Param("weekly") Weekly weekly);

    int updateWeekly(@Param("weekly") Weekly weekly);

    int insertWeek(@Param("week") Week week);

    int updateWeek(@Param("week") Week week);

    int delWeek(@Param("id") int id);

    Project[] getProject();

    Project[] getProject2(@Param("userNumber") String userNumber);

    Project[] getProject1();

    String getProjectId(@Param("userNumber") String userNumber);

    int addFillIn(@Param("week") Week week);

    int insertWeekByFillIn(@Param("week") Week week);

    int addAuditor(@Param("week") Week week);

    int insertWeekByAuditor(@Param("week") Week week);

    List<Defect> getDefectList(Map map);
}
