package com.howei.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    /**
     * 获取格式：yyyy-MM-dd
     * @return
     */
    public static String getYMD(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String created=sdf.format(new Date());
        return created;
    }


    public static String getBothDate(String beginTime,String endTime)throws ParseException{
        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long bt=sdf.parse(beginTime).getTime();
        long et=sdf.parse(endTime).getTime();
        long diff=(et-bt);
        // 计算差多少天
        long day = diff / nd;
        // 计算差多少小时
        long hour = diff % nd / nh;
        // 计算差多少分钟
        long min = diff % nd % nh / nm;
        String result="";
        if(day<1&&hour>1){
            result=hour + "时" + min + "分钟";
        }else if(day<1&&hour<1){
            result=min + "分钟";
        }else{
            result=day + "天" + hour + "时" + min + "分钟";
        }
        return result;
    }


    /**
     *
     * @param timeMillis
     * @param level
     * @return
     */
    public static Long getConfirmTimeMills(Long timeMillis, String level) {
        if ("0".equals(level)) {
            return timeMillis + 8 * 60 * 60 * 1000;
        } else if ("1".equals(level)) {
            return timeMillis + 16 * 60 * 60 * 1000;
        } else if ("2".equals(level)) {
            return timeMillis + 24 * 60 * 60 * 1000;
        } else if ("3".equals(level)) {
            return timeMillis + 72 * 60 * 60 * 1000;
        } else if ("4".equals(level)) {
            return timeMillis + 16 * 60 * 60 * 1000;
        } else if ("5".equals(level)) {
            return timeMillis + 168 * 60 * 60 * 1000;
        }
        return null;
    }

    /**
     * 获取指定日期在当年第几周
     * @param today
     * @return
     */
    public int getWeeklyByThisYear(String today){
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
        Date date1=null;
        try {
            date1=dateFormat.parse(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //获取一个Calendar对象
        Calendar calendar = Calendar.getInstance();
        //设置星期一为一周开始的第一天
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(date1);
        //设置在一年中第一个星期所需最少天数
        calendar.setMinimalDaysInFirstWeek(4);
        //格式化日期
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = null;
        try {
            parse = simpleDateFormat.parse(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        calendar.setTime(parse);
        int weekOfYear1 = calendar.get(Calendar.WEEK_OF_YEAR);
        return weekOfYear1;
    }

    /**
     * 获取指定日期所在周的开始日期与结束日期
     * @param today
     * @return
     */
    public static Map<String,String> getDateBothByWeekly(String today){
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
        Date date1=null;
        try {
            date1=dateFormat.parse(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //获取一个Calendar对象
        Calendar calendar = Calendar.getInstance();
        //设置星期一为一周开始的第一天
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(date1);
        //格式化日期
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = null;
        try {
            parse = simpleDateFormat.parse(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        calendar.setTime(parse);
        //获得当前日期属于今年的第几周
        int weekOfYear = calendar.get(Calendar.WEEK_OF_YEAR);
        //获得当前的年
        int weekYear = calendar.get(Calendar.YEAR);
        calendar.setWeekDate(weekYear, weekOfYear, 2);//获得指定年的第几周的开始日期
        long starttime = calendar.getTime().getTime();//创建日期的时间该周的第一天，
        calendar.setWeekDate(weekYear, weekOfYear, 1);//获得指定年的第几周的结束日期
        long endtime = calendar.getTime().getTime();
        String dateStart = simpleDateFormat.format(starttime);//将时间戳格式化为指定格式
        String dateEnd = simpleDateFormat.format(endtime);
        Map<String,String> map=new HashMap<>();
        map.put("startDate",dateStart);
        map.put("endDate",dateEnd);
        return  map;
    }

    /**
     * 获取两个时间的相差小时
     * @param beginTime
     * @param endTime
     * @return
     * @throws ParseException
     */
    public static double getBothNH(String beginTime,String endTime)throws ParseException{
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long bt=sdf.parse(beginTime).getTime();
        long et=sdf.parse(endTime).getTime();
        long diff=(et-bt);
        // 计算差多少小时
        long hour = diff / nh;
        // 计算差多少分钟
        long min = diff  % nh / nm;
        BigDecimal bd = new BigDecimal(hour+(Double.valueOf(min)/60));
        double result=bd.setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue();
        return result;
    }
}
