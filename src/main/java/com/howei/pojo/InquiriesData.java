package com.howei.pojo;

import java.util.List;

/**
 * 数据查询模块
 * 临时数据储存
 */
public class InquiriesData {

    private String dataName;//类型名称
    private List<InquiriesDataV> dataType;//类型数据

    public String getDataName() {
        return dataName;
    }

    public void setDataName(String dataName) {
        this.dataName = dataName;
    }

    public List<InquiriesDataV> getDataType() {
        return dataType;
    }

    public void setDataType(List<InquiriesDataV> dataType) {
        this.dataType = dataType;
    }
}
