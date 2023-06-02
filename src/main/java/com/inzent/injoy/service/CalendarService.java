package com.inzent.injoy.service;

import com.inzent.injoy.model.CalendarDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.MediaSize;
import java.sql.Timestamp;
import java.util.List;

@Service
public class CalendarService {
    private final String NAMESPACE = "mapper.CalendarMapper";
    private SqlSession session;
    public CalendarService(SqlSession session){
        this.session = session;
    }

//    public List<CalendarDTO> selectMonthSchedule(int projectId, Timestamp activeStart, Timestamp activeEnd) {
//        return session.selectList(NAMESPACE + ".selectMonthSchedule", projectId, activeStart, activeEnd);
//    }

    public List<CalendarDTO> selectAll() {
        return session.selectList(NAMESPACE + ".selectAll");
    }
    public CalendarDTO selectOne(int calendarId) {
        return session.selectOne(NAMESPACE + ".selectOne", calendarId);
    }

//    public String selectUserName(int userId) {
//        return session.selectOne(NAMESPACE + ".selectUserName", userId);
//    }

    public void insert(CalendarDTO calendarDTO) {
        session.insert(NAMESPACE+".insert", calendarDTO);
    }

    public void delete(CalendarDTO calendarDTO) {
        session.delete(NAMESPACE + ".delete", calendarDTO);
    }

    public String getUsername(int userId) {
        return session.selectOne(NAMESPACE + ".getUsername", userId);
    }

}
