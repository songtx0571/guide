package com.howei.service.impl;

import com.howei.mapper.KnowledgeMapper;
import com.howei.pojo.Knowledge;
import com.howei.service.KnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class KnowledgeServiceImpl implements KnowledgeService {
    @Autowired
    private KnowledgeMapper mapper;

    @Override
    public List<Knowledge> getByMap(Map<String, Object> map) {
        return mapper.getByMap(map);
    }
}
