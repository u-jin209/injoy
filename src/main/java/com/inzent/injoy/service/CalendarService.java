package com.inzent.injoy.service;

import com.inzent.injoy.model.CalendarDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
public class CalendarService {
    private final String NAMESPACE = "mapper.CalendarMapper";
    private SqlSession session;
    public CalendarService(SqlSession session){
        this.session = session;
    }

    public void insert(CalendarDTO calendarDTO) {
        System.out.println(" dkssudfsf " );
        session.insert(NAMESPACE+".insert", calendarDTO);
    }

}
