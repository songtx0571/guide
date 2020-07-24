package com.howei.service;

import com.howei.pojo.PostPerator;

import java.util.List;
import java.util.Map;

public interface PostPeratorService {

    /**
     * 添加员工新数据
     * @param post
     * @return
     */
    int crePost(PostPerator post);

    /**
     * 获取最后一次执行同一个模板任务的数据
     * @param map
     * @return
     */
    PostPerator getLastPerator(Map map);

    PostPerator selById(int id);

    /**
     * 修改记录
     * @param map
     * @return
     */
    int updPost(Map map);

    /**
     * 查询最后一个大于当前时间的任务
     * @return
     */
    PostPerator selLatest(Map map);

    /**
     * 获取下一周期理论开始时间大于当前时间的数据
     * @param map
     * @return
     */
    PostPerator getLastPerator1(Map<String,Object> map);

    /**
     * 获取员工模板数据
     * @param map
     * @return
     */
    List<PostPerator> getMouldList(Map map);
}
