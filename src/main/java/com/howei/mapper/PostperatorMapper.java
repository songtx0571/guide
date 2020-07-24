package com.howei.mapper;

import com.howei.pojo.PostPerator;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;


@Component
public interface PostperatorMapper {

    /**
     * 添加员工新数据
     * @param post
     * @return
     */
    int crePost(PostPerator post);

    PostPerator getLastPerator(Map map);

    /**
     * 根据id查询
     * @param id
     * @return
     */
    PostPerator selById(@Param("id") int id);

    int updPost(Map map);

    PostPerator selLatest(Map map);

    PostPerator getLastPerator1(Map<String,Object> map);

    List<PostPerator> getMouldList(Map map);
}
