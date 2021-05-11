package com.howei.service.impl;

import com.howei.mapper.MaintainMapper;
import com.howei.pojo.Maintain;
import com.howei.pojo.MaintainRecord;
import com.howei.service.MaintainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MaintainPointServiceImpl implements MaintainService {
    @Autowired
    private MaintainMapper mapper;




    @Override
    public int insertMaintain(Maintain record) {
        return mapper.insertMaintain(record);
    }

    @Override
    public int updateMaintainById(Maintain record) {
        return mapper.updateMaintainById(record);
    }

    @Override
    public List<Maintain> getMaintainByMap(Map<String, Object> map) {
        return mapper.getMaintainByMap(map);
    }

    @Override
    public int deleteMaintainById(Integer id) {
        return mapper.deleteMaintainById(id);
    }

    @Override
    public int insertMaintainRecord(MaintainRecord maintainRecord) {
        return mapper.insertMaintainRecord(maintainRecord);
    }

    @Override
    public int updateMaintainRecordById(MaintainRecord maintainRecord) {

        return mapper.updateMaintainRecordById(maintainRecord);
    }

    @Override
    public List<MaintainRecord> getMaintainRecordByMap(Map<String, Object> map) {
        return mapper.getMaintainRecordByMap(map);
    }

    @Override
    public Maintain getMaintainById(Integer id) {
        return mapper.getMaintainById(id);
    }

    @Override
    public MaintainRecord getMaintainRecordById(Integer id) {
        return mapper.getMaintainRecoreById(id);
    }
}
