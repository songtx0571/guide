package com.howei.mapper;

import com.howei.pojo.Equipment;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface EquipmentMapper {

    List<Equipment> getEquipmentList(Map map);

    int addEquipment(Equipment equipment);

    int findEquipment(Map map);

    Equipment findEquipmentById(@Param("id") int id);

    int updEquipment(Map map);

    void delEquipment(int id);

    List<Equipment> getSysNameList(@Param("department") int department);

    List<Equipment> getEquNameList(@Param("department") int department);

    int getEquipmentListCount(Map<String,Object> map);

    List<Equipment> getEquMap(Map map);

    Equipment getEquipmentByName(@Param("name") String name,@Param("departmentId") String depatmentId);

    List<Map<String,Object>> getEquMap1(Map souMap);
}
