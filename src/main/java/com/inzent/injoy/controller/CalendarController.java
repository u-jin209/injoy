package com.inzent.injoy.controller;

import com.inzent.injoy.model.*;
import com.inzent.injoy.service.CalendarCommentService;
import com.inzent.injoy.service.CalendarService;
import groovy.transform.Internal;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


//@Controller
@Controller
public class CalendarController {
    private CalendarService calendarService;


    private CalendarCommentService calendarCommentService;

    public CalendarController(CalendarService calendarService, CalendarCommentService calendarCommentService) {
        this.calendarService = calendarService;
        this.calendarCommentService = calendarCommentService;
    }


    @ResponseBody
    @GetMapping("/loadSchedule")//일정 뿌리기  loadSchedule
    public List<Map<String, Object>> monthPlan(HttpServletRequest request, Model model, @AuthenticationPrincipal UserCustomDetails logIn){
        UserDTO userDTO = logIn.getUserDTO();
        int projectId = Integer.parseInt(request.getParameter("projectId"));
        List<CalendarDTO> list = calendarService.selectAll(projectId);

        String activeStart = request.getParameter("activeStart");
//        System.out.println("activeStart = " + activeStart);

        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArr = new JSONArray();

        String startStr, endStr;
        String start, end;
        HashMap<String, Object> hash = new HashMap<>();
        for (int i = 0; i < list.size(); i++) {
            hash.put("id", list.get(i).getCalendarId());
            hash.put("title", list.get(i).getCalTitle());

            Date startDate = list.get(i).getCalStart();
            Timestamp startTimestamp = new Timestamp(startDate.getTime());
            startStr = startTimestamp.toString();

            Date endDate = list.get(i).getCalEnd();
            Timestamp endTimestamp = new Timestamp(endDate.getTime());
            endStr = endTimestamp.toString();
            start = startStr.substring(0, startStr.length() - 2);
            end = endStr.substring(0, endStr.length() - 2);

            hash.put("start", start);
            hash.put("end", end);
            hash.put("color", list.get(i).getCalColor());
            hash.put("textColor", list.get(i).getCalTextColor());
            hash.put("borderColor", list.get(i).getCalBorderColor());
            jsonObj = new JSONObject(hash);
            jsonArr.add(jsonObj);
        }
        return jsonArr;
    }


    @ResponseBody
    @PostMapping(value = "/registerSchedule") //나중에 이름 바꿔주기       registerSchedule
    public void registerScheduleMethod(HttpServletRequest request, @AuthenticationPrincipal UserCustomDetails logIn) throws ParseException {

        CalendarDTO c = new CalendarDTO();
        int projectId = Integer.parseInt(request.getParameter("projectIdd"));
        c.setProjectId(projectId);
        UserDTO userDTO = logIn.getUserDTO();
//        System.out.println("userDTO = " + userDTO);
        c.setUserId(userDTO.getId());
        c.setCalTitle(request.getParameter("scheduleTitle"));
        c.setCalContent(request.getParameter("writeScheduleContent"));


//        System.out.println("startDate = " + request.getParameter("startDate"));
//        System.out.println("endDate = " + request.getParameter("endDate"));
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date start = formatter.parse(startDate);
        Date end = formatter.parse(endDate);

        c.setCalEnd(end);
        c.setCalStart(start);

        c.setCalRegisterDate(new Date());

        String[][] colorArr = {
                {"#545de8", "", ""},
                {"#ffff37", "black", ""},
                {"#A2F3A0FF", "white", "#A2F3A0FF"},
                {"#F6C7EFFF", "", "#F6C7EFFF"},
                {"#F52A2AFF", "", ""}
        };

        int n = (int) (Math.random() * 5);

        c.setCalColor(colorArr[n][0]);
        c.setCalTextColor(colorArr[n][1]);
        c.setCalBorderColor(colorArr[n][2]);

        c.setCalAddress(request.getParameter("addressInputId"));
        c.setCalImgSrc(request.getParameter("mapImage"));
//        System.out.println("SRC : " + request.getParameter("mapImage"));

//        System.out.println("c = " + c);
        calendarService.insert(c);
    }


