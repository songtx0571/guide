package com.howei.pojo;

/**
 * 数据查询模块
 * 临时数据储存
 */
public class InquiriesDataV {

    private String dateTime;//时间
    private String data;//数据
    private String createdBy;//创建人
    private String unit;//单位
    private String projectDepartment;//项目部

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getProjectDepartment() {
        return projectDepartment;
    }

    public void setProjectDepartment(String projectDepartment) {
        this.projectDepartment = projectDepartment;
    }
}
