package com.howei.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/webSocket")
@Component
public class WebSocket {
    private Session session;
    //定义Websocket容器，储存session
    private static CopyOnWriteArraySet<WebSocket> webSocketSet = new CopyOnWriteArraySet<>();

    //对应前端的一些事件
    //建立连接
    @OnOpen
    public void opOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
    }

    //关闭连接
    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
    }

    //接收消息
    @OnMessage
    public void onMessage(String message) {
    }

    //发送消息
    public void sendMessage(String message) {
        //遍历储存的Websocket
        for (WebSocket webSocket : webSocketSet) {
            //发送
            try {
                webSocket.session.getBasicRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
