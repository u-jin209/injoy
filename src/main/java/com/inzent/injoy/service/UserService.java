package com.inzent.injoy.service;



import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import jakarta.jws.soap.SOAPBinding;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        LocalDateTime now = LocalDateTime.now();
        if (validate(attempt.getUsername())) {
            attempt.setEmail(attempt.getUsername());
            attempt.setPassword(passwordEncoder.encode(attempt.getPassword()));
            attempt.setRole("ROLE_USER");
            attempt.setProfilePhoto("/img/moru.jpg");
            attempt.setCrtnDate(Timestamp.valueOf(now));
            attempt.setEmailVerified(false);
            session.insert(NAMESPACE + ".register", attempt);
            return true;
        }else {
            return false;
        }
    }

    public boolean resetPassword(UserDTO userDTO, String currentPassword,String  newPassword) {
        boolean isPasswordMatch = passwordEncoder.matches(currentPassword, userDTO.getPassword());
        if (isPasswordMatch == true) {
            updatePassword(userDTO,newPassword);
            return true;
        } else {
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
    public void updateEmailVerified(UserDTO userDTO) {
        session.update(NAMESPACE + ".updateEmailVerified", userDTO);
    }

    public void updatePassword(UserDTO userDTO,String newPwd){
        userDTO.setPassword(passwordEncoder.encode(newPwd));
        session.update(NAMESPACE + ".updatePassword", userDTO);}
    public UserDTO findByUsername(String username){
        return session.selectOne(NAMESPACE + ".selectOneByUsername",username);
    }

    public void updateInfo(UserDTO userDTO) {

        session.update(NAMESPACE + ".updateInfo", userDTO);
    }

    public void delete(UserDTO userDTO) {

        session.delete(NAMESPACE + ".delete", userDTO);
    }

    public UserDTO selectOne(int id){
        return session.selectOne(NAMESPACE +".selectOne" ,id);
    }
}

