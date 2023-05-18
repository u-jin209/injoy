package com.inzent.injoy.service;

import com.inzent.injoy.model.ChatDTO;
import com.inzent.injoy.model.ChatRoomDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final String NAMESPACE = "mapper.ChatMapper";
    private SqlSession session;

    public ChatService(SqlSession session) {
        this.session = session;
    }

    public List<ChatDTO> selectChatByChatRoomId(String chatRoomId) {
        return session.selectList(NAMESPACE + ".selectChatByChatRoomId", chatRoomId);
    }

    public List<ChatDTO> selectChatByChatRoomIdWithProfile(String chatRoomId) {
        return session.selectList(NAMESPACE + ".selectChatByChatRoomIdWithProfile", chatRoomId);
    }

    public void insert(ChatDTO chatDTO){
        session.insert(NAMESPACE + ".insert", chatDTO);
    }
}
