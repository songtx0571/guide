package com.howei.service;

import com.howei.pojo.Defect;

import java.util.List;
import java.util.Map;

public interface DefectService {


    List<Defect> getDefectList(Map map);

    int addDefect(Defect defect);

    int updDefect(Defect defect);

    Defect getDefectById(Integer id);

    int getDefectCountByDep(int departmentId);

    List<Map<String,String>> getDefectHistiryByEqu(Map map);

    void deleteById(Integer id);
}
