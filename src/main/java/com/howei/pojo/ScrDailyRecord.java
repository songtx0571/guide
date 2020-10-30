package com.howei.pojo;

public class ScrDailyRecord {

    private int id;

    private int scrDailyId;

    private int type;

    private String content1;

    private String content2;

    private String content3;

    private String content4;

    private String content5;

    private String content6;


    public ScrDailyRecord() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public int getType() {
        return type;
    }


    public void setType(int type) {
        this.type = type;
    }


    public int getScrDailyId() {
        return scrDailyId;
    }


    public void setScrDailyId(int scrDailyId) {
        this.scrDailyId = scrDailyId;
    }


    public String getContent5() {
        return content5;
    }


    public void setContent5(String content5) {
        this.content5 = content5;
    }


    public String getContent6() {
        return content6;
    }


    public void setContent6(String content6) {
        this.content6 = content6;
    }


    public String getContent1() {
        return content1;
    }


    public void setContent1(String content1) {
        this.content1 = content1;
    }


    public String getContent2() {
        return content2;
    }


    public void setContent2(String content2) {
        this.content2 = content2;
    }


    public String getContent3() {
        return content3;
    }


    public void setContent3(String content3) {
        this.content3 = content3;
    }


    public String getContent4() {
        return content4;
    }


    public void setContent4(String content4) {
        this.content4 = content4;
    }


    @Override
    public String toString() {
        return "ScrDailyRecord [id=" + id + ", scrDailyId=" + scrDailyId + ", type=" + type + ", content1=" + content1
                + ", content2=" + content2 + ", content3=" + content3 + ", content4=" + content4 + ", content5="
                + content5 + ", content6=" + content6 + "]";
    }


}
