package com.inzent.injoy.service;

import com.inzent.injoy.model.ChatDTO;
import com.inzent.injoy.model.ChatRoomDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<ChatDTO> selectChat(String chatRoomId,int userId) {
        Timestamp time = findEnterTime(userId);
        //System.out.println("time = " + time);;
        Map<String, Object> params = new HashMap<>();
        params.put("time", time);
        params.put("chatRoomId", chatRoomId);
        return session.selectList(NAMESPACE + ".selectChat", params);
    }

    public Timestamp findEnterTime(int userId){
        //System.out.println("session.selectOne(NAMESPACE+\".findEnterTime\",userId) = " + session.selectOne(NAMESPACE+".findEnterTime",userId));
        return session.selectOne(NAMESPACE+".findEnterTime",userId);
    }
    public void insert(ChatDTO chatDTO){
        session.insert(NAMESPACE + ".insert", chatDTO);
    }
}
