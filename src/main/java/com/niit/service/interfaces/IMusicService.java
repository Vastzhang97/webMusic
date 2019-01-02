package com.niit.service.interfaces;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


public interface IMusicService {
    String getIntroAlbum();
    String getNewMusic();
    String getComment(int mid);
}
