package com.inzent.injoy.controller;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.inzent.injoy.model.*;
import com.inzent.injoy.service.CalendarCommentService;
import com.inzent.injoy.service.CalendarService;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.writer.CollectionMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
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

//    나중에 삭제해 주세요
    @GetMapping("/orange")
    public String orange(Model model, HttpServletRequest request)
    {
        return "/project/calendar2";
    }


    @ResponseBody
    @GetMapping("/loadSchedule")//일정 뿌리기  loadSchedule
    public List<Map<String, Object>> monthPlan(HttpServletRequest request, Model model, @AuthenticationPrincipal UserCustomDetails logIn){
        UserDTO userDTO = logIn.getUserDTO();
        int projectId = Integer.parseInt(request.getParameter("projectId"));
        List<CalendarDTO> list = calendarService.selectAll(projectId);//이것은 테스트 중


        String activeStart = request.getParameter("activeStart");
        System.out.println("activeStart = " + activeStart);


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
//        hash.put("title", "This is Demo from Controller.");
//        hash.put("start", "2023-05-09 17:30");
//        hash.put("end", "2023-05-12 00:01");
//        hash.put("color", "#545de8");
//        hash.put("textColor", "");
//        hash.put("borderColor", "");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//        hash.put("title", "두 번째 데이터 From Controller.");
//        hash.put("start", "2023-05-10 00:01");
//        hash.put("end", "2023-05-13 00:01");
//        hash.put("color", "#ffff37");
//        hash.put("textColor", "black");
//        hash.put("borderColor", "");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//        hash.put("title", "하루일정입니다.");
//        hash.put("start", "2023-05-25 13:30:00");
//        hash.put("end", "2023-05-25 14:30:00");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//
//
//        hash.put("title", "color");
//        hash.put("start", "2023-05-14 00:01");
//        hash.put("end", "2023-05-16 00:01");
//        hash.put("color", "#A2F3A0FF");
//        hash.put("textColor", "white");
//        hash.put("borderColor", "#A2F3A0FF");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//        hash.put("title", "color");
//        hash.put("start", "2023-05-19 00:01");
//        hash.put("end", "2023-05-22 00:01");
//        hash.put("color", "#F6C7EFFF");
//        hash.put("borderColor", "#F6C7EFFF");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//        hash.put("title", "color");
//        hash.put("start", "2023-05-29 00:01");
//        hash.put("end", "2023-06-01 00:01");
//        hash.put("color", "#F52A2AFF");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
        return jsonArr;
    }


    @ResponseBody
    @PostMapping(value = "/registerSchedule") //나중에 이름 바꿔주기       registerSchedule
    public void registerScheduleMethod(HttpServletRequest request, @AuthenticationPrincipal UserCustomDetails logIn) throws ParseException {

        CalendarDTO c = new CalendarDTO();
        int projectId = Integer.parseInt(request.getParameter("projectIdd"));
        c.setProjectId(projectId);
        UserDTO userDTO = logIn.getUserDTO();
        System.out.println("userDTO = " + userDTO);
        c.setUserId(userDTO.getId());
        c.setCalTitle(request.getParameter("scheduleTitle"));
        c.setCalContent(request.getParameter("writeScheduleContent"));


        System.out.println("startDate = " + request.getParameter("startDate"));
        System.out.println("endDate = " + request.getParameter("endDate"));
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
        System.out.println("SRC : " + request.getParameter("mapImage"));

        System.out.println("c = " + c);
        calendarService.insert(c);
    }


    @ResponseBody
    @PostMapping(value = "/deleteSchedule")
    public void deleteScheduleMethod(HttpServletRequest request) {
        int projectId = Integer.parseInt(request.getParameter("projectId"));
        int scheduleId = Integer.parseInt(request.getParameter("scheduleId"));

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

        System.out.println("수정씨 = " + c);

        calendarService.update(c);
    }









