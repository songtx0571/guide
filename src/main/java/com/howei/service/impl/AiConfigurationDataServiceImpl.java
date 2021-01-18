package com.howei.service.impl;

import com.howei.mapper.AiConfigurationDataMapper;
import com.howei.pojo.AiConfigurationData;
import com.howei.service.AiConfigurationDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class AiConfigurationDataServiceImpl implements AiConfigurationDataService {

    @Autowired
    private AiConfigurationDataMapper aiConfigurationDataMapper;

    @Override
    public int insList(Set<AiConfigurationData> aList) {
        return aiConfigurationDataMapper.insList(aList);
    }

    @Override
    public List<AiConfigurationData> getAiConfigureDataList(Map map) {
        return aiConfigurationDataMapper.getAiConfigureDataList(map);
    }

    @Override
    public AiConfigurationData getLastAiConfigureData(Map map) {
        return aiConfigurationDataMapper.getLastAiConfigureData(map);
    }
}
