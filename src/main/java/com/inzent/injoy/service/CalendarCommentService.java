package com.inzent.injoy.service;

import com.inzent.injoy.model.CalCommentDTO;
import com.inzent.injoy.model.CalendarDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.beans.PropertyEditorSupport;
import java.util.HashMap;
import java.util.List;

@Service
public class CalendarCommentService {
    private final String NAMESPACE = "mapper.CalCommentMapper";
    private SqlSession session;
    public CalendarCommentService(SqlSession session){
        this.session = session;
    }


    public List<CalCommentDTO> selectAll(CalendarDTO c) {
        return session.selectList( NAMESPACE + ".selectAll", c);
    }

    public void insert(CalCommentDTO calCommentDTO) {
        session.insert(NAMESPACE+".insert", calCommentDTO);
    }

    public void delete(int commentId) {
        session.delete(NAMESPACE + ".delete", commentId);
    }

    public CalCommentDTO selectOneComment(CalCommentDTO c) {
        return session.selectOne(NAMESPACE + ".selectOne", c);
    }
    public CalCommentDTO selectOne(int commentId) {
        return session.selectOne(NAMESPACE + ".selectOneComment", commentId);
    }
    public List<CalCommentDTO> selectAllComment(HashMap<String, Object> map) {
        return session.selectList(NAMESPACE + ".selectAllComment", map);
    }

//    public void update(CalCommentDTO c){
//        session.update(NAMESPACE + ".update", c);
//    }

    public void updateHome(CalCommentDTO calComment) {
        session.update(NAMESPACE + ".update", calComment);
    }

//    public void updateComment(CalCommentDTO c){
//        session.update()
//    }
}
