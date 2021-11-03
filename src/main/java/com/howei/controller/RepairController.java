package com.howei.controller;

import com.howei.util.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("guide/repair")
public class RepairController {

    @RequestMapping("/toRepair")
    public ModelAndView toRepair() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("repair");
        return modelAndView;
    }

    @RequestMapping("/toManhole")
    public ModelAndView toManhole() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("manhole");
        return modelAndView;
    }

    @GetMapping("/getManholeList")
    public Result getManholeList() {
        return Result.ok();
    }


}
