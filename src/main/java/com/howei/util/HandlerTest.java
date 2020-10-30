package com.howei.util;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

@Component
public class HandlerTest extends TextWebSocketHandler {
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws IOException {
        WebSocket webSocket=new WebSocket();
        webSocket.sendMessage(message.getPayload());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws
            Exception {
        session.sendMessage(new TextMessage( "欢迎连接websocket服务"));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        System.out.println("断开连接！");
    }

}
