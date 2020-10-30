package com.howei.mapper;


import com.howei.pojo.ScrDaily;
import com.howei.pojo.ScrDailyRecord;
import org.apache.ibatis.annotations.Param;

public interface ScrDailyMapper {

    ScrDailyRecord[] getScrDailyRecords(@Param("datetime") String datetime, @Param("type") int type, @Param("project") int project, @Param("other") int other);

    ScrDailyRecord[] getScrDailyRecordsByScrDailyId(@Param("ScrDailyId") int ScrDailyId);

    ScrDailyRecord getScrDailyRecord(@Param("id") int id);

    ScrDaily getScrDaily(@Param("datetime") String datetime, @Param("type") int type, @Param("project") int project, @Param("other") int other);

    ScrDaily getScrDailyById(@Param("id") int id);

    ScrDaily[] getScrDailys(@Param("project") int project, @Param("other") int other);

    int insertScrDailyRecord(@Param("scrDailyRecord") ScrDailyRecord scrDailyRecord);

    int updateScrDailyRecord(@Param("scrDailyRecord") ScrDailyRecord scrDailyRecord);

    int delScrDailyRecord(@Param("id") int id);

    ScrDaily getScrDaily1(@Param("scrDaily") ScrDaily scrDaily);

    int insertScrDaily(@Param("scrDaily") ScrDaily scrDaily);

    int updateScrDaily(@Param("scrDaily") ScrDaily scrDaily);

    int delScrDailys(int id);


    int addSuccessor(@Param("scrDaily") ScrDaily scrDaily);

    int addSuccessor2(@Param("scrDaily") ScrDaily scrDaily);

    int insertScrDailyBySuccessor(@Param("scrDaily") ScrDaily scrDaily);

    int addTrader(@Param("scrDaily") ScrDaily week);

    int insertScrDailyByTrader(@Param("scrDaily") ScrDaily scrDaily);
}