    @ResponseBody
    @PostMapping(value = "/deleteSchedule")
    public void deleteScheduleMethod(HttpServletRequest request) {
//        System.out.println("스케줄 삭제 메서드ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        int projectId = Integer.parseInt(request.getParameter("projectId"));
//        System.out.println("projectIdddddddddddddddddddd = " + projectId);
        int scheduleId = Integer.parseInt(request.getParameter("scheduleId"));
//        System.out.println("scheduleIddddddddddddddd = " + scheduleId);

        CalendarDTO c = new CalendarDTO();
        c.setProjectId(projectId);
        c.setCalendarId(scheduleId);

        calendarService.delete(c);
    }

    @ResponseBody
    @PostMapping(value = "/modifySchedule") //나중에 이름 바꿔주기       registerSchedule
    public void modifyScheduleMethod(HttpServletRequest request, @AuthenticationPrincipal UserCustomDetails logIn) throws ParseException {
        CalendarDTO c = new CalendarDTO();
        int projectId = Integer.parseInt(request.getParameter("projectId"));
        int calId = Integer.parseInt(request.getParameter("calId"));
        String modTitle = request.getParameter("modifyScheduleTitle");
        c.setProjectId(projectId);
        c.setCalendarId(calId);
        c.setCalTitle(modTitle);

        String startDate = request.getParameter("modifyStartDate");
        String endDate = request.getParameter("modifyEndDate");

        System.out.println("startDate = " + startDate);
        System.out.println("endDate = " + endDate);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        c.setCalStart(Timestamp.valueOf(start));
        c.setCalEnd(Timestamp.valueOf(end));

        String modContent = request.getParameter("modifyWriteScheduleContent");
        c.setCalContent(modContent);

        String address = request.getParameter("address");
        String src = request.getParameter("mapImage");
        c.setCalAddress(address);
        c.setCalImgSrc(src);

//        System.out.println("수정씨 = " + c);

        calendarService.update(c);
    }






//    @ResponseBody
//    @PostMapping(value = "/testtt")
    @RequestMapping(value = "/testtt", method = RequestMethod.POST)
    public String testtt(ModelMap model, HttpServletRequest request, @AuthenticationPrincipal UserCustomDetails logIn) throws Exception {
//        System.out.println(" testtt 메서드입니다.. ");
        String projectName = request.getParameter("projectName");

        String calendarId = request.getParameter("calendarId");
//        System.out.println("calendarId = " + calendarId);

        String projectIdTmp = request.getParameter("projectIdId");
        int projectId = Integer.parseInt(projectIdTmp);


        CalendarDTO c = calendarService.selectOne(Integer.parseInt(calendarId));

//        System.out.println("c.getCalStart() = " + c.getCalStart());
        Date now = c.getCalRegisterDate();

        Timestamp nowTimestamp = new Timestamp(now.getTime());
        String strReg = nowTimestamp.toString();

//        System.out.println(strReg);
        String calRegister_date = strReg.substring(0, strReg.length() - 7);

        Date startDate = c.getCalStart();
        Timestamp startTimestamp = new Timestamp(startDate.getTime());
        String strStart = startTimestamp.toString();

        Date endDate = c.getCalEnd();
        Timestamp endTimestamp = new Timestamp(endDate.getTime());
        String strEnd = endTimestamp.toString();


        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String startDateStr = format.format(startDate);
        String endDateStr = format.format(endDate);



        SimpleDateFormat sdf = new SimpleDateFormat("EEEE");
        String startDayOfWeek = sdf.format(startDate);
        String endDayOfWeek = sdf.format(endDate);
//        System.out.println("startDateStr = " + startDateStr);
//        System.out.println("endDateStr = " + endDateStr);

        String sDate = startDateStr.substring(0,startDateStr.length()-6);
        String eDate = endDateStr.substring(0, endDateStr.length()-6);
//        System.out.println("sDate = " + sDate);
//        System.out.println("eDate = " + eDate);

        String sTime = startDateStr.substring(11, 16);
        String eTime = endDateStr.substring(11, 16);

        String sDayOfWeek = startDayOfWeek.substring(0,1);
        String eDayOfWeek = endDayOfWeek.substring(0,1);
//        System.out.println("eDayOfWeek = " + eDayOfWeek);
//        System.out.println("sDayOfWeek = " + sDayOfWeek);

//        System.out.println("sTime = " + sTime);
        startDateStr = sDate + " (" + sDayOfWeek + "), " + sTime;
        endDateStr = eDate+ " (" + eDayOfWeek + "), " + eTime;

    //        유저닉네임 필요
            model.addAttribute("calobj", c);
            model.addAttribute("projectId", c.getProjectId());
            model.addAttribute("calendarId", c.getCalendarId());
            model.addAttribute("projectName", projectName);
            model.addAttribute("writerId", c.getUserId());
//            System.out.println("이름 : " + calendarService.getUsername(c.getUserId()) );
            model.addAttribute("usernamee", calendarService.getUsername(c.getUserId()));
            model.addAttribute("calTitle", c.getCalTitle());
            model.addAttribute("calContent", c.getCalContent());
            model.addAttribute("calStart", startDateStr);
            model.addAttribute("calEnd", endDateStr);

            model.addAttribute("calRegister_date",calRegister_date);
            model.addAttribute("calAddress", c.getCalAddress());
//            model.addAttribute("calImgSrc",c.getCalImgSrc());
            String calImgSrcStr = "non";
            if(c.getCalImgSrc() != null){
                calImgSrcStr = c.getCalImgSrc();
            }
            model.addAttribute("calImgSrc", calImgSrcStr);


        String yearAndMonth = strStart.substring(0, 7);
        String month = strStart.substring(8, 10);
        model.addAttribute("yearAndMonth", yearAndMonth);
        model.addAttribute("month", month);

        CalendarDTO proAndCalId = new CalendarDTO();
        proAndCalId.setProjectId(Integer.parseInt(request.getParameter("projectIdId")));
        proAndCalId.setCalendarId(Integer.parseInt(request.getParameter("calendarId")));

//            List<CalCommentDTO> comList =  calendarCommentService.selectAll(proAndCalId);
//            for(CalCommentDTO ccc : comList){
//                System.out.println("ccc : " + ccc);
//            }
//
//            model.addAttribute("comList", comList);
            model.addAttribute("profilePhoto", c.getProfilePhoto());

            UserDTO currentUser = logIn.getUserDTO();
            String currentProfile = currentUser.getProfilePhoto();
            model.addAttribute("currentProfile", currentProfile);



        CalendarDTO tmpC = new CalendarDTO();
        tmpC.setProjectId(projectId);
        tmpC.setCalendarId(Integer.parseInt(calendarId));

        List<CalCommentDTO> commentList = calendarCommentService.selectAll(c);
        int currentUserId = Integer.parseInt(request.getParameter("loginUserId"));
        for(CalCommentDTO cm : commentList) {
            if(currentUserId == cm.getCalComUserId()) {
                cm.setIsSame("yes");
            } else { cm.setIsSame("no");}
        }

//        System.out.println("commentList 댓글들 in testtt = " + commentList);

        model.addAttribute("commentList", commentList);





//            이름 바꿔주기
//            return "/project/calendar :: #tlqkf"; //경로 문제
            return "/project/calendar :: #slideee"; //경로 문제
    }


