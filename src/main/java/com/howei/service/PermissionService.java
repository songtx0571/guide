package com.howei.service;

import com.howei.pojo.Permission;

import java.util.List;

public interface PermissionService {

    /**
     * 根据用户id查询
     * @param userId
     * @return
     */
    List<Permission> selByUserId(int userId);
}
