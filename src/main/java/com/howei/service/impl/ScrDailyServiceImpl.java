package com.howei.service.impl;

import com.howei.pojo.ScrDaily;
import com.howei.pojo.ScrDailyRecord;
import com.howei.mapper.ScrDailyMapper;
import com.howei.mapper.UsersMapper;
import com.howei.service.ScrDailyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ScrDailyServiceImpl implements ScrDailyService {


    @Autowired
    ScrDailyMapper scrDailymapper;

    @Autowired
    UsersMapper usermapper;

    @Override
    public ScrDailyRecord[] getScrDailyRecords(String datetime, int type, int project, int other) {
        ScrDailyRecord[] scrDailyRecords = scrDailymapper.getScrDailyRecords(datetime, type, project, other);
        return scrDailyRecords;
    }

    @Override
    public ScrDailyRecord[] getScrDailyRecordsByScrDailyId(int ScrDailyId) {
        ScrDailyRecord[] scrDailyRecords = scrDailymapper.getScrDailyRecordsByScrDailyId(ScrDailyId);
        return scrDailyRecords;
    }

    @Override
    public ScrDailyRecord getScrDailyRecord(int id) {
        ScrDailyRecord scrDailyRecord = scrDailymapper.getScrDailyRecord(id);
        return scrDailyRecord;
    }


    @Override
    public ScrDaily getScrDaily(String datetime, int type, int project, int other) {
        ScrDaily scrDaily = scrDailymapper.getScrDaily(datetime, type, project, other);
        if (scrDaily == null) {
            ScrDaily scrDaily1 = new ScrDaily();
            scrDaily1.setDatetime(datetime);
            scrDaily1.setProjectId(project);
            scrDaily1.setGroup(0);
            scrDaily1.setType(type);
            scrDaily1.setSuccessor("");
            scrDaily1.setTraders("");
            scrDaily1.setRecorder("");
            scrDaily1.setOther(other);
            return scrDaily1;
        }
        System.out.println(scrDaily);
        return scrDaily;
    }

    @Override
    public ScrDaily getScrDailyById(int id) {
        ScrDaily scrDaily = scrDailymapper.getScrDailyById(id);
        return scrDaily;
    }

    @Override
    public ScrDaily[] getScrDailys(int project, int other) {
        ScrDaily[] scrDailys = scrDailymapper.getScrDailys(project, other);
        return scrDailys;
    }

    @Override
    public synchronized int insertScrDailyRecord(ScrDailyRecord scrDailyRecord) {
        int num = scrDailymapper.insertScrDailyRecord(scrDailyRecord);
        return num;
    }

    @Override
    public int updateScrDailyRecord(ScrDailyRecord scrDailyRecord) {
        int num = scrDailymapper.updateScrDailyRecord(scrDailyRecord);
        return num;
    }

    @Override
    public int delScrDailyRecord(int id) {
        int num = scrDailymapper.delScrDailyRecord(id);
        return num;
    }

    @Override
    public int changeScrDaily(ScrDaily scrDaily) {
        int num = 0;
        if (scrDaily.getId() == 0) {
            ScrDaily scrDailys = scrDailymapper.getScrDaily1(scrDaily);
            if (scrDailys == null) {
                num = scrDailymapper.insertScrDaily(scrDaily);
            } else {
                scrDaily.setId(scrDailys.getId());
                num = scrDailymapper.updateScrDaily(scrDaily);
            }
        } else {
            num = scrDailymapper.updateScrDaily(scrDaily);
        }

        return num;
    }

    @Override
    public int delScrDailys(int id) {
        int num = scrDailymapper.delScrDailys(id);
        return num;
    }

    @Override
    public int addSuccessor(ScrDaily scrDaily) {
        System.out.println(scrDaily);
        if (scrDaily.getId() == 0) {

            ScrDaily scrDailys = scrDailymapper.getScrDaily(scrDaily.getDatetime(), scrDaily.getType(), scrDaily.getProjectId(), 2);
            if (scrDailys == null) {
                int num = scrDailymapper.insertScrDailyBySuccessor(scrDaily);
                return num;
            } else {
                scrDaily.setId(scrDailys.getId());
                int num = scrDailymapper.addSuccessor(scrDaily);
                return num;
            }


        } else {
            int num = scrDailymapper.addSuccessor(scrDaily);
            return num;
        }

    }

    @Override
    public int addSuccessor2(ScrDaily scrDaily) {
        System.out.println(scrDaily);

        int num = scrDailymapper.addSuccessor2(scrDaily);
        return num;


    }


    @Override
    public int delSuccessor(int id, String userName, String name) {
        ScrDaily scrDaily = new ScrDaily();
        scrDaily.setId(id);
        scrDaily.setSuccessor(userName);
        scrDaily.setRecorder(name);
        int num = scrDailymapper.addSuccessor(scrDaily);
        return num;
    }

    @Override
    public int addTrader(ScrDaily scrDaily) {
        if (scrDaily.getId() == 0) {
            ScrDaily scrDailys = scrDailymapper.getScrDaily(scrDaily.getDatetime(), scrDaily.getType(), scrDaily.getProjectId(), 2);
            if (scrDailys == null) {
                int num = scrDailymapper.insertScrDailyByTrader(scrDaily);
                return num;
            } else {
                scrDaily.setId(scrDailys.getId());
                int num = scrDailymapper.addTrader(scrDaily);
                return num;
            }
        } else {
            int num = scrDailymapper.addTrader(scrDaily);
            return num;
        }
    }

    @Override
    public int delTrader(int id, String userName, String name) {
        ScrDaily scrDaily = new ScrDaily();
        scrDaily.setId(id);
        scrDaily.setTraders(userName);
        scrDaily.setRecorder(name);
        int num = scrDailymapper.addTrader(scrDaily);
        return num;
    }


}
