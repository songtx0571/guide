package com.howei.service.impl;

import com.howei.mapper.UsersMapper;
import com.howei.pojo.Users;
import com.howei.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UsersMapper usersMapper;

    @Override
    public Users findUser(String userName, String password) {
        return usersMapper.findUser(userName,password);
    }

    @Override
    public String getPermission(int roleId) {
        return usersMapper.getPermission(roleId);
    }

    @Override
    public Users findById(String id) {
        return usersMapper.findById(id);
    }

    @Override
    public Users getUserRolesByName(String userNumber) {
        return usersMapper.getUserRolesByName(userNumber);
    }

    @Override
    public Users loginUserNumber(String userNumber) {
        return usersMapper.loginUserNumber(userNumber);
    }
}
