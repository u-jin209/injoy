package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectDTO;
import com.inzent.injoy.model.ProjectMemberDTO;
import javassist.compiler.ast.Keyword;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.awt.event.KeyEvent;
import java.util.List;

@Service
public class ProjectService {
    private final String NAMESPACE = "mapper.ProjectMapper";
    private SqlSession session;

    public ProjectService(SqlSession session){
        this.session = session;
    }


    public List<ProjectDTO> selectAll(int id){


        return session.selectList(NAMESPACE + ".selectAll", id);
    }
    public ProjectDTO selectProject(int id){


        return session.selectOne(NAMESPACE + ".selectProject", id);
    }
    public void insert(ProjectDTO projectDTO){
         session.insert(NAMESPACE+".insert", projectDTO);
    }

    public int selectLastId(){
        return session.selectOne(NAMESPACE+".selectLastId");
    }


    public List<ProjectDTO> searchProject(String keyword) {

        return session.selectList(NAMESPACE+".searchProject", keyword);
    }
}
