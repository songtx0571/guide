package com.howei.mapper;

import com.howei.pojo.Company;
import com.howei.pojo.Department;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DepartmentMapper {
    /**
     * 获取部门列表
     * @return
     */
    List<Department> getDepList();

    Department selById(int id);

    Department selByMapParam(Object departmentName);

    List<Company> getDepMap();
}
