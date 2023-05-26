package com.inzent.injoy.service;

import com.inzent.injoy.model.ChatRoomDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomService {
    private final String NAMESPACE = "mapper.ChatRoomMapper";
    private SqlSession session;
    public ChatRoomService(SqlSession session){
        this.session = session;
    }

    public ChatRoomDTO selectChatRoomByProjectId(int projectId) {
        return session.selectOne(NAMESPACE + ".selectProjectChatRoom", projectId);
    }

    public ChatRoomDTO selectChatRoom(String chatRoomId) {
        return session.selectOne(NAMESPACE + ".selectChatRoom", chatRoomId);
    }

    public void insert(ChatRoomDTO chatRoomDTO){
        session.insert(NAMESPACE + ".insert", chatRoomDTO);
    }

    public void updateUserCount(ChatRoomDTO chatRoomDTO){
        session.update(NAMESPACE + ".updateUserCount", chatRoomDTO);}
}
