package com.howei.controller;


import com.howei.pojo.Project;
import com.howei.pojo.Week;
import com.howei.pojo.Weekly;
import com.howei.service.WeeklyService;
import com.howei.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("WeeklyController")
public class WeeklyController {


    @Autowired
    WeeklyService weeklyService;

    @RequestMapping("Weekly")
    public ModelAndView Weekly() {
        ModelAndView view = new ModelAndView();
        view.setViewName("weekly2");
        return view;
    }


    @RequestMapping("runningWeekly")
    public ModelAndView runningWeekly() {
        ModelAndView view = new ModelAndView();
        view.setViewName("runningWeekly2");
        return view;
    }


    @RequestMapping("Weeks")
    public ModelAndView Weeks(int id, int type) {
        ModelAndView view = new ModelAndView();
        if (type == 3) {
            view.setViewName("runningWeeklyRecord2");
        } else {
            view.setViewName("weeklyRecord2");
        }
        view.addObject("id", id);
        return view;
    }

    @RequestMapping("getWeeks")
    public JsonResult getWeeks(int project) {
        Week[] weeks = weeklyService.getWeeks(project);
        return new JsonResult(weeks);
    }


    @RequestMapping("WeeklyRecord")
    public ModelAndView WeeklyRecord() {

        ModelAndView view = new ModelAndView();
        view.setViewName("weeks2");
        return view;
    }


    @RequestMapping("find")
    public JsonResult find(int year, int week, int type, int project) {
        Weekly[] weeklys = weeklyService.getWeeklys(year, week, type, project);
        return new JsonResult(weeklys);
    }

    @RequestMapping("find1")
    public JsonResult find1(int id) {
        Weekly[] weeklys = weeklyService.getWeeklysByWeekId(id);
        return new JsonResult(weeklys);
    }

    @RequestMapping("findWeek")
    public JsonResult findWeek(int year, int week, int type, int project) {
        Week weeks = weeklyService.getWeek(year, week, type, project);
        return new JsonResult(weeks);
    }

    @RequestMapping("findWeek1")
    public JsonResult findWeek1(int id) {
        Week weeks = weeklyService.getWeekById(id);
        return new JsonResult(weeks);
    }


    @RequestMapping("add")
    public ModelAndView add(int type, int weekId) {
        ModelAndView view = new ModelAndView();
        view.addObject("type", type);
        view.addObject("weekId", weekId);
        if (type == 2) {
            view.setViewName("weeklyadd2");
        } else if (type == 3) {
            view.setViewName("weeklyadd3");
        } else if (type == 4) {
            view.setViewName("weeklyadd4");
        } else if (type == 5) {
            view.setViewName("weeklyadd5");
        } else if (type == 6) {
            view.setViewName("weeklyadd6");
        } else {
            view.setViewName("weeklyadd1");
        }
        return view;
    }


    @RequestMapping("runningAdd")
    public ModelAndView runningAdd(int type, int weekId) {
        ModelAndView view = new ModelAndView();
        view.addObject("type", type);
        view.addObject("weekId", weekId);
        if (type < 8 && type > 1) {
            view.setViewName("runningWeeklyadd1");
        } else if (type == 8 || type == 10) {
            view.setViewName("runningWeeklyadd2");
        } else if (type == 17) {
            view.setViewName("runningWeeklyadd4");
        } else {
            view.setViewName("runningWeeklyadd3");
        }
        return view;
    }

    @RequestMapping("del")
    public JsonResult del(int id) {
        int num = weeklyService.delWeek(id);
        return new JsonResult(num);
    }

    @RequestMapping("updWeek")
    public ModelAndView updWeek(int year, int week, int type, int project) {
        ModelAndView view = new ModelAndView();
        Week weeks = weeklyService.getWeek(year, week, type, project);
        view.addObject("week", weeks);
        view.setViewName("weekupd2");
        return view;
    }


