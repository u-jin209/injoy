package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final String NAMESPACE = "mapper.ProjectMapper";
    private SqlSession session;

    public ProjectService(SqlSession session){
        this.session = session;
    }


    public List<ProjectDTO> selectAll(int id){

        System.out.println("서비스 selectList" + session.selectList(NAMESPACE + ".selectAll", id));
        return session.selectList(NAMESPACE + ".selectAll", id);
    }
    public List<ProjectDTO> selectProject(int id){

        System.out.println("서비스 selectList" + session.selectList(NAMESPACE + ".selectProject", id));
        return session.selectList(NAMESPACE + ".selectProject", id);
    }
    public void insert(ProjectDTO projectDTO){
         session.insert(NAMESPACE+".insert", projectDTO);
    }


}
