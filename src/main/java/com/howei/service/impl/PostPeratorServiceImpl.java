package com.howei.service.impl;

import com.howei.mapper.PostperatorMapper;
import com.howei.pojo.PostPerator;
import com.howei.service.PostPeratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PostPeratorServiceImpl implements PostPeratorService {

    @Autowired
    PostperatorMapper postperatorMapper;

    @Override
    public int crePost(PostPerator post) {
        return postperatorMapper.crePost(post);
    }

    @Override
    public PostPerator getLastPerator(Map map) {
        return postperatorMapper.getLastPerator(map);
    }

    @Override
    public PostPerator selById(int id) {
        return postperatorMapper.selById(id);
    }

    @Override
    public int updPost(Map map) {
        return postperatorMapper.updPost(map);
    }

    @Override
    public PostPerator selLatest(Map map) {
        return postperatorMapper.selLatest(map);
    }

    @Override
    public PostPerator getLastPerator1(Map<String, Object> map) {
        return postperatorMapper.getLastPerator1(map);
    }
}
