package com.howei.service;

import java.util.List;
import java.util.Map;

public interface EmployeeService {

    List<Map<String,Object>> getEmpMap(Map souMap);

    Map<Integer,String> getUsersMap();
}
