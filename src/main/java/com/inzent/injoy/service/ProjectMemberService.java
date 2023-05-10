package com.inzent.injoy.service;


import com.inzent.injoy.model.ProjectDTO;
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


        return session.selectList(NAMESPACE + ".selectMember", id);
    }

    public void insert(ProjectMemberDTO projectMemberDTO){
         session.insert(NAMESPACE+".insert", projectMemberDTO);
    }



    public List<ProjectMemberDTO> searchUser(ProjectMemberDTO memberDTO){


        return session.selectList(NAMESPACE+".searchUser",memberDTO);
    }
    public List<ProjectMemberDTO> searchMember(ProjectMemberDTO memberDTO) {
        return session.selectList(NAMESPACE+".searchMember",memberDTO);
    }
    public List<ProjectMemberDTO> selectWaitMember(int projectId){

        return session.selectList(NAMESPACE + ".selectWaitMember", projectId);
    }

    public List<ProjectMemberDTO> selectInviteMember(int projectId){

        return session.selectList(NAMESPACE + ".selectInviteMember", projectId);
    }


//    public ProjectMemberDTO selectOne(Map<String, Object> map){
//
//        return  session.selectOne(NAMESPACE + ".selectOne", map);
//    }

    public List<ProjectDTO> confirmInvite(int userId){

        return  session.selectList(NAMESPACE + ".confirmInvite", userId);
    }

    public String authority (Map<String, Object> map){
        return session.selectOne(NAMESPACE +".authority" , map);
    }
    public void update(Map<String, Object> map) {
        session.update(NAMESPACE+".update",map);
    }

    public void delete(Map<String, Object> map){
        session.delete(NAMESPACE+".delete", map);
    }


}
