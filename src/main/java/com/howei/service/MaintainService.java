package com.howei.service;

import com.howei.pojo.Maintain;
import com.howei.pojo.MaintainRecord;

import java.util.List;
import java.util.Map;

public interface MaintainService {

    int insertMaintain(Maintain record);

    int updateMaintainById(Maintain record);

    List<Maintain> getMaintainByMap(Map<String, Object> map);

    int deleteMaintainById(Integer id);

    int insertMaintainRecord(MaintainRecord maintainRecord);

    int updateMaintainRecordById(MaintainRecord maintainRecord);

    List<MaintainRecord> getMaintainRecordByMap(Map<String, Object> map);

    Maintain getMaintainById(Integer id);

    MaintainRecord getMaintainRecordById(Integer id);
}