//    @ResponseBody
//    @PostMapping(value = "/testtt")
    @RequestMapping(value = "/testtt", method = RequestMethod.POST)
    public String testtt(ModelMap model, HttpServletRequest request) {
        System.out.println(" testtt 메서드입니다.. ");
        String projectName = request.getParameter("projectName");

        String calendarId = request.getParameter("calendarId");
        System.out.println("calendarId = " + calendarId);

        CalendarDTO c = calendarService.selectOne(Integer.parseInt(calendarId));
        //        String name = calendarService.selectUserName(c.getUserId());
        //        System.out.println("이름 : " + name);


        System.out.println("c.getCalStart() = " + c.getCalStart());
        Date now = c.getCalRegisterDate();

        Timestamp nowTimestamp = new Timestamp(now.getTime());
        String strReg = nowTimestamp.toString();

        System.out.println(strReg);
        String calRegister_date = strReg.substring(0, strReg.length() - 4);

        Date startDate = c.getCalStart();
        Timestamp startTimestamp = new Timestamp(startDate.getTime());
        String strStart = startTimestamp.toString();

        System.out.println(strStart);

            String strStart = c.getCalStart().toString();
            String strEnd = c.getCalEnd().toString();
            String calStart =  strStart.substring(0, strStart.length() - 5);
            String calEnd =  strEnd.substring(0, strEnd.length() - 5);

    //        유저닉네임 필요
            model.addAttribute("calobj", c);
            model.addAttribute("projectId", c.getProjectId());
            model.addAttribute("calendarId", c.getCalendarId());
            model.addAttribute("projectName", projectName);
            model.addAttribute("writerId", c.getUserId());
            System.out.println("이름 : " + calendarService.getUsername(c.getUserId()) );
            model.addAttribute("usernamee", calendarService.getUsername(c.getUserId()));
            model.addAttribute("calTitle", c.getCalTitle());
            model.addAttribute("calContent", c.getCalContent());
            model.addAttribute("calStart",calStart);
            model.addAttribute("calEnd",calEnd);
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


//            이름 바꿔주기
            return "/project/calendar :: #tlqkf"; //경로 문제
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

        calendarCommentService.insert(c);

        CalCommentDTO comObj = calendarCommentService.selectOneComment(c);
        System.out.println("새로 입력한 댓글입니다. : " + comObj);

        HashMap<String, String> tmp = new HashMap<String, String>();
        tmp.put("commentId", comObj.getCalCommentId() + "");//수정하기
        tmp.put("calComProjectId", comObj.getCalComProjectId() + "");
        tmp.put("calComCalId", comObj.getCalComCalId() + "");
        tmp.put("userId", comObj.getCalComUserId() + "");//수정하기
        tmp.put("username", calendarService.getUsername(comObj.getCalComUserId()));
        tmp.put("registerDateStr", now);

        return tmp;
    }






    @ResponseBody
    @PostMapping(value = "/showCalComment")
    public List<CalCommentDTO> CommentListMethod(HttpServletRequest request) {
        System.out.println("showCalComment 입니다.....");
        int projectIdId = Integer.parseInt(request.getParameter("projectIdId"));
        int calId = Integer.parseInt(request.getParameter("calendarId"));

        CalendarDTO c = new CalendarDTO();
        c.setProjectId(projectIdId);
        c.setCalendarId(calId);

         List<CalCommentDTO> commentList = calendarCommentService.selectAll(c);

//         나중에 삭제해 주세요
         for(CalCommentDTO ccc : commentList) {
             System.out.println("ccc : " + ccc);
         }


        return commentList;
    }


    @ResponseBody
    @PostMapping(value = "/deleteCalComment")
    public void deleteCommentMethod(HttpServletRequest request) {
        int id = Integer.parseInt(request.getParameter("commentId"));
        System.out.println("삭제할 아이디 = " + id);
        calendarCommentService.delete(id);
    }

    @GetMapping("/calendar/detailCalendar")
    @ResponseBody
    public CalendarDTO detailCalendar(int calendarId) {
        System.out.println(calendarService.selectOne(calendarId));
        return calendarService.selectOne(calendarId);
    }

    @PostMapping("/calendar/write")
    @ResponseBody
    public String writeCalendar(@AuthenticationPrincipal UserCustomDetails login, CalendarDTO calendarDTO) {
        System.out.println(calendarDTO);
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


}
