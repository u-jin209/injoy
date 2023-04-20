package com.inzent.injoy.service;



import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService implements UserDetailsService {
    private final String NAMESPACE = "mapper.UserMapper";
    private SqlSession session;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(SqlSession session, BCryptPasswordEncoder passwordEncoder) {
        this.session = session;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO auth(UserDTO attempt) {
        return session.selectOne(NAMESPACE + ".auth", attempt);

    }

    public boolean validate(String username){
        return session.selectOne(NAMESPACE+".validate",username) ==null;
    }
    public boolean register(UserDTO attempt){
        if (validate(attempt.getUsername())) {
            attempt.setPassword(passwordEncoder.encode(attempt.getPassword()));
            session.insert(NAMESPACE + ".register", attempt);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserDTO user = session.selectOne(NAMESPACE + ".validate", s);
        if(user !=null){
            return new UserCustomDetails(user);
        }
        return null;
    }

    public List<UserDTO> selectAll() {
        return session.selectList(NAMESPACE + ".selectAll");
    }

    public void update(UserDTO userDTO) {
        session.update(NAMESPACE + ".update", userDTO);
    }


}

