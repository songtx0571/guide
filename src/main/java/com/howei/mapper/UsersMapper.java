package com.howei.mapper;

import com.howei.pojo.Users;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface UsersMapper{

    /**
     * 登陆验证
     * @param userName
     * @param password
     * @return
     */
    Users findUser(@Param("UserName") String userName, @Param("Password") String password);

    /**
     * 查询权限
     * @param roleId
     * @return
     */
    public String getPermission(int roleId);

    /**
     * 根据id查询
     * @param id
     * @return
     */
    Users findById(@Param("id") String id);

    Users getUserRolesByName(@Param("userNumber") String userNumber);

    Users loginUserNumber(@Param("userNumber") String userNumber);
}