    @RequestMapping("addAuditor")
    public JsonResult addAuditor(int id, int type, int projectId, int week, int year, String userName) {

        Week weeks = new Week(id, projectId, year, week, type, userName);
        int num = weeklyService.addAuditor(weeks);
        return new JsonResult(num);
    }

    @RequestMapping("delAuditor")
    public JsonResult delAuditor(int id, String userName) {
        int num = weeklyService.delAuditor(id, userName);
        return new JsonResult(num);
    }

    @RequestMapping("addFillIn")
    public JsonResult addFillIn(int id, int type, int projectId, int week, int year, String userName) {

        Week weeks = new Week(id, projectId, year, week, type, userName);
        int num = weeklyService.addFillIn(weeks);
        return new JsonResult(num);
    }

    @RequestMapping("delFillIn")
    public JsonResult delFillIn(int id, String userName) {


        int num = weeklyService.delFillIn(id, userName);
        return new JsonResult(num);
    }


    @RequestMapping("changeWeek")
    public JsonResult changeWeek(int id, int type, int project, int week, int year, String name, String fillIn, String auditor) {
        Week weeks = new Week(id, name, project, year, week, type, fillIn, auditor);
        int num = weeklyService.changeWeek(weeks);
        return new JsonResult(num);
    }


    @RequestMapping("runningUpd")
    public ModelAndView runningUpd(int id, int type) {
        ModelAndView view = new ModelAndView();
        Weekly weekly = weeklyService.getWeekly(id);
        view.addObject("weekly", weekly);
        if (type < 8 && type > 1) {
            view.setViewName("runningWeeklyupd1");
        } else if (type == 8 || type == 10) {
            view.setViewName("runningWeeklyupd2");
        } else if (type == 17) {
            view.setViewName("runningWeeklyupd4");
        } else {
            view.setViewName("runningWeeklyupd3");
        }
        return view;
    }

    @RequestMapping("upd")
    public ModelAndView upd(int id, int type) {
        ModelAndView view = new ModelAndView();
        Weekly weekly = weeklyService.getWeekly(id);
        view.addObject("weekly", weekly);
        if (type == 2) {
            view.setViewName("weeklyupd2");
        } else if (type == 3) {
            view.setViewName("weeklyupd3");
        } else if (type == 4) {
            view.setViewName("weeklyupd4");
        } else if (type == 5) {
            view.setViewName("weeklyupd5");
        } else if (type == 6) {
            view.setViewName("weeklyupd6");
        } else {
            view.setViewName("weeklyupd1");
        }
        return view;
    }


    @RequestMapping("insert")
    public JsonResult insert(Weekly weekly) {
        int num = weeklyService.insertWeekly(weekly);
        return new JsonResult(num);
    }

    @RequestMapping("update")
    public JsonResult update(Weekly weekly) {
        int num = weeklyService.updateWeekly(weekly);
        return new JsonResult(num);
    }


    @RequestMapping("next")
    public JsonResult next(int type, int week, int year, int project) { 
        Week weeks = weeklyService.getWeek(year, week + 1, type, project);
        return new JsonResult(weeks);
    }

    @RequestMapping("last")
    public JsonResult last(int type, int week, int year, int project) {
        Week weeks = weeklyService.getWeek(year, week - 1, type, project);
        return new JsonResult(weeks);
    }


    @RequestMapping("getProject")
    public JsonResult getProject() {
        Project[] Projects = weeklyService.getProject();
        return new JsonResult(Projects);
    }

    @RequestMapping("getProject2")
    public JsonResult getProject2(String userName) {
        Project[] Projects = weeklyService.getProject2(userName);
        System.out.println(new JsonResult(Projects));
        return new JsonResult(Projects);
    }


    @RequestMapping("getProject1")
    public JsonResult getProject1(String userName) {
        Project[] Projects = weeklyService.getProject1(userName);
        return new JsonResult(Projects);
    }


}
