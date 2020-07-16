package com.howei.util;


/**
 * 系统
 */
public class Windows {
    /**
     * 判断当前操作系统是不是window
     *
     * @return boolean
     */
    public static String isWindows() {
        String sys="";
        if (System.getProperties().getProperty("os.name").toUpperCase().indexOf("WINDOWS") != -1) {
            sys="windows";
        }else if(System.getProperty("os.name").toLowerCase().indexOf("linux") >= 0){
            sys="linux";
        }else{
            sys="orther";
        }
        return sys;
    }
}
