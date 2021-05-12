package com.howei.service.impl;

import com.howei.pojo.*;
import com.howei.mapper.MaintenanceMapper;
import com.howei.mapper.UsersMapper;
import com.howei.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    MaintenanceMapper maintenancemapper;

    @Autowired
    UsersMapper usermapper;

    @Override
    public Maintenance getMaintenanceByProject(String datetime, int project) {
        Maintenance maintenance = maintenancemapper.getMaintenanceByProject(datetime, project);
        if (maintenance == null) {
            Maintenance maintenances = new Maintenance();
            maintenances.setDatetime(datetime);
            maintenances.setProjectId(project);
            maintenances.setLeader("");
            maintenances.setAttendance(0);
            maintenances.setNum(0);
            maintenances.setId(0);
            return maintenances;
        }
        return maintenance;
    }


    @Override
    public Maintenance getMaintenanceById(int id) {
        Maintenance maintenance = maintenancemapper.getMaintenanceById(id);
        return maintenance;
    }

    @Override
    public Maintenance[] getMaintenances(int project) {
        Maintenance[] maintenances = maintenancemapper.getMaintenances(project);
        return maintenances;
    }

    @Override
    public MaintenanceRecord[] getMaintenanceRecords(String datetime, int project) {
        MaintenanceRecord[] maintenanceRecords = maintenancemapper.getMaintenanceRecords(datetime, project);
        return maintenanceRecords;
    }


    @Override
    public MaintenanceRecord getMaintenanceRecord(int id) {
        MaintenanceRecord maintenanceRecord = maintenancemapper.getMaintenanceRecord(id);
        return maintenanceRecord;
    }

    @Override
    public MaintenanceRecord[] getMaintenanceRecordsByMaintenanceId(int maintenanceId) {
        MaintenanceRecord[] maintenanceRecords = maintenancemapper.getMaintenanceRecordsByMaintenanceId(maintenanceId);
        return maintenanceRecords;
    }

    @Override
    public int change(Maintenance maintenance) {
        int num = 0;
        if (maintenance.getId() == 0) {
            Maintenance maintenances = maintenancemapper.getMaintenanceByProject(maintenance.getDatetime(), maintenance.getProjectId());
            if (maintenances == null) {
                num = maintenancemapper.insertMaintenance(maintenance);
            } else {
                maintenance.setId(maintenances.getId());
                num = maintenancemapper.updateMaintenance(maintenance);
            }
        } else {
            num = maintenancemapper.updateMaintenance(maintenance);
        }
        return num;
    }

    @Override
    public int delMaintenance(int id) {
        int num = maintenancemapper.delMaintenance(id);
        int num1 = maintenancemapper.delMaintenanceRecordByMaintenanceId(id);
        return num + num1;
    }


    @Override
    public int insertMaintenanceRecord(MaintenanceRecord maintenanceRecord) {
        int num = 0;
        if (maintenanceRecord.getType() == 1) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            maintenanceRecord.setDatetime(sdf.format(new Date()));
            num = maintenancemapper.insertMaintenanceRecordALL(maintenanceRecord);
        } else {
            num = maintenancemapper.insertMaintenanceRecord(maintenanceRecord);
        }
        if (maintenanceRecord.getType() == 1 && num == 1) {
            num = changeTotalTime(maintenanceRecord.getMaintenanceId());
            num = changeAttendance(maintenanceRecord.getMaintenanceId());
        }
        return num;
    }

    @Override
    public int updateMaintenanceRecord(MaintenanceRecord maintenanceRecord) {
        int num = 0;
        if (maintenanceRecord.getType() == 1) {
            num = maintenancemapper.updateMaintenanceRecordALL(maintenanceRecord);
            if (num == 1) {
                num = changeTotalTime(maintenanceRecord.getMaintenanceId());
                num = changeAttendance(maintenanceRecord.getMaintenanceId());
            }
        } else {
            num = maintenancemapper.updateMaintenanceRecord(maintenanceRecord);
        }
        return num;
    }

    @Override
    public int updateMaintenanceRecord1(MaintenanceRecord maintenanceRecord) {
        int num = maintenancemapper.updateMaintenanceRecordALL1(maintenanceRecord);
        if (num == 1) {
            num = changeTotalTime(maintenanceRecord.getMaintenanceId());
            num = changeAttendance(maintenanceRecord.getMaintenanceId());
        }
        return num;
    }

    @Override
    public int delMaintenanceRecord(int id) {
        MaintenanceRecord MaintenanceRecord = maintenancemapper.getMaintenanceRecord(id);
        int num = maintenancemapper.delMaintenanceRecord(id);
        if (num == 0) {
            num = changeAttendance(MaintenanceRecord.getMaintenanceId());
        }
        return num;
    }


    public int changeAttendance(int maintenanceId) {
        String[] Attendances = maintenancemapper.getAttendance(maintenanceId).split(",");
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < Attendances.length; i++) {
            if (!list.contains(Attendances[i].toUpperCase())) {
                list.add(Attendances[i].toUpperCase());
            }
        }
        //返回一个包含所有对象的指定类型的数
        String[] newArrStr = list.toArray(new String[1]);

        int num = maintenancemapper.updateMaintenanceAttendance(newArrStr.length, maintenanceId);
        return num;
    }


    public int changeTotalTime(int maintenanceId) {
        MaintenanceRecord[] maintenanceRecords = maintenancemapper.getMaintenanceRecordsByMaintenanceId1(maintenanceId);
        double totalTime = 0;
        for (MaintenanceRecord maintenanceRecord : maintenanceRecords) {
            String[] people = maintenanceRecord.getPeople().split("、|，|；|：|,|:|;|\\.|！|!");
            totalTime += people.length * maintenanceRecord.getWorkingHours();
        }
        int num = maintenancemapper.updateMaintenanceTotalTime(totalTime, maintenanceId);
        return num;
    }


    @Override
    public int addLeader(Maintenance maintenance) {
        if (maintenance.getId() == 0) {
            int num = maintenancemapper.insertMaintenanceByLeader(maintenance);
            return num;
        } else {
            int num = maintenancemapper.addLeader(maintenance);
            return num;
        }
    }


    @Override
    public int delLeader(int id, String userName) {
        Maintenance maintenance = new Maintenance();
        maintenance.setId(id);
        maintenance.setLeader(userName);
        int num = maintenancemapper.addLeader(maintenance);
        return num;
    }

    @Override
    public List<Defect> getDefectList(Map map) {
        return maintenancemapper.getDefectList(map);
    }

    @Override
    public List<MaintainRecord> getMaintainRecordList(Map map) {
        return maintenancemapper.getMaintainRecordList(map);
    }
}
