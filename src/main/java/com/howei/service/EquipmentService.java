package com.howei.service;

import com.howei.pojo.Equipment;

import java.util.List;
import java.util.Map;

public interface EquipmentService {

    List<Equipment> getEquipmentList(Map map);

    /**
     * 验证是否存在
     * @param map
     * @return
     */
    int findEquipment(Map map);

    int addEquipment(Equipment equipment);

    Equipment findEquipmentById(int i);

    int updEquipment(Map map);

    void delEquipment(int i);

    List<Equipment> getSysNameList();

    List<Equipment> getEquNameList();

    int getEquipmentListCount(Map<String,Object> map);

    List<Equipment> getEquMap(String type);
}
