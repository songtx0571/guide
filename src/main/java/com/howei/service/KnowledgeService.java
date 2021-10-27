package com.howei.service;

import com.howei.pojo.Knowledge;

import java.util.List;
import java.util.Map;

public interface KnowledgeService {
    List<Knowledge> getByMap(Map<String, Object> map);
}
