package com.howei.mapper;

import com.howei.pojo.AiConfigurationData;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public interface AiConfigurationDataMapper {

    int insList(@Param("set") Set<AiConfigurationData> aList);

    List<AiConfigurationData> getAiConfigureDataList(Map map);

    AiConfigurationData getLastAiConfigureData(Map map);
}
