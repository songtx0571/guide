package com.howei.mapper;

import com.howei.pojo.Knowledge;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface KnowledgeMapper {

    List<Knowledge> getByMap(Map<String, Object> map);

    List<Knowledge> getByKeywords(List<String> keywords);
}
