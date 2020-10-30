package com.howei.service;

import com.howei.pojo.Department;

import java.util.List;

public interface DepartmentService {
    /**
     * 获取部门列表
     * @return
     */
    List<Department> getDepList();

    Department selById(int department);

    Department selByMapParam(Object departmentName);
}
