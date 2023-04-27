package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectDTO;
import com.inzent.injoy.model.ProjectMemberDTO;
import javassist.compiler.ast.Keyword;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.awt.event.KeyEvent;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {
    private final String NAMESPACE = "mapper.ProjectMapper";
    private SqlSession session;

    public ProjectService(SqlSession session){
        this.session = session;
    }


    public List<ProjectDTO> selectAll(int id){


        System.out.println("selectAll 맴버 있나 확인하기 !!!!!!!!!!! : "+ session.selectList(NAMESPACE + ".selectAll", id));
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


    public List<ProjectDTO> searchProject(Map<String, Object> map) {

        return session.selectList(NAMESPACE+".searchProject", map );
    }

    public ProjectDTO searchInviteCode(Map<String, Object> map) {

        return session.selectOne(NAMESPACE+".searchInviteCode",map);
    }

    public List<ProjectDTO> selectWaitProject(int userId){

        return session.selectList(NAMESPACE + ".selectWaitProject", userId);
    }
}
