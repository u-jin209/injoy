package com.inzent.injoy.service;

import com.inzent.injoy.model.BoardCommentDTO;
import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.BoardFileDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardFileService {
    private final String NAMESPACE = "mapper.BoardFileMapper";
    private SqlSession session;

    public BoardFileService(SqlSession session){
        this.session = session;
    }
    public void insert(BoardFileDTO boardFileDTO){

        session.insert(NAMESPACE+".insert", boardFileDTO);
    }

    public List<BoardFileDTO> selectAll(int boardId) {
        return session.selectList(NAMESPACE + ".selectAll", boardId);
    }

    public void delete(int boardId){
        session.delete(NAMESPACE + ".delete", boardId);
    }
}
