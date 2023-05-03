package com.inzent.injoy.service;

import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.TaskDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final String NAMESPACE = "mapper.TaskMapper";
    private SqlSession session;

    public TaskService(SqlSession session){
        this.session = session;
    }

    public List<TaskDTO> selectAll(int projectId) {
        return session.selectList(NAMESPACE + ".selectAll", projectId);
    }
    public TaskDTO selectOne(int taskId) {
        return session.selectOne(NAMESPACE + ".selectOne", taskId);
    }
    public void insert(TaskDTO taskDTO) {
        session.insert(NAMESPACE+".insert", taskDTO);
    }

    public void updateProcess(TaskDTO taskDTO) {
        session.update(NAMESPACE + ".updateProcess", taskDTO);
    }

    public void updatePriority(TaskDTO taskDTO) {
        session.update(NAMESPACE + ".updatePriority", taskDTO);
    }

    public void updateTitle(TaskDTO taskDTO) {
        session.update(NAMESPACE + ".updateTitle", taskDTO);
    }

    public void updateStartDate(TaskDTO taskDTO) {
        session.update(NAMESPACE + ".updateStartDate", taskDTO);
    }
}
