package com.inzent.injoy.service;

import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.ProjectDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private final String NAMESPACE = "mapper.BoardMapper";
    private SqlSession session;

    public BoardService(SqlSession session){
        this.session = session;
    }

    public void insert(BoardDTO boardDTO){
        session.insert(NAMESPACE+".insert", boardDTO);
    }

    public List<BoardDTO> selectAll(int projectId) {
        return session.selectList(NAMESPACE + ".selectAll", projectId);
    }

    public void deleteBoard(int boardId){
        session.delete(NAMESPACE + ".deleteBoard", boardId);
    }

    public BoardDTO selectOne(int boardId) {
        return session.selectOne(NAMESPACE + ".selectOne", boardId);
    }

    public void update(BoardDTO boardDTO) {
        session.update(NAMESPACE+".updateBoard", boardDTO);
    }
}
