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


    public List<ProjectMemberDTO> selectMember(int id){

        System.out.println("서비스 selectMember" + session.selectList(NAMESPACE + ".selectMember", id));
        return session.selectList(NAMESPACE + ".selectMember", id);
    }

    public void insert(ProjectMemberDTO projectMemberDTO){
         session.insert(NAMESPACE+".insert", projectMemberDTO);
    }


}
