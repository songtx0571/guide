package com.howei.pojo;

public class Mould {
    private int id;
    private String status;
    private String diachronic;
    private String startTime;
    private String endTime;
    private int count;
    private int AIcount;
    private String userName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDiachronic() {
        return diachronic;
    }

    public void setDiachronic(String diachronic) {
        this.diachronic = diachronic;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getAIcount() {
        return AIcount;
    }

    public void setAIcount(int AIcount) {
        this.AIcount = AIcount;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
