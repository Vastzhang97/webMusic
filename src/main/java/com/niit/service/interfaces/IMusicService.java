package com.niit.service.interfaces;

import com.niit.entity.Comment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


public interface IMusicService {
    String getIntroAlbum();
    String getNewMusic();
    String getSearchMusic(String search);
    int deleteNewMusic(int mid);
}
