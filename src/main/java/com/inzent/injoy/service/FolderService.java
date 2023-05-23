package com.inzent.injoy.service;

import com.inzent.injoy.model.BookMarkDTO;
import com.inzent.injoy.model.FolderDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FolderService {
    private final String NAMESPACE = "mapper.FolderMapper";
    private SqlSession session;
    @Autowired
    public FolderService(SqlSession session){
        this.session = session;
    }

    public void insert(FolderDTO folderDTO){
        session.insert(NAMESPACE+".insert",folderDTO);
    }


    public void delete(int folderId){
        session.delete(NAMESPACE+".delete",folderId);
    }

    public List<FolderDTO> selectAll(Map<String ,Object> map){
        return session.selectList(NAMESPACE+".selectAll",map);
    }
    public FolderDTO selectFolder(Map<String ,Object> map){
        return session.selectOne(NAMESPACE+".selectFolder",map);
    }
    public void update(Map<String ,Object> map){
        session.update(NAMESPACE+".update",map);
    }
    public int checkName(FolderDTO folderDTO){
        return session.selectOne(NAMESPACE+".checkName", folderDTO);
    }
}