package com.howei.mapper;

import com.howei.pojo.Knowledge;

import java.util.List;
import java.util.Map;

public interface KnowledgeMapper {

    List<Knowledge> getByMap(Map<String, Object> map);
}
