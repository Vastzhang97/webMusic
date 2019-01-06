package com.niit.mapper;

import com.niit.entity.newMusic;

import java.util.List;

public interface NewMusicMapper {
    List<newMusic> getNewMusic();
    List<newMusic> getSearchMusic(String search);
    int deleteNewMusic(int mid);
}
