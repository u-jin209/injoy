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


    public List<ProjectDTO> selectAll(){

        return session.selectList(NAMESPACE + ".selectAll");
    }


}
