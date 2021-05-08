package com.howei.mapper;

import com.howei.pojo.Maintain;
import com.howei.pojo.MaintainRecord;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface MaintainMapper {


    int insertMaintain(@Param("record") Maintain record);

    int updateMaintainById(@Param("record") Maintain record);

    List<Maintain> getMaintainByMap(@Param("map") Map<String, Object> map);

    int deleteMaintainById(@Param("id") Integer id);

    int insertMaintainRecord(@Param("record") MaintainRecord record);

    int updateMaintainRecordById(@Param("record") MaintainRecord record);

    List<MaintainRecord> getMaintainRecordByMap(@Param("map") Map<String, Object> map);

    Maintain getMaintainById(@Param("id") Integer id);

    MaintainRecord getMaintainRecoreById(@Param("id") Integer id);
}
