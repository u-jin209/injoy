package com.inzent.injoy.service;

import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.TaskDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public void updateEndDate(TaskDTO taskDTO) {
        session.update(NAMESPACE + ".updateEndDate", taskDTO);
    }

    public List<TaskDTO> findTask(String keyword, int projectId){
        Map<String, Object> params = new HashMap<>();
        params.put("projectId", projectId);
        params.put("keyword", keyword);

        return session.selectList(NAMESPACE + ".findTask", params);
    }

    public void updateProgress(TaskDTO taskDTO) {
            session.update(NAMESPACE + ".updateProgress", taskDTO);
    }

    public void deleteTask(int taskId){
        session.delete(NAMESPACE+".deleteTask", taskId);
    }
}
