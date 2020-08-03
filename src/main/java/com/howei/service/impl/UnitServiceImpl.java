package com.howei.service.impl;

import com.howei.mapper.UnitMapper;
import com.howei.pojo.Unit;
import com.howei.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UnitServiceImpl implements UnitService {

    @Autowired
    UnitMapper unitMapper;

    @Override
    public List<Unit> getUnitList(Map map) {
        return unitMapper.getUnitList(map);
    }

    @Override
    public Unit findUnitById(int id) {
        return unitMapper.findUnitById(id);
    }

    @Override
    public int updUnit(Map map) {
        return unitMapper.updUnit(map);
    }

    @Override
    public int findUnit(Map map) {
        return unitMapper.findUnit(map);
    }

    @Override
    public int addUnit(Unit unit) {
        return unitMapper.addUnit(unit);
    }

    @Override
    public List<Unit> getUnitMap() {
        return unitMapper.getUnitMap();
    }

    @Override
    public List<Unit> getUnitMap2(String type,String english) {
        return unitMapper.getUnitMap2(type,english);
    }

    @Override
    public void delUnit(int id) {
        unitMapper.delUnit(id);
    }

    @Override
    public List<Unit> getUnitType() {
        return unitMapper.getUnitType();
    }

    @Override
    public int getUnitListCount(Map map) {
        return unitMapper.getUnitListCount(map);
    }

    @Override
    public List<Unit> getUnityMap(Map map) {
        return unitMapper.getUnityMap(map);
    }
}
