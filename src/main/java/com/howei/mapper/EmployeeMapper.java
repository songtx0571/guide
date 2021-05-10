package com.howei.mapper;

import com.howei.pojo.Employee;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface EmployeeMapper {

    List<Employee> getEmpMap(Map souMap);

    List<Employee> getUsersMap();

    List<Employee> getEmployeeByManager(@Param("empId") int employeeId);
}
