package com.howei.service.impl;


import com.howei.pojo.Project;
import com.howei.pojo.Week;
import com.howei.pojo.Weekly;
import com.howei.mapper.UsersMapper;
import com.howei.mapper.WeeklyMapper;
import com.howei.service.WeeklyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeeklyServiceImpl implements WeeklyService {

    @Autowired
    WeeklyMapper weeklymapper;

    @Autowired
    UsersMapper usermapper;

    @Override
    public Weekly[] getWeeklys(int year, int week, int type, int project) {

        Weekly[] weeklys = weeklymapper.getWeeklys(year, week, type, project);
        return weeklys;
    }

    @Override
    public Weekly[] getWeeklysByWeekId(int weekId) {
        Weekly[] weeklys = weeklymapper.getWeeklysByWeekId(weekId);
        return weeklys;
    }


    @Override
    public Weekly getWeekly(int id) {
        Weekly weekly = weeklymapper.getWeekly(id);
        return weekly;
    }

    @Override
    public Week getWeek(int year, int week, int type, int project) {
        Week weeks = weeklymapper.getWeek(year, week, type, project);
        System.out.println(weeks);
        if (weeks == null) {
            Week week1 = new Week();
            week1.setType(type);
            week1.setWeek(week);
            week1.setYear(year);
            week1.setProjectId(project);
            week1.setName("");
            week1.setAuditor("");
            week1.setFillIn("");
            return week1;
        }
        String auditor = weeks.getAuditor();
        if (!"".equals(auditor)) {
            String[] auditors = auditor.split(";");

            String[] auditorName = new String[auditors.length];
            for (int i = 0; i < auditors.length; i++) {
                auditorName[i] = usermapper.getNameByUserName(auditors[i]);
            }
            weeks.setAuditorName(auditorName);
        }
        String fillIn = weeks.getFillIn();
        if (!"".equals(fillIn)) {
            String[] fillIns = fillIn.split(";");
            String[] fillInName = new String[fillIns.length];
            for (int i = 0; i < fillIns.length; i++) {
                fillInName[i] = usermapper.getNameByUserName(fillIns[i]);
            }
            weeks.setFillInName(fillInName);
        }
        return weeks;
    }

    @Override
    public Week getWeekById(int id) {
        Week week = weeklymapper.getWeekById(id);

        String auditor = week.getAuditor();
        if (!"".equals(auditor)) {
            String[] auditors = auditor.split(";");
            System.out.println(auditors.length);
            String[] auditorName = new String[auditors.length];
            for (int i = 0; i < auditors.length; i++) {
                auditorName[i] = usermapper.getNameByUserName(auditors[i]);
            }
            week.setAuditorName(auditorName);
        }
        String fillIn = week.getFillIn();
        if (!"".equals(fillIn)) {
            String[] fillIns = fillIn.split(";");
            System.out.println(fillIns.length);
            String[] fillInName = new String[fillIns.length];
            for (int i = 0; i < fillIns.length; i++) {
                fillInName[i] = usermapper.getNameByUserName(fillIns[i]);
            }
            week.setFillInName(fillInName);
        }
        return week;
    }

    @Override
    public Week[] getWeeks(int project) {
        Week[] weeks = weeklymapper.getWeeks(project);
        for (Week week : weeks) {
            String auditor = week.getAuditor();
            if (!"".equals(auditor)) {
                String[] auditors = auditor.split(";");
                String[] auditorName = new String[auditors.length];
                for (int i = 0; i < auditors.length; i++) {
                    auditorName[i] = usermapper.getNameByUserName(auditors[i]);
                }
                week.setAuditorName(auditorName);
            }
            String fillIn = week.getFillIn();
            if (!"".equals(fillIn)) {
                String[] fillIns = fillIn.split(";");
                String[] fillInName = new String[fillIns.length];
                for (int i = 0; i < fillIns.length; i++) {
                    fillInName[i] = usermapper.getNameByUserName(fillIns[i]);
                }
                week.setFillInName(fillInName);
            }
        }

        return weeks;
    }


    @Override
    public int delWeek(int id) {
        int num = weeklymapper.delWeek(id);
        return num;
    }


    @Override
    public int insertWeekly(Weekly weekly) {
        int num = weeklymapper.insertWeekly(weekly);
        return num;
    }

    @Override
    public int updateWeekly(Weekly weekly) {
        int num = weeklymapper.updateWeekly(weekly);
        return num;
    }

    @Override
    public int changeWeek(Week week) {
        if (week.getId() == 0) {
            int num = weeklymapper.insertWeek(week);
            return num;
        } else {
            int num = weeklymapper.updateWeek(week);
            return num;
        }
    }


    @Override
    public Project[] getProject() {
        return weeklymapper.getProject();
    }

    @Override
    public Project[] getProject2(String userName) {
        return weeklymapper.getProject2(userName);
    }


    @Override
    public Project[] getProject1(String userName) {
        //String projectId = weeklymapper.getProjectId(userName);
        //String[] projectIds = projectId.split(",");
        return weeklymapper.getProject1();
    }

    @Override
    public int addFillIn(Week week) {
        if (week.getId() == 0) {
            int num = weeklymapper.insertWeekByFillIn(week);
            return num;
        } else {
            int num = weeklymapper.addFillIn(week);
            return num;
        }
    }

    @Override
    public int delFillIn(int id, String userName) {
        Week week = new Week();
        week.setId(id);
        week.setFillIn(userName);
        int num = weeklymapper.addFillIn(week);
        return num;
    }

    @Override
    public int addAuditor(Week week) {
        if (week.getId() == 0) {
            int num = weeklymapper.insertWeekByAuditor(week);
            return num;
        } else {
            int num = weeklymapper.addAuditor(week);
            return num;
        }
    }

    @Override
    public int delAuditor(int id, String userName) {
        Week week = new Week();
        week.setId(id);
        week.setFillIn(userName);
        int num = weeklymapper.addAuditor(week);
        return num;
    }

}
