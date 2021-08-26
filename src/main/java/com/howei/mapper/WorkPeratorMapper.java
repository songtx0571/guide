package com.howei.mapper;

import com.howei.pojo.WorkPerator;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface WorkPeratorMapper {

    List<WorkPerator> selByUser(Map map);

    int selByUserCount(Map map);

    int addWorkPerator(WorkPerator workPerator);

    int updStatus(Map<String, Object> map);

    void delWorkPerator(Map map);

    String selById(@Param("id") int id);

    List<WorkPerator> getTemplateChildList(Map map);

    WorkPerator selWorkperator(String id);

    int updWorkperator(WorkPerator work);

    int updWorkperatorChild(Map map);

    List<WorkPerator> selAll(Map map);

    List<Map<String,Object>> selByParam(Map<String, Object> map);

    int selAllCount(Map<String, Object> map);

    int getTemplateChildListCount(Map map);

    List<Map> getTemplateMap(Map map);

    List<WorkPerator> selByMap(Map map);

    WorkPerator getLastTemplateChildByPriority(Map map);
}
