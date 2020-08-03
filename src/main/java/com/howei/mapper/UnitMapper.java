package com.howei.mapper;

import com.howei.pojo.Unit;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface UnitMapper {

    List<Unit> getUnitList(Map map);

    Unit findUnitById(int id);

    int updUnit(Map map);

    int findUnit(Map map);

    int addUnit(Unit unit);

    List<Unit> getUnitMap();

    List<Unit> getUnitMap2(@Param("type") String type,@Param("english") String english);

    void delUnit(int id);

    List<Unit> getUnitType();

    int getUnitListCount(Map map);

    List<Unit> getUnityMap(Map map);
}
