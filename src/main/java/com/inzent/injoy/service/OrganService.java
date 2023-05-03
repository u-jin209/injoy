package com.inzent.injoy.service;

import com.inzent.injoy.model.OrganDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganService {

    private final String NAMESPACE ="mapper.OrganMapper";
    private SqlSession session;

    public OrganService(SqlSession session){
        this.session = session;
    }
    public void insert(OrganDTO organDTO){
        session.insert(NAMESPACE+".insert",organDTO);
    }

    public OrganDTO selectLast(){
        return session.selectOne(NAMESPACE+".selectLast" );
    }

    public List<OrganDTO> selectAll(){
        return session.selectList(NAMESPACE+".selectAll" );
    }

    public int checkName(String keyword){
        return session.selectOne(NAMESPACE+".checkName", keyword);
    }

}
