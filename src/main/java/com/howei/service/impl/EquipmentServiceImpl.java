package com.howei.service.impl;

import com.howei.mapper.EquipmentMapper;
import com.howei.pojo.Equipment;
import com.howei.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    EquipmentMapper equipmentMapper;

    @Override
    public List<Equipment> getEquipmentList(Map map) {
        return equipmentMapper.getEquipmentList(map);
    }

    @Override
    public int findEquipment(Map map) {
        return equipmentMapper.findEquipment(map);
    }

    @Override
    public int addEquipment(Equipment equipment) {
        return equipmentMapper.addEquipment(equipment);
    }

    @Override
    public Equipment findEquipmentById(int id) {
        return equipmentMapper.findEquipmentById(id);
    }

    @Override
    public int updEquipment(Map map) {
        return equipmentMapper.updEquipment(map);
    }

    @Override
    public void delEquipment(int id) {
        equipmentMapper.delEquipment(id);
    }

    @Override
    public List<Equipment> getSysNameList() {
        return equipmentMapper.getSysNameList();
    }

    @Override
    public List<Equipment> getEquNameList() {
        return equipmentMapper.getEquNameList();
    }

    @Override
    public int getEquipmentListCount(Map<String, Object> map) {
        return equipmentMapper.getEquipmentListCount(map);
    }

    @Override
    public List<Equipment> getEquMap(String type) {
        return equipmentMapper.getEquMap(type);
    }
}