    @ResponseBody
    @PostMapping(value = "/insertCalComment")
    public HashMap<String, String> insertCalComment(HttpServletRequest request, @AuthenticationPrincipal UserCustomDetails logIn) {
        UserDTO userDTO = logIn.getUserDTO();

        int projectId = Integer.parseInt(request.getParameter("projectIdId"));
        int calId = Integer.parseInt(request.getParameter("calId"));
        String username = userDTO.getName();
        String comment = request.getParameter("comment");


        CalCommentDTO c = new CalCommentDTO();
        c.setCalComProjectId(projectId);
        c.setCalComCalId(calId);
        c.setCalComUserId(userDTO.getId());
        c.setCalComContent(comment);

        String nowStr = Timestamp.valueOf(LocalDateTime.now()).toString();
        String now = nowStr.substring(0, nowStr.length() - 11);
        c.setCalComRegisterDateStr(now);
        c.setCalComUsername(username);

        String profileSrc = userDTO.getProfilePhoto();
//        System.out.println("profileSrc = " + profileSrc);
        c.setProfilePhoto(profileSrc);


        calendarCommentService.insert(c);

        CalCommentDTO comObj = calendarCommentService.selectOneComment(c);
//        System.out.println("새로 입력한 댓글입니다. : " + comObj);

        HashMap<String, String> tmp = new HashMap<String, String>();
        tmp.put("commentId", comObj.getCalCommentId() + "");//수정하기
        tmp.put("calComProjectId", comObj.getCalComProjectId() + "");
        tmp.put("calComCalId", comObj.getCalComCalId() + "");
        tmp.put("userId", comObj.getCalComUserId() + "");//수정하기
        tmp.put("username", calendarService.getUsername(comObj.getCalComUserId()));
        tmp.put("registerDateStr", now);
        tmp.put("profileSrc", comObj.getProfilePhoto());

        return tmp;
    }




