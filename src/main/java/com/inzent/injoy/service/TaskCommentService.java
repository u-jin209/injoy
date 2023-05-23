package com.inzent.injoy.service;

import com.inzent.injoy.model.TaskCommentDTO;
import com.inzent.injoy.model.TaskDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskCommentService {
    private final String NAMESPACE = "mapper.TaskCommentMapper";
    private SqlSession session;

    public TaskCommentService(SqlSession session){
        this.session = session;
    }


    public List<TaskCommentDTO> selectAll(Map<String, Object> map) {
        return session.selectList(NAMESPACE + ".selectAll", map);
    }

    public void insert(TaskCommentDTO taskCommentDTO){
        System.out.println(taskCommentDTO);
        session.insert(NAMESPACE+".insert", taskCommentDTO);
    }

    public TaskCommentDTO selectOne(int tCommentId) {
        return session.selectOne(NAMESPACE + ".selectOne", tCommentId);
    }

    public void delete(int tCommentId) {
        session.delete(NAMESPACE + ".delete", tCommentId);
    }

    public void update(TaskCommentDTO tComment) {
        session.update(NAMESPACE + ".update", tComment);
    }
}
