package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectMemberDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectMemberService {
    private final String NAMESPACE = "mapper.ProjectMemberMapper";
    private SqlSession session;

    public ProjectMemberService(SqlSession session){
        this.session = session;
    }


    public List<ProjectMemberDTO> selectAll(int id){

        System.out.println("서비스 selectList" + session.selectList(NAMESPACE + ".selectAll", id));
        return session.selectList(NAMESPACE + ".selectAll", id);
    }

    public void insert(ProjectMemberDTO projectMemberDTO){
         session.insert(NAMESPACE+".insert", projectMemberDTO);
    }


}
