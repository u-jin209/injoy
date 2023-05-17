package com.inzent.injoy.service;

import com.inzent.injoy.model.TaskCommentDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
public class TaskCommentService {
    private final String NAMESPACE = "mapper.TaskCommentMapper";
    private SqlSession session;

    public TaskCommentService(SqlSession session){
        this.session = session;
    }

    public void insert(TaskCommentDTO taskCommentDTO){
        System.out.println(taskCommentDTO);
        //session.insert(NAMESPACE+".insert", taskCommentDTO);
    }
}
