package com.howei.mapper;

import com.howei.pojo.DataConfiguration;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DataConfigurationMapper {

    List<DataConfiguration> getDataConfigurationList(Map map);

    int addDataConfiguration(DataConfiguration dataConfiguration);

    DataConfiguration getDataConfigurationById(String id);

    int updateDataConfiguration(DataConfiguration dataConfiguration);

    List<Map> getMeasuringTypeMap(Map map);

    List<?> getMeasuringType(Map map1);
}
