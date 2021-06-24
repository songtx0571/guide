package com.howei.service;

import com.howei.pojo.OperatingHours;

import java.util.List;
import java.util.Map;

public interface WorkingService {

    List<OperatingHours> getOperatingHoursList(Map map);

    int addOperatingHours(OperatingHours operatingHours);

    OperatingHours findByMonthAndEmpId(Map map);

    int updOperatingHours(OperatingHours operatingHours);
}
