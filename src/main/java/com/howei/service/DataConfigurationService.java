package com.howei.service;

import com.howei.pojo.DataConfiguration;

import java.util.List;
import java.util.Map;

public interface DataConfigurationService {
    /**
     * 获取数据配置列表
     * @param map
     * @return
     */
    List<DataConfiguration> getDataConfigurationList(Map map);

    int addDataConfiguration(DataConfiguration dataConfiguration);

    DataConfiguration getDataConfigurationById(String id);

    int updateDataConfiguration(DataConfiguration dataConfiguration);

    List<Map> getMeasuringTypeMap(Map map);

    List<?> getMeasuringType(Map map1);
}
