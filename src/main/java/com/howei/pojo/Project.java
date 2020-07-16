package com.howei.pojo;

public class Project {

    private int id;

    private String projectTeam;
    private String userName;


    public Project() {
        super();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProjectTeam() {
        return projectTeam;
    }

    public void setProjectTeam(String projectTeam) {
        this.projectTeam = projectTeam;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", projectTeam='" + projectTeam + '\'' +
                ", userName='" + userName + '\'' +
                '}';
    }
}
