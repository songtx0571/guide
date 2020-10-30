package com.howei.service;

import com.howei.pojo.Users;

public interface UserService {

    /**
     * 登陆验证
     * @param userName
     * @param password
     * @return
     */
    public Users findUser(String userName,String password);

    /**
     * 根据roleId查询当前用户的权限
     * @param roleId
     * @return
     */
    public String getPermission(int roleId);

    Users findById(String id);

    Users getUserRolesByName(String userNumber);

    Users loginUserNumber(String userNumber);
}