    @ResponseBody
    @PostMapping(value = "/showCalComment")
    public List<CalCommentDTO> CommentListMethod(HttpServletRequest request) {
//        System.out.println("showCalComment 입니다.....");
        int projectIdId = Integer.parseInt(request.getParameter("projectIdId"));
        int calId = Integer.parseInt(request.getParameter("calendarId"));

        CalendarDTO c = new CalendarDTO();
        c.setProjectId(projectIdId);
        c.setCalendarId(calId);

         List<CalCommentDTO> commentList = calendarCommentService.selectAll(c);
//        System.out.println("commentList 댓글들 = " + commentList);


        return commentList;
    }


    @ResponseBody
    @PostMapping(value = "/deleteCalComment")
    public void deleteCommentMethod(HttpServletRequest request) {
        int id = Integer.parseInt(request.getParameter("commentId"));
//        System.out.println("삭제할 아이디 = " + id);
        calendarCommentService.delete(id);
    }

    @GetMapping("/calendar/detailCalendar")
    @ResponseBody
    public CalendarDTO detailCalendar(int calendarId) {
//        System.out.println(calendarService.selectOne(calendarId));
        return calendarService.selectOne(calendarId);
    }

    @PostMapping("/calendar/write")
    @ResponseBody
    public String writeCalendar(@AuthenticationPrincipal UserCustomDetails login, CalendarDTO calendarDTO) {
//        System.out.println(calendarDTO);
        calendarDTO.setUserId(login.getUserDTO().getId());
        if (calendarDTO.getCalTitle().isEmpty()) {
            return "error";
        } else {

            String[][] colorArr = {
                    {"#545de8", "", ""},
                    {"#ffff37", "black", ""},
                    {"#A2F3A0FF", "white", "#A2F3A0FF"},
                    {"#F6C7EFFF", "", "#F6C7EFFF"},
                    {"#F52A2AFF", "", ""}
            };

            int n = (int) (Math.random() * 5);

            calendarDTO.setCalRegisterDate(new Date());
            calendarDTO.setCalColor(colorArr[n][0]);
            calendarDTO.setCalTextColor(colorArr[n][1]);
            calendarDTO.setCalBorderColor(colorArr[n][2]);
            calendarService.insert(calendarDTO);

            return "success";
        }
    }

    @PostMapping("/calendar/updateHome")
    public String updateHome(@AuthenticationPrincipal UserCustomDetails login, CalendarDTO calendarDTO){
        CalendarDTO calendar = calendarService.selectOne(calendarDTO.getCalendarId());

        calendar.setCalTitle(calendarDTO.getCalTitle());
        calendar.setCalContent(calendarDTO.getCalContent());
        calendar.setCalStart(calendarDTO.getCalStart());
        calendar.setCalEnd(calendarDTO.getCalEnd());
        calendar.setCalAddress(calendarDTO.getCalAddress());
        calendarService.updateHome(calendar);

        return "redirect:/project/" + calendar.getProjectId();
    }

    @PostMapping("/calendar/delete")
    public String deleteBoard(int calendarId){
        CalendarDTO calendarDTO = calendarService.selectOne(calendarId);

        calendarService.delete(calendarDTO);
        return "redirect:/project/" + calendarDTO.getProjectId();

    }


    @ResponseBody
    @PostMapping(value = "/modifyComment")
    public void modifyCommentMethod(HttpServletRequest request) {
        int commentId = Integer.parseInt(request.getParameter("commentId"));
        String comment = request.getParameter("commentVal");
//        System.out.println("수정할 댓글 : " + comment + "-by modifyCommentMethod");

        CalCommentDTO c = new CalCommentDTO();
        c.setCalCommentId(commentId);
        c.setCalComContent(comment);

        calendarCommentService.updateHome(c);

    }



}
