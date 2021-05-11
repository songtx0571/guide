package com.howei.pojo;

import java.util.Date;

public class Maintain {

    private Integer id;
    private Integer companyId;
    private Integer employeeId;
    private Integer departmentId;
    private Integer systemId;
    private Integer equipmentId;
    private Integer unitId;
    private String workContent;
    private Float cycle;
    private String assignmentStatus;
    private String planedWorkingHour;
    private Date createTime;
    private Date updateTime;
    private String startTime;

    private String systemName;
    private String equipmentName;
    private String unitName;

    @Override
    public String toString() {
        return "Maintain{" +
                "id=" + id +
                ", companyId=" + companyId +
                ", employeeId=" + employeeId +
                ", departmentId=" + departmentId +
                ", systemId=" + systemId +
                ", equipmentId=" + equipmentId +
                ", unitId=" + unitId +
                ", workContent='" + workContent + '\'' +
                ", cycle=" + cycle +
                ", assignmentStatus=" + assignmentStatus +
                ", planedWorkingHour='" + planedWorkingHour + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", startTime='" + startTime + '\'' +
                ", systemName='" + systemName + '\'' +
                ", equipmentName='" + equipmentName + '\'' +
                ", unitName='" + unitName + '\'' +
                '}';
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getSystemId() {
        return systemId;
    }

    public void setSystemId(Integer systemId) {
        this.systemId = systemId;
    }

    public Integer getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Integer equipmentId) {
        this.equipmentId = equipmentId;
    }

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    public String getWorkContent() {
        return workContent;
    }

    public void setWorkContent(String workContent) {
        this.workContent = workContent;
    }

    public Float getCycle() {
        return cycle;
    }

    public void setCycle(Float cycle) {
        this.cycle = cycle;
    }

    public String getAssignmentStatus() {
        return assignmentStatus;
    }

    public void setAssignmentStatus(String assignmentStatus) {
        this.assignmentStatus = assignmentStatus;
    }

    public String getPlanedWorkingHour() {
        return planedWorkingHour;
    }

    public void setPlanedWorkingHour(String planedWorkingHour) {
        this.planedWorkingHour = planedWorkingHour;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
