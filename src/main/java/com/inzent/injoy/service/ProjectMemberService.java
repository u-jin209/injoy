package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectMemberDTO;
import com.inzent.injoy.model.UserDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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


    public void delete(int userId){
         session.delete(NAMESPACE+".delete", userId);
    }

    public List<ProjectMemberDTO> searchUser(ProjectMemberDTO memberDTO){

        System.out.println("service 에서 search user :" + session.selectList(NAMESPACE+".searchUser",memberDTO) );
        return session.selectList(NAMESPACE+".searchUser",memberDTO);
    }

    public List<ProjectMemberDTO> selectWait(int projectId){

        System.out.println("waitList : "+session.selectList(NAMESPACE + ".selectWait", projectId) );
        return session.selectList(NAMESPACE + ".selectWait", projectId);
    }

    public ProjectMemberDTO selectOne(Map<String, Object> map){

        return  session.selectOne(NAMESPACE + ".selectOne", map);
    }

    public void update(ProjectMemberDTO memberDTO) {
        session.update(NAMESPACE+".update",memberDTO);
    }


}
