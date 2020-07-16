package com.howei.service.impl;

import com.howei.mapper.PermissionMapper;
import com.howei.pojo.Permission;
import com.howei.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    PermissionMapper permissionMapper;

    @Override
    public List<Permission> selByUserId(int userId) {
        return permissionMapper.selByUserId(userId);
    }
}
