package com.howei.mapper;

import com.howei.pojo.Menu;
import com.howei.pojo.Permission;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PermissionMapper {

    /**
     * 根据用户id查询
     * @param userId
     * @return
     */
    List<Permission> selByUserId(@Param("id") int userId);
}
