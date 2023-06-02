package com.inzent.injoy.controller;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.inzent.injoy.model.CalCommentDTO;
import com.inzent.injoy.model.CalendarDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
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

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//@Controller
@Controller
public class CalendarController {
    private CalendarService calendarService;
    private CalendarCommentService calendarCommentService;

    public CalendarController(CalendarService calendarService, CalendarCommentService calendarCommentService) {
        this.calendarService = calendarService;
        this.calendarCommentService = calendarCommentService;
    }

    @GetMapping("/orange")
    public String orange(Model model, HttpServletRequest request){
        return "/project/calendar2";
    }


    @ResponseBody
    @GetMapping("/logic")//일정 뿌리기
    public List<Map<String, Object>> monthPlan(HttpServletRequest request, Model model, @AuthenticationPrincipal UserCustomDetails logIn){
        UserDTO userDTO = logIn.getUserDTO();
        System.out.println("userDTO = " + userDTO);

        List<CalendarDTO> list = calendarService.selectAll();//이것은 테스트 중
        model.addAttribute("tmp","Cherry");


        String str = request.getParameter("activeStart");
        System.out.println("strrrr : " + str);

        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArr = new JSONArray();

        String startStr, endStr;
        String start, end;
        HashMap<String, Object> hash = new HashMap<>();
        for(int i=0;i<list.size(); i++) {
            hash.put("id", list.get(i).getCalendarId());
            hash.put("title", list.get(i).getCalTitle());

            startStr = list.get(i).getCalStart().toString();
            endStr = list.get(i).getCalEnd().toString();
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
    @PostMapping(value = "/receive") //나중에 이름 바꿔주기
    public void receiveMethod(HttpServletRequest request, @AuthenticationPrincipal UserCustomDetails logIn) throws ParseException {

        
        CalendarDTO c = new CalendarDTO();
//        c.setProjectId( 프로젝트 아이디 넣어주세요 );
        UserDTO userDTO = logIn.getUserDTO();
        System.out.println("userDTO = " + userDTO);
        c.setUserId(userDTO.getId());
        c.setCalTitle(request.getParameter("scheduleTitle"));
        c.setCalContent(request.getParameter("writeScheduleContent"));


        System.out.println("startDate = " + request.getParameter("startDate"));
        System.out.println("endDate = " + request.getParameter("endDate"));
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        System.out.println("start = " + start);
        System.out.println("end = " + end);

        c.setCalEnd(Timestamp.valueOf(end));
        c.setCalStart(Timestamp.valueOf(start));

        LocalDateTime now = LocalDateTime.now();
        c.setCalRegister_date(Timestamp.valueOf(now));

//        color, textcolor, borderColor
        String[][] colorArr = {
                {"#545de8", "",""},
                {"#ffff37","black", ""},
                {"#A2F3A0FF","white", "#A2F3A0FF"},
                {"#F6C7EFFF","", "#F6C7EFFF"},
                {"#F52A2AFF","",""}
        };

        int n = (int)(Math.random() * 5);

        c.setCalColor(colorArr[n][0]);
        c.setCalTextColor(colorArr[n][1]);
        c.setCalBorderColor(colorArr[n][2]);

        c.setCalAddress(request.getParameter("addressInputId"));
        c.setCalImgSrc(request.getParameter("mapImage"));
        System.out.println("SRC : " + request.getParameter("mapImage"));

        System.out.println("c = " + c);
        calendarService.insert(c);
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
            String strReg =  c.getCalRegister_date().toString();
            String calRegister_date = strReg.substring(0, strReg.length() - 10);

            String strStart = c.getCalStart().toString();
            String strEnd = c.getCalEnd().toString();
            String calStart =  strStart.substring(0, strStart.length() - 5);
            String calEnd =  strEnd.substring(0, strEnd.length() - 5);

    //        유저닉네임 필요
            model.addAttribute("calobj", c);
            model.addAttribute("projectId", c.getProjectId());
            model.addAttribute("scheduleId", c.getCalendarId());
            model.addAttribute("projectName", projectName);
            model.addAttribute("writerId", c.getUserId());
            System.out.println("이름 : " + calendarService.getUsername(c.getUserId()) );
            model.addAttribute("usernamee", calendarService.getUsername(c.getUserId()));
            model.addAttribute("calTitle", c.getCalTitle());
            model.addAttribute("calContent", c.getCalContent());
        System.out.println("c.getCalContent() = " + c.getCalContent());
            model.addAttribute("calStart",calStart);
            model.addAttribute("calEnd",calEnd);
            model.addAttribute("calRegister_date",calRegister_date);
            model.addAttribute("calAddress", c.getCalAddress());
            model.addAttribute("calImgSrc",c.getCalImgSrc());

            strStart = c.getCalStart().toString();
            System.out.println("strStart = " + strStart);
            String yearAndMonth = strStart.substring(0,strStart.length() - 14);
            String month = strStart.substring(8, strStart.length() - 11);
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
        String now = nowStr.substring(0, nowStr.length()-11);
        c.setCalComRegisterDateStr(now);

        c.setCalComUsername(username);

        calendarCommentService.insert(c);

        CalCommentDTO comObj = calendarCommentService.selectOneComment(c);
        System.out.println("새로 입력한 댓글입니다. : " + comObj);

        HashMap<String, String> tmp = new HashMap<String, String>();
        tmp.put("commentId",comObj.getCalCommentId()+"");//수정하기
        tmp.put("calComProjectId", comObj.getCalComProjectId()+"");
        tmp.put("calComCalId", comObj.getCalComCalId()+"");
        tmp.put("userId", comObj.getCalComUserId()+"");//수정하기
        tmp.put("username", calendarService.getUsername(comObj.getCalComUserId()));
        tmp.put("registerDateStr", now);

        return tmp;
    }



//    댓글 삭제 메서드
    @ResponseBody
    @PostMapping(value = "/deleteCalComment")
    public void deleteCommentMethod(HttpServletRequest request) {
        int id = Integer.parseInt(request.getParameter("commentId"));
        System.out.println("삭제할 아이디 = " + id);
        calendarCommentService.delete(id);
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
         for(CalCommentDTO ccc : commentList) {
             System.out.println("ccc : " + ccc);
             System.out.println("날짜 : "+ ccc.getCalComRegisterDate());
         }


         return commentList;
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


    }