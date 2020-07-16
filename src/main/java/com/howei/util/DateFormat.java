package com.howei.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {

    /**
     * 获取当前时间
     * yyyy-MM-dd HH:mm:ss
     * @param date
     * @return
     */
    public static String getYMDHMS(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String created=sdf.format(date);
        return created;
    }

    /**
     * 当前时间加上Hour
     * @param Hour
     * @return
     */
    public static String getBehindTime(String Hour){
        long currentTime = System.currentTimeMillis() ;
        currentTime +=Integer.parseInt(Hour)*60*60*1000;//小时
        Date date=new Date(currentTime);
        SimpleDateFormat dateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss");
        String created=dateFormat.format(date);
        return created;
    }

    /**
     * 指定时间加上Hour
     * @param Hour
     * @return
     */
    public static String getBehindTime2(String time,String Hour) throws ParseException{
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date bt=sdf.parse(time);
        long currentTime =bt.getTime();
        currentTime +=Integer.parseInt(Hour)*60*60*1000;//小时
        Date date=new Date(currentTime);
        String created=sdf.format(date);
        return created;
    }

    /**
     * 当前时间加上minute
     * @param minute
     * @return
     */
    public static String getBehindTime3(String minute){
        long currentTime = System.currentTimeMillis() ;
        currentTime +=Integer.parseInt(minute)*60*1000;//分钟
        Date date=new Date(currentTime);
        SimpleDateFormat dateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss");
        String created=dateFormat.format(date);
        return created;
    }

    /**
     * 比较两个时间大小
     * @param beginTime
     * @param endTime
     * @return
     */
    public static boolean comparetoTime(String beginTime,String endTime) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date bt=sdf.parse(beginTime);
        Date et=sdf.parse(endTime);
        if (bt.before(et)){
            return true;
        }else{
            if(beginTime.equals(endTime)){
                return true;
            }else{
                return false;
            }
        }
    }

    public static String getYMD(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String created=sdf.format(new Date());
        return created;
    }

}
