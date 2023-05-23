package com.inzent.injoy.service;

import com.inzent.injoy.model.BoardCommentDTO;
import com.inzent.injoy.model.TaskCommentDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BoardCommentService {
    private final String NAMESPACE = "mapper.BoardCommentMapper";
    private SqlSession session;

    public BoardCommentService(SqlSession session){
        this.session = session;
    }


    public List<BoardCommentDTO> selectAll(Map<String, Object> map) {
        return session.selectList(NAMESPACE + ".selectAll", map);
    }

    public void insert(BoardCommentDTO boardCommentDTO){
        System.out.println(boardCommentDTO);
        session.insert(NAMESPACE+".insert", boardCommentDTO);
    }

    public BoardCommentDTO selectOne(int bCommentId) {
        return session.selectOne(NAMESPACE + ".selectOne", bCommentId);
    }

    public void delete(int bCommentId) {
        session.delete(NAMESPACE + ".delete", bCommentId);
    }

    public void update(BoardCommentDTO bComment) {
        session.update(NAMESPACE + ".update", bComment);
    }
}
