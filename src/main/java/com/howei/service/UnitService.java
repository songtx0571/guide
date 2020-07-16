package com.howei.service;

import com.howei.pojo.Unit;

import java.util.List;
import java.util.Map;

public interface UnitService {
    List<Unit> getUnitList(Map map);

    Unit findUnitById(int id);

    int updUnit(Map map);

    int findUnit(Map map);

    int addUnit(Unit unit);

    List<Unit> getUnitMap();

    List<Unit> getUnitMap2(String type,String english);

    void delUnit(int id);

    List<Unit> getUnitType();

    int getUnitListCount(Map map);

    /**
     * 获取测点类型
     * @param i
     * @return
     */
    List<Unit> getUnityMap(int i);
}
