package com.howei.controller;

import com.howei.util.WebSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/guide/text")
public class WebsocketController {

    @Autowired
    private WebSocket webSocket;

    @RequestMapping("/test")
    public String test(){

        return "";
    }
}
