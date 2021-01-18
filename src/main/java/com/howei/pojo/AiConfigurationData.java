package com.howei.pojo;

/**
 * AI机器执行数据
 */
public class AiConfigurationData {

    private Integer id;
    private Integer aiConfigurationId;
    private Integer addressId;//创建机器ID
    private String time;
    private String data;//数据
    private String measuringPoint;//机器名称
    private Integer departmentId;//部门id

    private String unit;//单位

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAiConfigurationId() {
        return aiConfigurationId;
    }

    public void setAiConfigurationId(Integer aiConfigurationId) {
        this.aiConfigurationId = aiConfigurationId;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getMeasuringPoint() {
        return measuringPoint;
    }

    public void setMeasuringPoint(String measuringPoint) {
        this.measuringPoint = measuringPoint;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Override
    public String toString() {
        return "AiConfigurationData{" +
                "id=" + id +
                ", aiConfigurationId=" + aiConfigurationId +
                ", addressId=" + addressId +
                ", time='" + time + '\'' +
                ", data='" + data + '\'' +
                ", measuringPoint='" + measuringPoint + '\'' +
                ", departmentId=" + departmentId +
                ", unit='" + unit + '\'' +
                '}';
    }
}
