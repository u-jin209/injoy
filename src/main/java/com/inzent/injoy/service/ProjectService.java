package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectDTO;
import com.inzent.injoy.model.ProjectMemberDTO;
import javassist.compiler.ast.Keyword;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.awt.event.KeyEvent;
import java.util.HashMap;
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



        return session.selectList(NAMESPACE + ".selectAll", id);
    }
    public ProjectDTO selectProject(Map<String,Object> map){


        return session.selectOne(NAMESPACE + ".selectProject", map);
    }
    public ProjectDTO selectDomain(Map<String,Object> map){


        return session.selectOne(NAMESPACE + ".selectDomain", map);
    }
    public List<ProjectDTO> bookMarkProject(int id){


        return session.selectList(NAMESPACE + ".bookMarkProject", id);
    }
    public void insert(ProjectDTO projectDTO){
         session.insert(NAMESPACE+".insert", projectDTO);
    }




    public List<ProjectDTO> searchProject(Map<String, Object> map) {

        return session.selectList(NAMESPACE+".searchProject", map );
    }

    public ProjectDTO searchInviteCode(Map<String, Object> map) {

        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ session = " + session.selectList(NAMESPACE+".searchInviteCode",map));
        return session.selectOne(NAMESPACE+".searchInviteCode",map);
    }

    public List<ProjectDTO> selectWaitProject(int userId){

        return session.selectList(NAMESPACE + ".selectWaitProject", userId);
    }

    public int checkDomain(Map<String , Object> map){
        return session.selectOne(NAMESPACE+".checkDomain",map);
    }

    public int checkName(HashMap<String, Object> map) {

        return session.selectOne(NAMESPACE+".checkName",map);
    }

    public void delete(int projectId){
        session.delete(NAMESPACE+".delete" , projectId);
    }

    public void update(ProjectDTO projectDTO){
        session.update(NAMESPACE+".update" ,projectDTO);
    }
}
