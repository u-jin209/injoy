package com.inzent.injoy.service;

import com.inzent.injoy.model.FileDTO;
import com.inzent.injoy.model.FolderDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FileService {
    private final String NAMESPACE = "mapper.FileMapper";
    private SqlSession session;
    @Autowired
    public FileService(SqlSession session){
        this.session = session;
    }

    public void insert(FileDTO fileDTO){
        session.insert(NAMESPACE+".insert",fileDTO);
    }

//
//    public void delete(int folderId){
//        session.delete(NAMESPACE+".delete",folderId);
//    }
//
//    public List<FolderDTO> selectAll(Map<String ,Object> map){
//       return session.selectList(NAMESPACE+".selectAll",map);
//    }
//
//    public int checkName(FolderDTO folderDTO){
//        return session.selectOne(NAMESPACE+".checkName", folderDTO);
//    }
}
