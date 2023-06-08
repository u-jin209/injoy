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
    public void delete(int fileId){
        session.delete(NAMESPACE+".delete",fileId);
    }
    public List<FileDTO> fileList (Map<String, Object> map){
        return  session.selectList(NAMESPACE+".selectFile", map);
    }

    public List<FileDTO> searchFile (Map<String, Object> map){
        return  session.selectList(NAMESPACE+".searchFile", map);
    }
    public List<FileDTO> allSearchFile (Map<String, Object> map){
        return  session.selectList(NAMESPACE+".allSearchFile", map);
    }
    public List<FileDTO> allFile (int userId){
        return  session.selectList(NAMESPACE+".allFile", userId);
    }

    public FileDTO selectOne (int fileId){
        return  session.selectOne(NAMESPACE+".selectOne", fileId);
    }

    public void update(Map<String, Object> map){

        System.out.println("map = " + map);

        session.update(NAMESPACE+".update" ,map);
    }
}
