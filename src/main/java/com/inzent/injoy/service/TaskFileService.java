package com.inzent.injoy.service;

import com.inzent.injoy.model.TaskFileDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskFileService {
    private final String NAMESPACE = "mapper.TaskFileMapper";
    private SqlSession session;

    public TaskFileService(SqlSession session){
        this.session = session;
    }
    public void insert(TaskFileDTO taskFileDTO){
        System.out.println(taskFileDTO);
        session.insert(NAMESPACE+".insert", taskFileDTO);
    }

    public List<TaskFileDTO> selectAll(int taskId) {
        return session.selectList(NAMESPACE + ".selectAll", taskId);
    }
}
