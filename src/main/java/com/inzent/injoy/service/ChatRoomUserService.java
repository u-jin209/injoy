package com.inzent.injoy.service;

import com.inzent.injoy.model.ChatRoomDTO;
import com.inzent.injoy.model.ChatRoomUserDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatRoomUserService {
    private final String NAMESPACE = "mapper.ChatRoomUserMapper";
    private SqlSession session;
    public ChatRoomUserService(SqlSession session){
        this.session = session;
    }

    public List<ChatRoomUserDTO> selectChatRoomUserByChatRoomId(String id) {
        return session.selectList(NAMESPACE + ".selectProjectChatRoomUser", id);
    }

    public ChatRoomUserDTO selectChatRoomUserByUserNameAndChatRoomId(String username, String chatRoomId) {
        Map<String, Object> params = new HashMap<>();
        params.put("username", username);
        params.put("chatRoomId", chatRoomId);
        return session.selectOne(NAMESPACE + ".selectChatRoomUserByUserNameAndChatRoomId", params);
    }

    public void insert(ChatRoomUserDTO chatRoomUserDTO){
        session.insert(NAMESPACE + ".insert", chatRoomUserDTO);
    }
}
