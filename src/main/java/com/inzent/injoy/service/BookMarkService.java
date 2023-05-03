package com.inzent.injoy.service;

import com.inzent.injoy.model.BookMarkDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookMarkService {
    private final String NAMESPACE = "mapper.BookMarkMapper";
    private SqlSession session;
    @Autowired
    public BookMarkService(SqlSession session){
        this.session = session;
    }

    public void insert(BookMarkDTO bookMarkDTO){
        session.insert(NAMESPACE+".insert",bookMarkDTO);
    }


    public void delete(BookMarkDTO bookMarkDTO){
        session.delete(NAMESPACE+".delete",bookMarkDTO);
    }
}
