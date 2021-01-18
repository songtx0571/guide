package com.howei.service.impl;

import com.howei.mapper.DataConfigurationMapper;
import com.howei.pojo.DataConfiguration;
import com.howei.service.DataConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DataConfigurationServiceImpl implements DataConfigurationService {

    @Autowired
    private DataConfigurationMapper dataConfigurationMapper;

    @Override
    public List<DataConfiguration> getDataConfigurationList(Map map) {
        return dataConfigurationMapper.getDataConfigurationList(map);
    }

    @Override
    public int addDataConfiguration(DataConfiguration dataConfiguration) {
        return dataConfigurationMapper.addDataConfiguration(dataConfiguration);
    }

    @Override
    public DataConfiguration getDataConfigurationById(String id) {
        return dataConfigurationMapper.getDataConfigurationById(id);
    }

    @Override
    public int updateDataConfiguration(DataConfiguration dataConfiguration) {
        return dataConfigurationMapper.updateDataConfiguration(dataConfiguration);
    }

    @Override
    public List<Map> getMeasuringTypeMap(Map map) {
        return dataConfigurationMapper.getMeasuringTypeMap(map);
    }

    @Override
    public List<?> getMeasuringType(Map map1) {
        return dataConfigurationMapper.getMeasuringType(map1);
    }
}
