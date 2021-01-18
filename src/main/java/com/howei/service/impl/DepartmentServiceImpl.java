package com.howei.service.impl;

import com.howei.mapper.DepartmentMapper;
import com.howei.pojo.Company;
import com.howei.pojo.Department;
import com.howei.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl  implements DepartmentService {

    @Autowired
    DepartmentMapper departmentMapper;

    @Override
    public List<Department> getDepList() {
        return departmentMapper.getDepList();
    }

    @Override
    public Department selById(int id) {
        return departmentMapper.selById(id);
    }

    @Override
    public Department selByMapParam(Object departmentName) {
        return departmentMapper.selByMapParam(departmentName);
    }

    @Override
    public List<Company> getDepMap() {
        return departmentMapper.getDepMap();
    }
}
