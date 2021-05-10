package com.howei.config.redis;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.stereotype.Service;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

@Service
public class FormAuthenticationFilter extends org.apache.shiro.web.filter.authc.FormAuthenticationFilter{

    public static final String DEFAULT_MESSAGE_PARAM = "message";

    /** 自定义保存到session中的请求数据的key 用于页面跳转 */
    public static final String CUSTOM_SAVED_REQUEST = "customSavedRequest";

    private String messageParam = DEFAULT_MESSAGE_PARAM;

    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request,
                                     ServletResponse response) throws Exception {
        SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(request);
        Session session = subject.getSession();
        session.setAttribute(CUSTOM_SAVED_REQUEST, savedRequest);
        return super.onLoginSuccess(token, subject, request, response);
    }

    /**
     * 登录失败调用事件
     */
    @Override
    protected boolean onLoginFailure(AuthenticationToken token,
                                     AuthenticationException e, ServletRequest request, ServletResponse response) {
        String className = e.getClass().getName(), message = "";
        if (IncorrectCredentialsException.class.getName().equals(className)
                || UnknownAccountException.class.getName().equals(className)){
            message = "用户名或密码错误, 请重试.";
        }
        else if (e.getMessage() != null && StringUtils.startsWith(e.getMessage(), "msg:")){
            message = StringUtils.replace(e.getMessage(), "msg:", "");
        }
        else{
            message = "系统异常，请稍后再试！";
            e.printStackTrace();
        }
        request.setAttribute(getFailureKeyAttribute(), className);
        request.setAttribute(getMessageParam(), message);
        return true;
    }

    public String getMessageParam() {
        return messageParam;
    }
}
