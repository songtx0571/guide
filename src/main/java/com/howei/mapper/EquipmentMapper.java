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

    List<Equipment> getSysNameList();

    List<Equipment> getEquNameList();

    int getEquipmentListCount(Map<String,Object> map);

    List<Equipment> getEquMap(@Param("type") String type);
}
