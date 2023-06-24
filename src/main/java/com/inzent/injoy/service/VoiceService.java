package com.inzent.injoy.service;

import com.inzent.injoy.model.VoiceDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoiceService {
    private final String NAMESPACE = "mapper.VoiceMapper";
    private SqlSession session;
    @Autowired
    public VoiceService(SqlSession session){
        this.session = session;
    }

    public void insert(VoiceDTO voiceDTO){
        session.insert(NAMESPACE+".insert",voiceDTO);
    }

    public List<VoiceDTO> selectAll(int projectId){
        return session.selectList(NAMESPACE +".selectAll" , projectId);
    }
    public void delete(int voiceId){
        session.delete(NAMESPACE+".delete",voiceId);
    }
}
