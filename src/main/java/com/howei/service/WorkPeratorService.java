package com.howei.service;

import com.howei.pojo.WorkPerator;

import java.util.List;
import java.util.Map;

public interface WorkPeratorService {
    /**
     * 查询记录
     *
     * @param
     * @return
     */
    List<WorkPerator> selByUser(Map map);

    int selByUserCount(Map map);

    /**
     * 添加模板
     *
     * @param workPerator
     * @return
     */
    int addWorkPerator(WorkPerator workPerator);

    int updStatus(Map<String, Object> map);

    void delWorkPerator(Map map);

    String selById(int id);

    List<WorkPerator> getTemplateChildList(Map map);

    int getTemplateChildListCount(Map map);

    WorkPerator selWorkperator(String id);

    int updWorkperator(WorkPerator work);

    int updWorkperatorChild(Map map);

    List<WorkPerator> selAll(Map map);

    List<Map<String,Object>> selByParam(Map<String, Object> map);

    int selAllCount(Map<String, Object> map);

    List<Map> getTemplateMap(Map map);

    List<WorkPerator> selByMap(Map map);


    WorkPerator getLastTemplateChildByPriority(Map map);
}
