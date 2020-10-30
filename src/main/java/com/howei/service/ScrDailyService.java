package com.howei.service;


import com.howei.pojo.ScrDaily;
import com.howei.pojo.ScrDailyRecord;

public interface ScrDailyService {

    ScrDailyRecord[] getScrDailyRecords(String datetime, int type, int project, int other);

    ScrDailyRecord[] getScrDailyRecordsByScrDailyId(int ScrDailyId);

    ScrDailyRecord getScrDailyRecord(int id);

    ScrDaily getScrDaily(String datetime, int type, int project, int other);

    ScrDaily getScrDailyById(int id);

    ScrDaily[] getScrDailys(int project, int other);

    int insertScrDailyRecord(ScrDailyRecord scrDailyRecord);

    int updateScrDailyRecord(ScrDailyRecord scrDailyRecord);

    int delScrDailyRecord(int id);

    int delScrDailys(int id);

    int changeScrDaily(ScrDaily scrDaily);


    int addSuccessor(ScrDaily scrDaily);

    int addSuccessor2(ScrDaily scrDaily);

    int delSuccessor(int id, String userName, String name);

    int addTrader(ScrDaily scrDaily);

    int delTrader(int id, String userName, String name);
}
