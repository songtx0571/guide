package com.howei.pojo;

/**
 * 单位
 */
public class Unit {
    private int id;
    private String nuit;//名称
    private int code;//状态
    private String type;//类型:
    private String english;//拼音
    private Integer mold;//区分测点与单位 1:单位 2:测点

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNuit() {
        return nuit;
    }

    public void setNuit(String nuit) {
        this.nuit = nuit;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public Integer getMold() {
        return mold;
    }

    public void setMold(Integer mold) {
        this.mold = mold;
    }
}
