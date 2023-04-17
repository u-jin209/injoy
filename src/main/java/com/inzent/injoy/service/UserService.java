package com.inzent.injoy.service;

import com.inzent.injoy.model.UserDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final String NAMESPACE = "mapper.UserMapper";
    private SqlSession session;

    public UserService(SqlSession session){
        this.session = session;
    }


    public List<UserDTO> selectAll(){

        return session.selectList(NAMESPACE + ".selectAll");
    }
}
