package com.howei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@EnableWebSocket
@Configuration
@Component
public class WebsocketConfiguration implements  WebSocketConfigurer  {

    @Autowired
    private HandlerTest handlerTest ;

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        new ServerEndpointExporter();
        webSocketHandlerRegistry.addHandler(this.handlerTest , "/webSocket").setAllowedOrigins("*");
        webSocketHandlerRegistry.addHandler(this.handlerTest , "/getPostChildList").setAllowedOrigins("*");
    }
}
