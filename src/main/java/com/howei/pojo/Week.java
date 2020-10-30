package com.howei.pojo;

import java.util.Arrays;

public class Week {

    private int id;

    private String name;

    private int projectId;

    private int year;

    private int week;

    private int type;

    private String fillIn;
    private String[] fillInName;

    private String[] auditorName;
    private String auditor;

    private String coding;


    public Week(int id, int projectId, int year, int week, int type, String fillIn) {
        super();
        this.id = id;
        this.projectId = projectId;
        this.year = year;
        this.week = week;
        this.type = type;
        this.fillIn = fillIn;
    }


    public Week(int id, String name, int projectId, int year, int week, int type, String fillIn, String auditor) {
        super();
        this.id = id;
        this.name = name;
        this.projectId = projectId;
        this.year = year;
        this.week = week;
        this.type = type;
        this.fillIn = fillIn;
        this.auditor = auditor;
    }

    public Week() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProjectId() {
        return projectId;
    }


    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }


    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getFillIn() {
        return fillIn;
    }

    public void setFillIn(String fillIn) {
        this.fillIn = fillIn;
    }

    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor;
    }


    public String getCoding() {
        if (type == 1) {
            return "HOPE-YXZB-A" + week;
        } else if (type == 2) {
            return "HOPE-YXZB-B" + week;
        } else {
            return "HOPE-YXZB-C" + week;
        }
    }

    public void setCoding(String coding) {
        this.coding = coding;
    }


    public String[] getFillInName() {
        return fillInName;
    }

    public void setFillInName(String[] fillInName) {
        this.fillInName = fillInName;
    }

    public String[] getAuditorName() {
        return auditorName;
    }

    public void setAuditorName(String[] auditorName) {
        this.auditorName = auditorName;
    }


    @Override
    public String toString() {
        return "Week [id=" + id + ", name=" + name + ", projectId=" + projectId + ", year=" + year + ", week=" + week
                + ", type=" + type + ", fillIn=" + fillIn + ", fillInName=" + Arrays.toString(fillInName)
                + ", auditorName=" + Arrays.toString(auditorName) + ", auditor=" + auditor + ", coding=" + coding + "]";
    }


}
