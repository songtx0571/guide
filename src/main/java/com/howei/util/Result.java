package com.howei.util;

import java.util.*;

public class Result {

    private int count;//总数
    private Object data;//数据
    private int code;
    private String msg;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Result(int count, List data, int code, String msg) {
        this.count = count;
        this.data = data;
        this.code = code;
        this.msg = msg;
    }

    public Result() {
    }

    public static Result ok(int code, int count, Object data, String msg) {
        Result result = new Result();
        result.setCount(count);
        result.setData(data);
        result.setMsg(msg);
        result.setCode(code);
        return result;
    }

    public static Result ok(int count, Object data) {
        return ok(0, count, data, "操作成功");
    }

    public static Result ok() {
        return ok(0, 0, null, "操作成功");
    }

    public static Result ok(String msg) {
        return ok(0, 0, null, msg);
    }

    public static Result ok(ResultEnum resultEnum, int count, Object data) {
        return ok(resultEnum.getCode(), count, data, resultEnum.getMsg());
    }

    public static Result fail(String msg) {
        Result result = new Result();
        result.setCode(-1);
        result.setMsg(msg);
        return result;
    }

    public static Result fail() {
        return fail("操作失败");
    }

    public static Result fail(ResultEnum resultEnum) {
        Result result = new Result();
        result.setCode(resultEnum.getCode());
        result.setMsg(resultEnum.getMsg());
        return result;
    }
}
